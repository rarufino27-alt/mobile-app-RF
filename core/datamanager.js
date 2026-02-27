const DataManager = {

  cache: {
    rotas: null,
    origens: null
  },

  async carregarOrigens(){

    if(this.cache.origens){
      return this.cache.origens;
    }

    const arquivos = [
      "condominio-porto-do-cabo.json",
      "gaibu.json",
      "enseadas.json",
      "setor-4.json",
      "xareu.json",
      "itapuama.json",
      "calhetas.json",
      "lote-garapu2-lote-dona-amara.json",
      "cohab.json",
      "centro-do-cabo.json",
      "shopping-costa-dourada.json",
      "aguia-american-club-br-101.json",
      "empresas.json",
      "engenhos.json",
      "hospitais-clinicas.json",
      "interurbanas.json",
      "interestaduais.json",
      "lazer-festa.json",
      "locais.json",
      "longas-locais.json",
      "praias.json",
      "bairro-sao-francisco-baixo.json"
    ];

    const respostas = await Promise.all(
      arquivos.map(nome =>
        fetch("data/" + nome)
          .then(r => r.ok ? r.json() : [])
      )
    );

    const rotas = respostas.flat();

    // Normaliza todos os textos removendo espaços invisíveis
    this.cache.rotas = rotas.map(r => ({
      origem: r.origem.trim(),
      destino: r.destino.trim(),
      valor: r.valor
    }));

    const origens = [...new Set(
      this.cache.rotas.map(r => r.origem)
    )].sort((a,b)=>a.localeCompare(b,'pt-BR'));

    this.cache.origens = origens;

    return origens;
  },

  listarDestinos(origem){

    if(!this.cache.rotas) return [];

    const origemLimpa = origem.trim();

    const destinos = this.cache.rotas
      .filter(r => r.origem === origemLimpa)
      .map(r => r.destino);

    return [...new Set(destinos)]
      .sort((a,b)=>a.localeCompare(b,'pt-BR'));
  },

  buscarValor(origem,destino){

    if(!this.cache.rotas) return null;

    const o = origem.trim();
    const d = destino.trim();

    const rota = this.cache.rotas.find(r =>
      (r.origem === o && r.destino === d) ||
      (r.origem === d && r.destino === o)
    );

    return rota ? Number(rota.valor) : null;
  }

};

window.DataManager = DataManager;