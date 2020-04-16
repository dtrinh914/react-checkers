import React, {useEffect, useRef} from 'react';
import Tile from './Tile';
import useBoard,{GameState} from './hooks/useBoard';
import MultiBackend from 'react-dnd-multi-backend';
import HTML5toTouch from 'react-dnd-multi-backend/dist/esm/HTML5toTouch'; 
import {DndProvider} from 'react-dnd';

const boardStyle : React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap'
}

const Board: React.FC = () => {
    const boardRef = useRef<HTMLDivElement>(null);

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

    const [boardState, setBoardState] = useBoard();

    const movePiece = (fromIndex:number, toIndex:number, canDrag:number[]) => {
        if(canDrag.includes(toIndex)){
            let newBoardState:GameState = {...boardState};
            let temp = newBoardState.tiles[toIndex].piece;
            newBoardState.tiles[toIndex].piece = newBoardState.tiles[fromIndex].piece;
            newBoardState.tiles[fromIndex].piece = temp;
            setBoardState(newBoardState);
        }
    };

    return(
        <DndProvider backend={MultiBackend} options={HTML5toTouch}>
            <div data-testid='board' ref={boardRef} style={boardStyle}>
                {boardState.tiles.map( tile  => <Tile key={tile.index} index={tile.index} black={tile.black} movePiece={movePiece}
                                                        piece={tile.piece} />)}
            </div>
        </DndProvider>
    )
};

export default Board;
