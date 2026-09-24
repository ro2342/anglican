// Gera os arquivos "em obra" pra todo capítulo com pronto:false em js/conteudo.js.
// Roda uma vez por capítulo novo adicionado à lista — não sobrescreve capítulos
// que já têm pronto:true (esses são escritos à mão).
//
// Uso: node tools/gerar-placeholders.mjs

import { CAPITULOS } from "../js/conteudo.js";
import { writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";

const gabarito = (secao, titulo, resumo) => `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${titulo} — Via Média</title>
<meta name="description" content="${resumo}">
<link rel="manifest" href="../manifest.json">
<link rel="icon" href="../assets/icons/favicon-32.png" sizes="32x32">
<link rel="apple-touch-icon" href="../assets/icons/apple-touch-icon.png">
<meta name="theme-color" content="#8c2f1c">
<link rel="stylesheet" href="../css/style.css">
<script>window.SITE_BASE = "../";</script>
<script>
  (function () {
    var t = localStorage.getItem("via-media-tema");
    if (t) document.documentElement.setAttribute("data-tema", t);
  })();
</script>
</head>
<body>
<header class="topo" id="topo"></header>

<main>
  <span class="rubrica-label">${secao === "teologia" ? "Teologia" : "História"}</span>
  <h1>${titulo}</h1>
  <p class="subtitulo">${resumo}</p>

  <p class="em-obra"><strong>Este capítulo ainda não foi escrito.</strong> Ele já está no índice porque faz parte do
  mapa completo do estudo — a ideia é preencher os espaços aos poucos, sem fingir que o quadro geral não existe
  enquanto isso não acontece. Volte outra hora.</p>

  <div data-nav-capitulo="${secao}" data-slug-atual="${""}" class="nav-capitulo"></div>
</main>

<footer id="rodape"></footer>

<script type="module" src="../js/app.js"></script>
</body>
</html>
`;

for (const secao of Object.keys(CAPITULOS)) {
  if (!existsSync(secao)) await mkdir(secao, { recursive: true });
  for (const cap of CAPITULOS[secao]) {
    if (cap.pronto) continue;
    const caminho = `${secao}/${cap.slug}.html`;
    if (existsSync(caminho)) {
      console.log(`pulei (já existe): ${caminho}`);
      continue;
    }
    let html = gabarito(secao, cap.titulo, cap.resumo);
    html = html.replace('data-slug-atual=""', `data-slug-atual="${cap.slug}"`);
    await writeFile(caminho, html, "utf-8");
    console.log(`criei: ${caminho}`);
  }
}
