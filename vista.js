class Vista_Juego{

    constructor(lienzo){
        this.lienzo = lienzo;
        this.ctx = lienzo.getContext('2d');
    }

    limpiar_Lienzo(){
        this.ctx.clearRect(0,0, this.lienzo.width, this.lienzo.height);
    }

        dibujar_Nave(modelo) {
        this.ctx.save();
        this.ctx.translate(modelo.x, modelo.y);
        this.ctx.rotate(modelo.angulo);

        this.ctx.beginPath();
        this.ctx.moveTo(20, 0);
        this.ctx.lineTo(-15, 15);
        this.ctx.lineTo(-15, -15);
        this.ctx.closePath();

        this.ctx.strokeStyle = 'white';
        this.ctx.lineWidth   = 2;
        this.ctx.stroke();

        this.ctx.restore();
    }

    dibujar_Asteroide(modelo) {
        this.ctx.beginPath();
        this.ctx.arc(modelo.x, modelo.y, modelo.radio, 0, Math.PI * 2);
        this.ctx.strokeStyle = 'white';
        this.ctx.stroke();
    }

    dibujar_Disparo(modelo) {
        this.ctx.beginPath();
        this.ctx.arc(modelo.x, modelo.y, modelo.radio, 0, Math.PI * 2);
        this.ctx.fillStyle = 'yellow';
        this.ctx.fill();
    }

    dibujar_Escena(nave, asteroides, disparos) {
        this.limpiar_Lienzo();
        asteroides.forEach(a => this.dibujar_Asteroide(a));
        disparos.forEach(d   => this.dibujar_Disparo(d));
        this.dibujar_Nave(nave);
    }
}