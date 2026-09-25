# Progresso — Via Média

> Ver `CLAUDE.md` pra escopo, stack e convenções do projeto.
> Detalhe completo de cada entrega em `ai/CHANGELOG.md`.

## Próximos passos

- [ ] **Esqueleto de conteúdo está 100% completo** em todas as 4 seções —
      Teologia (8/8), História (11/11), Questões (4/4) e Biblioteca (5/5).
      Próximo passo de conteúdo, se houver, é expandir os índices em si
      (novos capítulos/temas) ou revisar/aprofundar algum já escrito — não
      preencher lacunas.
- [ ] Seção Questões tem só 4 temas; o usuário mencionou trajetória pessoal
      rica (evangélico → IEAB Santos → umbanda → Reclaiming) que pode gerar
      mais temas pra essa seção no futuro — perguntar antes de expandir por
      conta própria, já que são textos sensíveis/pessoais.
- [ ] Revisão de leitura humana: os últimos ~17 capítulos foram escritos por
      agentes em paralelo (forks) a partir de briefings detalhados do
      coordenador; o coordenador conferiu estrutura, unicode e renderização,
      mas não fez uma leitura crítica linha a linha de cada um. Vale uma
      passada de revisão de conteúdo/precisão histórica com calma.
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
- **2026-09-25 (5)** — Todo o esqueleto de conteúdo restante escrito numa
  única leva: os 4 capítulos que faltavam em Teologia, os 9 de História e os
  4 documentos da Biblioteca — 17 textos, ~30 mil palavras, via agentes fork
  paralelos coordenados a partir de briefings de conteúdo específicos
  (eventos reais, datas, fontes primárias, sem duplicar o que outros
  capítulos já cobriam). Teologia 8/8, História 11/11, Biblioteca 5/5 —
  esqueleto de conteúdo do site 100% completo, nenhum "em obra" restante.
  Detalhe completo → `ai/CHANGELOG.md#2026-09-25-5`.
- **2026-09-25 (6)** — Nova seção **Questões** no menu (entre História e
  Biblioteca): teologia temática/pastoral, não histórica — pra quem está
  chegando de fora com perguntas específicas, não querendo cronologia.
  Pedido explícito do usuário, que compartilhou trajetória pessoal (gay,
  não-binário, ex-evangélico, passou pela IEAB em Santos, depois umbanda,
  depois Reclaiming). 4 capítulos, escritos diretamente pelo coordenador
  (não via fork, dado o tema sensível): Anglicanismo e Pessoas LGBTQIA+,
  Fé sem Certeza, Outras Religiões/Outros Caminhos, e Teologia da
  Libertação e a Esquerda Anglicana. Site agora com 4 seções completas.
  Detalhe completo → `ai/CHANGELOG.md#2026-09-25-6`.
