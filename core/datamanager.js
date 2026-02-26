window.DataManager = {

  /* =========================
     CRÉDITOS
  ========================== */

  getCreditos(){
    return parseFloat(localStorage.getItem("rf_creditos")) || 0;
  },

  setCreditos(valor){
    localStorage.setItem("rf_creditos", parseFloat(valor).toFixed(2));
  },

  adicionarCreditos(valor){
    let atual = this.getCreditos();
    this.setCreditos(atual + parseFloat(valor));
  },

  descontarCreditos(valor){
    let atual = this.getCreditos();
    this.setCreditos(Math.max(0, atual - parseFloat(valor)));
  },

  /* =========================
     STATUS ONLINE
  ========================== */

  setOnline(status){
    localStorage.setItem("rf_online", status ? "1" : "0");
  },

  isOnline(){
    return localStorage.getItem("rf_online") === "1";
  },

  /* =========================
     GANHOS DO DIA
  ========================== */

  atualizarGanhos(valor){

    const hoje = new Date().toDateString();
    const dataSalva = localStorage.getItem("rf_data_ganhos");

    if(dataSalva !== hoje){
      localStorage.setItem("rf_ganhos_dia", 0);
      localStorage.setItem("rf_data_ganhos", hoje);
    }

    let atual = parseFloat(localStorage.getItem("rf_ganhos_dia")) || 0;
    localStorage.setItem("rf_ganhos_dia", (atual + parseFloat(valor)).toFixed(2));
  },

  getGanhosHoje(){
    return parseFloat(localStorage.getItem("rf_ganhos_dia")) || 0;
  },

  /* =========================
     CORRIDA
  ========================== */

  criarCorridaSimulada(){

    // Se já existir corrida ativa, não cria outra
    if(this.getCorrida()) return null;

    const corrida = {
      id: Date.now(),
      valor: 20 + Math.floor(Math.random() * 30),
      origem: "Centro da Cidade",
      destino: "Shopping Principal",
      status: "pendente"
    };

    localStorage.setItem("rf_corrida", JSON.stringify(corrida));
    return corrida;
  },

  getCorrida(){
    return JSON.parse(localStorage.getItem("rf_corrida"));
  },

  atualizarStatusCorrida(status){
    let corrida = this.getCorrida();
    if(!corrida) return;

    corrida.status = status;
    localStorage.setItem("rf_corrida", JSON.stringify(corrida));
  },

  limparCorrida(){
    localStorage.removeItem("rf_corrida");
  }

};