import {useState} from 'react';
import {TileClass} from '../Tile';
import {PieceClass} from '../Piece';
import {updateBoard, indexToCoordinates, movePiece} from '../util/gameLogic';
import {v4 as uuid} from 'uuid';

export interface GameState{
    playerTurn: 1 | 2
    winner: 1 | 2 | false
    tiles: TileClass[]
    numPieceOne: number
    numPieceTwo: number
    jumping: number | null
}

export const initialState = () => {
    const tiles: TileClass[] = [];

    for(let i = 0; i < 64; i++){
        const [x,y] = indexToCoordinates(i);
        const piece = pieceExist(x,y);
        tiles.push({id: uuid(), index:i, black: (x + y) % 2 === 1, piece: piece})
    }

    const state : GameState = {
                               playerTurn:1, 
                               winner: false, 
                               tiles: tiles,
                               numPieceOne: 12,
                               numPieceTwo: 12,
                               jumping: null
                              }

    return updateBoard(state);

    function pieceExist(x:number,y:number): PieceClass | null {
        const piece:PieceClass = {
                                  player: 1, 
                                  king: false, 
                                  canDrag:[], 
                                  hasJump:false
                                 }

        if(y <= 2 && (x+y) % 2 === 1){
            return {...piece, player: 2};
        } 
        else if(y >= 5 && (x+y) % 2 === 1){
            return piece;
        }
        else {
            return null;
        }
    }
}

const useBoard = (init = initialState()):[GameState, Function] => {
    const [boardState, setBoardState] = useState(init);

    const move:Function = (from:number, to:number) => {
        const newState = movePiece(from, to, boardState);
        setBoardState(newState);
    };

    return [boardState, move];
}

export default useBoard;