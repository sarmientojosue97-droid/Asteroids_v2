
const lienzo_principal =document.getElementById('lienzo_principal');
const ver_puntos = document.getElementById('texto_puntos');

class controlador_juego {

    constructor(lienzo, elementos_Puntos) {
        this.lienzo= lienzo;
        this.elementos_Puntos = elementos_Puntos;

        this.modelo = new Modelo_Juego(lienzo.width, lienzo.height);
        this.vista = new Vista_Juego(lienzo);
        this.sonidos = new Sonidos_Juego();

        this.base_de_datos = new PouchDB('asteroids_db');

        this.teclas = {};
        this.registrar_entrada();
        this.modelo.iniciar();
    }

    async guardar_cargar_puntajes () {
        try {
            const nuevo_registro = {
                _id: new Date().toISOString(), 
                puntaje: this.modelo.puntos,
                fecha: new Date().toLocaleDateString()
            };

            await this.base_de_datos.put(nuevo_registro);

            const resultado = await this.base_de_datos.allDocs({ include_docs: true });
            const todos_los_puntajes = resultado.rows.map(fila => fila.doc);
            
            todos_los_puntajes.sort((a, b) => b.puntaje - a.puntaje);
            this.modelo.top_puntajes = todos_los_puntajes.slice(0, 4);

        } catch (error) {
            console.error('erorr con la base de datos:', error);
        }
    }

    registrar_entrada() {
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
                
                this.sonidos.disparo();
            }
        });
    }


    actualizar_logica() {
        if (this.modelo.estado !== 'JUGANDO') return;

        const mi_caijta= this.modelo;

        mi_caijta.nave.actualizar_logica(this.teclas);
        mi_caijta.disparos.forEach(d=> d.actualizar_logica());
        mi_caijta.asteroides.forEach(a => a.actualizar_logica());
        mi_caijta.disparos = mi_caijta.disparos.filter(d => d.esta_vivo());

        this.detectar_Colisiones();
    }

    detectar_Colisiones() {
        const mi_caijta=this.modelo;

        for (let i = mi_caijta.asteroides.length - 1; i >= 0; i--) {
            const ast = mi_caijta.asteroides[i];

            if (!mi_caijta.nave.es_invulnerable) {
                const dist_nave = Math.hypot(mi_caijta.nave.x - ast.x, mi_caijta.nave.y - ast.y);
                if (dist_nave < mi_caijta.nave.radio + ast.radio) {
                    mi_caijta.estado = 'GAMEOVER';
                    this.sonidos.game_over();

                    this.guardar_cargar_puntajes();
                    return;
                }
            }

            for (let j = mi_caijta.disparos.length - 1; j >= 0; j--) {
                const dis = mi_caijta.disparos[j];
                const dist_disparo = Math.hypot(dis.x - ast.x, dis.y - ast.y);

                if (dist_disparo < dis.radio + ast.radio) {
                    mi_caijta.disparos.splice(j, 1);
                    mi_caijta.asteroides.splice(i, 1);
                    mi_caijta.puntos += 100;

                    this.sonidos.explosion();

                    if (mi_caijta.asteroides.length === 0) {
                        for (let k = 0; k < 7; k++) {
                            mi_caijta.asteroides.push(new Modelo_Asteroide(mi_caijta.ancho, mi_caijta.alto));
                        }
                    }
                    break;
                }
            }
        }
    }

    actualizar_Vista() {
        this.vista.dibujar_Escena(this.modelo);
    }

    actualizar_Puntuacion() {
        this.elementos_Puntos.textContent = this.modelo.puntos;
    }

    iniciar() {
        const bucle = () => {
            this.actualizar_logica();
            this.actualizar_Vista();
            this.actualizar_Puntuacion();
            requestAnimationFrame(bucle);
        };
        requestAnimationFrame(bucle);
    }
}

const juego = new controlador_juego (lienzo_principal, ver_puntos);
juego.iniciar();