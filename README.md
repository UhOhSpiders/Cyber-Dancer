#DDR Clone To-dos

## Animation logic:
- figure out responsive fall-speed of notes based on height of container
  - fall speed question: how do you define the speed dynamically?
  - The 3d notes aren't translated/moved using pixel values right now, and I would probably have to use trigonometry to get them falling to the right point relative to the camera frame.
 - possible fix: make the notes 2d instead of 3d for easier maths. Could try experiment with moving 2d elements using the existing threejs animation loop, but might have to use another renderer
 - possible fix 2: could try having 3d notes very close to the camera (zero clipping frustum) so they behave as 2d
 - easiest fix: leave as is don't make the fall-speed or container size responsive
## Music:
- use DAW to make a midi track that is synced to an MP3
- play mp3 in sync with this using tonejs
- write function to generate a switch statement of notes/moves based on any given midi track & set of animations
## Animation:
- model character
- animate moves
- model/animate background
## Game logic:
- event listener logic for note hit/note miss
- bind animations to note hit/note miss
- scoring
