import React from 'react';
import Piece from './Piece';
import {PieceProps} from './Piece'

export interface TileProps {
    x: number
    y: number
    black: boolean
    piece: PieceProps | null
}

const Tile: React.FC<TileProps> = ({x,y, black, piece}) => {
    const tileColor = black ? '#757575' : '#eeeeee';
    const TileStyle: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '12.5%',
        height: '12.5%',
        backgroundColor: tileColor
    }

    return (
        <div style={TileStyle}>
            {piece ? <Piece color={piece.color} king={piece.king} /> : ''}
        </div>
    )
};

export default Tile;
