class Controlador_Juego{

    constructor(lienzo, elementos_Puntos){
        this.lienzo = lienzo;
        this.elementos_Puntos = elementos_Puntos;

        this.vista = new Vista_Juego(lienzo);

        this.nave = new Modelo_Nave(lienzo.width, lienzo.height);
        this.asteroides = [];
        this.disparos = [];
        this.puntos = 0;

        for(let i = 0; i < 5; i++){
            this.asteroides.push(new Modelo_Asteroide(lienzo.width, lienzo.height));
        }

        this.teclas = {};
        this._registrar_Entrada();
    }

    _registrar_Entrada(){
        window.addEventListener('keydown', (evento) => {
            this.teclas[evento.code] = true;
        });

        window.addEventListener('keyup', (evento) => {
            this.teclas[evento.code] = false;

            if(evento.code === 'Space'){
                this.disparos.push(new Modelo_Disparo(this.nave.x, this.nave.y, this.nave.angulo));
            }
        });
    }

    _actualizar_Logica(){

        this.nave.actualizar_Logica(this.teclas);

        this.disparos.forEach(d => d.actualizar_Logica());
        this.asteroides.forEach(a => a.actualizar_Logica());
        this.disparos = this.disparos.filter(d => d.esta_vivo());

        this._detectar_Colisiones();
    }


    _detectar_Colisiones() {
        for (let i = this.asteroides.length - 1; i >= 0; i--) {
            const ast = this.asteroides[i];
 
            for (let j = this.disparos.length - 1; j >= 0; j--) {
                const dis = this.disparos[j];
 
                const distancia = Math.hypot(dis.x - ast.x, dis.y - ast.y);
 
                if (distancia < dis.radio + ast.radio) {
                    this.disparos.splice(j, 1); 
                    this.asteroides.splice(i, 1);
 
                    this.puntos += 100;
 
                    if (this.asteroides.length === 0) {
                        for (let k = 0; k < 7; k++) {
                            this.asteroides.push(
                                new Modelo_Asteroide(this.lienzo.width, this.lienzo.height)
                            );
                        }
                    }
 
                    break;
                }
            }
        }
    }


    _actualizar_Vista(){
        this.vista.dibujar_Escena(this.nave, this.asteroides, this.disparos);
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