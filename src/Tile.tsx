import React from 'react';
import Piece from './Piece';
import {PieceClass} from './Piece';
import {ItemTypes} from './Constants';
import {useDrop} from 'react-dnd'

export interface TileClass {
    id?: string 
    index: number
    black : boolean
    piece: PieceClass | null
}

interface TileProps extends TileClass {
    movePiece: Function
    size: number
}

const Tile: React.FC<TileProps> = ({index, black, piece, movePiece, size}) => {

    //styling
    const tileColor = black ? 'rgb(117, 117, 117)' : 'rgb(238, 238, 238)';
    const TileStyle: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '12.5%',
        height: '12.5%',
        backgroundColor: tileColor
    }

    //drag and drop logic
    const [,drop] = useDrop({
        accept: ItemTypes.PIECE,
        drop: () => ({toIndex: index})
    })

    return (
        <div data-testid='tile' style={TileStyle} ref={drop}>
            {piece ? <Piece player={piece.player} canDrag={piece.canDrag} hasJump={piece.hasJump}
                        king={piece.king} index={index} movePiece={movePiece} size={size}  /> : ''}
        </div>
    )
};

export default Tile;
