
/* ========================================================================== */
/* ========================================================================== */
/* ======================== ES 16 Mar 22 High Card Dom ====================== */
/* ========================================================================== */
/* ========================================================================== */

/* ========================================================================== */
/* ============================== Game logic ================================ */
/* ========================================================================== */
/* ========================================================================== */

// Game instructions
// Break deck into two halves 
// Each player draws a card
// Take turns opening
// Compare, higher card wins 


// Can draw five cards, highest difference wins

/* ========================================================================== */
/* ========================================================================== */
/* ============================== Helper function =========================== */
/* ========================================================================== */
/* ========================================================================== */

// Global variables 

var player1Deck = []
var player2Deck = []

var player1Hand = []
var player2Hand = []

var newDeck = []
var myOutputValue = ""

var numberOfPlayer1Clicks = 0
var numberOfPlayer2Clicks = 0
var maxNumberOfClicks = ""

var gameMode = "player1draw"

var inputField = document.getElementById("inputField");
var buttonChoose = document.getElementById("inputButton");
var button1 = document.getElementById("buttonPlayer1");
var button2 = document.getElementById("buttonPlayer2");
var buttonNext = document.getElementById("next");
var buttonRestart = document.getElementById("restart");

// Create deck, repeat 13 * 4

var createDeck = function (localDeck) {
  var localDeck = [];
  var suitArray = ["clubs","diamonds","hearts","spades"]
  
  // Create 4 suits


  for (var i = 0; i <4; i++) {
  // Create 13 cards
  
  for (var j = 1; j<=13; j++) {
    
    var cardRank = j;
    var cardOrder = j
    var cardName = j;
    // Change name of picture card
    
    if (cardRank === 1) {
      cardName = "ace";
    }
    if (cardRank === 11) {
      cardName = "jack";
    }
    if (cardRank === 12) {
      cardName = "queen";
    }
    if (cardRank === 13) {
      cardName = "king";
    }
    
    
    var card = {
      rank: cardRank,
      name: cardName,
      suit: cardSuit,
      order: cardOrder
    }
    
    var cardSuit = suitArray[i]

      if (cardSuit == "diamonds") {
        card.order = card.order + 13 
      }
      if (cardSuit == "hearts") {
        card.order = card.order + 26 
      }
      if (cardSuit == "spades") {
        card.order = card.order + 39 
      }

      localDeck.push(card)
    }
  }
  return localDeck
}

newDeck = createDeck()
console.log(createDeck())


// Shuffle it
var localDeck2 = [];
var shuffleDeck = function(localDeck2) {
  for (var i = 0; i < localDeck2.length; i++) {
    var currentCard = localDeck2[i];
    var randomCard = localDeck2[Math.ceil((Math.random()*localDeck2.length)-1)]
    localDeck2[i] = randomCard;
    localDeck2[Math.ceil((Math.random()*localDeck2.length)-1)] = currentCard;
  }
  return localDeck2
}

// Create a shuffled deck
newDeck = shuffleDeck(newDeck);
console.log(newDeck)

// Split into two
player1Deck = newDeck.splice(0,26)
player2Deck = newDeck
console.log(player1Deck, player2Deck)

// Converting string to image

var convertArrayToImageLink = function (array) {
  var output = "";
  for (var index = 0; index < array.length; index++) {
    var card = array[index];
    var image =
      '<img src="https://raw.githubusercontent.com/Ardeeter/Blackjack-exercise/main/images/' +
      card.rank +
      "_of_" +
      card.suit +
      '.png"/>';
    output = output + image;
  }
  return output;
};

// let obj = {"you": 100, "me": 75, "foo": 116, "bar": 15};

// let entries = Object.entries(obj);
// // [["you",100],["me",75],["foo",116],["bar",15]]

// let sorted = entries.sort((a, b) => a[1] - b[1]);
// // [["bar",15],["me",75],["you",100],["foo",116]]


function findHighestCard(array) {
  var valueArray = []
  for (let i = 0; i < array.length; i++) {
    var card = array[i]
    valueArray.push(card.rank)
  }
  var max = Math.max(...valueArray)
  return max
}

function findLowestCard(array) {
  var valueArray = []
  for (let i = 0; i < array.length; i++) {
    var card = array[i]
    valueArray.push(card.rank)
  }
  var min = Math.min(...valueArray)
  return min
}

function findLowestFullCard(array) {
  for (let i = 0; i < array.length; i++) {
    var lowestCard = array[0]
    if (array[i]["rank"]<array[0]["rank"]) { // strangely, need to put rank in quotes
      lowestCard = array[i]
    }
  } 
  console.table(lowestCard)
  return lowestCard
}

 function findHighestFullCard(array) {
  for (let i = 0; i < array.length; i++) {
    var highestCard = array[0]
    if (array[i]["rank"]>array[0]["rank"]) {
      highestCard = array[i]
    }
  } 
  console.table(highestCard)
  return highestCard
 }


/* ========================================================================== */
/* ========================================================================== */
/* ============================== Game function ============================= */
/* ========================================================================== */
/* ========================================================================== */

// Open cards (now an array when draw multiple cards)
      
      var player1CardOutputBox = document.getElementById("player1Card")
      document.body.appendChild(player1CardOutputBox)
      
  // Create player 2 card output box 
      var player2CardOutputBox = document.getElementById("player2Card")
      document.body.appendChild(player2CardOutputBox)
       
  // Create statement output box
  var wordsOutputBox = document.getElementById("output-div");

  // Using input to determine array length
  
  buttonChoose.addEventListener("click",() => {
    var input = document.getElementById("inputField")
    maxNumberOfClicks = input.value
    console.log(maxNumberOfClicks)
    buttonChoose.style.visibility = "hidden"
    inputField.style.visibility = "hidden"
          wordsOutputBox.innerHTML = "Player 1 can click now."

  })
  
  // Player 1 button
  button1.addEventListener("click", () => {
    // Countdown timer 
    var countdown = setTimeout (greetings, 1000) 
    function greetings () {
      wordsOutputBox.innerHTML = "Player 2 can click now."
    } 
    if (gameMode == "player1draw") {
    if (numberOfPlayer1Clicks<maxNumberOfClicks) {
      // Draw 5 cards; loop 5 times
      for (var i = 0; i < maxNumberOfClicks; i++) {
        player1Hand.push(player1Deck.pop())
        // Convert to image; loop 5 times
        var imageOfPlayer1Cards = convertArrayToImageLink(player1Hand);
        player1CardOutputBox.innerHTML = "Player 1 " + imageOfPlayer1Cards 
      }
      // Convert to words; no loop
      console.table(player1Hand)
      var player1Words = ""
      player1Words = "Player 1 drew these cards. It is player 2's turn to draw.";
      wordsOutputBox.innerHTML = player1Words
    }
    numberOfPlayer1Clicks++
    gameMode = "player2draw"
    button1.style.visibility = "hidden" 
  }
    else {
        var player1difference = findHighestCard(player1Hand)- findLowestCard(player1Hand)
        var player2difference = findHighestCard(player2Hand)- findLowestCard(player2Hand)
        console.log(player1difference)
        console.log(player2difference)

        var highLowArray1 = []
        highLowArray1.push(findLowestFullCard(player1Hand))
        highLowArray1.push(findHighestFullCard(player1Hand))
        player1CardOutputBox.innerHTML = "Player 1's winning cards " + convertArrayToImageLink(highLowArray1)

        var highLowArray2 = []
        highLowArray2.push(findLowestFullCard(player2Hand))
        highLowArray2.push(findHighestFullCard(player2Hand))
        player2CardOutputBox.innerHTML = "Player 2's winning cards " + convertArrayToImageLink(highLowArray2)

        if (gameMode == "whoWins"){
          if (player1difference > player2difference) {
            myOutputValue = "Player 1 wins. Click to play again." 
          } else if (player1difference < player2difference) {
            myOutputValue = "Player 2 wins. Click to play again.";
          } else {
            myOutputValue = "It's a tie. Click to play again.";
          }
          wordsOutputBox.innerHTML = myOutputValue;
        }
          gameMode = "reset"
          buttonNext.style.visibility = "hidden"
      }
    
  })

  // Player 2 button
  button2.addEventListener("click", () => {
    if (gameMode == "player2draw") {
      // Draw 5 cards; loop 5 times
      for (var l = 0; l <maxNumberOfClicks; l++) {
        player2Hand.push(player2Deck.pop())
        // Convert to image; loop 5 times
        var imageOfPlayer2Cards = convertArrayToImageLink(player2Hand);
        player2CardOutputBox.innerHTML = "Player 2 " + imageOfPlayer2Cards 
      }
      // Convert to words; no loop
      console.table(player2Hand)
      var player2Words = ""
      player2Words = "Player 2 drew these cards. Click to see who wins.";
      wordsOutputBox.innerHTML = player2Words
    }
    numberOfPlayer2Clicks++
    gameMode = "whoWins"
    button2.style.visibility = "hidden" 
      })

      


// Find max and min card from an array
// function findLowestCard(array) {
//   // remember don't need to declare var array = [] when used as an input because it will cause infinity. 
//   var valueArray = []
//   for (let i = 0; i < array.length; i++) {
//     var card = array[i]
//     valueArray.push(card.rank)
//   }
//   var min = Math.min(...valueArray)
//   return min
// }


// Button next - who wins 
  buttonNext.addEventListener("click", () => {
    var player1difference = findHighestCard(player1Hand)- findLowestCard(player1Hand)
    var player2difference = findHighestCard(player2Hand)- findLowestCard(player2Hand)
    console.log(player1difference)
    console.log(player2difference)

    var highLowArray1 = []
    highLowArray1.push(findLowestFullCard(player1Hand))
    highLowArray1.push(findHighestFullCard(player1Hand))
    player1CardOutputBox.innerHTML = "Player 1's winning cards " + convertArrayToImageLink(highLowArray1)

    var highLowArray2 = []
    highLowArray2.push(findLowestFullCard(player2Hand))
    highLowArray2.push(findHighestFullCard(player2Hand))
    player2CardOutputBox.innerHTML = "Player 2's winning cards " + convertArrayToImageLink(highLowArray2)

    if (gameMode == "whoWins"){
      if (player1difference > player2difference) {
        myOutputValue = "Player 1 wins. Click to play again." 

      } else if (player1difference < player2difference) {
        myOutputValue = "Player 2 wins. Click to play again.";
      } else {
        myOutputValue = "It's a tie. Click to play again.";
      }
      wordsOutputBox.innerHTML = myOutputValue;
    }
    gameMode = "reset"
      buttonNext.style.visibility = "hidden"

    })

// Button restart
    buttonRestart.addEventListener("click", () => {
     if (gameMode == "reset") {
       player1Hand = []
       player2Hand = []
       wordsOutputBox.innerHTML = "Player 1, click to draw."
       player1CardOutputBox.innerHTML = ""
       player2CardOutputBox.innerHTML = ""
      }
      gameMode = "player1draw"

      inputField.style.visibility = "visible"
      buttonChoose.style.visibility = "visible"
      button1.style.visibility = "visible"
      button2.style.visibility = "visible"
      buttonNext.style.visibility = "visible"
      buttonRestart.style.visibility = "visible"
      inputField.value = ""
  })




