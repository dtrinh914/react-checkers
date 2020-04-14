import React from 'react'

export interface PieceProps{
    color: string
    king: boolean
}

const Piece: React.FC<PieceProps> = ({color, king}) => {
    return (
        <div>
            {color}
        </div>
    )
};

export default Piece;