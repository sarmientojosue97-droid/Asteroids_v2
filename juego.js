

const lienzo_principal = document.getElementById('lienzo_principal');
const contexto_dibujo = lienzo_principal.getContext('2d');




//--- dinamica
const registro_teclas_precionadas  = {};

window.addEventListener('keydown', (evento) => {
    registro_teclas_precionadas[evento.code] = true;
})


window.addEventListener('keyup', (evento) => {
    registro_teclas_precionadas[evento.code] = false;
})






// ------- NAVES
class clase_molde_nave{

    constructor(){
        this.x = (lienzo_principal.width) /2;
        this.y = (lienzo_principal.height) / 2;
        this.angulo = (-Math.PI) / 2;
        this.radio = 15;

        this.velocidad_x = 0;
        this.velocidad_y = 0;
    }

    actulizar_logica(){

        //Rotar
        if(registro_teclas_precionadas['ArrowLeft']) this.angulo -= 0.05;
        if(registro_teclas_precionadas['ArrowRight']) this.angulo += 0.05;

        //adelante
        if(registro_teclas_precionadas['ArrowUp']){
            this.velocidad_x += (Math.cos(this.angulo)) * 0.15;
            this.velocidad_y += (Math.sin(this.angulo)) * 0.15;
        }

        this.velocidad_x *= 0.99;
        this.velocidad_y *= 0.99;

        this.x += this.velocidad_x;
        this.y += this.velocidad_y;

        if (this.x < 0)  this.x = lienzo_principal.width;
        if (this.x > lienzo_principal.width) this.x = 0;
        if (this.y < 0)  this.y = lienzo_principal.height;
        if (this.y > lienzo_principal.height) this.y = 0;
    }



    dibujar() {
        
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

        const angulo_aleatorio = Math.random() * Math.PI * 2;
        const velocidad_aletoria = Math.random() * 1.5 + 0.5;

        this.velocidad_x = Math.cos(angulo_aleatorio) * velocidad_aletoria;
        this.velocidad_y = Math.sin(angulo_aleatorio) * velocidad_aletoria;
    }


    actulizar_logica(){
            
        this.x += this.velocidad_x;
        this.y += this.velocidad_y;

        if (this.x < -this.radio)   this.x = lienzo_principal.width  + this.radio;
        if (this.x > lienzo_principal.width  + this.radio)  this.x = -this.radio;
        if (this.y < -this.radio)    this.y = lienzo_principal.height + this.radio;
        if (this.y > lienzo_principal.height + this.radio)  this.y = -this.radio;

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




function actulizar_logica_matematica(){
    nave_jugador.actulizar_logica();
    lista_asteroides_vivos.forEach(asteroide => asteroide.actulizar_logica());
}




function dibujar_fotograma_actual(){

    contexto_dibujo.clearRect(0, 0, lienzo_principal.width, lienzo_principal.height);

    lista_asteroides_vivos.forEach(asteroide => asteroide.dibujar());
    nave_jugador.dibujar();
}


function bucle_principal_juego(){
    actulizar_logica_matematica();
    dibujar_fotograma_actual();
    requestAnimationFrame(bucle_principal_juego);
}

requestAnimationFrame(bucle_principal_juego);