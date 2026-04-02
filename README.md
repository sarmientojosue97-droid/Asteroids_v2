# proyecto asteroids

## arquitectura del Proyecto

Para mantener el código ordenado y evitar el "código espagueti", decidí estructurar el juego basándome en el patrón clásico de *Game Loop* y Programación Orientada a Objetos. 

El elenco principal del juego se divide en **3 clases fundamentales**:
1. `clase_molde_nave`: Controla a nuestro jugador, su rotación, la inercia espacial y su estado de invulnerabilidad temporal.
2. `clase_molde_asteroide`: Maneja a los enemigos, generándolos en posiciones aleatorias de los bordes con direcciones vectoriales impredecibles.
3. `clase_molde_disparo`: Gestiona los proyectiles. 

**¿Cómo funciona el disparo?**
Para que la mecánica se sienta natural, el disparo nace exactamente de las coordenadas actuales de la `nave` (`this.x`, `this.y`) y hereda su `angulo`. A partir de ahí, el disparo calcula su propia trayectoria independiente usando trigonometría.

## matemáticas y Motor de Físicas

Al no usar un motor gráfico, tuve que programar las físicas a mano usando el objeto `Math` nativo de JavaScript:

* **Movimiento e Inercia:** Utilizo `Math.cos()` y `Math.sin()` para convertir el ángulo de rotación de la nave y los asteroides en velocidad direccional (ejes X e Y).
* **Sistema de Colisiones:** En lugar de usar complejas cajas de colisión (Hitboxes cuadradas), opté por **colisiones circulares**. Utilizo la función `Math.hypot()` para calcular la distancia exacta entre el centro de dos objetos (ej. la nave y un asteroide). Si esa distancia es menor a la suma de sus radios, ¡boom!, detectamos el impacto.

## el Director de Orquesta (Game Loop)

El corazón del juego está controlado por `requestAnimationFrame()`. Esta función nativa crea un bucle infinito que corre a 60 FPS (fotogramas por segundo) y hace tres cosas en orden estricto:
1. **Limpiar:** Usa `clearRect()` en el Canvas API para borrar el rastro del fotograma anterior.
2. **Actualizar:** Llama a la lógica matemática para mover coordenadas y revisar colisiones.
3. **Dibujar:** Pinta a los objetos en sus nuevas posiciones.

## Requisitos Académicos Cumplidos (Asincronía)

Para cumplir con los retos de la materia, integré operaciones asíncronas de la siguiente manera:
* **Macrotareas (`setTimeout`):** Implementado para el escudo de invulnerabilidad de la nave al reaparecer (dura exactamente 3 segundos antes de apagarse).
* **Promesas (`Promise`):** Creadas para simular y manejar la carga segura de recursos iniciales antes de permitir que el juego comience.
* **Base de Datos Local (`PouchDB`):** Integrado de forma asíncrona (`async/await`) para guardar el registro final del puntaje y la fecha exacta cada vez que el jugador pierde (Game Over), todo almacenado directamente en el navegador del cliente.
