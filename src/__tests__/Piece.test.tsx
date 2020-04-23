import React from 'react';
import Piece from '../Piece';
import {render, cleanup, queryAllByTestId} from '@testing-library/react';
import {DndProvider} from 'react-dnd';
import Backend from 'react-dnd-test-backend';

afterEach(cleanup);

const mockFunction = () => {
}
const renderPiece = (player:number, king:boolean, canDrag:number[], hasJump:boolean, index:number) => {
    return render(<DndProvider backend={Backend}>
                    <Piece player={player} king={king} canDrag={canDrag} 
                        hasJump={hasJump} index={index} movePiece={mockFunction} size={100}/>
                  </DndProvider>)
};

test('should render player 1 piece', ()=>{
    const {getByTestId, queryByTestId} = renderPiece(1, false, [], false, 1);
    expect(getByTestId('piece-outer').style.backgroundColor).toBe('rgb(183, 28, 28)');
    expect(getByTestId('piece-inner').style.backgroundColor).toBe('rgb(229, 57, 53)');

    //should not have king icon
    expect(queryByTestId('piece-king')).toBeNull();
});

test('should render player 2 piece', ()=>{
    const {getByTestId} = renderPiece(2, false, [], false, 1)
    expect(getByTestId('piece-outer').style.backgroundColor).toBe('rgb(33, 33, 33)');
    expect(getByTestId('piece-inner').style.backgroundColor).toBe('rgb(66, 66, 66)');
});

test('should render active piece', () => {
    const {getByTestId} = renderPiece(1, false, [1,2,3], false, 2);
    expect(getByTestId('piece-outer').style.backgroundColor).toBe('rgb(255, 238, 88)');
});

test('should render king piece', () => {
    const {getByTestId} = renderPiece(1, true, [], false, 1);
    expect(getByTestId('piece-king')).toBeTruthy();
});
