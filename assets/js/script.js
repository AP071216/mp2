/**
 * Functions needed:
 * makeCard()
 * shuffleCards()
 * cardClicked()
 * startGame()
 * resetGame()
 */

// Set game values and constants
document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.querySelector('.game-container');
    const triesCount = document.getElementById('tries-count');
    const resetButton = document.getElementById('reset-btn');
    const colors = [
        '#e9162d', '#f28200', '#ffdb28', '#1fb819',
        '#00e1da', '#007bd8', '#8f2be7', '#fb4fd9'
    ];
    let cardValues = [...colors, ...colors];
    let flippedCards = [];
    let matchedPairs = 0;
    let tries = 0;
});

