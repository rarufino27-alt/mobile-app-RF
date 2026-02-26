window.DataManager = {

  /* =========================
     CRÉDITOS
  ========================== */

  getCreditos(){
    return parseFloat(localStorage.getItem("rf_creditos")) || 0;
  },

  setCreditos(valor){
    const numero = parseFloat(valor) || 0;
    localStorage.setItem("rf_creditos", numero.toFixed(2));
  },

  adicionarCreditos(valor){
    const atual = this.getCreditos();
    this.setCreditos(atual + parseFloat(valor));
  },

  descontarCreditos(valor){
    const atual = this.getCreditos();
    const novo = Math.max(0, atual - parseFloat(valor));
    this.setCreditos(novo);
  },

  /* =========================
     STATUS ONLINE
  ========================== */

  setOnline(status){
    localStorage.setItem("rf_online", status ? "1" : "0");
  },

  isOnline(){
    const status = localStorage.getItem("rf_online");
    return status === "1"; // leitura direta e segura
  },

  /* =========================
     GANHOS DO DIA
  ========================== */

  atualizarGanhos(valor){

    const hoje = new Date().toDateString();
    const dataSalva = localStorage.getItem("rf_data_ganhos");

    if(dataSalva !== hoje){
      localStorage.setItem("rf_ganhos_dia", "0.00");
      localStorage.setItem("rf_data_ganhos", hoje);
    }

    const atual = parseFloat(localStorage.getItem("rf_ganhos_dia")) || 0;
    const novo = atual + parseFloat(valor);

    localStorage.setItem("rf_ganhos_dia", novo.toFixed(2));
  },

  getGanhosHoje(){
    return parseFloat(localStorage.getItem("rf_ganhos_dia")) || 0;
  },

  /* =========================
     CORRIDA
  ========================== */

  criarCorridaSimulada(){

    // Impede duplicação
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
    const dados = localStorage.getItem("rf_corrida");
    return dados ? JSON.parse(dados) : null;
  },

  atualizarStatusCorrida(status){
    const corrida = this.getCorrida();
    if(!corrida) return;

    corrida.status = status;
    localStorage.setItem("rf_corrida", JSON.stringify(corrida));
  },

  limparCorrida(){
    localStorage.removeItem("rf_corrida");
  }

};