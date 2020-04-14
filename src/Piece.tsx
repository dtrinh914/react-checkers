import React from 'react';

export interface PieceProps{
    player: number
    king: boolean
}

const Piece: React.FC<PieceProps> = ({player, king}) => {
    const color = player === 1 ? ['#b71c1c','#e53935'] : ['#212121','#424242'];
    
    const pieceStyle : React.CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        height: '80%',
        borderRadius: '100px',
        backgroundColor: color[0],
        boxShadow: '3px 3px 3px 1px #424242'
    }

    const innerStyle: React.CSSProperties = {
        width:'79%',
        height:'79%',
        borderRadius: '100px',
        backgroundColor: color[1]
    }
    
    return (
        <div style={pieceStyle}>
            <div style={innerStyle}>
            </div>
        </div>
    )
};

export default Piece;