var tot=0;
var nid=1;

function borrar(nid,pre){
    var borrar = document.getElementById(nid);
    borrar.parentNode.removeChild(borrar);
    var borrar1 = document.getElementById('b'+nid);
    borrar1.parentNode.removeChild(borrar1);
	tot-=pre;
	if (tot<=0){
		document.getElementById("suma").innerHTML="Total compra:";
	} else{
		document.getElementById("suma").innerHTML="Total compra: "+tot.toFixed(2)+"€";
	}
}


function comprar(descrip, precio){
   var espacio=document.getElementById("total");
   var parrafo=document.createElement("p");
   idp=nid;
   parrafo.setAttribute("id",nid);
   anclaN=document.createElement("a");
   anclaN.setAttribute("href","#");
   anclaN.setAttribute("title","X");
   anclaN.setAttribute("onClick","borrar("+nid+")");
   
   var ids=document.getElementById(idp);
   
   var contenido=document.createTextNode(descrip+" "+precio+"€");
   parrafo.appendChild(contenido);
   espacio.appendChild(parrafo);
   var boton=document.createElement("input");
   boton.setAttribute("type", "button");
   boton.setAttribute("value","x");
   boton.setAttribute("id","b"+nid);
   boton.setAttribute("onClick","borrar("+nid+","+precio+");");
   espacio.appendChild(boton);
   tot+=parseFloat(precio);
   document.getElementById("suma").innerHTML="Total compra: "+tot.toFixed(2)+"€";
   nid++;
}

$(document).ready(function(){
    $(".men").click(function(){
        $(".menu2").slideToggle("slow");
    });
});

$(document).ready(function(){
    $('.col-md-3').mouseenter(function() {
        $(this).css("background-color","#EEE");
    });
    $('.col-md-3').mouseout(function() {
        $(this).css("background-color","#FFF");
    });
});

$(document).ready(function(){
    $('.boton').mouseenter(function() {
        $(this).animate({
            height: '35px',
            width: '50%'
        });
    });
    $('.boton').mouseout(function() {
        $(this).animate({
            height: '30px',
            width: '40%'
        });
    });
});

