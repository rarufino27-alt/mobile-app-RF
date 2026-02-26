window.CreditService = {

  podeFicarOnline(){
    const creditos = DataManager.getCreditos();
    return creditos > 0;
  },

  descontarCorrida(valorCorrida){
    const taxa = valorCorrida * 0.15;
    DataManager.descontarCreditos(taxa);
  }

};