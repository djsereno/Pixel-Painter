const newGridButton = document.createElement("button");
newGridButton.type = "button";
newGridButton.innerText = "New Grid";
newGridButton.addEventListener("click", newGrid);
document.querySelector("body").append(newGridButton);

let gridSize = 20;
const gridContainer = document.createElement("div");
gridContainer.setAttribute("class", "grid-container");
buildGrid();

let mouseLeftDown = false;
document.body.onmousedown = () => (mouseLeftDown = true);
document.body.onmouseup = () => (mouseLeftDown = false);

function buildGrid() {
  // Empty the grid if it already exists
  let child = gridContainer.lastElementChild;
  while (child) {
    gridContainer.removeChild(child);
    child = gridContainer.lastElementChild;
  }

  // Rebuild the grid
  gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  gridContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      let cell = document.createElement("div");
      cell.classList.add("cell");
      cell.addEventListener("mouseover", (event) => {
        if (mouseLeftDown) event.target.classList.add("activated");
      });
      cell.addEventListener("mousedown", (event) => {
        event.target.classList.add("activated");
      });
      gridContainer.append(cell);
    }
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
