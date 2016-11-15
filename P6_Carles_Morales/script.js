/**
 * Created by Carles on 18/10/2016.
 */
$(document).ready(function() {
    // Creación de la pala
    var Pala = function(x_start, y_end){
        this.color_pala = "#336699";
        this.position = {x:x_start, y:canvas.height/2-10};
        this.size = {w:3, h:20};
        this.y_end = y_end;
    };

    Pala.prototype.render = function(ctx){
        ctx.fillStyle = this.color_pala;
        ctx.fillRect(   this.position.x,
                        this.position.y,
                        this.size.w,
                        this.size.h);
    };

    Pala.prototype.goUp = function(){
        if (this.position.y >= 5) this.position.y -= 5;
    };

    Pala.prototype.goDown = function(){
        if (this.position.y+this.size.h+5 <= this.y_end) this.position.y += 5;
    };

    Pala.prototype.setKeys = function(keyUp, keyDown){
        var _this = this;
        $(window).keydown(function(event) {
            // console.log("Key pressed is: " + event.which);  Para saber el numero al que corresponde cada tecla
            if (event.which == keyUp) {
                _this.goUp();
            } else if (event.which == keyDown){
                _this.goDown();
            }
        });
    }

    // Creación de la bola
    var Bola = function(start_pos_x, start_pos_y, angle){
        this.position = {x:start_pos_x, y:start_pos_y};
        this.color_bola = "#FF0000";
        this.radio = 2;
        this.angle =  angle;
        this.velocidad = 2;
    }

    Bola.prototype.render = function(ctx){
        ctx.beginPath();
        ctx.fillStyle = this.color_bola;
        ctx.arc(this.position.x, this.position.y, this.radio, 0, 2 * Math.PI, false);
        ctx.fill();
    }

    // Declaración del canvas
    var canvas = document.getElementById("mycanvas");
    var ctx = canvas.getContext("2d");

    // Declaración de las palas
    var pala_L = new Pala(10, canvas.height);
    var pala_R = new Pala(canvas.width-10, canvas.height);

    // Asignación de teclas a las palas
    pala_L.setKeys(87,83); // Keys: Q, A
    //pala_R.setKeys(38,40); // Keys: Flecha arriba, Flecha abajo

    // Declaración de la bola
    var bola = new Bola(canvas.width/2, canvas.height/2, 70);

    // Declaración y carga de las imagenes
    var img1= new Image();
    img1.src = 'http://vignette3.wikia.nocookie.net/chelsea/images/2/21/Escudo_Barcelona.png/revision/latest?cb=20140117171620&path-prefix=es';
    var img2= new Image();
    img2.src = 'http://vignette2.wikia.nocookie.net/realmadrid/images/a/a2/Escudo.png/revision/latest?cb=20071129200831';

    // Inicialización de los marcadores
    var playerL = 0;
    var playerR = 0;

    // Función para actualizar el movimiento de la bola
    function updateBola() {

        // Rebote con pared de arriba
        if (bola.position.y < 0) {
            bola.position.y = 0;
            bola.angle = (Math.PI / 180.0) - bola.angle;

        // Rebote con pared de abajo
        } else if (bola.position.y + bola.radio > canvas.height) {
            bola.position.y = canvas.height - bola.radio;
            bola.angle = (Math.PI / 180.0) - bola.angle;
        }

        // Rebote con raqueta izquierda
        if ((bola.position.x > pala_L.position.x)&&(bola.position.x < pala_L.position.x+pala_L.size.w) &&
            (bola.position.y+bola.radio > pala_L.position.y)&&(bola.position.y < pala_L.position.y+pala_L.size.h)){
            var newAngle = (bola.position.y + bola.radio/2) - (pala_L.position.y + pala_L.size.h/2);
            newAngle /= pala_L.size.h/2 + bola.radio/2;
            bola.angle = Math.PI/180 * (80*newAngle);

         // Rebote con raqueta derecha
        } else if ((bola.position.x+bola.radio < pala_R.position.x+pala_R.size.w) &&
            (bola.position.x+bola.radio > pala_R.position.x) &&
            (bola.position.y+bola.radio > pala_R.position.y) &&
            (bola.position.y < pala_R.position.y+pala_R.size.h)){
            var newAngle = (pala_R.position.y + pala_R.size.h/2) - (bola.position.y + bola.radio/2);
            newAngle /= pala_R.size.h/2 + bola.radio/2;
            bola.angle = Math.PI/180 * (180 + 80*newAngle);
        }

        // Asignación de la pala derecha para que juegue de forma autonoma
        var dificultad = 0.3;
        pala_R.position.y += (bola.position.y + bola.radio/2 - pala_R.position.y - pala_R.size.h/2) * dificultad;

        if (pala_R.position.y < 0) {
            pala_R.position.y = 0;
        }
        else if (pala_R.position.y + pala_R.position.h > canvas.height) {
            pala_R.position.y = canvas.height - pala_R.size.h;
        }

        // Si se ha marcado un gol devolvemos la bola al centro y cambiamos el marcador
        if (bola.position.x + bola.radio < 0){
            cambiaMarcador('R');
            bola = new Bola(canvas.width/2, canvas.height/2, 70);
        } else if (bola.position.x > canvas.width){
            cambiaMarcador('L');
            bola = new Bola(canvas.width/2, canvas.height/2, 15);
        }

        // Movimiento que debe seguir la bola y velocidad
        bola.position.x += bola.velocidad * Math.cos(bola.angle);
        bola.position.y += bola.velocidad * Math.sin(bola.angle);
    }

    // Función para actualizar los marcadores
    function cambiaMarcador(equipo){
        if (equipo == 'R') {
            playerR ++;
        } else {
            playerL ++;
        }
    }

    function renderCampo(ctx){
        // Campo
        ctx.fillStyle = "#000";
        ctx.fillRect(0,0,canvas.width,canvas.width);
        ctx.clearRect(canvas.width/2,0,1,canvas.width/2);

        // Escudos
        ctx.drawImage(img1, canvas.width/4 - 35/2, canvas.height/2 - 35/2, 35, 35);
        ctx.fillStyle = "#FFFFFF";
        ctx.font = "10px Arial";
        ctx.fillText("FC Barcelona", canvas.width/2 - 95, 10);
        ctx.drawImage(img2, canvas.width*3/4 - 35/2, canvas.height/2 - 35/2, 35, 35);
        ctx.fillText("Real de Madrid", canvas.width/2 + 28, 10);

        // Marcadores
        ctx.fillText(playerL, canvas.width/2 - 18, 10);
        ctx.fillText(playerR, canvas.width/2 + 12, 10);
    }

    function render(){
        updateBola();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        renderCampo(ctx);
        pala_L.render(ctx);
        pala_R.render(ctx);
        bola.render(ctx);
    }
    setInterval(render, 1000/60); // 1000/60 = Llamamos a render cada 1000/60 ms
});

var segundos = 0;
var minutos = 1;
var llamada;
var ceromin='';
var ceroseg='';

function cuentaAtras(){
    devolvercero(minutos,segundos);
    segundos = segundos % 60;
    document.getElementById("reloj").innerHTML=ceromin+minutos+':'+ceroseg+segundos;

    if (minutos == 0 && segundos == 0){
        alert ("FINAL DEL PARTIDO");
        clearTimeOut(llamada);
    }

    if (segundos == 0){
        minutos --;
        segundos += 60;
    }
    segundos --;
    var llamada = setTimeout(cuentaAtras,1000);
}

function devolvercero(minutos,segundos){
    if (minutos < 10){
        ceromin='0';
    }

    if (segundos < 10){
        ceroseg = '0';
    }else {
        ceroseg = '';
    }
    return ceroseg;
}