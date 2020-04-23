import React from 'react';
import Board from '../Board';
import {render, cleanup} from '@testing-library/react';
import {DndProvider} from 'react-dnd';
import Backend from 'react-dnd-test-backend';

afterEach(cleanup);

const renderBoard = () => {
    return render(<DndProvider backend={Backend} >
                    <Board />
                  </DndProvider>);
};

test('should render proper game board', ()=>{
    const {queryAllByTestId} = renderBoard();

    //should render 64 tiles
    expect(queryAllByTestId('tile').length).toBe(64);

    //should render 24 game pieces
    expect(queryAllByTestId('piece-outer').length).toBe(24);
});