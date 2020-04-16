import {useState} from 'react';
import {TileClass} from '../Tile';
import {PieceClass} from '../Piece';
import {updateBoard, indexToCoordinates} from '../util/gameLogic';

export interface GameState{
    playerTurn: 1 | 2
    winner: 1 | 2 | false
    tiles: TileClass[]
}

const initialState = () => {
    const tiles: TileClass[] = [];

    for(let i = 0; i < 64; i++){
        const [x,y] = indexToCoordinates(i);
        const piece = pieceExist(x,y);
        tiles.push({index:i, black: (x + y) % 2 === 1, piece: piece})
    }

    const state : GameState = {playerTurn:1, winner: false, tiles: tiles}

    return updateBoard(state);

    function pieceExist(x:number,y:number): PieceClass | null {
        const piece:PieceClass = {player: 1, king: false, canDrag:[]}

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

const useBoard = (init = initialState()):any => {
    const [boardState, setBoardState] = useState(init);

    const handleBoardState = (state:GameState) => {
        setBoardState(updateBoard(state));
    }
    return [boardState, handleBoardState];
}

export default useBoard;