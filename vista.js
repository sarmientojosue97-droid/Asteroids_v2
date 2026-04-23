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

    dibujar_Cargando(){
        this.ctx.textAlign = 'center';

        this.ctx.fillStyle = 'white';
        this.ctx.font = '26px Courier New';
        this.ctx.fillText('CARGANDO...', this.lienzo.width / 2, 280);

        this.ctx.fillStyle = '#666'
        this.ctx.font = '14px Courier New'
        this.ctx.fillText('(simulando carga de recursos 2 segundos)', this.lienzo.width / 2, 320);

        this.ctx.textAlign = 'left';
    }

    dibujar_GameOver(puntos, top_puntajes) {
        this.ctx.textAlign = 'center';
        const cx = this.lienzo.width / 2;

        this.ctx.fillStyle = 'red';
        this.ctx.font = '50px Courier New';
        this.ctx.fillText('GAME OVER', cx, 250);
 
        this.ctx.fillStyle = 'white';
        this.ctx.font = '22px Courier New';
        this.ctx.fillText('Puntaje: ' + puntos, cx, 205)
        
        this.ctx.strokeStyle = '#444';
        this.ctx.lineWidth   = 1;
        this.ctx.beginPath();
        this.ctx.moveTo(cx - 180, 225);
        this.ctx.lineTo(cx + 180, 225);
        this.ctx.stroke();

        this.ctx.fillStyle = '#FFD700'; // dorado
        this.ctx.font = '16px Courier New';
        this.ctx.fillText('TOP 4 PUNTAJES', cx, 252);


        if (top_puntajes.length === 0) {

            this.ctx.fillStyle = '#666';
            this.ctx.font      = '14px Courier New';
            this.ctx.fillText('(sin partidas anteriores)', cx, 280);
        } else {
            top_puntajes.forEach((registro, indice) => {
                const y = 278 + indice * 26;
 
                this.ctx.fillStyle = indice === 0 ? '#FFD700' : '#aaa';
                this.ctx.font      = '15px Courier New';
                this.ctx.fillText(
                    (indice + 1) + '.   ' + registro.puntaje + ' pts   ' + registro.fecha, cx, y );
            });
        }
 
        this.ctx.fillStyle = 'white';
        this.ctx.font      = '16px Courier New';
        this.ctx.fillText('presiona ENTER para seguir jugando', cx, 400);
 
        this.ctx.textAlign = 'left';

    }
 
    dibujar_Escena(modelo) {
        this.limpiar_Lienzo();

        if(modelo.estado == 'CARANDO'){
            this.dibujar_Cargando();
            return;
        }
 
        modelo.asteroides.forEach(a => this.dibujar_Asteroide(a));
        modelo.disparos.forEach(d => this.dibujar_Disparo(d));
 
        if (modelo.estado === 'JUGANDO') {
            this.dibujar_Nave(modelo.nave);
 
        } else if (modelo.estado === 'GAMEOVER') {
            this.dibujar_GameOver(modelo.puntos, modelo.top_puntajes);
        }
    }
}