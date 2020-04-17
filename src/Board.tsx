import React, {useEffect, useRef, useState} from 'react';
import Tile from './Tile';
import useBoard from './hooks/useBoard';
import MultiBackend from 'react-dnd-multi-backend';
import HTML5toTouch from 'react-dnd-multi-backend/dist/esm/HTML5toTouch'; 
import {DndProvider} from 'react-dnd';

const boardStyle : React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap'
}

const Board: React.FC = () => {
    const boardRef = useRef<HTMLDivElement>(null);
    const [size, setSize] = useState(0);

    //logic to keep 1:1 aspect ratio of board
    useEffect(()=>{
        const resizeBoard = () => {
            const height = window.innerHeight;
            const width = window.innerWidth;
            const min = Math.min(height,width);
            const side = `${min}px`;

            if(boardRef && boardRef.current){
                boardRef.current.style.setProperty('height', side);
                boardRef.current.style.setProperty('width', side);
            }
            setSize(min);
        }

        resizeBoard();
        window.addEventListener('resize', resizeBoard);

        return () => window.removeEventListener('resize', resizeBoard);
    }, []);

    const [boardState, movePiece] = useBoard();

    return(
        <DndProvider backend={MultiBackend} options={HTML5toTouch}>
            <div data-testid='board' ref={boardRef} style={boardStyle}>
                {boardState.tiles.map( tile  => <Tile key={tile.id} index={tile.index} black={tile.black} movePiece={movePiece}
                                                        piece={tile.piece} size={size} />)}
            </div>
        </DndProvider>
    )
};

export default Board;
