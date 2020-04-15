import React, {useEffect, useState, useRef} from 'react';
import Tile, { TileClass } from './Tile';
import {PieceClass} from './Piece';
import MultiBackend from 'react-dnd-multi-backend';
import HTML5toTouch from 'react-dnd-multi-backend/dist/esm/HTML5toTouch'; 
import {DndProvider} from 'react-dnd';

const boardStyle : React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap'
}

const Board: React.FC = () => {
    const boardRef = useRef<HTMLDivElement>(null);

    const initialState: TileClass[] = [];

    for(let i = 0; i < 64; i++){
        const x = i % 8;
        const y = Math.floor(i/8);
        const piece = pieceExist(x,y);
        initialState.push({index:i, x:x , y: y, piece: piece})
    }

    function pieceExist(x:number,y:number): PieceClass | null {
        if(y <= 2 && (x+y) % 2 === 1){
            return {player: 1, king: false}
        } 
        else if(y >= 5 && (x+y) % 2 === 1){
            return {player: 2, king: false}
        }
        else {
            return null;
        }
    }

    //logic to keep 1:1 aspect ratio of board
    useEffect(()=>{
        const resizeBoard = () => {
            const height = window.innerHeight;
            const width = window.innerWidth;
            const side = `${Math.min(height, width)}px`;

            if(boardRef && boardRef.current){
                boardRef.current.style.setProperty('height', side);
                boardRef.current.style.setProperty('width', side);
            }
        }

        resizeBoard();
        window.addEventListener('resize', resizeBoard);

        return () => window.removeEventListener('resize', resizeBoard);
    }, []);

    const [boardState, setBoardState] = useState(initialState);

    const movePiece = (toIndex:number, fromIndex:number) => {
        let newBoardState = [...boardState];

        let temp = newBoardState[toIndex].piece;
        newBoardState[toIndex].piece = newBoardState[fromIndex].piece;
        newBoardState[fromIndex].piece = temp;
        
        setBoardState(newBoardState);
    }

    return(
        <DndProvider backend={MultiBackend} options={HTML5toTouch}>
            <div data-testid='board' ref={boardRef} style={boardStyle}>
                {boardState.map( tile  => <Tile key={tile.index} index={tile.index} movePiece={movePiece} 
                                                x={tile.x} y={tile.y} piece={tile.piece} />)}
            </div>
        </DndProvider>
    )
};

export default Board;
