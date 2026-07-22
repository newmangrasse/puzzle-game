const puzzle = document.getElementById("puzzle");
const movesDisplay = document.getElementById("moves");

let tiles = [1, 2, 3, 4, 5, 6, 7, 8, null];
let moves = 0;

function drawPuzzle() {
    puzzle.innerHTML = "";

    tiles.forEach((tile, index) => {
        const tileElement = document.createElement("div");

        tileElement.classList.add("tile");

        if (tile === null) {
            tileElement.classList.add("empty");
        } else {
            tileElement.textContent = tile;
            tileElement.addEventListener("click", () => moveTile(index));
        }

        puzzle.appendChild(tileElement);
    });

    movesDisplay.textContent = moves;
}

function moveTile(index) {
    const emptyIndex = tiles.indexOf(null);

    const row = Math.floor(index / 3);
    const column = index % 3;

    const emptyRow = Math.floor(emptyIndex / 3);
    const emptyColumn = emptyIndex % 3;

    const isAdjacent =
        (row === emptyRow && Math.abs(column - emptyColumn) === 1) ||
        (column === emptyColumn && Math.abs(row - emptyRow) === 1);

    if (isAdjacent) {
        [tiles[index], tiles[emptyIndex]] =
        [tiles[emptyIndex], tiles[index]];

        moves++;

        drawPuzzle();

        checkWin();
    }
}

function shufflePuzzle() {
    for (let i = tiles.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));

        [tiles[i], tiles[randomIndex]] =
        [tiles[randomIndex], tiles[i]];
    }

    moves = 0;
    drawPuzzle();
}

function checkWin() {
    const winningOrder = [1, 2, 3, 4, 5, 6, 7, 8, null];

    if (JSON.stringify(tiles) === JSON.stringify(winningOrder)) {
        setTimeout(() => {
            alert(`You won in ${moves} moves!`);
        }, 100);
    }
}

drawPuzzle();
