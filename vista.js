class Vista_Juego{

    constructor(lienzo){
        this.lienzo = lienzo;
        this.ctx= lienzo.getContext('2d');
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

        this.ctx.strokeStyle = modelo.es_invulnerable ? 'cyan' : 'white';
        this.ctx.lineWidth = 2;
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

    dibujar_GameOver(puntos, top_puntajes) {
        this.ctx.textAlign = 'center';
        const cx = this.lienzo.width / 2;

        this.ctx.fillStyle = 'white';
        this.ctx.font = '50px Courier New';
        this.ctx.fillText('game over', cx, 100);
 
        this.ctx.fillStyle = 'white';
        this.ctx.font ='22px Courier New';
        this.ctx.fillText('puntaje: ' + puntos, cx, 230)
        
        this.ctx.font = '16px Courier New';
        this.ctx.fillText('mejores puntajes', cx, 290);
 
        if (top_puntajes.length === 0) {
            this.ctx.fillStyle = '#666';
            this.ctx.fillText('sin partidas anteriores', cx, 320);
        } else {
            top_puntajes.forEach((registro, indice) => {
                this.ctx.fillStyle = 'white';
                this.ctx.fillText( (indice + 1) + '. ' + registro.puntaje, cx, 320 + indice * 28 );
            });
        }

        this.ctx.fillStyle = 'white';
        this.ctx.font= '16px Courier New';
        this.ctx.fillText('presiona ENTER para seguir jugando', cx, 400);

        this.ctx.textAlign = 'left';

    }
 
    dibujar_Escena(modelo) {
        this.limpiar_Lienzo();

        modelo.asteroides.forEach(a => this.dibujar_Asteroide(a));
        modelo.disparos.forEach(d => this.dibujar_Disparo(d));
 
        if (modelo.estado === 'JUGANDO') {
            this.dibujar_Nave(modelo.nave);
 
        } else if (modelo.estado === 'GAMEOVER') {
            this.dibujar_GameOver(modelo.puntos,modelo.top_puntajes);
        }
    }
}