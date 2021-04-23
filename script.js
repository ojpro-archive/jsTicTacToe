// Just Do It
let $ = (el) => document.querySelector(el);

let symbol = "X";
let Xplayer = [];
let Oplayer = [];
let auto = false;

// Relation is 3
let winPositions = [
  ["b1", "b2", "b3"],
  ["b4", "b5", "b6"],
  ["b7", "b8", "b9"],
  ["b1", "b4", "b7"],
  ["b2", "b5", "b8"],
  ["b3", "b6", "b9"],
  ["b1", "b5", "b9"],
  ["b3", "b5", "b7"],
];
function replay() {
  alert("Do you like to re-play ?");
  Xplayer = [];
  Oplayer = [];
  for (let i = 1; i <= 9; i++) {
    $("#b" + i).innerText = "";
  }
}
function playAuto() {
  auto = auto ? false : true;
  replay();
}
function randomPosition() {
  let random = Math.floor(Math.random() * 10);
  if (random == 0) {
    return randomPosition();
  }
  if (!isPlayable("b" + random)) {
    return randomPosition();
  }
  return random;
}
function win() {
  alert("The " + symbol + " player is the winer!");
  replay();
}
function isPlayable(id) {
  if (Oplayer.indexOf(id) == -1 && Xplayer.indexOf(id) == -1) {
    return true;
  }

  return false;
}
function winer(playerList) {
  let counter;
  for (let i = 0; i < winPositions.length; i++) {
    counter = 0;
    for (let j = 0; j < 3; j++) {
      if (playerList.indexOf(winPositions[i][j]) != -1) {
        counter += 1;
      }
    }
    if (counter == 3) {
      return win();
    }
  }
}

function gameOver() {
  if (Xplayer.length == 5 || Oplayer.length == 5) {
    return true;
  }
  return false;
}
function XorO() {
  if (symbol === "X") {
    symbol = "O";
    return symbol;
  } else {
    symbol = "X";
    return symbol;
  }
}
function pusher(btn) {
  if (symbol === "X" && Oplayer.length < 5) {
    Oplayer.push(btn);
  } else if (symbol === "O" && Xplayer.length < 5) {
    Xplayer.push(btn);
  }
}
function write(el) {
  el.innerText = XorO();
}
function put(el, btnId) {
  pusher(btnId);
  write(el);
}
function checker(el) {
  let btnId = el.getAttribute("id");
  if (symbol == "X") {
    if (Xplayer.indexOf(btnId) == -1) {
      put(el, btnId);
      winer(Oplayer);
    }
  } else {
    if (Oplayer.indexOf(btnId) == -1) {
      put(el, btnId);
      winer(Xplayer);
    }
  }
}
function robot() {
  let random = randomPosition();
  let el = $("#b" + random);
  checker(el);
  if (gameOver()) {
    alert("Game Over");
    replay();
  }
}
function check(el) {
  checker(el);
  if (gameOver()) {
    alert("Game Over");
    replay();
  } else {
    if (auto) {
      robot();
    }
  }
}
