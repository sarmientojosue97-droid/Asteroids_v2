class Sonidos_Juego {
 
    constructor() {

        this.estudio_de_audio= null;
    }
 
    _asegurar_Contexto() {
        if (!this.estudio_de_audio) {
            this.estudio_de_audio = new AudioContext();
        }
    }
 
    disparo() {
        this._asegurar_Contexto();
 
        const oscilador = this.estudio_de_audio.createOscillator();
        const volumen = this.estudio_de_audio.createGain();
 
        oscilador.connect(volumen);
        volumen.connect(this.estudio_de_audio.destination);
 
        oscilador.frequency.value = 880;
 

        volumen.gain.setValueAtTime(5, this.estudio_de_audio.currentTime);
        volumen.gain.exponentialRampToValueAtTime(0.001, this.estudio_de_audio.currentTime + 0.1);
 
        oscilador.start();
        oscilador.stop(this.estudio_de_audio.currentTime + 0.1);
    }
 

    explosion() {
        this._asegurar_Contexto();
 
        const oscilador = this.estudio_de_audio.createOscillator();
        const volumen = this.estudio_de_audio.createGain();
 
        oscilador.connect(volumen);
        volumen.connect(this.estudio_de_audio.destination);
 
        oscilador.frequency.value = 150;
 
        volumen.gain.setValueAtTime(7, this.estudio_de_audio.currentTime);
        volumen.gain.exponentialRampToValueAtTime(0.001, this.estudio_de_audio.currentTime+ 0.1);
        oscilador.start();
        oscilador.stop(this.estudio_de_audio.currentTime + 0.1);
    }
 

    game_over() {
        this._asegurar_Contexto();

        const notas =[440, 330, 220];
 
        notas.forEach((frecuencia, indice) => {
            const oscilador= this.estudio_de_audio.createOscillator();
            const volumen = this.estudio_de_audio.createGain();
 
            oscilador.connect(volumen);
            volumen.connect(this.estudio_de_audio.destination);
 
            oscilador.frequency.value = frecuencia;
 
            const cuando = this.estudio_de_audio.currentTime +indice * 0.35;
 
            volumen.gain.setValueAtTime(4, cuando);
            volumen.gain.exponentialRampToValueAtTime(0.001, cuando + 1);
 
            oscilador.start(cuando);
            oscilador.stop(cuando + 1);
        });
    }
}
