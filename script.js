const penColorButton = document.querySelector("#pen-color");
const canvasColorButton = document.querySelector("#canvas-color");
const rainbowModeButton = document.querySelector("#rainbow-mode");
const darkModeButton = document.querySelector("#dark-mode");
const lightModeButton = document.querySelector("#light-mode");
const clearCanvasButton = document.querySelector("#clear-canvas");
const showGridButton = document.querySelector("#show-grid");
const gridSizeSlider = document.querySelector("#grid-size");
const gridSizeLabel = document.querySelector("#grid-size-label");
const gridContainer = document.querySelector(".grid-container");

let penColor = penColorButton.value;
let canvasColor = canvasColorButton.value;
let rainbowMode = false;
let rainbowColor = 0;
let darkMode = false;
let lightMode = false;
let gridsOn = false;
const shadeIncrement = 10;

penColorButton.addEventListener("change", (e) => handlePenChange(e.target.value));
canvasColorButton.addEventListener("change", (e) => handleCanvasChange(e.target.value));
rainbowModeButton.addEventListener("click", toggleRainbowMode);
darkModeButton.addEventListener("click", () => toggleShadeMode("dark"));
lightModeButton.addEventListener("click", () => toggleShadeMode("light"));
clearCanvasButton.addEventListener("click", clearCanvas);
showGridButton.addEventListener("click", showGrid);
gridSizeSlider.addEventListener("mousemove", (e) => updateSizeLabel(e.target.value));
gridSizeSlider.addEventListener("change", (e) => buildGrid(e.target.value, gridsOn));

gridContainer.style.backgroundColor = canvasColor;
buildGrid(gridSizeSlider.value);

function handlePenChange(color) {
  if (rainbowMode) toggleRainbowMode();
  penColor = color;
}

function handleCanvasChange(color) {
  canvasColor = color;
  gridContainer.style.backgroundColor = canvasColor;
}

function toggleRainbowMode() {
  rainbowMode = !rainbowMode;
  rainbowModeButton.classList.toggle("active");
}

function clearCanvas() {
  gridContainer.childNodes.forEach((child) => {
    child.classList.remove("activated");
    child.removeAttribute("style");
  });
}

function showGrid() {
  gridsOn = !gridsOn;
  showGridButton.classList.toggle("active");
  gridContainer.childNodes.forEach((child) => child.classList.toggle("bordered"));
}

function updateSizeLabel(gridSize) {
  gridSizeLabel.innerText = `${gridSize}x${gridSize}`;
}

function buildGrid(gridSize, bordered = false) {
  let child = gridContainer.lastElementChild;
  while (child) {
    gridContainer.removeChild(child);
    child = gridContainer.lastElementChild;
  }

  gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  gridContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      let cell = document.createElement("div");
      cell.classList.add("cell");
      if (bordered) cell.classList.add("bordered");
      cell.addEventListener("mouseover", (event) => changeColor(event));
      cell.addEventListener("mousedown", (event) => changeColor(event));
      gridContainer.append(cell);
    }
  }
}

function changeColor(event) {
  if (event.buttons === 1) {
    let isActivated = event.target.classList.contains("activated");

    if (darkMode || lightMode) {
      if (isActivated) {
        let brightness = /[0-9]+/.exec(event.target.style.filter);
        brightness ? (brightness = +brightness[0]) : (brightness = 100);
        let newBrightness;
        darkMode
          ? (newBrightness = Math.max(0, brightness - shadeIncrement))
          : (newBrightness = Math.min(500, brightness + shadeIncrement));
        event.target.style.filter = `brightness(${newBrightness}%)`;
      }
    } else if (rainbowMode) {
      event.target.classList.add("activated");
      event.target.style.removeProperty("filter");
      event.target.style.backgroundColor = RAINBOW[rainbowColor];
      rainbowColor = (rainbowColor + 1) % RAINBOW.length;
    } else {
      event.target.classList.add("activated");
      event.target.style.removeProperty("filter");
      event.target.style.backgroundColor = penColor;
    }
  } else if (event.buttons === 2) {
    event.target.classList.remove("activated");
    event.target.removeAttribute("style");
  }
}

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

const RAINBOW = [
  "#80F31F",
  "#A5DE0B",
  "#C7C101",
  "#E39E03",
  "#F6780F",
  "#FE5326",
  "#FB3244",
  "#ED1868",
  "#D5078E",
  "#B601B3",
  "#9106D3",
  "#6B16EC",
  "#472FFA",
  "#2850FE",
  "#1175F7",
  "#039BE5",
  "#01BECA",
  "#0ADCA8",
  "#1DF283",
  "#3AFD5D",
];
