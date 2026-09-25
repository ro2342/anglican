# Changelog — Via Média

Narrativa completa de cada entrega. Índice curto (o que muda mais rápido de
consultar) fica em `PROGRESS.md`, na raiz.

## 2026-09-25-5 — Todo o esqueleto de conteúdo, numa leva só

Pedido do usuário, direto: "faça agora todos os textos que vc conseguir,
prioridade para teologia. mas faça tudo." Isso significava escrever os 17
textos que ainda estavam "em obra" — 4 de Teologia, 9 de História, 4 de
Biblioteca — numa única sessão.

**Decisão de arquitetura da tarefa**: em vez de escrever os 17 textos
sequencialmente no próprio contexto do coordenador (~30 mil palavras de
prosa que não precisavam ficar retidas depois de escritas), a tarefa foi
dividida em agentes `fork` paralelos — um por capítulo/documento — cada um
recebendo um briefing de conteúdo específico (eventos reais, datas, nomes,
citações, e explicitamente o que EVITAR repetir de capítulos já escritos ou
sendo escritos em paralelo por outro fork, pra não duplicar narrativa entre
capítulos vizinhos). Cada fork foi instruído a: (1) ler o placeholder antes
de sobrescrever, (2) seguir a estrutura/voz de um capítulo de referência já
publicado, (3) rodar grep de caracteres fora do padrão Latin-1 no próprio
arquivo antes de terminar (lição direta da entrega anterior, onde um
caractere cirílico passou despercebido), e (4) não tocar em nenhum arquivo
além do seu.

**Falha real no meio do processo**: depois de 15 dos 21 forks completarem
com sucesso, os 6 seguintes falharam por limite de conta — parte por rate
limit transitório, parte por um limite de sessão mais rígido ("session
limit", com reset agendado). As notificações de falha inicialmente pareciam
pior do que a realidade: uma checagem direta no disco (via grep pelo texto
exato do placeholder, não pela classe CSS `em-obra` — que um fork tinha
reaproveitado legitimamente como caixa de "veja também" num outro arquivo,
gerando um falso positivo na primeira varredura) revelou que 4 dos 6 forks
"falhos" na verdade já tinham escrito o arquivo completo antes de cair
(biblioteca/catecismo.html, historia/maria-i-reacao-catolica.html,
historia/expansao-colonial.html, historia/movimento-oxford.html) — a falha
aconteceu depois do `Write`, provavelmente na etapa final de relatório.
Restaram só 2 capítulos genuinamente não escritos:
historia/seculo-xx-xxi.html e historia/ieab-brasil-historia.html, que o
coordenador escreveu diretamente (não via fork, pra não arriscar outra
falha de limite), usando os mesmos briefings de conteúdo já preparados.

**Segundo falso alarme, desta vez sobre um bug**: um dos forks, ao usar
`biblioteca/trinta-nove-artigos.html` como referência, reportou uma tag
`<span>` malformada (`<\span>` em vez de `</span>`) no Artigo VIII. Uma
checagem direta com `Read` (não `Grep`, que exibiu o trecho de forma
enganosa) confirmou que o arquivo real estava correto — o erro existia só
na forma como a ferramenta de busca renderizou o resultado, não no arquivo.
Lição: quando uma ferramenta de busca reporta algo que parece um bug óbvio
e estranho, conferir com leitura direta do arquivo antes de "consertar"
algo que pode não estar quebrado.

**Varredura de segurança em massa**: rodada uma varredura de caracteres
Unicode fora do intervalo esperado em todos os 15 arquivos escritos pelos
forks bem-sucedidos. A primeira tentativa gerou uma enxurrada de falsos
positivos — todo travessão (—, U+2014) do texto, usado centenas de vezes
em todos os capítulos do site desde o início, foi sinalizado como
"suspeito" por um erro no próprio script de varredura (faixa de caracteres
permitidos escrita estreita demais, sem incluir pontuação geral). Corrigido
o script pra incluir a faixa de travessões/aspas curvas/reticências
(U+2010–U+2026), e a segunda varredura veio limpa: zero caracteres
realmente fora do padrão em todo o conteúdo novo.

**Bookkeeping final**: `js/conteudo.js` — todos os 21 itens (4 Teologia + 9
História + 4 Biblioteca, mais os 2 escritos diretamente) passaram de
`pronto: false` para `pronto: true`. `sw.js` — SHELL do service worker
expandido para pré-cachear todo o site agora que não há mais placeholder.
Testado no navegador: índices de Teologia e História mostrando "0 em
preparação", navegação entre capítulos, renderização de capitular e notas
cruzadas — tudo funcionando. Teologia 8/8, História 11/11, Biblioteca 5/5.
O esqueleto de conteúdo do site, que começou como mapa navegável vazio há
poucas horas, está completo.

## 2026-09-25-4 — Seção Biblioteca: os 39 Artigos na íntegra

O usuário apontou o problema real: os capítulos de Teologia citam e comentam
os 39 Artigos extensivamente, mas em nenhum lugar do site dava pra ler o
documento inteiro. Pediu uma seção "Biblioteca" no menu.

Enquanto eu montava a extração do texto em inglês (encontrado no próprio PDF
`the-book-of-common-prayer-1662.pdf` já salvo em `fontes/downloads/` — um
fac-símile da edição Baskerville de 1762, páginas 331-338, que precisou de
`pypdf` pra extrair e limpeza manual de ligaduras tipográficas arcaicas como
"ſ" e "ﬅ"), o usuário mandou um link
(monergismo.com/textos/credos/39artigos.htm) perguntando se tinha uma
tradução em português ali. Baixei o HTML bruto (havia sido perdido texto na
primeira tentativa via WebFetch, que resume/perde conteúdo em páginas
longas — baixar com `curl` e limpar o HTML manualmente com Python preservou
o texto completo). A página era **muito melhor do que uma tradução
genérica**: é a transcrição da tradução oficial usada pela própria Igreja
Episcopal do Brasil, extraída do *Livro de Oração Comum* de 1950 (p.
601-611) — ou seja, o texto que anglicanos brasileiros de fato liam.

Isso mudou o formato da página: em vez de eu traduzir os 39 Artigos do zero
(arriscando imprecisão num documento jurídico-confessional), cada artigo
ficou bilíngue de verdade — o inglês de 1662 (fonte primária local) ao lado
da tradução histórica da IEAB (fonte primária brasileira) — com atribuição
explícita das duas origens no rodapé da página.

Comparar as duas versões revelou divergências que viraram notas editoriais
diretamente no texto, em vez de ficarem escondidas:
- **Artigo VIII** (Dos Credos): a versão brasileira cita só dois credos
  (Niceno e Apostólico); o original de 1662 cita três, incluindo o
  Atanasiano — que a IEAB simplesmente não herdou.
- **Artigo XXI** (Autoridade dos Concílios Gerais): omitido por completo na
  versão americana/brasileira, por tratar de "assunto de caráter local e
  civil" (a referência a "príncipes" convocando concílios). Texto original
  de 1571 preservado via nota de rodapé da própria fonte.
- **Artigo XXXVI**: troca a ancoragem de validade de ordenação do "tempo de
  Eduardo VI" (Inglaterra) pela Convenção Geral de 1792 (Igreja Episcopal
  americana) — mesmo princípio, fonte de referência trocada.
- **Artigo XXXVII** (Magistrados Civis): reescrita quase completa — o
  original é sobre a Supremacia Real inglesa; numa república sem coroa, o
  artigo inteiro foi substituído por um princípio genérico de obediência
  civil.

`js/conteudo.js`: nova chave `biblioteca` em `CAPITULOS` e `NOMES_SECAO`
(mesma mecânica de índice/progresso/navegação das outras seções, reutilizada
sem duplicar lógica). `js/app.js`: link "Biblioteca" adicionado à nav
principal. `css/style.css`: classes novas (`.texto-original`,  `.traducao`,
`.rotulo-idioma`, `.nota-editorial`, `.mini-indice`) pro layout bilíngue.
`sw.js` atualizado com as duas páginas novas no shell pré-cacheado.

**Bug achado e corrigido**: `tools/gerar-placeholders.mjs` tinha o rótulo de
seção hard-coded como `secao === "teologia" ? "Teologia" : "História"` — ao
gerar os 4 placeholders da Biblioteca (credos, catecismo), todos saíram
rotulados "História" por engano. Corrigido pra usar `NOMES_SECAO[secao]`,
a mesma fonte de verdade que todo o resto do site já usa.

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
