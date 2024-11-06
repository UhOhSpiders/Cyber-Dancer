# Cyber Dancer
## About the project
Cyber Dancer is a web game written in JavaScript, with gameplay inspired by rhythm games like Dance Dance Revolution, Guitar Hero and Tap Tap Revenge. It is currently under development. An early-stage demo of the game can be accessed [here](https://amplify-2nd-attempt.d28mzey9qzv3tt.amplifyapp.com/).
### Built With
- [Three.js](https://threejs.org/)
- [Tone.js](https://tonejs.github.io/docs/14.9.17/index.html)
- [Tween.js](https://github.com/tweenjs/tween.js)
- [React](https://react.dev/)
- [DynamoDB](https://aws.amazon.com/dynamodb/)
- [AWS Amplify](https://aws.amazon.com/amplify/)
- [GraphQL](https://graphql.org/)

### How it works
#### Audio/Visual synchronization in a web browser
- An MP3 is played by a Tone.js [Player](https://tonejs.github.io/docs/14.9.17/classes/Player.html) in sync with a specially authored MIDI track. Each note within this MIDI track triggers a new visual.
- The MIDI track generates no audio, and is used purely for signal purposes. [Tone.js parses it](https://github.com/Tonejs/Midi) and schedules callback functions to create the graphics via its [Draw class](https://tonejs.github.io/docs/14.9.17/functions/getDraw.html).
- This approach allows for the straightforward authoring of new levels using a digital audio workstation. A MIDI track can be recorded in real-time alongside an MP3, "quantized" automatically, and then easily tweaked if needed.
- The pitch information of a note is passed as an argument to the scheduled callback function, and determines which column the note falls in.

#### 3D animation in a web browser
- This project uses the popular Three.js library to display the graphics.
- The models and animations were created in Blender, and exported as a glTF file. 

#### Structure/Integration with React
- The menu system for the game is built with React.
- The game's logic is structured through classes, and its rendered output is exposed as a canvas element to the React VDOM through a useCallback hook.
- The 3D graphics are dependent on a glTF file which is handled through a custom useLoadGame hook. This hook prevents things like level and character selection from being displayed prematurely. 
- Once the assets are loaded, this hook then passes an instance of the game as a prop to the relevant React components.
- When a level finishes, a custom event containing the score information is dispatched. The React app listens for this and displays the score and further options to the user.
- _Note: Another popular approach to Three.js/React integration is React Three Fiber - a library which turns many aspects of the Three.js library into useful React-friendly components. I decided that the game logic I wanted to implement would be better suited to vanilla Three.js._

#### DynamoDB, GraphQL & Continuous Deployment with AWS Amplify
- The highscore leaderboard is built with a NoSQL DynamoDB database, alongside a GraphQL API.
- After defining an appropriate GraphQL schema, these resources were generated and deployed via the AWS Amplify CLI.
- This repository is deployed continuously via AWS Amplify.

#### Asset Authoring
- Graphics are created with [Blender](https://www.blender.org/). Blurbs for each character were also authored in Blender via a custom text property. This text can be displayed during character selection.
- MIDI tracks are created with [Reaper](https://www.reaper.fm/) - although there are a wide variety of DAWs which offer this functionality.

## To-dos
### Game logic:
- Add glow effects to indicate streaks
- Debug level complete menu appearing if level is incomplete 
### Animation:
- Add stumble animation
- Animate more moves
- Add baseline looping dance throughout track
### UI/UX:
- Improve miss logic (?)
- Add a multitouch event listener for better mobile gameplay. Only exact taps register as clicks at the minute. Slight dragging/swiping & simultaneous taps don't register.