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

    dibujar_GameOver(puntos) {

        this.ctx.fillStyle = 'red';
        this.ctx.font      = '50px Courier New';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('GAME OVER', this.lienzo.width / 2, 250);
 
        this.ctx.fillStyle = 'white';
        this.ctx.font      = '24px Courier New';
        this.ctx.fillText('Puntaje final: ' + puntos, this.lienzo.width / 2, 295);
 
        this.ctx.font = '18px Courier New';
        this.ctx.fillText('Presiona ENTER para reiniciar', this.lienzo.width / 2, 330);
 
        this.ctx.textAlign = 'left';
    }
 
    dibujar_Escena(modelo) {
        this.limpiar_Lienzo();
 
        modelo.asteroides.forEach(a => this.dibujar_Asteroide(a));
        modelo.disparos.forEach(d   => this.dibujar_Disparo(d));
 
        if (modelo.estado === 'JUGANDO') {
            this.dibujar_Nave(modelo.nave);
 
        } else if (modelo.estado === 'GAMEOVER') {
            this.dibujar_GameOver(modelo.puntos);
        }
    }
}