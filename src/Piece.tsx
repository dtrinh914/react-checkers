import React from 'react';
import {ItemTypes} from './Constants';
import {useDrag} from 'react-dnd';

export interface PieceClass{
    player: 1 | 2
    king: boolean
    canDrag: number[]
    hasJump: boolean
}

interface PieceProps extends PieceClass{
    index: number
    movePiece: Function
    size: number
}

const Piece: React.FC<PieceProps> = ({player, king, canDrag, hasJump, index, movePiece, size}) => {

    //styling
    const color = player === 1 ? ['rgb(183, 28, 28)','rgb(229, 57, 53)'] : ['rgb(33, 33, 33)','rgb(66, 66, 66)'];
    const iconSize = `${size/21}px`
    
    let outerStyle : React.CSSProperties = {
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
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width:'79%',
        height:'79%',
        borderRadius: '100px',
        backgroundColor: color[1]
    }

    const kingStyle: React.CSSProperties = {
        color: color[0],
        fontSize: iconSize
    }

    if(canDrag.length > 0) outerStyle = {...outerStyle, backgroundColor:'rgb(255, 238, 88)'}

    //drag and drop logic
    const [, drag] = useDrag({
        item: {type: ItemTypes.PIECE},
        end: (item,monitor) => {
            const dropResult = monitor.getDropResult();
            if(item && dropResult){
                movePiece(index, dropResult.toIndex);
            }
        }
    });

    
    return (
        <div data-testid='piece-outer' style={outerStyle} ref={canDrag.length > 0 ? drag : null} >
            <div data-testid='piece-inner' style={innerStyle}>
                {king ? <i data-testid='piece-king' className="fas fa-crown" style={kingStyle}></i> : ''}
            </div>
        </div>
    )
};

export default Piece;