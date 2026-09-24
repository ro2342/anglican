# Changelog — Via Média

Narrativa completa de cada entrega. Índice curto (o que muda mais rápido de
consultar) fica em `PROGRESS.md`, na raiz.

## 2026-09-25-3 — Sacramentos

Terceira entrega da mesma sessão de aprofundamento doutrinário. O capítulo dos
39 Artigos já tinha explicado a lógica confessional por trás de "só dois
sacramentos do Evangelho"; este capítulo foca no que acontece na prática, com
um eixo narrativo central: o caso Gorham (1847-1850).

George Cornelius Gorham, clérigo evangélico, teve sua nomeação para uma
paróquia bloqueada pelo bispo de Exeter por negar regeneração batismal
incondicional. O caso foi da Corte de Arcos (eclesiástica, decidiu contra
Gorham) até o Comitê Judicial do Conselho Privado — um tribunal *civil* — que
em 1850 decidiu a favor de Gorham, considerando sua doutrina dentro dos
limites permitidos pela Igreja da Inglaterra. A reação foi desproporcional ao
conteúdo técnico da disputa: para a ala anglo-católica, o problema não era só
a doutrina em si, mas o fato de um tribunal secular ter autoridade final para
decidir questão de fé — Henry Edward Manning, futuro cardeal, converteu-se a
Roma citando explicitamente esse caso como ponto de ruptura de confiança.

Capítulo também cobre a prática histórica de comunhão trimestral (não
semanal) até o Movimento de Oxford revitalizar a frequência eucarística no
século XIX — detalhe que contraria a imagem popular de uma tradição sempre
centrada na Eucaristia semanal.

`js/conteudo.js`: `sacramentos` passou para `pronto: true`. `sw.js`
atualizado com o novo capítulo no shell pré-cacheado. Teologia: 4 de 8
capítulos prontos.

## 2026-09-25-2 — Dois capítulos doutrinários

Depois de ver o site no ar, o usuário pediu explicitamente mais peso teológico:
"um estudo mesmo com base na fé do anglicanismo... tipo um estudo fodido de
teologia anglicana". Os 3 capítulos da entrega anterior eram, na prática, mais
sobre *como a igreja chegou a existir* (história institucional, o termo via
media, o processo de revisão do BCP) do que sobre *no que ela crê de fato*. Este
pedido corrigiu isso, indo direto para o conteúdo doutrinário do índice de
Teologia.

**Escritura, Tradição e Razão** deixou de ser só uma explicação do modelo de
Hooker (já coberta de raspão no capítulo da Via Média) e virou uma análise de
como esse tripé decide — ou falha em decidir sozinho — debates reais e não
resolvidos da Comunhão Anglicana hoje, usando a ordenação de mulheres bispas
como estudo de caso de como os três lados do tripé podem ser usados
legitimamente por lados opostos da mesma disputa.

**Os Trinta e Nove Artigos** é o capítulo mais denso do site até agora:
percorre os 39 artigos de 1571 por blocos temáticos, com citação direta
(textual, domínio público) das passagens mais definidoras — a fórmula de
justificação só pela fé do Artigo XI, o alerta pastoral contra especulação
sobre predestinação do Artigo XVII, a rejeição explícita da transubstanciação
por nome no Artigo XXVIII ("repugnant to the plain words of Scripture"), a
distinção entre os dois "Sacramentos do Evangelho" e os outros cinco
comumente chamados sacramentos. Inclui deliberadamente o Artigo XVIII
(exclusividade de Cristo para a salvação) sem suavizar o texto — decisão
consciente de não editar uma fonte primária pra parecer mais confortável a
uma sensibilidade contemporânea. Também documenta o status atual do
documento: não é mais juramento obrigatório de clero desde o Clerical
Subscription Act de 1865; hoje é "formulário histórico" pelo Cânon A5 da
Igreja da Inglaterra.

`js/conteudo.js` atualizado: os dois capítulos passaram de `pronto: false`
para `pronto: true`, o que propaga sozinho pro índice de Teologia, pra
barra de progresso e pro service worker (`sw.js` — os dois arquivos entraram
na lista `SHELL` pré-cacheada). Teologia está em 3 de 8 capítulos prontos.

**Bug pequeno pego antes do commit**: um caractere cirílico (`о`, U+043E)
entrou por engano no meio de uma palavra em português durante a escrita do
capítulo dos Artigos — visualmente idêntico ao `o` latino, então invisível
em qualquer revisão visual do texto renderizado. Pego só porque a rotina de
teste incluiu uma varredura por caracteres fora do intervalo Latin-1
(`grep` com range Unicode) antes do commit. Vale manter esse hábito em
capítulos futuros — esse tipo de erro não aparece em screenshot nem em
leitura corrida.

## 2026-09-25 — Criação do site

### Contexto

O projeto começou com três arquivos numa pasta local, sem git: o PDF do *Book
of Common Prayer* de 1662, um epub em português do mesmo livro (usado pela
IEAB) e um comentário vitoriano de 1901 sobre a liturgia anglicana (*The Prayer
Book Explained*, Rev. Percival Jackson, via Project Gutenberg — domínio
público). O pedido: transformar isso num PWA de estudo completo de teologia e
história anglicana, em português, escrito de um jeito que não pareça gerado
por IA — o usuário não é cristão, mas curioso o suficiente pra querer entender
a tradição a fundo.

Antes de codar, três decisões foram levadas ao usuário via pergunta direta
(escopo grande demais pra assumir sem confirmar):

1. **Idioma**: português (PT-BR) — não tradução literal das fontes em inglês,
   texto autoral.
2. **Stack**: HTML/CSS/JS puro, sem build step (GitHub Pages só serve
   estático; um site de conteúdo textual não precisa de framework).
3. **Escopo inicial**: esqueleto de navegação completo (todos os capítulos de
   Teologia e História já listados, mesmo os não escritos) + 2-3 capítulos
   escritos por extenso pra estabelecer o padrão de qualidade, em vez de
   escrever tudo raso ou nada.

### O que foi construído

**Arquitetura de conteúdo.** `js/conteudo.js` ficou como fonte única de
verdade — uma lista de capítulos (Teologia: 8 entradas; História: 11) com
slug, título, resumo e uma flag `pronto`. Todo o resto do site (índices de
seção, navegação anterior/próximo dentro de um capítulo, barra de progresso de
leitura) é renderizado a partir dessa lista via `js/app.js`, em vez de HTML
duplicado por página. Um script (`tools/gerar-placeholders.mjs`) lê essa mesma
lista e gera o HTML de rascunho ("em obra") pra todo capítulo com `pronto:
false` — rodado uma vez, gerou os 16 placeholders.

**Os 3 capítulos escritos por extenso:**

- *Teologia → A Via Média*: por que "via media" foi um termo cunhado só em
  1834 por John Henry Newman (que depois converteu pro catolicismo romano),
  descrevendo algo que já existia de fato desde o Acordo Elisabetano de 1559 —
  e como Richard Hooker deu estrutura teológica a isso na década de 1590.
- *História → 1534, Henrique VIII e a Ruptura com Roma*: a explicação real por
  trás da recusa papal (Roma estava sob controle político do sobrinho de
  Catarina de Aragão depois do Saque de Roma de 1527, não puro
  princípio teológico), o mecanismo legal criado por Cranmer e Cromwell, e a
  Dissolução dos Mosteiros como o que tornou a ruptura financeiramente
  irreversível.
- *História → 1662, o Livro que Uniu (e Dividiu) a Igreja*: a revisão do BCP
  depois da Restauração, o trabalho de John Cosin (com detalhes tirados
  diretamente do comentário de Percival Jackson — ex: o Evensong só passou a
  ser impresso por extenso em 1662), e o Grande Despejo de ~2000 clérigos
  puritanos que se recusaram a assinar o Ato de Uniformidade no mesmo ano.

Os 16 capítulos restantes existem como página "em obra" navegável — no índice,
numerados, com resumo de uma linha, mas com aviso claro de que ainda não foram
escritos.

**PWA.** `manifest.json` + `sw.js` (estratégia network-first com fallback de
cache — qualquer página visitada uma vez fica disponível offline
automaticamente) + ícones gerados via Pillow (`tools/gerar-icones.py`) — cruz
grega simples em fundo rubrica, com variantes `any` e `maskable`.

**Design.** Paleta "papel + rubrica": fundo parchment claro (ou escuro via
toggle/`prefers-color-scheme`), acento vermelho-tijolo (`--rubrica`) que é uma
referência deliberada às rubricas litúrgicas — as instruções impressas em
tinta vermelha nos prayer books reais. Tipografia serif de sistema (sem fonte
externa, pra manter o PWA funcionando offline sem cache cross-origin).

### Problema encontrado e corrigido durante o teste

Testado localmente com `python -m http.server` antes do primeiro commit — o
cabeçalho e rodapé apareciam vazios, sem erro visível. Causa: o servidor HTTP
embutido do Python serve arquivos `.js` como `Content-Type: text/plain` por
padrão, e `<script type="module">` recusa executar um módulo servido com MIME
type errado (falha silenciosa, sem lançar exceção JS capturável). Corrigido
localmente registrando `text/javascript` via `mimetypes.add_type` antes de
subir o servidor — documentado em `CLAUDE.md` pra não se repetir em sessão
futura. GitHub Pages serve o MIME type correto por padrão, então isso não afeta
produção; era um problema só do ambiente de teste local.

### Infraestrutura

Repositório `ro2342/anglican` já existia no GitHub (vazio, público) — sem git
local. Rodado `git init`, conectado o remote, primeiro commit com todo o
conteúdo acima, push, e GitHub Pages ativado via `gh api` apontando pra branch
`main`, raiz do repositório.
