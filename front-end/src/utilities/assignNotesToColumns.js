export function assignNotesToColums(columnXPositions) {
    let assignedNotes = {};
    let columnIndex = 0;
  
    for (let step = 0; step < 12; step++) {
      if (columnIndex >= columnXPositions.length) {
        columnIndex=0
      }
  
      const noteNames = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
      assignedNotes[noteNames[step]] = columnXPositions[columnIndex];
  
      for (let octave = 1; octave <= 7; octave++) {
        assignedNotes[noteNames[step] + octave] = columnXPositions[columnIndex];
      }
  
      columnIndex++;
    }
    return assignedNotes;
  }