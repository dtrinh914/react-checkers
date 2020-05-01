import React,{useEffect} from 'react';
import Board from './Board';
import MultiBackend from 'react-dnd-multi-backend';
import HTML5toTouch from 'react-dnd-multi-backend/dist/esm/HTML5toTouch'; 
import {DndProvider} from 'react-dnd';

const appStyle : React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 'var(--app-height)',
  width: '100vw'
}

const App : React.FC = () => {
  useEffect(()=>{
    const appHeight = () => document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`);
    window.addEventListener('resize', appHeight);
    appHeight();

    return () => window.removeEventListener('resize', appHeight);
  }, []);

  return (
    <div style={appStyle}>
      <DndProvider backend={MultiBackend} options={HTML5toTouch}>
        <Board />
      </DndProvider>
    </div>
  )
}

export default App;
