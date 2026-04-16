

class Modelo_Nave {

    constructor(ancho_Lienzo, alto_Lienzo) { 
        this.ancho_Lienzo = ancho_Lienzo;
        this.alto_Lienzo  = alto_Lienzo;

        this.x           = ancho_Lienzo / 2;
        this.y           = alto_Lienzo / 2;
        this.angulo      = (- Math.PI) / 2;
        this.radio       = 15;
        this.velocidad_x = 0;
        this.velocidad_y = 0;
    }

    actualizar_Logica(teclas) {

        if(teclas['ArrowLeft']) this.angulo -= 0.05;
        if(teclas['ArrowRight']) this.angulo += 0.05;

        if(teclas['ArrowUp']){
            this.velocidad_x += Math.cos(this.angulo) * 0.15;
            this.velocidad_y += Math.sin(this.angulo) * 0.15;
        }

        this.velocidad_x *= 0.99;
        this.velocidad_y *= 0.99;

        this.x += this.velocidad_x;
        this.y += this.velocidad_y;

        if (this.x < 0)                 this.x = this.ancho_Lienzo;
        if (this.x > this.ancho_Lienzo)  this.x = 0;
        if (this.y < 0)                 this.y = this.alto_Lienzo;
        if (this.y > this.alto_Lienzo)   this.y = 0;

        }
}   

class Modelo_Asteroide{

    constructor(ancho_Lienzo, alto_Lienzo){
        
        this.ancho_Lienzo = ancho_Lienzo;
        this.alto_Lienzo = alto_Lienzo;

        this.x = Math.random() < 0.5 ? 80 : ancho_Lienzo - 80;
        this.y = Math.random() * alto_Lienzo;
        this.radio = Math.random() * 20 + 20;
        
        const angulo_Aleatorio = Math.random() * Math.PI * 2;
        const velocidad_Aleatorio = Math.random() * 1.5 + 0.5;

        this.velocidad_x = Math.cos(angulo_Aleatorio) * velocidad_Aleatorio;
        this.velocidad_y = Math.sin(angulo_Aleatorio) * velocidad_Aleatorio;
    }


    actualizar_Logica() {
        this.x += this.velocidad_x;
        this.y += this.velocidad_y;

        if (this.x < -this.radio)                    this.x = this.ancho_Lienzo + this.radio;
        if (this.x > this.ancho_Lienzo + this.radio)  this.x = -this.radio;
        if (this.y < -this.radio)                    this.y = this.alto_Lienzo  + this.radio;
        if (this.y > this.alto_Lienzo  + this.radio)  this.y = -this.radio;
    }
    
}

class Modelo_Disparo{

    constructor(x_Origen, y_Origen, angulo_Origen){
        this.x = x_Origen;
        this.y = y_Origen;

        this.velocidad_x = Math.cos(angulo_Origen) * 7;
        this.velocidad_y = Math.sin(angulo_Origen) * 7;
        
        this.radio = 3;
        this.tiempo_Vida = 60;
    }

    actualizar_Logica(){
        this.x += this.velocidad_x;
        this.y += this.velocidad_y;
        this.tiempo_Vida--;
    }

    esta_vivo(){
        return this.tiempo_Vida;
    }
}
