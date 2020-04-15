import React from 'react';
import {ItemTypes} from './Constants';
import {useDrag} from 'react-dnd';

export interface PieceClass{
    player: number
    king: boolean
}

interface PieceProps extends PieceClass{
    index: number
    movePiece: Function
}

const Piece: React.FC<PieceProps> = ({index, player, king, movePiece}) => {

    //styling
    const color = player === 1 ? ['rgb(183, 28, 28)','rgb(229, 57, 53)'] : ['rgb(33, 33, 33)','rgb(66, 66, 66)'];
    
    const outerStyle : React.CSSProperties = {
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
        backgroundColor: color[1],
    }

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
        <div data-testid='piece-outer' style={outerStyle} ref={drag} >
            <div data-testid='piece-inner' style={innerStyle}>
            </div>
        </div>
    )
};

export default Piece;