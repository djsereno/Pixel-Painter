// const newGridButton = document.createElement("button");
// newGridButton.type = "button";
// newGridButton.innerText = "New Grid";
// newGridButton.addEventListener("click", newGrid);
// document.querySelector(".settings-container").append(newGridButton);

let gridSize = 20;
const gridContainer = document.querySelector(".grid-container");
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

const clearCanvasButton = document.querySelector("#clear-canvas");
clearCanvasButton.addEventListener("click", clearCanvas);
function clearCanvas() {
  gridContainer.childNodes.forEach((child) =>
    child.classList.remove("activated")
  );
}

const showGridButton = document.querySelector("#show-grid");
let gridsOn = false;
showGridButton.addEventListener("click", showGrid);
function showGrid() {
  gridsOn = !gridsOn;
  showGridButton.classList.toggle("active");
  gridContainer.childNodes.forEach((child) =>
    child.classList.toggle("bordered")
  );
}

const darkModeButton = document.querySelector("#dark-mode");
const lightModeButton = document.querySelector("#light-mode");
let darkMode = false;
let lightMode = false;
darkModeButton.addEventListener("click", (e) => toggleShadeMode("dark"));
lightModeButton.addEventListener("click", (e) => toggleShadeMode("light"));
function toggleShadeMode(mode) {
  switch (mode) {
    case "dark":
      darkMode = !darkMode;
      darkModeButton.classList.toggle("active");
      if (darkMode) {
        lightMode = false;
        lightModeButton.classList.remove("active");
      }
      break;
    case "light":
      lightMode = !lightMode;
      lightModeButton.classList.toggle("active");
      if (lightMode) {
        darkMode = false;
        darkModeButton.classList.remove("active");
      }
      break;
  }
}
