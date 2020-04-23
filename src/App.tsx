import React from 'react';
import Board from './Board';
import MultiBackend from 'react-dnd-multi-backend';
import HTML5toTouch from 'react-dnd-multi-backend/dist/esm/HTML5toTouch'; 
import {DndProvider} from 'react-dnd';

const appStyle : React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  width: '100vw'
}

const App : React.FC = () => {
  return (
    <div style={appStyle}>
      <DndProvider backend={MultiBackend} options={HTML5toTouch}>
        <Board />
      </DndProvider>
    </div>
  )
}

export default App;
