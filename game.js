let playerHand = [];
let dealerHand = [];
let deck = [];
let gameOver = false;
let playerBalance = 1000;

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

// Function to display the hand with suit emojis
function displayHand(hand, elementId) {
    const handElement = document.getElementById(elementId);
    handElement.innerHTML = '';
    for (const card of hand) {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.innerHTML = `${card.value} ${getSuitEmoji(card.suit)}`;
        handElement.appendChild(cardElement);
    }
    // Display the score
    const scoreElement = document.getElementById(`${elementId}-score`);
    scoreElement.innerHTML = `Score: ${calculateScore(hand)}`;
}

// Function to return the suit emoji based on suit text
function getSuitEmoji(suit) {
    switch (suit) {
        case 'hearts':
            return '♥️';
        case 'diamonds':
            return '♦️';
        case 'clubs':
            return '♣️';
        case 'spades':
            return '♠️';
        default:
            return '';
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
        showNewGameButton();
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
        playerBalance += 100; // Adjust as needed for betting logic
    } else if (playerScore < dealerScore) {
        displayMessage('Dealer wins.');
        playerBalance -= 100; // Adjust as needed for betting logic
    } else {
        displayMessage('It\'s a tie.');
    }
    updateBalance();
    showNewGameButton();
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
    hideNewGameButton();
}

// Function to update the player's balance
function updateBalance() {
    document.getElementById('balance').innerText = `$${playerBalance}`;
}

// Function to show the "New Game" button and hide other buttons
function showNewGameButton() {
    document.getElementById('new-game').style.display = 'inline-block';
    document.getElementById('hit').style.display = 'none';
    document.getElementById('stand').style.display = 'none';
}

// Function to hide the "New Game" button and show other buttons
function hideNewGameButton() {
    document.getElementById('new-game').style.display = 'none';
    document.getElementById('hit').style.display = 'inline-block';
    document.getElementById('stand').style.display = 'inline-block';
}

// Event listeners for buttons
document.getElementById('hit').addEventListener('click', hit);
document.getElementById('stand').addEventListener('click', stand);
document.getElementById('new-game').addEventListener('click', newGame);

// Start a new game on load
newGame();
