const gridContainer = document.createElement("div");
gridContainer.setAttribute("class", "grid-container");
const gridSize = 16;

for (let row = 0; row < gridSize; row++) {
  let rowContainer = document.createElement("div");
  rowContainer.setAttribute("class", "row-container");
  rowContainer.id = row;
  for (let col = 0; col < gridSize; col++) {
    let cell = document.createElement("div.cell");
    cell.setAttribute("class", "cell");
    cell.id = col;
    cell.innerText = ""
    rowContainer.append(cell);
  }
  gridContainer.append(rowContainer);
}

document.querySelector("body").append(gridContainer);
