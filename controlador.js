

const lienzo_principal = document.getElementById('lienzo_principal');
const texto_puntos= document.getElementById('texto_puntos');

class Controlador_Juego {

    constructor(lienzo, elementos_Puntos) {
        this.lienzo= lienzo;
        this.elementos_Puntos = elementos_Puntos;

        this.modelo = new Modelo_Juego(lienzo.width, lienzo.height);
        this.vista = new Vista_Juego(lienzo);
        this.sonidos = new Sonidos_Juego();

        this.base_de_datos = new PouchDB('asteroids_db');

        this.teclas = {};
        this.registrar_Entrada();
        this.modelo.iniciar();
    }

    async guardar_y_Cargar_Puntajes() {
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
            console.error('Error con la base de datos:', error);
        }
    }


    registrar_Entrada() {
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


    actualizar_Logica() {
        if (this.modelo.estado !== 'JUGANDO') return;

        const m = this.modelo;

        m.nave.actualizar_Logica(this.teclas);
        m.disparos.forEach(d=> d.actualizar_Logica());
        m.asteroides.forEach(a => a.actualizar_Logica());
        m.disparos = m.disparos.filter(d => d.esta_vivo());

        this.   detectar_Colisiones();
    }

    detectar_Colisiones() {
        const m = this.modelo;

        for (let i = m.asteroides.length - 1; i >= 0; i--) {
            const ast = m.asteroides[i];

            if (!m.nave.es_invulnerable) {
                const dist_nave = Math.hypot(m.nave.x - ast.x, m.nave.y - ast.y);
                if (dist_nave < m.nave.radio + ast.radio) {
                    m.estado = 'GAMEOVER';
                    this.sonidos.game_over();

                    this.guardar_y_Cargar_Puntajes();
                    return;
                }
            }

            for (let j = m.disparos.length - 1; j >= 0; j--) {
                const dis = m.disparos[j];
                const dist_disparo = Math.hypot(dis.x - ast.x, dis.y - ast.y);

                if (dist_disparo < dis.radio + ast.radio) {
                    m.disparos.splice(j, 1);
                    m.asteroides.splice(i, 1);
                    m.puntos += 100;

                    this.sonidos.explosion();

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

    actualizar_Vista() {
        this.vista.dibujar_Escena(this.modelo);
    }

    actualizar_Puntuacion() {
        this.elementos_Puntos.textContent = this.modelo.puntos;
    }


    iniciar() {
        const bucle = () => {
            this.actualizar_Logica();
            this.actualizar_Vista();
            this.actualizar_Puntuacion();
            requestAnimationFrame(bucle);
        };
        requestAnimationFrame(bucle);
    }
}

const juego = new Controlador_Juego(lienzo_principal, texto_puntos);
juego.iniciar();
