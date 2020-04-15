import React from 'react';
import Board from '../Board';
import {render, cleanup} from '@testing-library/react';

afterEach(cleanup);

test('should render proper game board', ()=>{
    const {queryAllByTestId} = render(<Board />);

    //should render 64 tiles
    expect(queryAllByTestId('tile').length).toBe(64);

    //should render 24 game pieces
    expect(queryAllByTestId('piece-outer').length).toBe(24);
});