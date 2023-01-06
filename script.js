const resizeGridButton = document.createElement("button");
resizeGridButton.type = "button";
resizeGridButton.innerText = "Resize Grid";
resizeGridButton.addEventListener("click", resizeGrid);
document.querySelector("body").append(resizeGridButton);

let gridSize = 50;
function resizeGrid() {
  let userInput;
  do {
    userInput = +prompt(
      "Enter the number of squares per side of the new grid (min = 16, max = 100)",
      gridSize
    );
    if (userInput === 0) return;
  } while (userInput < 16 || userInput > 100 || !userInput);

  gridSize = userInput;
}

const gridContainer = document.createElement("div");
gridContainer.setAttribute("class", "grid-container");
const gridDimension = 800;

const cellSize = Math.floor(gridDimension / gridSize);
for (let row = 0; row < gridSize; row++) {
  let rowContainer = document.createElement("div");
  rowContainer.setAttribute("class", "row-container");
  rowContainer.id = row;
  for (let col = 0; col < gridSize; col++) {
    let cell = document.createElement("div");
    cell.setAttribute("class", "cell");
    cell.id = col;
    cell.style.minWidth = cellSize + "px";
    cell.style.minHeight = cellSize + "px";
    rowContainer.append(cell);
  }
  gridContainer.append(rowContainer);
}

document.querySelector("body").append(gridContainer);
