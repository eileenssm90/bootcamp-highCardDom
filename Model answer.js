/**
 * Add all elements from fromArray to the start of toArray.
 */
var addArray = function (fromArray, toArray) {
  var fromArrayIndex = 0;
  while (fromArrayIndex < fromArray.length) {
    // Add each element in fromArray to toArray individually
    toArray.unshift(fromArray[fromArrayIndex]);
    // Increment the index to operate on the next index of fromArray
    fromArrayIndex += 1;
  }
  return toArray;
};

/**
 * Create a standard 52-card deck
 */
var makeDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["hearts", "diamonds", "clubs", "spades"];

  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    var rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
      }

      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };

      // Add the new card to the deck
      cardDeck.push(card);

      // Increment rankCounter to iterate over the next rank
      rankCounter += 1;
    }

    // Increment the suit index to iterate over the next suit
    suitIndex += 1;
  }

  // Return the completed card deck
  return cardDeck;
};

/**
 * Get a random index ranging from 0 (inclusive) to max (exclusive).
 */
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

/**
 * Shuffle elements in the cardDeck array. Return the shuffled deck.
 */
var shuffleCards = function (cardDeck) {
  // Loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    // Select a random index in the deck
    var randomIndex = getRandomIndex(cardDeck.length);
    // Select the card that corresponds to randomIndex
    var randomCard = cardDeck[randomIndex];
    // Select the card that corresponds to currentIndex
    var currentCard = cardDeck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    // Increment currentIndex to shuffle the next pair of cards
    currentIndex += 1;
  }
  // Return the shuffled deck
  return cardDeck;
};

/*
Game Rules
1. The objective is to win all the cards
2. The deck is suffled and split evenly among the players
3. Players take turns drawing one card
4. Whoever has the highest card wins
5. If the cards are equal, it's "War"
6. If it's War,
  i. Each player draws 1 card face-down and 1 card face-up
  ii. The player with the highest face-up card wins
  iii. The winner gets all the cards
7. If both players run out of cards, it's a tie
8. If either player runs out of cards, they lose
*/

// Initialise the shuffled card deck before the game starts.
var deck = shuffleCards(makeDeck());

// Split the shuffled deck evenly across the player's and computer's hands.
// This also happens before the games starts, outside the main function.
var playerHand = deck.splice(0, 26);
var computerHand = deck;

/**
 * Each player action triggers the main function.
 */
var main = function (input) {
  // The player and computer each draw the top card from their hand.
  var playerCard = playerHand.pop();
  var computerCard = computerHand.pop();

  // Initialise an output value with the cards drawn by each player.
  var myOutputValue =
    "PLAYER: " +
    playerCard.name +
    " of " +
    playerCard.suit +
    "<br>COMPUTER: " +
    computerCard.name +
    " of " +
    computerCard.suit +
    "<br>";

  // If the player's card beats the computer's card, the player wins.
  if (playerCard.rank > computerCard.rank) {
    // The player adds both his and the computer's cards to the bottom of his hand.
    playerHand.unshift(playerCard);
    playerHand.unshift(computerCard);
    // Update output value to communicate player wins.
    myOutputValue = myOutputValue + "PLAYER WINS!<br>";
  }
  // If the computer's card beats the player's card, the computer wins.
  else if (computerCard.rank > playerCard.rank) {
    // The computer adds both his and the player's card to the bottom of his hand.
    computerHand.unshift(playerCard);
    computerHand.unshift(computerCard);
    // Update output value to communicate computer wins.
    myOutputValue = myOutputValue + "COMPUTER WINS!<br>";
  }
  // If the player's and computer's cards match, it's War.
  else {
    // Update output to communicate War.
    myOutputValue = myOutputValue + "It's WAR!<br>";
    // Create array to store cards used for War. The winner will receive all these cards.
    // add the 2 matching cards to the set of war cards.
    var warCards = [playerCard, computerCard];
    // Create boolean for while loop condition. When this boolean becomes false, end loop.
    var cardsEqual = true;

    // Continue to loop while both player's and computer's cards are of equal rank.
    while (cardsEqual) {
      // Draw 1 card face-down for player and computer respectively.
      var playerFaceDown = playerHand.pop();
      var computerFaceDown = computerHand.pop();
      // Draw 1 card face-up for player and computer respectively.
      var playerFaceUp = playerHand.pop();
      var computerFaceUp = computerHand.pop();
      // Store all War cards in warCards array for the eventual winner.
      warCards.push(playerFaceDown);
      warCards.push(computerFaceDown);
      warCards.push(playerFaceUp);
      warCards.push(computerFaceUp);

      // Compare face-up cards to determine winner.
      // The winner adds all War cards to the bottom of his hand.
      if (playerFaceUp.rank > computerFaceUp.rank) {
        // Set cardsEqual to false to end the loop.
        cardsEqual = false;
        // Add all war cards to bottom of player hand.
        playerHand = addArray(warCards, playerHand);
      } else if (playerFaceUp.rank < computerFaceUp.rank) {
        // Set cardsEqual to false to end the loop.
        cardsEqual = false;
        // Add all war cards to bottom of computer hand.
        computerHand = addArray(warCards, computerHand);
      }

      // If face-up cards are equal rank, repeat war.
      // Add the face-up cards of player and computer to output
      // so the player can see which cards were drawn.
      myOutputValue =
        myOutputValue +
        "<br>PLAYER: " +
        playerFaceUp.name +
        " of " +
        playerFaceUp.suit +
        "<br>COMPUTER " +
        computerFaceUp.name +
        " of " +
        computerFaceUp.suit;

      // If both player and computer have 0 or 1 card left, it's a tie
      // because we cannot draw 1 face-down and 1 face-up card per player.
      if (
        (playerHand.length == 0 && computerHand.length == 0) ||
        (playerHand.length == 1 && computerHand.length == 1)
      ) {
        // Set cardsEqual to false to end the loop.
        cardsEqual = false;
        // Append tie outcome to output value.
        myOutputValue = myOutputValue + "<br> GAME OVER! TIE";
      }
      // If player has 0 or 1 card left, and computer has more cards than player, player loses.
      else if (
        (playerHand.length == 0 || playerHand.length == 1) &&
        computerHand.length > playerHand.length
      ) {
        // Set cardsEqual to false to end the loop.
        cardsEqual = false;
        // Append player lose outcome to output value.
        myOutputValue = myOutputValue + "<br> GAME OVER! YOU LOSE";
      }
      // If computer has 0 or 1 card left, and player has more cards than computer, player wins.
      else if (
        (computerHand.length == 0 || computerHand.length == 1) &&
        playerHand.length > computerHand.length
      ) {
        // Set cardsEqual to false to end the loop.
        cardsEqual = false;
        // Append player win outcome to output value.
        myOutputValue = myOutputValue + "<br> GAME OVER! YOU WIN";
      }
    }
  }

  // Append current hand sizes to output.
  myOutputValue = myOutputValue + "<br>PLAYER HAND: " + playerHand.length;
  myOutputValue = myOutputValue + "<br>COMPUTER HAND: " + computerHand.length;

  // Return output to screen.
  return myOutputValue;
};