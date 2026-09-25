# Progresso — Via Média

> Ver `CLAUDE.md` pra escopo, stack e convenções do projeto.
> Detalhe completo de cada entrega em `ai/CHANGELOG.md`.

## Próximos passos

- [ ] Escrever os 17 capítulos/documentos ainda em "em obra" (4 de Teologia, 9
      de História, 4 de Biblioteca — ver `js/conteudo.js` pra lista com
      `pronto: false`). Sem ordem obrigatória; seguir curiosidade da sessão.
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
- **2026-09-25 (2)** — Dois capítulos doutrinários pesados: Escritura, Tradição
  e Razão (o tripé de autoridade na prática, ligado às fraturas reais da
  Comunhão hoje) e Os Trinta e Nove Artigos (artigo por artigo — pecado
  original, justificação só pela fé, predestinação, os dois sacramentos do
  Evangelho, rejeição da transubstanciação, sem pular os artigos
  desconfortáveis). Teologia agora com 3 de 8 capítulos prontos.
  Detalhe completo → `ai/CHANGELOG.md#2026-09-25-2`.
- **2026-09-25 (3)** — Capítulo de Sacramentos (Batismo e Eucaristia): a
  definição do Catecismo, a tensão entre a linguagem de "regeneração
  batismal" do rito de 1662 e o Artigo IX, e o caso Gorham de 1850 — quando
  um tribunal civil (não eclesiástico) decidiu uma disputa de doutrina
  batismal, disparando uma onda de conversões de clérigos anglo-católicos
  para Roma. Teologia: 4 de 8 capítulos prontos.
  Detalhe completo → `ai/CHANGELOG.md#2026-09-25-3`.
- **2026-09-25 (4)** — Nova seção **Biblioteca** no menu: textos primários na
  íntegra, não só citados de passagem nos capítulos. Primeiro documento: os
  39 Artigos completos, bilíngues (original inglês de 1662, extraído do PDF
  já salvo em Fontes, + a tradução histórica da própria Igreja Episcopal do
  Brasil, do Livro de Oração Comum de 1950), com notas explicando onde a
  versão brasileira diverge do original inglês (Artigo XXI omitido, XXXVI e
  XXXVII reescritos pra uma república sem coroa). Esqueleto da Biblioteca
  criado com mais 4 documentos "em obra" (os 3 credos históricos + o
  Catecismo). Corrigido bug no gerador de placeholders que rotulava tudo
  fora de Teologia como "História".
  Detalhe completo → `ai/CHANGELOG.md#2026-09-25-4`.
