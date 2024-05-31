let playerCards = [];
let dealerCards = [];
const deck = [
    '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A',
    '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A',
    '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A',
    '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'
];

function getCardValue(card) {
    if (card === 'A') return 11;
    if (['K', 'Q', 'J'].includes(card)) return 10;
    return parseInt(card);
}

function updateUI() {
    document.getElementById('dealer').innerHTML = 'Dealer: ' + dealerCards.join(' ');
    document.getElementById('player').innerHTML = 'Player: ' + playerCards.join(' ');
}

function startGame() {
    playerCards = [drawCard(), drawCard()];
    dealerCards = [drawCard(), drawCard()];
    updateUI();
}

function drawCard() {
    return deck[Math.floor(Math.random() * deck.length)];
}

document.getElementById('hit').addEventListener('click', () => {
    playerCards.push(drawCard());
    updateUI();
});

document.getElementById('stand').addEventListener('click', () => {
    // Handle stand logic
    updateUI();
});

startGame();
