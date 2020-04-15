import React from 'react';
import Piece from '../Piece';
import {render, cleanup} from '@testing-library/react';

afterEach(cleanup);

test('should render player 1 piece', ()=>{
    const {getByTestId} = render(<Piece player={1} king={false} />);
    expect(getByTestId('piece-outer').style.backgroundColor).toBe('rgb(183, 28, 28)');
    expect(getByTestId('piece-inner').style.backgroundColor).toBe('rgb(229, 57, 53)');
});

test('should render player 2 piece', ()=>{
    const {getByTestId} = render(<Piece player={2} king={false} />);
    expect(getByTestId('piece-outer').style.backgroundColor).toBe('rgb(33, 33, 33)');
    expect(getByTestId('piece-inner').style.backgroundColor).toBe('rgb(66, 66, 66)');
});
