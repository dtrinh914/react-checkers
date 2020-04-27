This is the board game, Checkers aka English draughts, built in React.

There are many variants on this game. <br />
The rules found here are used to build this version of the game: <br />
https://en.wikipedia.org/wiki/English_draughts/

This project is split into three main components, listed here from top to bottom: <br />
1. Board
2. Tile
3. Piece

The game state and logic is handled by a custom react hook, useBoard. <br /> 
This hook returns the state and a function to handle the movement of checker pieces.

The drag and drop user interface is implement with react-dnd: <br />
https://github.com/react-dnd/react-dnd

Currently, there is a rudimentary computer opponent that will make a random move on their turn.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
