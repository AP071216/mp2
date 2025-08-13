// Set game values and constants
const gameContainer = document.querySelector('.game-container');
const triesCountSpan = document.getElementById('tries-count');
const resetButton = document.getElementById('reset-btn');
const bestTriesSpan = document.getElementById('best-tries-count');
const colors = [
    '#af0c1fff', '#f28200', '#ffdb28', '#1fb819',
    '#00e1da', '#007bd8', '#8f2be7', '#fb4fd9'
];
let cardValues = [...colors, ...colors];
let flippedCards = [];
let matchedPairs = 0;
let tries = 0;
let bestTries = localStorage.getItem('bestTries') ? parseInt(localStorage.getItem('bestTries')) : null;


/**
 * Shuffles the cards when the game is started
 */
function shuffleCards(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

/**
 * Creates a card element with the given color 
 */
function makeCard(color) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.color = color;

        const cardInner = document.createElement('div');
        cardInner.classList.add('card-inner');

        const cardFront = document.createElement('div');
        cardFront.classList.add('card-front');
        cardFront.style.backgroundColor = color;

        const cardBack = document.createElement('div');
        cardBack.classList.add('card-back');

        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);

        card.addEventListener('click', cardClicked);
        return card;
}

/** 
 * Handles when cards are clicked and manages the game logic
*/
function cardClicked(event) {
    const card = event.currentTarget;

    // Nothing happens if a card is flipped or already matched
    if (card.classList.contains('flipped') || flippedCards.length === 2) {
        return;
    }

    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        tries++;
        triesCountSpan.textContent = tries;

        const [card1, card2] = flippedCards;
        if (card1.dataset.color === card2.dataset.color) {
            // If a match is found
            setTimeout(() => {
                card1.querySelector('.card-inner').classList.add('matched-animation');
                card2.querySelector('.card-inner').classList.add('matched-animation');
                flippedCards = [];
                matchedPairs++;
                if (matchedPairs === colors.length) {
                    // If all pairs are matched
                    // Update and save the best score here
                    if (bestTries === null || tries < bestTries) {
                        bestTries = tries;
                        localStorage.setItem('bestTries', bestTries);
                        bestTriesSpan.textContent = bestTries;
                        setTimeout(() => alert(`New Best Score! You won in ${tries} tries!`), 800);
                    } else {
                        setTimeout(() => alert(`Congratulations! You won in ${tries} tries!`), 800);
                    }
                }
            }, 800);
        } else {
            // If no match is found
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                flippedCards = [];
            }, 800);
        }
    }
}

 /**
 * Starts the game
 */
function startGame() {
        // Clear previous grid
        gameContainer.innerHTML = '';
        flippedCards = [];
        matchedPairs = 0;
        tries = 0;
        triesCountSpan.textContent = tries;

        bestTriesSpan.textContent = bestTries !== null ? bestTries : 'N/A';
        
        // Shuffle and create new cards
        shuffleCards(cardValues);
        cardValues.forEach(color => {
            const card = makeCard(color);
            gameContainer.appendChild(card);
        });
    }

// Reset button functionality
resetButton.addEventListener('click', startGame);

startGame()
