/**
 * Created by Carles on 22/11/2016.
 */
var game = new Phaser.Game(800, 700, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload() {
    game.load.image('boton-0','img/0.png');
    game.load.image('boton-1','img/1.png');
    game.load.image('boton-2','img/2.png');
    game.load.image('boton-3','img/3.png');
    game.load.image('boton-4','img/4.png');
    game.load.image('boton-5','img/5.png');
    game.load.image('boton-6','img/6.png');
    game.load.image('boton-7','img/7.png');
    game.load.image('boton-8','img/8.png');
    game.load.image('boton-9','img/9.png');
    game.load.image('boton--2','img/equal.png');
    game.load.image('boton-14','img/delete.png');
    game.load.image('boton-10','img/plus.png');
    game.load.image('boton-11','img/minus.png');
    game.load.image('boton-12','img/multiply.png');
    game.load.image('boton-13','img/division.png');
}

var button;
var res="", num1="", num2="", op="", text;

function create() {
    var style = {font: "32px Arial", fill: "#3FABC9", align: "center"};
    text = game.add.text(50, 100, "", style);
    game.stage.backgroundColor = '#DDDDDD';
    var n = 7;
    for(var i=0; i < 4; i++) {
        for(var j=0; j < 3; j++){
            if (i==3 && j==1) {
                var key = "boton-" + 0;
                button = game.add.button(j * 125 + 50, i * 125 + 150, key, actionOnClick, {keyname: 0}, 0, 0, 0);
                n = 13;
            } else {
                var key = "boton-" + n;
                button = game.add.button(j * 125 + 50, i * 125 + 150, key, actionOnClick, {keyname: n}, 0, 0, 0);
            }
            button.events.onInputDown.add(onInputDown);
            button.events.onInputUp.add(onInputUp);
            n++;
            }
        n = n-6;
        }
    n = 10;
    for(var i=0; i < 4; i++) {
        var key = "boton-"+n;
        button = game.add.button(3 * 125 + 50, i * 125 + 150, key, actionOnClick, {keyname:n}, 0, 0, 0);
        button.events.onInputDown.add(onInputDown);
        button.events.onInputUp.add(onInputUp);
        n++;
    }

}

function onInputUp(button) {
    game.add.tween(button.scale).to({x: 1, y: 1}, 200, Phaser.Easing.Cubic.Out, true);
}
function onInputDown(button) {
    game.add.tween(button.scale).to({x: 0.8, y: 0.8}, 200, Phaser.Easing.Cubic.Out, true);
}

function actionOnClick () {
    if (this.keyname>-1 && this.keyname<10){
        if (op=="") {
            num1 += this.keyname;
            text.text = num1;
        } else {
            num2 += this.keyname;
            text.text = num2;
        }
    }
    else if (this.keyname>9 && this.keyname<14){
        op = this.keyname;
        text.text = "";
    }
    else if (this.keyname == 14){
        text.text = "";
        num1 = "";
        num2 = "";
        op = "";
    }
    else {
        switch(op){
            case 10:
                res = Number(num1) + Number(num2);
                break;
            case 11:
                res = Number(num1) - Number(num2);
                break;
            case 12:
                res = Number(num1) * Number(num2);
                break;
            case 13:
                res = Number(num1) / Number(num2);
                break;
        }
        text.text = res;
        num1 = res;
        num2 = "";
    }
}