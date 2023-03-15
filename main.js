const gameState = {
  playerOne: {
    pits: [4, 4, 4, 4, 4, 4],
    pocket: 0,
  },
  playerTwo: {
    pits: [4, 4, 4, 4, 4, 4],
    pocket: 0,
  },
};

let playerTurn = 'playerOne';
let rocks = 0;

const allPits = document.querySelectorAll('.pits div .pit');
const allPockets = document.querySelectorAll('.pockets');
const playerOnePits = document.querySelector('#pits-1');
const playerTwoPits = document.querySelector('#pits-2');

function renderBoard() {
  allPits.forEach((element) => {
    const index = element.dataset.index;
    const player = element.dataset.name;
    element.innerText = gameState[player].pits[index];
  });
  allPockets.forEach((element) => {
    const player = element.dataset.name;
    element.innerText = gameState[player].pocket;
  });
}

function draw(event) {
  let index = Number(event.target.dataset.index);
  rocks = gameState[playerTurn].pits[index];
  gameState[playerTurn].pits[index] = 0;
  index = playerTurn === 'playerOne' ? index + 1 : index - 1;
  let player = event.target.dataset.name;
  while (rocks > 0) {
    const pits = gameState[player].pits;
    spreadRocks(pits, index, player);
    if (rocks > 0 && player === playerTurn) {
      gameState[playerTurn].pocket++;
      rocks--;
      console.log(rocks);
      if (rocks === 0) {
        renderBoard();
        console.log(playerTurn, 'Turn');
        console.log(gameState);
        renderTest();
        return;
      }
    }
    player = player === 'playerOne' ? 'playerTwo' : 'playerOne';
    index = player === 'playerOne' ? 0 : 5;
    // console.log('Pits of ', player);
    console.log(gameState);
  }
  renderBoard();
  renderTest();
  playerTurn = playerTurn === 'playerOne' ? 'playerTwo' : 'playerOne';
  console.log(playerTurn, 'Turn');
}

function spreadRocks(pits, index, player) {
  if (player === 'playerOne') {
    for (let i = index; i < pits.length; i++) {
      if (pits[i] === 0 && rocks === 1 && player === playerTurn) {
        console.log('empty spot');
        gameState[player].pocket +=
          gameState['playerTwo'].pits[i] + rocks + pits[i];
        gameState['playerTwo'].pits[i] = 0;
        pits[i] = 0;
        rocks--;
        return;
      }
      if (rocks === 0) break;
      pits[i]++;
      rocks--;
    }
  }
  if (player === 'playerTwo') {
    for (let i = index; i >= 0; i--) {
      if (pits[i] === 0 && rocks === 1 && player === playerTurn) {
        console.log('empty spot');
        gameState[player].pocket +=
          gameState['playerOne'].pits[i] + rocks + pits[i];
        gameState['playerOne'].pits[i] = 0;
        pits[i] = 0;
        rocks--;
        return;
      }
      if (rocks === 0) break;
      pits[i]++;
      rocks--;
    }
  }
}

playerOnePits.addEventListener('click', function (event) {
  if (playerTurn === 'playerTwo' || event.target.className !== 'pit') return;
  draw(event);
});

playerTwoPits.addEventListener('click', function (event) {
  if (playerTurn === 'playerOne' || event.target.className !== 'pit') return;
  draw(event);
});

renderBoard();

const test1 = document.querySelector('#test-1 > span');
const test2 = document.querySelector('#test-2 > span');

function renderTest() {
  let totalRockInObject =
    gameState.playerOne.pits.reduce((a, b) => a + b) +
    gameState.playerTwo.pits.reduce((a, b) => a + b) +
    gameState.playerOne.pocket +
    gameState.playerTwo.pocket;
  let totalRockOnBoard = 0;
  allPits.forEach((element) => (totalRockOnBoard += Number(element.innerHTML)));
  allPockets.forEach(
    (element) => (totalRockOnBoard += Number(element.innerHTML))
  );
  test1.innerHTML = totalRockInObject;
  test2.innerHTML = totalRockInObject;
}

renderTest();
