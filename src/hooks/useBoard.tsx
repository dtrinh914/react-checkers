import {useState} from 'react';
import {TileClass} from '../Tile';
import {PieceClass} from '../Piece';
import {updateBoard, indexToCoordinates, handleCapture, checkKing, canMove} from '../util/gameLogic';
import {v4 as uuid} from 'uuid';

export interface GameState{
    playerTurn: 1 | 2
    winner: 1 | 2 | false
    tiles: TileClass[]
    numPieceOne: number
    numPieceTwo: number
    captureChain: number | null
}

const initialState = () => {
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
                               captureChain: null
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

const useBoard = (init = initialState()):any => {
    const [boardState, setBoardState] = useState(init);

    const handleBoardState = (state:GameState) => {
        setBoardState(updateBoard(state));
    }

    const movePiece = (fromIndex:number, toIndex:number, canDrag:number[], hasJump:boolean) => {
        if(canDrag.includes(toIndex)){
            let newBoardState:GameState = {...boardState};
            let temp = newBoardState.tiles[toIndex].piece;
            newBoardState.tiles[toIndex].piece = newBoardState.tiles[fromIndex].piece;
            newBoardState.tiles[fromIndex].piece = temp;

            if(hasJump){
                handleCapture(fromIndex, toIndex, newBoardState);
                const currPiece = newBoardState.tiles[toIndex].piece;
                
                if(currPiece){
                    const [,hasJump] = canMove(toIndex, currPiece.player, currPiece.king, newBoardState);
                    newBoardState.captureChain = hasJump.length > 0 ? toIndex : null;
                }
            }

            checkKing(toIndex, newBoardState);
            newBoardState.playerTurn = newBoardState.playerTurn === 1 ? 2 : 1;
            handleBoardState(newBoardState);
        }
    };

    return [boardState, movePiece];
}

export default useBoard;