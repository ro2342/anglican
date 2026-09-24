# Progresso — Via Média

> Ver `CLAUDE.md` pra escopo, stack e convenções do projeto.
> Detalhe completo de cada entrega em `ai/CHANGELOG.md`.

## Próximos passos

- [ ] Escrever os 16 capítulos ainda em "em obra" (7 de Teologia, 9 de História —
      ver `js/conteudo.js` pra lista com `pronto: false`). Sem ordem obrigatória;
      seguir curiosidade da sessão.
- [ ] Confirmar se GitHub Pages ficou ativo e o site está acessível em
      `https://ro2342.github.io/anglican/` (checar depois que o DNS/build do
      Pages propagar, pode levar alguns minutos após o primeiro push).
- [ ] Testar instalação do PWA de verdade num celular (Android/iOS) — só foi
      testado em desktop/local até agora.
- [ ] Considerar favicon/ícone em variação SVG pra telas de alta densidade, se o
      PNG atual (gerado via Pillow) não ficar nítido o suficiente em uso real.

## Entregas

- **2026-09-25** — Site criado do zero: PWA estático (HTML/CSS/JS puro),
  esqueleto navegável completo de Teologia (8 capítulos) e História (11
  capítulos), 3 capítulos escritos por extenso (Via Média, Henrique VIII e a
  Ruptura, BCP 1662), página de Fontes com os 3 documentos originais, PWA
  (manifest + service worker + ícones), tema claro/escuro, tracking de leitura
  via localStorage. Repo conectado a `ro2342/anglican`, GitHub Pages ativado.
  Detalhe completo → `ai/CHANGELOG.md#2026-09-25`.
