class Sonidos_Juego {
 
    constructor() {

        this.ctx_audio = null;
    }
 
    _asegurar_Contexto() {
        if (!this.ctx_audio) {
            this.ctx_audio = new AudioContext();
        }
    }
 

    disparo() {
        this._asegurar_Contexto();
 
        const oscilador = this.ctx_audio.createOscillator();
        const volumen   = this.ctx_audio.createGain();
 
        oscilador.connect(volumen);
        volumen.connect(this.ctx_audio.destination);
 
        oscilador.frequency.value = 880;
 

        volumen.gain.setValueAtTime(0.25, this.ctx_audio.currentTime);
        volumen.gain.exponentialRampToValueAtTime(0.001, this.ctx_audio.currentTime + 0.1);
 
        oscilador.start();
        oscilador.stop(this.ctx_audio.currentTime + 0.1);
    }
 

    explosion() {
        this._asegurar_Contexto();
 

        const cantidad_muestras = Math.floor(this.ctx_audio.sampleRate * 0.2);
 
 
        const buffer = this.ctx_audio.createBuffer(
            1,                          
            cantidad_muestras,
            this.ctx_audio.sampleRate
        );

        const datos = buffer.getChannelData(0);
        for (let i = 0; i < cantidad_muestras; i++) {
            datos[i] = Math.random() * 2 - 1;
        }
 
        const fuente  = this.ctx_audio.createBufferSource();
        fuente.buffer = buffer;
 
        const volumen = this.ctx_audio.createGain();
        volumen.gain.setValueAtTime(0.4, this.ctx_audio.currentTime);
        volumen.gain.exponentialRampToValueAtTime(0.001, this.ctx_audio.currentTime + 0.2);
 
        fuente.connect(volumen);
        volumen.connect(this.ctx_audio.destination);
        fuente.start();
    }
 

    game_over() {
        this._asegurar_Contexto();
 

        const notas = [440, 330, 220];
 
        notas.forEach((frecuencia, indice) => {
            const oscilador = this.ctx_audio.createOscillator();
            const volumen   = this.ctx_audio.createGain();
 
            oscilador.connect(volumen);
            volumen.connect(this.ctx_audio.destination);
 
            oscilador.frequency.value = frecuencia;
 

            const cuando = this.ctx_audio.currentTime + indice * 0.35;
 
            volumen.gain.setValueAtTime(0.3, cuando);
            volumen.gain.exponentialRampToValueAtTime(0.001, cuando + 0.3);
 
            oscilador.start(cuando);
            oscilador.stop(cuando + 0.35);
        });
    }
}
