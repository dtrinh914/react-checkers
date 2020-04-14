import React, {useEffect, useRef} from 'react';
import Tile from './Tile';

const boardStyle : React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap'
}

export interface PieceProps{
    color:string
    king: boolean
}

const Board: React.FC = () => {
    const boardRef = useRef<HTMLDivElement>(null);

    const initialState = [];
    for(let i = 0; i < 64; i++){
        const x = i % 8;
        const y = Math.floor(i/8);
        const piece = pieceExist(x,y);
        initialState.push({x:x , y: y, piece: piece})
    }

    function pieceExist(x:number,y:number): PieceProps | null {
        if(y <= 2 && (x+y) % 2 === 1){
            return {color:'red', king: false}
        } 
        else if(y >= 5 && (x+y) % 2 === 1){
            return {color: 'black', king: false}
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
    }, [])

    return(
        <div ref={boardRef} style={boardStyle}>
            {initialState.map( (tile, index) => <Tile key={index} x={tile.x} y={tile.y} piece={tile.piece} 
                                                        black={(tile.x + tile.y)% 2 === 1} />)}
        </div>
    )
};

export default Board;
