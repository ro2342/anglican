# Via Média — Estudos Anglicanos

> Antes de mexer em qualquer coisa: leia `PROGRESS.md` (raiz do projeto) pra saber
> o que já foi feito e o que está planejado como próximo passo. Esse arquivo aqui
> documenta o que o projeto **é**; o PROGRESS documenta **onde ele está agora**.

## O que é

Um site PWA (instalável em PC e celular) de estudo de longa duração sobre a
teologia e a história da Igreja Anglicana. Não é um projeto institucional nem
confessional — é um estudo pessoal e independente, escrito em primeira pessoa,
hospedado como página estática no GitHub Pages a partir do repositório
`ro2342/anglican`.

Premissas que guiam todo o conteúdo:

- **Texto longo, não resumo.** Nada de "5 fatos que você precisa saber sobre X".
  Cada capítulo tem o tamanho que o assunto pede.
- **Voz autoral, não enciclopédica.** Os capítulos são escritos como ensaio — com
  ironia, ritmo de frase variado, achados de pesquisa específicos (datas, nomes,
  citações primárias) — deliberadamente evitando o tom genérico de resumo gerado
  por IA. Ao escrever ou revisar um capítulo, invocar as skills `/creative-writer`
  (voz e construção de prosa) e `/i-have-adhd` (estrutura de navegação/legibilidade)
  como guia.
- **Honestidade de escopo.** "Estudo completo" é uma meta de longo prazo, não uma
  promessa de cada sessão. O índice inteiro (Teologia + História) já existe,
  navegável, com capítulos ainda não escritos marcados como "em obra" — nunca
  esconder o mapa geral enquanto ele não está pronto.

## Stack técnica

**HTML/CSS/JS puro. Sem build step, sem framework, sem bundler.** Decisão
deliberada: GitHub Pages só serve arquivos estáticos, e um PWA de conteúdo
majoritariamente textual não precisa de mais do que isso.

- `index.html` + uma página por capítulo (`teologia/<slug>.html`,
  `historia/<slug>.html`) — HTML servido diretamente, sem templating em runtime.
- `js/conteudo.js` — **fonte única de verdade** do índice do site (lista de
  capítulos de Teologia e História, com `slug`, `titulo`, `resumo` e `pronto`
  true/false). Módulo ES, importado tanto pelo navegador quanto pelos scripts em
  `tools/`.
- `js/app.js` — módulo ES que injeta o cabeçalho/rodapé (`#topo`/`#rodape`),
  alterna tema claro/escuro, renderiza os índices de Teologia/História a partir
  de `conteudo.js`, monta a navegação anterior/próximo de cada capítulo, marca
  capítulos como lidos em `localStorage` e registra o service worker.
- `css/style.css` — todo o design system do site, via CSS custom properties em
  `:root` (tokens de cor/tipografia). Ver seção "Design" abaixo.
- `manifest.json` + `sw.js` — PWA. Service worker com estratégia network-first
  com fallback de cache; qualquer página visitada uma vez fica disponível offline
  automaticamente, sem precisar listar cada capítulo novo manualmente em `sw.js`
  (só o "shell" — home, índices de seção, e os capítulos já prontos — é
  pré-cacheado no install).
- `tools/gerar-placeholders.mjs` — gera o HTML de rascunho ("em obra") pra todo
  capítulo com `pronto: false` em `conteudo.js`. Rodar com `node
  tools/gerar-placeholders.mjs` sempre que um capítulo novo for adicionado à
  lista. Não sobrescreve arquivo que já existe.
- `tools/gerar-icones.py` — gera os ícones do PWA (`assets/icons/`) via Pillow,
  offline, sem depender de nenhum serviço externo de imagem. Rodar de novo só se
  o design do ícone mudar.

### Caminhos relativos, não absolutos

O repositório se chama `anglican`, então o GitHub Pages serve o site em
`https://ro2342.github.io/anglican/` — **não** na raiz do domínio. Por isso,
todo link interno usa caminho relativo (`../css/style.css`, não `/css/style.css`).
Cada página define `window.SITE_BASE` inline no `<head>` (`""` na raiz, `"../"`
numa página de capítulo) — é isso que `app.js` usa pra montar os links do
cabeçalho e resolver a URL do service worker corretamente, tanto localmente
quanto no GitHub Pages, sob qualquer subpath.

### Testando localmente

`python -m http.server` sozinho **não funciona** pra testar isso — o Python
serve `.js` como `text/plain` por padrão, e `<script type="module">` exige MIME
type `text/javascript`/`application/javascript`, senão o navegador recusa
silenciosamente o módulo (nenhum erro barulhento no console — o cabeçalho e o
rodapé simplesmente ficam vazios). Rodar com o MIME corrigido:

```
python -c "
import http.server, socketserver, mimetypes
mimetypes.add_type('text/javascript', '.js')
Handler = http.server.SimpleHTTPRequestHandler
with socketserver.TCPServer(('', 8000), Handler) as httpd:
    httpd.serve_forever()
"
```

## Design

Paleta e tipografia vivem como CSS custom properties no topo de `css/style.css`.

- **Cores**: fundo "papel" (parchment) claro por padrão, com variante escura via
  `prefers-color-scheme` ou toggle manual (`data-tema` no `<html>`, salvo em
  `localStorage`). A cor de destaque (`--rubrica`, tom terracota/vermelho-tijolo)
  é uma referência deliberada às rubricas — as instruções litúrgicas impressas em
  tinta vermelha nos prayer books reais, em meio ao texto preto comum. Não é uma
  escolha estética arbitrária; é o mesmo vocabulário visual do objeto que o site
  estuda.
- **Tipografia**: serif de sistema (`ui-serif, Georgia, Cambria...`) pro corpo de
  texto — site é de leitura longa, sem depender de fonte externa (mantém o PWA
  funcionando offline sem cache cross-origin). Sans-serif de sistema só pra
  chrome de UI (nav, rótulos, badges).
- **Detalhes de leitura**: capitular (letra maiúscula grande) no primeiro
  parágrafo de cada capítulo, `<hr class="ornamento">` como quebra de seção,
  citações longas em `<blockquote>`.
- Antes de mexer em qualquer página nova ou redesenhar algo, considerar invocar a
  skill `antivibecode`/`impeccable` pra evitar deriva pro visual genérico de
  "site feito por IA".

## Convenções de conteúdo

- Um capítulo = um arquivo HTML em `teologia/` ou `historia/`, com `<div
  data-nav-capitulo="teologia|historia" data-slug-atual="<slug>">` no fim do
  `<main>` — é esse atributo que `app.js` usa pra marcar leitura e montar a
  navegação anterior/próximo.
- Pra adicionar um capítulo novo ao índice (mesmo sem escrever o texto ainda):
  adicionar uma entrada em `CAPITULOS` em `js/conteudo.js` com `pronto: false`,
  depois rodar `node tools/gerar-placeholders.mjs`. O índice de seção
  (`teologia/index.html` / `historia/index.html`) atualiza sozinho porque
  renderiza a lista dinamicamente a partir desse mesmo arquivo.
- Pra transformar um placeholder em capítulo de verdade: escrever o HTML real no
  lugar do arquivo gerado, e mudar `pronto: false` para `pronto: true` na entrada
  correspondente em `conteudo.js`.
- Fontes primárias (PDF/epub/txt usados como base de pesquisa) ficam em
  `fontes/downloads/` e são linkadas na página `fontes/index.html` — todas de
  domínio público até agora; checar isso antes de adicionar uma fonte nova.
