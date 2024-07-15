# Cyber Dancer
## About the project
Cyber Dancer is a web game written in JavaScript, with gameplay inspired by rhythm games like Dance Dance Revolution, Guitar Hero and Tap Tap Revenge. It is currently under development. An early-stage demo of the game can be accessed [here](https://cyber-dancer.vercel.app/).
### Built With
- Three.js
- Tone.js
- Tween.js
- React

### How it works
#### Visual/audio synchronization in a web browser
- An MP3 is played by Tone.js's Player class. 
- A specially authored MIDI track is played in sync with this. Each note within this track triggers a new visual.
- The MIDI track generates no audio, and is used purely for signal purposes. Tone.js parses the MIDI track, and via Tone.js's Draw class, schedules callback functions to create the graphics. 
- This approach allows for the straightforward authoring of new levels using any DAW. MIDI tracks can be recorded in real-time alongside the MP3, "quantized" automatically, and then easily tweaked if needed.
- Although the user can't hear the MIDI track, the pitch information of each note is passed as an argument to the scheduled callback function, and determines which collumn the note falls in. The pitch information is also used to select specific dance moves for the animated characters. This aims to create identifiable sequences and give a sense of choreography to the dance routines.

#### 3D animation in a web browser
- This project uses the popular Three.js library to display the graphics.
- The models and animations were created in Blender, and exported as a glTF file. 

#### Structure/Integration with React
- The menu system for the game is built with React.
- The game's logic is structured through classes, and its rendered output is exposed as a canvas element to the React VDOM through a useCallback hook.
- The game's graphics are dependent on a glTF file which is loaded via a custom useLoadGame hook. This hook prevents things like level and character selection from being displayed prematurely. 
- An instance of the game is then passed as a prop to the relevant React components, for chararcter and level selection.
- _Note: Another popular approach to Three.js/React integration is React Three Fiber - a library which turns many aspects of the Three.js library into useful React-friendly components. I decided that the game logic I wanted to implement would be better suited to vanilla Three.js._

#### Asset Authoring
- Graphics are created with Blender. Blurbs for each character were also authored in Blender via a custom text property. This text can be displayed during character selection.
- MIDI tracks are created with Reaper - although there are a wide variety of DAWs which offer this functionality.

## To-dos
### General:
- Rename noteColumn name for readability?
- Rename gltfName
- Level selection 
### Menus:
- Give visuals to character selection
### Animation logic:
- Filter animations to specific characters
### Animation:
- Add stumble animation
- Animate more moves
- Add baseline looping dance throughout track
### Game logic:
- Streak bonus
### Display:
- Bind score display position to camera position
