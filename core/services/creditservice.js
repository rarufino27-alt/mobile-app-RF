const CreditService = {

  podeFicarOnline(){
    return DataManager.getCreditos() > 0;
  }

};