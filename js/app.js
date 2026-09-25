import { CAPITULOS, NOMES_SECAO } from "./conteudo.js";

const CHAVE_TEMA = "via-media-tema";
const CHAVE_LIDOS = "via-media-lidos";

const base = window.SITE_BASE ?? "";

function lerLidos() {
  try {
    return JSON.parse(localStorage.getItem(CHAVE_LIDOS)) || {};
  } catch {
    return {};
  }
}

function marcarLido(secao, slug) {
  const lidos = lerLidos();
  lidos[secao] = lidos[secao] || [];
  if (!lidos[secao].includes(slug)) lidos[secao].push(slug);
  localStorage.setItem(CHAVE_LIDOS, JSON.stringify(lidos));
}

function estaLido(secao, slug) {
  const lidos = lerLidos();
  return (lidos[secao] || []).includes(slug);
}

function montarTopo() {
  const alvo = document.getElementById("topo");
  if (!alvo) return;
  const caminho = location.pathname;
  const ativo = (p) => (caminho.includes(p) ? ' aria-current="page"' : "");
  alvo.innerHTML = `
    <div class="topo-interno">
      <a class="marca" href="${base}index.html">Via <em>Média</em></a>
      <nav class="nav-principal">
        <a href="${base}teologia/index.html"${ativo("/teologia/")}>Teologia</a>
        <a href="${base}historia/index.html"${ativo("/historia/")}>História</a>
        <a href="${base}biblioteca/index.html"${ativo("/biblioteca/")}>Biblioteca</a>
        <a href="${base}fontes/index.html"${ativo("/fontes/")}>Fontes</a>
      </nav>
      <button class="botao-tema" id="botao-tema" type="button">modo escuro</button>
    </div>
  `;
  document.getElementById("botao-tema").addEventListener("click", alternarTema);
  atualizarRotuloTema();
}

function montarRodape() {
  const alvo = document.getElementById("rodape");
  if (!alvo) return;
  alvo.innerHTML = `
    <p>Um estudo independente sobre teologia e história anglicana, escrito por curiosidade — não por catequese.
    Textos originais em <a href="${base}fontes/index.html">Fontes</a>.</p>
  `;
}

function aplicarTemaInicial() {
  const salvo = localStorage.getItem(CHAVE_TEMA);
  if (salvo) document.documentElement.setAttribute("data-tema", salvo);
}

function alternarTema() {
  const atual = document.documentElement.getAttribute("data-tema") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "escuro" : "claro");
  const novo = atual === "escuro" ? "claro" : "escuro";
  document.documentElement.setAttribute("data-tema", novo);
  localStorage.setItem(CHAVE_TEMA, novo);
  atualizarRotuloTema();
}

function atualizarRotuloTema() {
  const btn = document.getElementById("botao-tema");
  if (!btn) return;
  const atual = document.documentElement.getAttribute("data-tema") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "escuro" : "claro");
  btn.textContent = atual === "escuro" ? "modo claro" : "modo escuro";
}

function renderizarIndice() {
  const container = document.querySelector("[data-indice-secao]");
  if (!container) return;
  const secao = container.dataset.indiceSecao;
  const capitulos = CAPITULOS[secao];
  const lidos = lerLidos()[secao] || [];
  const prontos = capitulos.filter((c) => c.pronto);
  const lidosProntos = prontos.filter((c) => lidos.includes(c.slug));

  const barra = document.querySelector("[data-progresso]");
  if (barra) {
    const pct = prontos.length ? Math.round((lidosProntos.length / prontos.length) * 100) : 0;
    barra.innerHTML = `
      <div class="barra-progresso"><div class="barra-progresso-preenchida" style="width:${pct}%"></div></div>
      <p class="progresso-legenda">${lidosProntos.length} de ${prontos.length} capítulos publicados já lidos · ${capitulos.length - prontos.length} ainda em preparação</p>
    `;
  }

  container.innerHTML = capitulos
    .map((c, i) => {
      const numero = String(i + 1).padStart(2, "0");
      const selo = !c.pronto
        ? '<span class="selo selo-em-obra">em obra</span>'
        : lidos.includes(c.slug)
        ? '<span class="selo selo-lido">lido</span>'
        : "";
      return `
        <a class="indice-item" href="${c.slug}.html">
          <span class="indice-numero">${numero}</span>
          <span class="indice-corpo">
            <span class="indice-titulo">${c.titulo}</span>
            <span class="indice-resumo">${c.resumo}</span>
          </span>
          ${selo}
        </a>
      `;
    })
    .join("");
}

function montarNavCapitulo() {
  const alvo = document.querySelector("[data-nav-capitulo]");
  if (!alvo) return;
  const secao = alvo.dataset.navCapitulo;
  const slugAtual = alvo.dataset.slugAtual;
  marcarLido(secao, slugAtual);

  const lista = CAPITULOS[secao];
  const i = lista.findIndex((c) => c.slug === slugAtual);
  const anterior = i > 0 ? lista[i - 1] : null;
  const proximo = i >= 0 && i < lista.length - 1 ? lista[i + 1] : null;

  alvo.innerHTML = `
    <a href="${anterior ? anterior.slug + ".html" : "index.html"}">
      <span class="direcao">${anterior ? "← anterior" : "← voltar ao índice"}</span>
      ${anterior ? anterior.titulo : NOMES_SECAO[secao].titulo}
    </a>
    ${
      proximo
        ? `<a href="${proximo.slug}.html" style="text-align:right">
             <span class="direcao">próximo →</span>
             ${proximo.titulo}
           </a>`
        : `<a href="index.html" style="text-align:right"><span class="direcao">fim da seção →</span>voltar ao índice</a>`
    }
  `;
}

function registrarServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  const raiz = new URL(base || ".", location.href).href;
  navigator.serviceWorker.register(raiz + "sw.js", { scope: raiz }).catch(() => {});
}

aplicarTemaInicial();
document.addEventListener("DOMContentLoaded", () => {
  montarTopo();
  montarRodape();
  renderizarIndice();
  montarNavCapitulo();
});
registrarServiceWorker();
