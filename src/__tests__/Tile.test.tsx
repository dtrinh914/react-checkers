import React from 'react';
import Tile from '../Tile';
import {render, cleanup} from '@testing-library/react';

afterEach(cleanup);

test('should render black tile', ()=>{
    const {getByTestId} = render(<Tile x={0} y={1} piece={null} />);
    expect(getByTestId('tile').style.backgroundColor).toBe('rgb(117, 117, 117)');
});

test('should render white tile', ()=>{
    const {getByTestId} = render(<Tile x={0} y={0} piece={null} />);
    expect(getByTestId('tile').style.backgroundColor).toBe('rgb(238, 238, 238)');
});