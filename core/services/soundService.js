window.SoundService = {

  sounds: {
    SEM_CREDITO: "../assets/sounds/sem-credito.mp3",
    CHAMADA: "../assets/sounds/notificacao.mp3",
    ACEITA: "../assets/sounds/viagem-aceita.mp3",
    CANCELADA: "../assets/sounds/viagem-cancelada (1).mp3",
    CREDITO: "../assets/sounds/credito-adicionado.mp3",
    MSG_PASSAGEIRO: "../assets/sounds/mensagem.mp3",
    MSG_APP: "../assets/sounds/mensagem1.mp3",
    ONLINE: "../assets/sounds/online.mp3",
    OFFLINE: "../assets/sounds/viagem-cancelada (1).mp3"
  },

  play(type){

    const src = this.sounds[type];

    if(!src){
      console.warn("Som não encontrado:", type);
      return;
    }

    const audio = new Audio(src);
    audio.volume = 1;

    audio.play().catch(err=>{
      console.log("Autoplay bloqueado:", err);
    });
  }

};