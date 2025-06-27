// ai assisted with the stlye, simular to how style50 works //
let deck = [];
let playerHand = [];
let dealerHand = [];

let suits = ['H', 'D', 'S', 'C'];
let values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
// ai assisted with logic for code //
// calculates the value of cards, and deals with ace //
function getHandValue(hand) {
    let total = 0;
    let aceCount = 0;

    for (let i = 0; i < hand.length; i++) {
        let value = hand[i].slice(0, -1);
        if (value === 'A') {
            total += 11;
            aceCount++;
        } else if (value === 'J' || value === 'Q' || value === 'K') {
            total += 10;
        } else {
            total += parseInt(value);
        }
    }

    while (total > 21 && aceCount > 0) {
        total -= 10;
        aceCount--;
    }

    return total;
}
// ai assisted with logic for code //
function createDeck() {
    deck = [];
    for (let i = 0; i < suits.length; i++) {
        for (let j = 0; j < values.length; j++) {
            deck.push(values[j] + suits[i]);
        }
    }
    deck.sort(() => Math.random() - 0.5);
}

function dealCard(hand) {
    let card = deck.pop();
    hand.push(card);
}
// ai assisted with logic for code //
function showHand(hand, placeId) {
    let place = document.getElementById(placeId);
    place.innerHTML = '';
    for (let i = 0; i < hand.length; i++) {
        let img = document.createElement('img');
        img.src = 'images/' + hand[i] + '.png';
        img.style.width = '200px';
        img.style.margin = '10px';
        place.appendChild(img);
    }
}
// ai assisted with logic for code //
// this is how results are shown//
function showResult() {
    let p = getHandValue(playerHand);
    let d = getHandValue(dealerHand);
    let msg = '';

    if (p > 21) {
        msg = 'You busted, Dealer wins.';
    } else if (d > 21) {
        msg = 'Dealer busted, You win.';
    } else if (p > d) {
        msg = 'You win.';
    } else if (p < d) {
        msg = 'Dealer wins.';
    } else {
        msg = "It's a push.";
    }

    document.getElementById('game-message').innerText = msg;
    document.querySelector('.resetlink').style.display = 'inline';  // Shows reset link //
}

function dealerTurn() {
    showHand(dealerHand, 'dealer-cards');
    while (getHandValue(dealerHand) < 17) {
        dealCard(dealerHand);
        showHand(dealerHand, 'dealer-cards');
    }
    showResult();
}
// ai assisted with logic for code //
// big section resposible for, starting game, set up cards, connecting buttons //
window.onload = function () {
    createDeck();

    playerHand = [];
    dealerHand = [];

    dealCard(playerHand);
    dealCard(playerHand);
    dealCard(dealerHand);

    showHand(playerHand, 'player-cards');
    showHand(dealerHand, 'dealer-cards');

    document.getElementById('hit').onclick = function () {
        dealCard(playerHand);
        showHand(playerHand, 'player-cards');

        if (getHandValue(playerHand) > 21) {
            showResult();
        }
    };

    document.getElementById('stand').onclick = function () {
        dealerTurn();
    };
};
