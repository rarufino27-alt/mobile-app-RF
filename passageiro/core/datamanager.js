const DataManager = {
  rotas: [],

  async carregar(){
    try {

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
          fetch("/mobile-app-RF/data/" + nome)
            .then(r => {
              if(!r.ok){
                throw new Error("Erro ao carregar: " + nome);
              }
              return r.json();
            })
        )
      );

      this.rotas = respostas.flat();

      console.log("ROTAS CARREGADAS:", this.rotas.length);

    } catch(e){
      console.error("ERRO NO CARREGAMENTO:", e);
    }
  },

  listarOrigens(){
    return [...new Set(this.rotas.map(r => r.origem))].sort();
  },

  listarDestinos(origem){
    return this.rotas
      .filter(r => r.origem === origem)
      .map(r => r.destino);
  },

  buscarValor(origem, destino){
    const rota = this.rotas.find(r =>
      (r.origem === origem && r.destino === destino) ||
      (r.origem === destino && r.destino === origem)
    );

    return rota ? Number(rota.valor) : null;
  }
};