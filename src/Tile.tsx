import React from 'react';
import Piece from './Piece';
import {PieceProps} from './Board'

export interface TileProps {
    x: number
    y: number
    black: boolean
    piece: PieceProps | null
}

const blackTileStyle: React.CSSProperties = {
    width: '12.5%',
    height: '12.5%',
    backgroundColor: '#757575'
}

const whiteTileStyle: React.CSSProperties = {
    width: '12.5%',
    height: '12.5%',
    backgroundColor: '#eeeeee'
}

const Tile: React.FC<TileProps> = ({x,y, black, piece}) => {
    return (
        <div style={black ? blackTileStyle: whiteTileStyle}>
            {piece ? <Piece color={piece.color} king={piece.king} /> : ''}
        </div>
    )
};

export default Tile;
