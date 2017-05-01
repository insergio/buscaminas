var x =[];
var puntaje=0;
var cuentafin=0;
var maxminas=0;
var segundo;
var hora;
var minuto;
var int=0;
var recordh=999;
var recordm=999;
var records=999;

$( document ).ready(function() {
	$("#strpuntaje").hide();
	$("#strtiempo").hide();
    matriz();
});

$("#boton").click(function(){
    $("#strpuntaje").show();
    $("#strtiempo").show();
});


$('.grupo').click(function(){
  $(this).find('input[type=radio]').prop('checked', true);
})

$('img').bind('contextmenu', function(e){
    return false;
}); 

function matriz(){
	var tam = valores();
	var numminas=0;
	maxminas=0;
	
	for (var i=0; i<tam; i++){
		x[i] = [];
		for (var j=0; j<tam; j++){
			var rnd=Math.floor(Math.random() * 15) + 1;	
			var dif = dificultad();
			
			switch (dif){
				case 'facil':
			
					numminas=4;
					break;
				case 'medio':
					numminas=11;
					break;
				case 'dificil':
					numminas=40;
					break;
			}
			
			if (numminas>maxminas){
				var bin = llenar(rnd,dif);			
			}else{				
				var bin= llenarsinminas(rnd, dif);	
			}			
			x[i][j]=bin;	
		} 	
	}
	return x;
}


function llenar(rnd, dif){

	switch(true){
		case (rnd<=5):
			bin=0;
			maxminas++;
			break;
		case (rnd>5 && rnd<=9):
			bin=1;
			break;
		case (rnd>=10 && rnd <=12):
			bin=2;
			break;
		case (rnd>12):
			bin=3;
			break;			
	}
	
	return bin;
}

function llenarsinminas(rnd, dif){

	switch(true){		
		case (rnd<=5):
			bin=1;
			break;
		case (rnd>=10 && rnd <=10):
			bin=2;
			break;
		case (rnd>10):
			bin=3;
			break;
	}
	return bin;
}

function dificultad(){
	var c1=["facil", "medio", "dificil"];
  	for ( var i=0;i< c1.length; i++ )
  	{
    	if ( document.getElementById(c1[i]).checked )
    	{    		
        return c1[i];
  	  	}
  	}
}
var tam;
function valores(){	
	var dif = dificultad();
	switch (dif) {
		case 'facil':
			tam=5;
			break;
		case 'medio':
			tam=10;
			break;
		case 'dificil':
			tam=15;
			break;
	}
	return tam;
}


function generador(){ 
	segundo=0;
	hora=0;
	minuto=0;

    sumatiempo();
	matriz();
	puntaje=0;
		document.getElementById("puntaje").innerHTML = puntaje;

	cuentafin=0;
	var x=valores();
	var grid="";
    for(var i=0; i<x; i++){
       grid+='<div class="row">';
		for( var j=0; j<x; j++){
          //document.write('<div class="column">');
          grid+='<img src="img/neutro.png" onclick="clickmina(this.id)" oncontextmenu=" rightclickmina(this.id); return false;" alt="neutro" id="'+i+''+j+'">';
          //document.write('</div>')
        }
        grid+='</div>';
	}
	document.getElementById('juego').innerHTML = grid;
}

function rightclickmina(id) {	 
	 document.getElementById(id).src="img/flag.png";
	 var res = id.split("");
	 x[res[0]][res[1]]=4;
	 sumafin();	
}

function clickmina(id){	
	var res = id.split("");	 
	if (id.length==2){		
		var n1= parseInt(res[0]);
		var n2= parseInt(res[1]);	 	
	}
	if (id.length==3){
		if (res[0]==1){
			var n1= parseInt(""+res[0]+res[1]);
			var n2= parseInt(res[2]);
		}else{
			if (res[1]==1 || res[0]==0 ){
				var n1= parseInt(res[0]);
				var n2= parseInt(""+res[1]+res[2]);
			}
		}
	}
	 
	if (id.length==4){ 
		var n1= parseInt(""+res[0]+res[1]);
		var n2= parseInt(""+res[2]+res[3]);
	 	
	} 
	 var valueId = x[n1][n2];

	 switch (valueId){
	 	case 0:
	 		document.getElementById(id).src="img/bomba.png";
	 		alert("¡Has perdido!");
	 		sumafin();
	 		clearInterval(int);
	 		break;
	 	case 1:
	 	 	document.getElementById(id).src="img/uno.png";
	 	 	sumapuntaje(1);
	 	 	sumafin();
	 	 	break;

 	 	case 2:
 	 		document.getElementById(id).src="img/dos.png";	
 	 		sumapuntaje(2); 	
 	 		sumafin();	
 	 		break;

 		case 3:
 	 		document.getElementById(id).src="img/vacio.png";	
 	 		adyacentes(n1, n2);	
 	 		sumafin();
 	 		break;
	 }
	 	
	 x[n1][n2]=4;

}
function adyacentes(n1 ,n2){
	if (n1>0){
		proxima(n1-1, n2);
		if (n2>0){
			proxima(n1-1, n2-1);
		}
		if (n2<tam-1){
			proxima(n1-1, n2+1);
		}	
	}	
	if (n1<tam-1){
		proxima(n1+1, n2);
		if (n2<tam-1){
			proxima(n1+1, n2+1);
		}
		if (n2>0){
			proxima(n1+1, n2-1);
		}
	}
	if (n2<tam-1){
		proxima(n1, n2+1);
	}
	if (n2>0){
		proxima(n1, n2-1);
	}
 }

function proxima(n1, n2){
	var val= x[n1][n2];	
	var id=""+n1+n2;

	switch(val){
		case 1:

			document.getElementById(id).src="img/uno.png";
			sumapuntaje(1);
	 	 	sumafin();	 
	 	 	x[n1][n2]=4;
	 	 	break;

 	 	case 2:
 	 		document.getElementById(id).src="img/dos.png";	
 	 		sumapuntaje(2); 	
 	 		sumafin();	 
 	 		x[n1][n2]=4;
 	 		break;	

 		case 3:
 	 		document.getElementById(id).src="img/vacio.png";	
 	 		sumafin();	 
 	 		x[n1][n2]=4;
 	 		adyacentes(n1, n2);
 	 		break;	
	}

}

function sumafin(){
	cuentafin++;
	if(cuentafin==tam*tam){
		alert ("¡Fin de juego!");

		if (hora<recordh){
			if (minuto<recordm){
				recordh=hora;
				recordm=minuto;
				records=segundo;
				alert ("¡Nuevo record!");
			}
			if (minuto=recordm && segundo<records){
				recordh=hora;
				recordm=minuto;
				records=segundo;
				alert ("¡Nuevo record!");
			}
		}
		clearInterval(int);
	}
	

	
}

function sumapuntaje(num){
	puntaje=puntaje+num;
	document.getElementById("puntaje").innerHTML = puntaje;

}

function sumatiempo(num){
	int= setInterval(function(){		
		segundo++
		if (segundo>=60){
			segundo=0; 
			minuto++;
		}
		if (minuto>=60){
			hora++;
		}
		document.getElementById("tiempo").innerHTML = hora+":"+minuto+":"+segundo;
		
	 }, 1000);
}

