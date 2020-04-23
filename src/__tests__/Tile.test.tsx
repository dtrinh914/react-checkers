import React from 'react';
import Tile from '../Tile';
import {PieceClass} from '../Piece';
import {render, cleanup} from '@testing-library/react';
import {DndProvider} from 'react-dnd';
import Backend from 'react-dnd-test-backend';

afterEach(cleanup);

const mockFunction = () => {
};

const renderTile = (index:number, black:boolean, piece: null | PieceClass) => {
    return render(<DndProvider backend={Backend}>
                    <Tile index={index} black={black} piece={piece} 
                        movePiece={mockFunction} size={100} />
                  </DndProvider>);
};

test('should render black tile', ()=>{
    const {getByTestId} = renderTile(0, true, null);
    expect(getByTestId('tile').style.backgroundColor).toBe('rgb(117, 117, 117)');
});

test('should render white tile', ()=>{
    const {getByTestId} = renderTile(0, false, null);
    expect(getByTestId('tile').style.backgroundColor).toBe('rgb(238, 238, 238)');
});