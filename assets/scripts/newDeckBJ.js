if (localStorage.getItem("username") == "") {
   location.replace("index.html");
}

// const audioFundal = new Audio();
// audioFundal.autoplay = true;
// audioFundal.src = "assets/sound/gameMusic.wav";

const audioCardPlayer = new Audio();
audioCardPlayer.autoplay = true;
// audioCardPlayer.src = "assets/sound/cardPlayer.wav";

const audioCardDealer = new Audio();
audioCardDealer.autoplay = true;
// audioCardDealer.src = "assets/sound/cardDealer.wav";

const audioCardStart = new Audio();
audioCardStart.autoplay = true;
// audioCardStart.src = "assets/sound/cardStart.wav";

const audioCardEnd = new Audio();
audioCardEnd.autoplay = true;
// audioCardEnd.src = "assets/sound/game_over.mp3";

const audioWin = new Audio();
audioWin.autoplay = true;
// audioWin.src = "assets/sound/you_win.mp3";

const audioLose = new Audio();
audioLose.autoplay = true;
// audioLose.src = "assets/sound/you_lose.mp3";

const audioTie = new Audio();
audioTie.autoplay = true;
// audioTie.src = "assets/sound/game_tie.mp3";

let newDeck = [];
localStorage.setItem("bgImage", "2");
const topInfoGame = document.getElementById("BC1");
const BJrules = document.getElementById("B2");
const GameBackground = document.getElementById("A2");
const changeBG = document.getElementById("topRightBox1");
const showCard = document.getElementById("result");
const showDeckInfoPanel = document.getElementById("container2");
const newBet = document.getElementById("newBet");
const inputBet = document.getElementById("inputBet");
const score = document.getElementById("score");
const whoWin = document.getElementById("A1");
const gameResult = document.getElementById("gameResult");
const betBtn = document.getElementById("btnBet");
const hitBtn = document.getElementById("btnHit");
const standBtn = document.getElementById("btnStand");
const BestScore = document.getElementById("bestScore");
const username = localStorage.getItem("username");

const dc1 = document.getElementById("dc1");
const dc2 = document.getElementById("dc2");
const dc3 = document.getElementById("dc3");
const dc4 = document.getElementById("dc4");
const dc5 = document.getElementById("dc5");
const pc1 = document.getElementById("pc1");
const pc2 = document.getElementById("pc2");
const pc3 = document.getElementById("pc3");
const pc4 = document.getElementById("pc4");
const pc5 = document.getElementById("pc5");

document.getElementById("B1").addEventListener("click", Refresh);
document.getElementById("topRightBox2").addEventListener("click", Exit);
document.getElementById("topRightBox1").addEventListener("click", ChangeBG);
betBtn.addEventListener("click", bet);
hitBtn.addEventListener("click", Hit);
standBtn.addEventListener("click", Stand);

pc1.style.display = "none";
pc2.style.display = "none";
dc1.style.display = "none";
dc2.style.display = "none";
pc3.style.display = "none";
pc4.style.display = "none";
pc5.style.display = "none";
dc3.style.display = "none";
dc4.style.display = "none";
dc5.style.display = "none";

hitBtn.style.display = "none";
standBtn.style.display = "none";
whoWin.innerText = `Good Luck ${username}`;
let infoCard = "";
let bestScore = 0;
let totalPlayer = 0;
let totalDealer = 0;
let playerBet = 0;
let playerScore = 1000;
let waitTime = 0;
let newCard1;
let newCard2;
let newCard3;
let newCard4;
let newCard5;
let newCard6;
let newCard7;
let newCard8;
let newCard9;
let newCard10;

// newDeckOfCards();

function Refresh() {
   location.reload();
}

function Exit() {
   if (confirm("Exit game?")) {
      location.assign("index.html");
   }
}

function ChangeBG() {
   let x = localStorage.getItem("bgImage");
   switch (x) {
      case "1":
         changeBG.style.backgroundColor = 'white';
         GameBackground.style.backgroundImage =
            "url('assets/styles/img/bg1.jpg')";
         x = 2;
         break;

      case "2":
         changeBG.style.backgroundColor = 'gray';
         GameBackground.style.backgroundImage =
            "url('assets/styles/img/bg2.jpg')";
         x = 3;
         break;

      case "3":
         changeBG.style.backgroundColor = '#783b28';
         GameBackground.style.backgroundImage =
            "url('assets/styles/img/bg3.jpg')";
         x = 4;
         break;

      case "4":
         changeBG.style.backgroundColor = 'red';
         GameBackground.style.backgroundImage =
            "url('assets/styles/img/bg4.jpg')";
         x = 1;
         break;
   }
   localStorage.setItem("bgImage", `${x}`);
}

function newDeckOfCards() {
   const cardTypes = ["Hearts", "Diamonds", "Spades", "Clubs"];
   newDeck = [];
   let j = 0;
   let x = 2;
   for (let i = 1; i < 53; i++) {
      cardType = cardTypes[j];
      if (x === 11) {
         iSpecial = "A";
         BJValue = 1;
         BJValueA = 10;
      } else if (x === 12) {
         iSpecial = "J";
         BJValue = 10;
         BJValueA = 0;
      } else if (x === 13) {
         iSpecial = "Q";
         BJValue = 10;
         BJValueA = 0;
      } else if (x === 14) {
         iSpecial = "K";
         BJValue = 10;
         BJValueA = 0;
      } else {
         iSpecial = `${x}`;
         BJValue = x;
         BJValueA = 0;
      }
      card = {
         NDcardNr: x,
         NDBJValue: BJValue,
         NDBJValueA: BJValueA,
         NDiSpecial: iSpecial,
         NDcardType: cardType,
         NDrandomID: Math.floor(Math.random() * Math.pow(10, 7)),
         NDcardName: `Card ${iSpecial} of ${cardType}`,
      };
      newDeck.push(card);
      x++;
      if (x === 15) {
         x = 2;
         j++;
      }
   }
   amestecaPack(newDeck);
   dc1.innerHTML = "";
   dc2.innerHTML = "";
   dc3.innerHTML = "";
   dc4.innerHTML = "";
   dc5.innerHTML = "";
   pc1.innerHTML = "";
   pc2.innerHTML = "";
   pc3.innerHTML = "";
   pc4.innerHTML = "";
   pc5.innerHTML = "";
   newGame();
}

function CreateNewCard(place, nr, type) {
   place.innerHTML = `
  <div id="card0">
    <div id="card0A">
      <img class="specialImg" src="assets/styles/img/${type}.png" />
    </div>
    <div id="card0B">${nr}</div>
  </div>
    `;
}

function NDrandomCard() {
   newDeckOfCards();
   let random = Math.floor(Math.random() * 53);
   newDeck.forEach((card) => {
      if (card.NDnr == random) {
         CreateNewCard(showCard, card.NDiSpecial, card.NDcardType);
      }
   });
   newDeck = [];
}

function amestecaPack(deck) {
   deck.sort(function (a, b) {
      return a.NDrandomID - b.NDrandomID;
   });
   // console.log(deck);
}

function packInfo() {
   newDeck.forEach((card) => {
      text = showDeckInfoPanel.innerText;
      showDeckInfoPanel.innerText = `${text} ${card.NDrandomID} ${card.NDcardName} ${card.NDnr}  \n`;
   });
}

function shuffleCards() {
   let i = 0;
   for (card of cards) {
      CreateNewCard(card, newDeck[i].NDiSpecial, newDeck[i].NDcardType);
      i++;
   }
}

function newGame() {
   totalPlayer = 0;
   totalDealer = 0;
   newCard1 = newDeck.shift();
   newCard2 = newDeck.shift();
   newCard3 = newDeck.shift();
   newCard4 = newDeck.shift();
   newCard5 = newDeck.shift();
   newCard6 = newDeck.shift();
   newCard7 = newDeck.shift();
   newCard8 = newDeck.shift();
   newCard9 = newDeck.shift();
   newCard10 = newDeck.shift();
   setTimeout(() => {
      CreateNewCard(dc1, newCard1.NDiSpecial, newCard1.NDcardType);
      CreateNewCard(pc1, newCard3.NDiSpecial, newCard3.NDcardType);
      CreateNewCard(pc2, newCard4.NDiSpecial, newCard4.NDcardType);
   }, 500);

   totalDealer = totalDealer + newCard1.NDBJValue + newCard2.NDBJValue;
   totalPlayer = totalPlayer + newCard3.NDBJValue + newCard4.NDBJValue;

   totalDealerMax = totalDealer + newCard1.NDBJValueA;
   if (totalDealerMax + 10 < 22) {
      totalDealerMax += newCard2.NDBJValueA;
   }
   totalDealer = totalDealerMax;

   totalPlayerMax = totalPlayer + newCard3.NDBJValueA;
   if (totalPlayerMax + 10 < 22) {
      totalPlayerMax += newCard4.NDBJValueA;
   }
   totalPlayer = totalPlayerMax;

   // console.log(
   //     newCard1,
   //     newCard2,
   //     newCard3,
   //     newCard4,
   //     newCard5,
   //     newCard6,
   //     newCard7,
   //     newCard8,
   //     newCard9,
   //     newCard10,
   //     "total player:",
   //     totalPlayer,
   //     "total dealer:",
   //     totalDealer
   // );
   checkPlayer();
}

function Hit() {
   audioCardPlayer.src = "assets/sound/cardPlayer.wav";
   setTimeout(() => {
      if (pc3.innerHTML == "") {
         setTimeout(() => {
            CreateNewCard(pc3, newCard5.NDiSpecial, newCard5.NDcardType);
            checkPlayer();
            whoWin.innerText = `${username}: ${totalPlayer} `;
         }, 500);

         pc3.style.display = "block";
         totalPlayer += newCard5.NDBJValue + newCard5.NDBJValueA;
         if (totalPlayer > 21) {
            totalPlayer =
               newCard3.NDBJValue + newCard4.NDBJValue + newCard5.NDBJValue;
         }
      } else if (pc4.innerHTML == "") {
         setTimeout(() => {
            CreateNewCard(pc4, newCard6.NDiSpecial, newCard6.NDcardType);
            checkPlayer();
            whoWin.innerText = `${username}: ${totalPlayer} `;
         }, 500);

         pc4.style.display = "block";
         totalPlayer += newCard6.NDBJValue + newCard6.NDBJValueA;
         if (totalPlayer > 21) {
            totalPlayer =
               newCard3.NDBJValue +
               newCard4.NDBJValue +
               newCard5.NDBJValue +
               newCard6.NDBJValue;
         }
      } else {
         setTimeout(() => {
            CreateNewCard(pc5, newCard9.NDiSpecial, newCard9.NDcardType);
            checkPlayer();
            whoWin.innerText = `${username}: ${totalPlayer} `;
         }, 500);

         pc5.style.display = "block";
         totalPlayer += newCard9.NDBJValue + newCard9.NDBJValueA;
         if (totalPlayer > 21) {
            totalPlayer =
               newCard3.NDBJValue +
               newCard4.NDBJValue +
               newCard5.NDBJValue +
               newCard6.NDBJValue +
               newCard9.NDBJValue;
         }
      }
   }, 100);
}

function Stand() {
   dc2.classList.remove("dc2");
   dc2.style.backgroundImage = "none";
   audioCardDealer.src = "assets/sound/cardDealer.wav";
   setTimeout(() => {
      CreateNewCard(dc2, newCard2.NDiSpecial, newCard2.NDcardType);
      checkDealer();
   }, 500);
}

function checkPlayer() {
   // console.log(pc3.innerHTML);
   dc2.style.backgroundColor = "black";
   if (totalPlayer == 21 && pc3.innerHTML == "") {
      // console.log("nu e ok")
      whoWin.innerText = `${username}: ${totalPlayer}`;
      newBet.style.display = "flex";
      betBtn.style.display = "block";
      inputBet.style.display = "block";
      hitBtn.style.display = "none";
      standBtn.style.display = "none";
      playerScore += playerBet * 2.5;
      gameResult.innerText = `You won ${playerBet * 2.5}`;
      gameResult.classList.add("animationZoom");
      gameResult.style.color = "green";
      topInfoGame.innerText = `${username} WIN - BLACKJACK`;
      audioWin.src = "assets/sound/you_win.mp3";
   } else if (totalPlayer > 21) {
      whoWin.innerText = `${username}: ${totalPlayer}`;
      gameResult.innerText = `You lost ${playerBet}`;
      gameResult.classList.add("animationZoom");
      gameResult.style.color = "red";
      newBet.style.display = "flex";
      betBtn.style.display = "block";
      inputBet.style.display = "block";
      hitBtn.style.display = "none";
      standBtn.style.display = "none";
      topInfoGame.innerText = `Dealer WIN - ${username} cards > 21`;
      audioLose.src = "assets/sound/you_lose.mp3";
      checkGameOver();
   }
   score.innerText = playerScore;
}

function checkDealer() {
   if (totalDealer > 21) {
      betBtn.style.display = "block";
      inputBet.style.display = "block";
      hitBtn.style.display = "none";
      standBtn.style.display = "none";
      playerScore += playerBet * 2;

      setTimeout(() => {
         whoWin.innerHTML = `${username}: ${totalPlayer} <br> and <br> Dealer: ${totalDealer}`;
         gameResult.innerText = `You won ${playerBet * 2}`;
         gameResult.classList.add("animationZoom");
         topInfoGame.innerText = `${username} WIN - Dealer cards > 21`;
         audioWin.src = "assets/sound/you_win.mp3";
         gameResult.style.color = "green";
         newBet.style.display = "flex";
      }, waitTime);
   } else if (totalDealer == 21) {
      if (totalPlayer == 21) {
         betBtn.style.display = "block";
         inputBet.style.display = "block";
         hitBtn.style.display = "none";
         standBtn.style.display = "none";
         playerScore += playerBet * 1;
         setTimeout(() => {
            topInfoGame.innerText = "It's a TIE";
            gameResult.innerText = "It's a TIE";
            gameResult.classList.add("animationZoom");
            audioTie.src = "assets/sound/game_tie.mp3";
            gameResult.style.color = "yellow";
            whoWin.innerHTML = `${username}: ${totalPlayer} <br> and <br> Dealer: ${totalDealer}`;
            newBet.style.display = "flex";
         }, waitTime);
      } else {
         betBtn.style.display = "block";
         inputBet.style.display = "block";
         hitBtn.style.display = "none";
         standBtn.style.display = "none";
         checkGameOver();
         setTimeout(() => {
            topInfoGame.innerText = "Dealer WIN";
            whoWin.innerHTML = `${username}: ${totalPlayer} <br> and <br> Dealer: ${totalDealer}`;
            gameResult.innerText = `You lost ${playerBet}`;
            gameResult.classList.add("animationZoom");
            audioLose.src = "assets/sound/you_lose.mp3";
            gameResult.style.color = "red";
            newBet.style.display = "flex";
         }, waitTime);
      }
   } else if (totalDealer < 17 && totalDealer <= totalPlayer) {
      if (dc3.innerHTML == "") {
         waitTime = 500;
         setTimeout(() => {
            CreateNewCard(dc3, newCard7.NDiSpecial, newCard7.NDcardType);
            checkDealer();
         }, 1500);

         setTimeout(() => {
            dc3.style.display = "block";
            audioCardDealer.src = "assets/sound/cardDealer.wav";
         }, 1000);
         totalDealer += newCard7.NDBJValue + newCard7.NDBJValueA;

         if (totalDealer > 21) {
            totalDealer =
               newCard1.NDBJValue + newCard2.NDBJValue + newCard7.NDBJValue;
         }
      } else if (dc4.innerHTML == "") {
         waitTime = 1500;
         setTimeout(() => {
            CreateNewCard(dc4, newCard8.NDiSpecial, newCard8.NDcardType);
            checkDealer();
         }, 2500);

         setTimeout(() => {
            dc4.style.display = "block";
            audioCardDealer.src = "assets/sound/cardDealer.wav";
         }, 2000);
         totalDealer += newCard8.NDBJValue + newCard8.NDBJValueA;
         if (totalDealer > 21) {
            totalDealer =
               newCard1.NDBJValue +
               newCard2.NDBJValue +
               newCard7.NDBJValue +
               newCard8.NDBJValue;
         }
      } else if (dc5.innerHTML == "") {
         waitTime = 2500;
         setTimeout(() => {
            CreateNewCard(dc5, newCard10.NDiSpecial, newCard10.NDcardType);
            checkDealer();
         }, 3500);

         setTimeout(() => {
            dc5.style.display = "block";
            audioCardDealer.src = "assets/sound/cardDealer.wav";
         }, 3000);
         totalDealer += newCard10.NDBJValue + newCard10.NDBJValueA;
         if (totalDealer > 21) {
            totalDealer =
               newCard1.NDBJValue +
               newCard2.NDBJValue +
               newCard7.NDBJValue +
               newCard8.NDBJValue +
               newCard10.NDBJValue;
         }
      }
   } else {
      if (totalDealer > totalPlayer) {
         betBtn.style.display = "block";
         inputBet.style.display = "block";
         hitBtn.style.display = "none";
         standBtn.style.display = "none";

         checkGameOver();

         setTimeout(() => {
            topInfoGame.innerText = "Dealer WIN";
            whoWin.innerHTML = `${username}: ${totalPlayer} <br> and <br> Dealer: ${totalDealer}`;
            gameResult.innerText = `You lost ${playerBet}`;
            gameResult.classList.add("animationZoom");
            audioLose.src = "assets/sound/you_lose.mp3";
            gameResult.style.color = "red";
            newBet.style.display = "flex";
         }, waitTime);
      } else if (totalDealer == totalPlayer) {
         betBtn.style.display = "block";
         inputBet.style.display = "block";
         hitBtn.style.display = "none";
         standBtn.style.display = "none";

         playerScore += playerBet * 1;

         setTimeout(() => {
            topInfoGame.innerText = "It's a TIE";
            gameResult.innerText = "It's a TIE";
            gameResult.classList.add("animationZoom");
            audioTie.src = "assets/sound/game_tie.mp3";
            gameResult.style.color = "yellow";
            whoWin.innerHTML = `${username}: ${totalPlayer} <br> and <br> Dealer: ${totalDealer}`;
            newBet.style.display = "flex";
         }, waitTime);
      } else {
         betBtn.style.display = "block";
         inputBet.style.display = "block";
         hitBtn.style.display = "none";
         standBtn.style.display = "none";

         playerScore += playerBet * 2;

         setTimeout(() => {
            topInfoGame.innerText = `${username} WIN`;
            whoWin.innerHTML = `${username}: ${totalPlayer} <br> and <br> Dealer: ${totalDealer}`;
            gameResult.innerText = `You won ${playerBet * 2}`;
            gameResult.classList.add("animationZoom");
            audioWin.src = "assets/sound/you_win.mp3";
            gameResult.style.color = "green";
            newBet.style.display = "flex";
         }, waitTime);
      }
   }

   score.innerText = playerScore;
}

function bet() {
   newDeckOfCards();
   audioCardStart.src = "assets/sound/cardStart.wav";

   infoCard =
      `<p>${whoWin.innerText}</p><p>${gameResult.innerText}</p><hr>` + infoCard;
   BJrules.innerHTML = infoCard;

   bestScore = localStorage.getItem("bestScore");
   if (bestScore < playerScore) {
      bestScore = playerScore;
      localStorage.setItem("bestScore", bestScore);
   }
   BestScore.innerText = `${username} Best Score: ${bestScore}`;

   if (inputBet.value > playerScore) {
      playerBet = playerScore;
      inputBet.value = playerBet;
   } else {
      playerBet = inputBet.value;
   }
   playerScore -= playerBet;
   score.innerText = playerScore;

   pc1.style.display = "none";
   pc2.style.display = "none";
   dc1.style.display = "none";
   dc2.style.display = "none";
   pc3.style.display = "none";
   pc4.style.display = "none";
   pc5.style.display = "none";
   dc3.style.display = "none";
   dc4.style.display = "none";
   dc5.style.display = "none";

   setTimeout(() => {
      pc1.style.display = "block";
      pc2.style.display = "block";
      dc1.style.display = "block";
      dc2.style.display = "block";
      dc2.classList.add("dc2");
      dc2.style.backgroundImage = "radial-gradient(black, black)";
   }, 50);

   inputBet.style.display = "none";
   betBtn.style.display = "none";
   hitBtn.style.display = "block";
   standBtn.style.display = "block";
   whoWin.innerText = `${username}: ${totalPlayer} `;
   newBet.style.display = "none";
   gameResult.innerText = `${username} bet: ${playerBet}`;
   gameResult.style.color = "blue";
   gameResult.classList.remove("animationZoom");
   topInfoGame.innerText = "";

   waitTime = 500;
   checkPlayer();
}

function checkGameOver() {
   if (playerScore == 0) {
      whoWin.innerText = `You LOST - GAME OVER `;
      hitBtn.style.display = "none";
      standBtn.style.display = "none";
      betBtn.style.display = "none";
      newBet.innerText = "GAME OVER";
      audioCardEnd.src = "assets/sound/game_over.mp3";
   }
}
