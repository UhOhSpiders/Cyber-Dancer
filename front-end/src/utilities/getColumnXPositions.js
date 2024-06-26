export function getColumnXPositions(totalWidth, columnCount){
    let columnXPositions = []
    let noteXPosition = 0 - totalWidth / 2
    for (let step = 0; step < columnCount; step++) {
        columnXPositions.push(noteXPosition);
        noteXPosition += totalWidth / (columnCount - 1);
      }
      return columnXPositions
}