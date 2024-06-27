export function assignNotesToColums(columnXPositions, keyEvent) {
    let assignedNotes = {};
    let columnIndex = 0;
  
    for (let step = 0; step < 12; step++) {
      if (columnIndex >= columnXPositions.length) {
        columnIndex=0
      }
  
      const noteNames = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
      // {<noteName>:[<columnXPosition>,<keyEvent>]}
      // the above structure means newly created notes can be positioned using "noteColumns[noteName][0]" and then added to the notes to hit object with the appropriate key "noteColumns[noteName][1]"
      assignedNotes[noteNames[step]] = [columnXPositions[columnIndex],keyEvent[columnIndex]];
  
      for (let octave = 1; octave <= 7; octave++) {
        assignedNotes[noteNames[step] + octave] = [columnXPositions[columnIndex],keyEvent[columnIndex]];
      }
  
      columnIndex++;
    }
    return assignedNotes;
  }