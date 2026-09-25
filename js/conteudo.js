// Fonte única de verdade pro índice do site: usado tanto no navegador
// (renderiza os índices de Teologia/História e a navegação de capítulo)
// quanto em tools/gerar-placeholders.mjs (gera os rascunhos "em obra").
// Adicionar um capítulo novo = adicionar uma linha aqui.

export const CAPITULOS = {
  teologia: [
    { slug: "via-media", titulo: "A Via Média", resumo: "O que faz o anglicanismo ser, antes de mais nada, anglicano.", pronto: true },
    { slug: "escritura-tradicao-razao", titulo: "Escritura, Tradição e Razão", resumo: "O tripé de Richard Hooker, na prática — não na teoria.", pronto: true },
    { slug: "trinta-nove-artigos", titulo: "Os Trinta e Nove Artigos", resumo: "A confissão de fé que nunca quis ser um catecismo completo — artigo por artigo, sem pular os desconfortáveis.", pronto: true },
    { slug: "sacramentos", titulo: "Sacramentos: Batismo e Eucaristia", resumo: "Só dois sacramentos maiores — e o caso de 1850 que foi parar num tribunal civil por causa deles.", pronto: true },
    { slug: "eclesiologia-episcopado", titulo: "Bispos, Sucessão e a Forma da Igreja", resumo: "Por que o anglicanismo manteve os bispos quando cortou Roma.", pronto: true },
    { slug: "comunhao-anglicana", titulo: "A Comunhão Anglicana Hoje", resumo: "Como dezenas de províncias ficam em comunhão sem um papa no meio.", pronto: true },
    { slug: "correntes-internas", titulo: "Anglo-Católicos, Evangélicos e Broad Church", resumo: "As três almas que moram dentro da mesma igreja.", pronto: true },
    { slug: "anglicanismo-brasil", titulo: "O Anglicanismo no Brasil", resumo: "A IEAB e a história pouco contada da província brasileira.", pronto: true },
  ],
  historia: [
    { slug: "origens-pre-reforma", titulo: "Antes de Henrique: o Cristianismo na Inglaterra", resumo: "Mil anos de igreja inglesa antes do escândalo de 1534.", pronto: true },
    { slug: "henrique-viii-ruptura", titulo: "1534 — Henrique VIII e a Ruptura com Roma", resumo: "Um divórcio, um Papa irredutível, e um país inteiro mudando de dono.", pronto: true },
    { slug: "cranmer-bcp-1549", titulo: "Cranmer e o Primeiro Livro de Oração (1549)", resumo: "O homem que traduziu a liturgia inteira pro inglês — e depois pagou por isso.", pronto: true },
    { slug: "maria-i-reacao-catolica", titulo: "Maria I e os Anos de Fogo", resumo: "Cinco anos que quase desfizeram tudo o que Cranmer construiu.", pronto: true },
    { slug: "elizabeth-acordo-elisabetano", titulo: "Elizabeth I e o Acordo Elisabetano", resumo: "A solução política que virou identidade religiosa permanente.", pronto: true },
    { slug: "guerra-civil-puritanos", titulo: "Guerra Civil, Cromwell e os Puritanos", resumo: "A década em que a Igreja da Inglaterra deixou de existir oficialmente.", pronto: true },
    { slug: "bcp-1662", titulo: "1662 — o Livro que Uniu (e Dividiu) a Igreja", resumo: "A Restauração e o prayer book que sobrevive, quase intacto, até hoje.", pronto: true },
    { slug: "expansao-colonial", titulo: "Impérios e Missões: o Anglicanismo Sai da Inglaterra", resumo: "Como uma igreja de estado nacional virou uma comunhão global.", pronto: true },
    { slug: "movimento-oxford", titulo: "O Movimento de Oxford", resumo: "Newman, Keble, Pusey e a reinvenção católica do século XIX.", pronto: true },
    { slug: "seculo-xx-xxi", titulo: "Mulheres, Cismas e o Anglicanismo Contemporâneo", resumo: "Ordenação feminina, GAFCON e as fraturas do século XX ao XXI.", pronto: true },
    { slug: "ieab-brasil-historia", titulo: "A História da IEAB", resumo: "De missão episcopal norte-americana a província autônoma brasileira.", pronto: true },
  ],
  biblioteca: [
    { slug: "trinta-nove-artigos", titulo: "Os Trinta e Nove Artigos de Religião", resumo: "Texto integral, bilíngue: o original inglês de 1662 e a tradução da IEAB (Livro de Oração Comum, 1950).", pronto: true },
    { slug: "credo-niceno", titulo: "O Credo Niceno", resumo: "O credo conciliar de 325/381, usado na Eucaristia dominical.", pronto: true },
    { slug: "credo-apostolico", titulo: "O Credo dos Apóstolos", resumo: "O credo batismal mais antigo, usado no Ofício Diário.", pronto: true },
    { slug: "credo-atanasiano", titulo: "O Credo Atanasiano", resumo: "O credo mais longo e mais duro dos três — e o único que a IEAB não herdou.", pronto: true },
    { slug: "catecismo", titulo: "O Catecismo", resumo: "Perguntas e respostas do Livro de Oração Comum, incluindo a definição de sacramento.", pronto: true },
  ],
};

export const NOMES_SECAO = {
  teologia: { titulo: "Teologia", artigo: "a" },
  historia: { titulo: "História", artigo: "a" },
  biblioteca: { titulo: "Biblioteca", artigo: "a" },
};
