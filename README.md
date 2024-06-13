# DDR Clone To-dos

## Animation logic:
- Figure out responsive fall-speed of notes based on height of container
 - **easiest fix: Use css media queries to add a breakpoint for mobile, but otherwise keep the container at a set height & eyeball/guestimate a hardcoded speed of the blocks. Create a seperate hardcoded value for the mobile layout if needs be.**
## Music:
- Use DAW to make a midi track that is synced to an MP3
- Play mp3 in sync with this using tonejs
- Write function to generate a switch statement of notes/moves based on any given midi track & set of animations
## Animation:
- Model character
- Animate moves
- Model/animate background
## Game logic:
- Event listener logic for note hit/note miss
- Bind animations to note hit/note miss
- Scoring
    - If we're sticking with threejs note blocks, the score could be based off of the note block's world position when a player hits a key relative to the world position when the note is actually played by the midi track. 
