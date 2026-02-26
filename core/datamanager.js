window.DataManager = {

  /* =========================
     CRÉDITOS
  ========================== */

  getCreditos(){
    return parseFloat(localStorage.getItem("rf_creditos")) || 0;
  },

  setCreditos(valor){
    localStorage.setItem("rf_creditos", parseFloat(valor));
  },

  adicionarCreditos(valor){
    let atual = this.getCreditos();
    this.setCreditos(atual + parseFloat(valor));
  },

  descontarCreditos(valor){
    let atual = this.getCreditos();
    this.setCreditos(atual - parseFloat(valor));
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
    localStorage.setItem("rf_ganhos_dia", atual + parseFloat(valor));
  },

  getGanhosHoje(){
    return parseFloat(localStorage.getItem("rf_ganhos_dia")) || 0;
  }

};