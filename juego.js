

const lienzo_principal = document.getElementById('lienzo_principal');
const contexto_dibujo = lienzo_principal.getContext('2d');



// ------- NAVES
class clase_molde_nave{

    constructor(){
        this.x = (lienzo_principal.width) /2;
        this.y = (lienzo_principal.height) / 2;
        this.angulo = (-Math.PI) / 2;
        this.radio = 15;
    }

    dibujar(){
        
        contexto_dibujo.save();

        // lo preparamos
        contexto_dibujo.translate(this.x, this.y);
        contexto_dibujo.rotate(this.angulo);

        // lo dibujamos la nave
        contexto_dibujo.beginPath();
        contexto_dibujo.moveTo(20, 0);
        contexto_dibujo.lineTo(-15, 15);
        contexto_dibujo.lineTo(-15, -15);
        contexto_dibujo.closePath();

        //le damos estilo
        contexto_dibujo.strokeStyle = 'white';
        contexto_dibujo.lineWidth = 2;
        contexto_dibujo.stroke();

        contexto_dibujo.restore();

    }
}


// ------- ASteroides
class clase_molde_asteroides{
    
    constructor(){
        this.x = Math.random() < 0.5 ? 80 : (lienzo_principal.width) - 80;
        this.y = Math.random() * lienzo_principal.height;
        this.radio = Math.random() * 20 + 20;
    }

    dibujar(){
        contexto_dibujo.beginPath();
        contexto_dibujo.arc(this.x, this.y, this.radio, 0, Math.PI * 2);
        contexto_dibujo.strokeStyle = 'white';
        contexto_dibujo.stroke();
    }
}





// ---- hacemos correr
const nave_jugador = new clase_molde_nave();
const lista_asteroides_vivos = [];

for(let i = 0; i < 5; i++){
    lista_asteroides_vivos.push(new clase_molde_asteroides());
}







function dibujar_fotograma_actual(){

    contexto_dibujo.clearRect(0, 0, lienzo_principal.width, lienzo_principal.height);

    lista_asteroides_vivos.forEach(asteroide => asteroide.dibujar());
    nave_jugador.dibujar();
}


function bucle_principal_juego(){
    dibujar_fotograma_actual();
    requestAnimationFrame(bucle_principal_juego);
}

requestAnimationFrame(bucle_principal_juego);