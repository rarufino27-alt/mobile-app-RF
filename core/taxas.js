const Taxas = {

noturno(base){

const agora = new Date();
const hora = agora.getHours() + agora.getMinutes()/60;

if(hora >= 22.5 || hora <= 5){

if(base <= 24.99){
return {
nome:"Adicional Noturno",
valor:4.99
};
}

return {
nome:"Adicional Noturno",
valor: base * 0.35
};

}

return null;

},

desvio(ativo){

if(!ativo) return null;

return {
nome:"Desvio de rota",
valor:5.00
};

},

mercado(ativo){

if(!ativo) return null;

return {
nome:"Saída mercado",
valor:3.89
};

},

praia(destino){

const praias = ["Gaibu","Calhetas","Itapuama","Enseada"];

const dia = new Date().getDay();

if(praias.includes(destino) && (dia === 0 || dia === 6)){

return {
nome:"Saída de praia",
valor:10.00
};

}

return null;

},

categoria(mult,base){

if(mult === 1) return null;

return {
nome:"6 Lugares",
valor: base * 0.5
};

}

};