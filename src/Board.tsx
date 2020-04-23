import React, {useEffect, useRef, useState} from 'react';
import Tile from './Tile';
import useBoard from './hooks/useBoard';

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
        <div data-testid='board' ref={boardRef} style={boardStyle}>
            {boardState.tiles.map( tile  => <Tile key={tile.id} index={tile.index} black={tile.black} movePiece={movePiece}
                                                    piece={tile.piece} size={size} />)}
        </div>
    )
};

export default Board;
