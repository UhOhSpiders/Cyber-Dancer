export function assignNotesToColumns(columnXPositions, keyEvent) {
    let assignedNotes = {};
    let columnIndex = 0;
  
    for (let step = 0; step < 12; step++) {
      if (columnIndex >= columnXPositions.length) {
        columnIndex=0
      }
  
      const noteNames = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
      // A: {XPosition: -0.11666666666666667, keyEvent: 'KeyS'}
      // the above structure means newly created notes can be positioned using "noteColumns[noteName].XPostition" and then added to the notes to hit object with the appropriate key "noteColumns[noteName].keyEvent"
      assignedNotes[noteNames[step]] = {"XPosition":columnXPositions[columnIndex],"keyEvent":keyEvent[columnIndex]};
  
      for (let octave = 1; octave <= 7; octave++) {
        assignedNotes[noteNames[step] + octave] = {"XPosition":columnXPositions[columnIndex],"keyEvent":keyEvent[columnIndex]};
      }
  
      columnIndex++;
    }
    return assignedNotes;
  }