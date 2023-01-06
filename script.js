const newGridButton = document.createElement("button");
newGridButton.type = "button";
newGridButton.innerText = "New Grid";
newGridButton.addEventListener("click", newGrid);
document.querySelector("body").append(newGridButton);

let gridSize = 20;
const gridContainer = document.createElement("div");
gridContainer.setAttribute("class", "grid-container");
const gridDimension = 800;
buildGrid();

function buildGrid() {
  // Empty the grid if it already exists
  let child = gridContainer.lastElementChild;
  while (child) {
    gridContainer.removeChild(child);
    child = gridContainer.lastElementChild;
  }

  // Rebuild the grid
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
}

function newGrid() {
  let userInput;
  do {
    userInput = +prompt(
      "Enter the number of squares per side of the new grid (min = 16, max = 100)",
      gridSize
    );
    if (userInput === 0) return;
  } while (userInput < 16 || userInput > 100 || !userInput);

  gridSize = userInput;
  buildGrid();
}
