// Define variables to keep track of the game state
let playerHand = [];
let dealerHand = [];
let deck = [];
let gameOver = false;

// Function to create a deck of cards
function createDeck() {
    const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const deck = [];
    for (const suit of suits) {
        for (const value of values) {
            deck.push({ suit, value });
        }
    }
    return deck;
}

// Function to shuffle the deck
function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

// Function to calculate the score of a hand
function calculateScore(hand) {
    let score = 0;
    let aceCount = 0;
    for (const card of hand) {
        if (card.value === 'J' || card.value === 'Q' || card.value === 'K') {
            score += 10;
        } else if (card.value === 'A') {
            score += 11;
            aceCount += 1;
        } else {
            score += parseInt(card.value);
        }
    }
    // Adjust for aces if score is over 21
    while (score > 21 && aceCount > 0) {
        score -= 10;
        aceCount -= 1;
    }
    return score;
}

// Function to display the hand
function displayHand(hand, elementId) {
    const handElement = document.getElementById(elementId);
    handElement.innerHTML = '';
    for (const card of hand) {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.innerHTML = `${card.value} of ${card.suit}`;
        handElement.appendChild(cardElement);
    }
}

// Function to display the message
function displayMessage(message) {
    const messageElement = document.getElementById('message');
    messageElement.innerText = message;
}

// Function to handle the "Hit" button click
function hit() {
    if (gameOver) return;
    playerHand.push(deck.pop());
    displayHand(playerHand, 'player');
    const playerScore = calculateScore(playerHand);
    if (playerScore > 21) {
        displayMessage('You busted! Dealer wins.');
        gameOver = true;
    }
}

// Function to handle the "Stand" button click
function stand() {
    if (gameOver) return;
    gameOver = true;
    // Dealer's turn
    while (calculateScore(dealerHand) < 17) {
        dealerHand.push(deck.pop());
    }
    displayHand(dealerHand, 'dealer');
    const playerScore = calculateScore(playerHand);
    const dealerScore = calculateScore(dealerHand);
    if (dealerScore > 21 || playerScore > dealerScore) {
        displayMessage('You win!');
    } else if (playerScore < dealerScore) {
        displayMessage('Dealer wins.');
    } else {
        displayMessage('It\'s a tie.');
    }
}

// Function to start a new game
function newGame() {
    deck = shuffleDeck(createDeck());
    playerHand = [deck.pop(), deck.pop()];
    dealerHand = [deck.pop(), deck.pop()];
    gameOver = false;
    displayHand(playerHand, 'player');
    displayHand(dealerHand, 'dealer');
    displayMessage('');
}

// Event listeners for the buttons
document.getElementById('hit').addEventListener('click', hit);
document.getElementById('stand').addEventListener('click', stand);
document.getElementById('new-game').addEventListener('click', newGame);

// Start a new game when the page loads
newGame();
