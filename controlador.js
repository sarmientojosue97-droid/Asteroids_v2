class Controlador_Juego{

    constructor(lienzo, elementos_Puntos){
        this.lienzo = lienzo;
        this.elementos_Puntos = elementos_Puntos;

        this.vista = new Vista_Juego(lienzo);

        this.modelo = new Modelo_Juego(lienzo.width, lienzo.height);
        this.vista  = new Vista_Juego(lienzo);

        this.teclas = {};
        this._registrar_Entrada();
    }

    _registrar_Entrada(){
        window.addEventListener('keydown', (evento) => {
            this.teclas[evento.code] = true;

            if (this.modelo.estado === 'GAMEOVER' && evento.code === 'Enter') {
                this.modelo.reiniciar();
            }
        });

        window.addEventListener('keyup', (evento) => {
            this.teclas[evento.code] = false;

            if (evento.code === 'Space' && this.modelo.estado === 'JUGANDO') {
                const nave = this.modelo.nave;

                this.modelo.disparos.push(new Modelo_Disparo(nave.x, nave.y, nave.angulo));
            }
        });
    }

    _actualizar_Logica(){

        if (this.modelo.estado !== 'JUGANDO') return;

        const m = this.modelo;

        m.nave.actualizar_Logica(this.teclas);
        m.disparos.forEach(d  => d.actualizar_Logica());
        m.asteroides.forEach(a => a.actualizar_Logica());
        m.disparos = m.disparos.filter(d => d.esta_vivo());
 
        this._detectar_Colisiones();
    }


    _detectar_Colisiones() {

        const m = this.modelo;

        for (let i = m.asteroides.length - 1; i >= 0; i--) {
            const ast = m.asteroides[i];
 
            const distancia_nave = Math.hypot(m.nave.x - ast.x, m.nave.y - ast.y);
            if (distancia_nave < m.nave.radio + ast.radio) {
                m.estado = 'GAMEOVER';
                return;
            }
 
            for (let j = m.disparos.length - 1; j >= 0; j--) {
                const dis = m.disparos[j];
                const distancia_disparo = Math.hypot(dis.x - ast.x, dis.y - ast.y);
 
                if (distancia_disparo < dis.radio + ast.radio) {
                    m.disparos.splice(j, 1);
                    m.asteroides.splice(i, 1);
                    m.puntos += 100;
 
                    if (m.asteroides.length === 0) {
                        for (let k = 0; k < 7; k++) {
                            m.asteroides.push(new Modelo_Asteroide(m.ancho, m.alto));
                        }
                    }
                    break;
                }
            }
        }
    }


    _actualizar_Vista(){
        this.vista.dibujar_Escena(this.modelo);
    }

    _actualizar_Puntuacion(){
        this.elementos_Puntos.textContent = this.puntos;
    }

    iniciar(){
        const bucle = () => {
            this._actualizar_Logica();
            this._actualizar_Vista();
            this._actualizar_Puntuacion();
            requestAnimationFrame(bucle);
        };
        requestAnimationFrame(bucle);
    }

}

const lienzo_principal = document.getElementById('lienzo_principal');
const texto_puntos = document.getElementById('texto_puntos');

const juego = new Controlador_Juego(lienzo_principal, texto_puntos);
juego.iniciar();