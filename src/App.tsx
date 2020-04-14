import React from 'react';
import Board from './Board';

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
      <Board />
    </div>
  )
}

export default App;
