let turno = true; // Verdadero: X, Falso: O
let jugadas = 0;
let bloqueo = false;
let ptsX = 0;
let ptsO = 0;
let puntajeX = document.getElementById("puntajeX");
let puntajeO = document.getElementById("puntajeO");
let turnoDe = document.getElementById("turnoDe");
let botones = document.querySelectorAll("button");

const combinacionesGanadoras =[
    // Horizontales
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Verticales
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Diagonales
    [0, 4, 8],
    [2, 4, 6]

    /* 
    Vista del tablero
     0 | 1 | 2 
     3 | 4 | 5 
     6 | 7 | 8 
    
    */
]; 
function limpiarTablero(){
    for(let boton of botones){
        boton.textContent = "";
        boton.style.color = "black";
        boton.style.textShadow = "none";
    }
    jugadas = 0;
}
function comprobarGanador(){
    for(let combinacion of combinacionesGanadoras){
        let pos1 = combinacion[0];
        let pos2 = combinacion[1];
        let pos3 = combinacion[2];

        if(botones[pos1].textContent != "" &&
        botones[pos1].textContent == botones[pos2].textContent &&
        botones[pos1].textContent == botones[pos3].textContent)
        {
            for(let pos of combinacion){
                botones[pos].style.color = "rgb(255, 255, 255)";
                botones[pos].style.textShadow = "0px 0px 15px rgb(255, 255, 255)";
            }
            return botones[pos1].textContent;
        }
    }
    return null;
}
function 
reiniciarConPausa(){
    bloqueo = true;
    setTimeout(function(){
        limpiarTablero();
        bloqueo = false;
    }, 1500);
}
function cambiar(boton){

    // evitar interactuar con casillas ya ocupadas o en tiempos de espera
    if(bloqueo || boton.textContent != ""){
        return;
    }

    // ocupar casilla dependiendo de quien sea el turno
    if(turno){
        boton.textContent = "X";
        boton.style.color = "rgb(70, 210, 230)";
        turno = false;
        turnoDe.innerHTML = 'Turno de  <span class="colorO">O</span>'
    }else{
        boton.textContent = "O";
        boton.style.color = "rgb(213, 157, 34)";
        turno = true;
        turnoDe.innerHTML = 'Turno de  <span class="colorX">X</span>'
    }
    jugadas++;

    // comprobar el ganador
    let ganador = comprobarGanador();

    if(ganador != null){
        if(ganador == "X"){
            ptsX++;
        }else{
            ptsO++;
        }
        puntajeX.textContent = `X : ${ptsX}`;
        puntajeO.textContent = `O : ${ptsO}`;
        
        reiniciarConPausa();

    // empate
    }else if(jugadas == 9){
        botones.forEach(b => {
            b.style.color = "red";
            b.style.textShadow = "0px 0px 15px red"
        });
        
        reiniciarConPausa();
    }
}