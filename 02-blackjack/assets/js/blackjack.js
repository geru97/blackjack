let deck = [];
const tipos = ["C", "D", "H", "S"];
const especiales = ["A", "K", "Q", "K"];

let puntosJugador = 0;
let puntosComputadora = 0;

//Referencias HTML

const btnPedir = document.querySelector("#pedir");
const btnDetener = document.querySelector("#detener");
const btnNuevo = document.querySelector("#nuevo");

const divCartasJugador = document.querySelector("#jugador-cartas");
const divCartasComputadora = document.querySelector("#dealer-cartas");

let actulizarPuntosJugador = document.querySelectorAll("small");

let alertaGana = document.querySelector("#ganador");
let alertaPierde = document.querySelector("#perdedor");
let alertaEmpate = document.querySelector("#empate");

//Esta función crea el deck
const crearDeck = () => {
  for (let i = 2; i <= 10; i++) {
    for (const tipo of tipos) {
      deck.push(i + tipo);
    }
  }
  for (const tipo of tipos) {
    for (const especial of especiales) {
      deck.push(especial + tipo);
    }
  }

  deck = _.shuffle(deck);

  return deck;
};

crearDeck();

//Función para tomar carta

const pedirCarta = () => {
  if (deck.length === 0) {
    throw "No hay más cartas en el deck";
  }
  let carta = deck.pop();

  return carta;
};

//pedirCarta();

const valorCarta = (carta) => {
  const valor = carta.substring(0, carta.length - 1);
  return isNaN(valor) ? (puntos = valor === "A" ? 11 : 10) : valor * 1;
};

const valor = valorCarta(pedirCarta());

//Turno Computadora
const turnoComputadora = (puntosMinimos) => {
  do {
    const carta = pedirCarta();

    puntosComputadora = puntosComputadora + valorCarta(carta);
    actulizarPuntosJugador[1].innerText = puntosComputadora;

    const imgCarta = document.createElement("img");
    imgCarta.src = `/02-blackjack/assets/cartas/${carta}.png`;
    imgCarta.classList.add("carta");
    divCartasComputadora.append(imgCarta);
    if (puntosMinimos > 21) {
      break;
    }
  } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

  setTimeout(() => {
    if (puntosComputadora === puntosMinimos) {
      
      alertaEmpate.classList.remove("visually-hidden");

    } else if (puntosMinimos > 21) {
     
      alertaPierde.classList.remove("visually-hidden");

    } else if (puntosComputadora > 21 ) {
      alertaGana.classList.remove("visually-hidden");
      
    } else if (puntosMinimos === 21 || puntosJugador === 21) {
        alertaGana.classList.remove("visually-hidden");
        
      } else {
        alertaPierde.classList.remove("visually-hidden");
     
    }
  }, 100);

};

//Eventos
btnPedir.addEventListener("click", () => {
  const carta = pedirCarta();

  puntosJugador = puntosJugador + valorCarta(carta);
  actulizarPuntosJugador[0].innerText = puntosJugador;

  const imgCarta = document.createElement("img");
  imgCarta.src = `/02-blackjack/assets/cartas/${carta}.png`;
  imgCarta.classList.add("carta");
  divCartasJugador.append(imgCarta);

  if (puntosJugador > 21) {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
    
  } else if (puntosJugador === 21) {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora( puntosJugador );
  }
});

btnDetener.addEventListener("click", () => {
  btnPedir.disabled = true;
  btnDetener.disabled = true;

  turnoComputadora(puntosJugador);
});

btnNuevo.addEventListener("click", () => {
  deck = [];
  deck = crearDeck();
  puntosJugador = 0;
  puntosComputadora = 0;
  actulizarPuntosJugador[0].innerText = 0;
  actulizarPuntosJugador[1].innerText = 0;
  divCartasComputadora.innerHTML = "";
  divCartasJugador.innerHTML = "";
  const imgCarta = document.createElement("img");
  imgCarta.src = `/02-blackjack/assets/cartas/red_back.png`;
  imgCarta.classList.add("carta");
  divCartasJugador.append(imgCarta);
  const imgCarta2 = document.createElement("img");
  imgCarta2.src = `/02-blackjack/assets/cartas/grey_back.png`;
  imgCarta2.classList.add("carta");
  divCartasComputadora.append(imgCarta2);

  btnPedir.disabled = false;
  btnDetener.disabled = false;
  alertaGana.classList.add("visually-hidden");
  alertaEmpate.classList.add("visually-hidden");
  alertaPierde.classList.add("visually-hidden");
});
