let deck = [];
const tipos      = ['C','D','H','S'];
const especiales = ['A','K','Q','K'];

let puntosJugador = 0;
let puntosComputadora = 0;

//Referencias HTML

const btnPedir = document.querySelector('#pedir');
const btnDetener = document.querySelector('#detener');
const btnNuevo =  document.querySelector('#nuevo')

const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#dealer-cartas');

let actulizarPuntosJugador = document.querySelectorAll('small');



//Esta función crea el deck 
const crearDeck = () => {
 for (let i = 2; i <= 10; i++){
    for (const tipo of tipos) {
        deck.push(i + tipo)
    }
 }
 for (const tipo of tipos) {
    for (const especial of especiales) {
        deck.push(especial + tipo )
    }
 }
 
 deck = _.shuffle(deck);

 return deck;
}

crearDeck();

//Función para tomar carta

const pedirCarta = ()=>{
    if (deck.length === 0){
        throw 'No hay más cartas en el deck'
    }
let carta = deck.pop();

    return carta;
}

//pedirCarta();

const valorCarta = ( carta ) => {
    const valor =  carta.substring(0, carta.length -1);
    return (isNaN(valor))?
    (puntos = (valor === 'A')? 11 : 10) 
    : valor * 1;

  
}

const valor = valorCarta(pedirCarta());


//Turno Computadora
const turnoComputadora = ( puntosMinimos ) => {
    do {
    const carta = pedirCarta();

    puntosComputadora = puntosComputadora + valorCarta(carta);
    actulizarPuntosJugador[1].innerText = puntosComputadora;

    const imgCarta = document.createElement('img');
    imgCarta.src = `/02-blackjack/assets/cartas/${ carta }.png`
    imgCarta.classList.add('carta');
    divCartasComputadora.append( imgCarta );
        if( puntosMinimos > 21) {
            break;
        }


   } while ( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) );

}




//Eventos
btnPedir.addEventListener('click', ()=>{
    const carta = pedirCarta();

    puntosJugador = puntosJugador + valorCarta(carta);
    actulizarPuntosJugador[0].innerText = puntosJugador;

    const imgCarta = document.createElement('img');
    imgCarta.src = `/02-blackjack/assets/cartas/${ carta }.png`
    imgCarta.classList.add('carta');
    divCartasJugador.append( imgCarta );

    if ( puntosJugador > 21){

        console.warn('Perdiste...')
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugador );
    } else if( puntosJugador === 21){
        console.log('Has ganado')
        btnPedir.disabled = true;
        btnDetener.disabled = true;
    }
});

btnDetener.addEventListener('click', ()=>{
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    
turnoComputadora(puntosJugador);

})

