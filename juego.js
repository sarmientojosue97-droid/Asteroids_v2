

const lienzo_principal = document.getElementById('lienzo_principal');
const contexto_dibujo = lienzo_principal.getContext('2d');

function dibujar_fotograma_actual(){

    contexto_dibujo.clearRect(0, 0, lienzo_principal.width, lienzo_principal.height);

    contexto_dibujo.fillStyle = 'white';
    contexto_dibujo.font      = '28px Courier New';
    contexto_dibujo.fillText('Canvas conectado correctamente.', 100, 280);
    contexto_dibujo.font      = '18px Courier New';
    contexto_dibujo.fillStyle = '#aaa';
    contexto_dibujo.fillText('HTML CSS JS.', 270, 330);
}


function bucle_principal_juego(){
    dibujar_fotograma_actual();
    requestAnimationFrame(bucle_principal_juego);
}

requestAnimationFrame(bucle_principal_juego);