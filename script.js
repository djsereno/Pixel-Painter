// const newGridButton = document.createElement("button");
// newGridButton.type = "button";
// newGridButton.innerText = "New Grid";
// newGridButton.addEventListener("click", newGrid);
// document.querySelector(".settings-container").append(newGridButton);

let gridSize = 20;
const gridContainer = document.querySelector(".grid-container")
// gridContainer.setAttribute("class", "grid-container");
// gridContainer.setAttribute("oncontextmenu", "return false;");
buildGrid();

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
      cell.addEventListener("mouseover", (event) => changeColor(event));
      cell.addEventListener("mousedown", (event) => changeColor(event));
      gridContainer.append(cell);
    }
  }
  document.querySelector("body").append(gridContainer);
}

function changeColor(event) {
  if (event.buttons === 1) {
    event.target.classList.add("activated");
  } else if (event.buttons === 2) {
    event.target.classList.remove("activated");
  }
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
