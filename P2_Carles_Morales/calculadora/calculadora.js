function operador(signo){
switch (signo) {
    case '+':
        var n1=parseFloat(document.getElementById("numero1").value);
		var n2=parseFloat(document.getElementById("numero2").value);
		document.getElementById("resultado").value=n1+n2;
        break;
    case '-':
        document.getElementById("resultado").value=document.getElementById("numero1").value-document.getElementById("numero2").value;
        break;
    case '*':
        document.getElementById("resultado").value=document.getElementById("numero1").value*document.getElementById("numero2").value;
        break;
    case '/':
        document.getElementById("resultado").value=document.getElementById("numero1").value/document.getElementById("numero2").value;
        break;
    case 'C':
		document.getElementById("numero1").value=' ';
		document.getElementById("numero2").value=' ';
        document.getElementById("resultado").value=' ';
		break;
}
} 