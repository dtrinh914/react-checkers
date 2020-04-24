import {GameState} from '../hooks/useBoard';

export const getRandMove = (state:GameState):[number,number] => {
    //index of tiles that has a piece that can be moved
    const candidates: number[] = [];

    // search board for candidates
    state.tiles.forEach(tile => {
        if(tile.piece && tile.piece.player === 2 && tile.piece.canDrag.length > 0){
            candidates.push(tile.index);
        }
    });

    // chooses a random candidate
    if(candidates.length === 0) return [-1,-1];
    const randCan = Math.floor(Math.random() * candidates.length);
    const fromIndex = candidates[randCan];

    //check if piece exists
    const choosenPiece = state.tiles[fromIndex].piece;
    if(!choosenPiece) return [-1,-1];

    //choose a random move from the candidate
    const possibleMoves = choosenPiece.canDrag;
    const randMove = Math.floor(Math.random() * possibleMoves.length);
    const toIndex = possibleMoves[randMove];

    return [fromIndex, toIndex];
};

// returns new state with highlighted piece and tile
export const showMove = (from:number, to:number, state:GameState) => {
    const newTiles = state.tiles.map( tile => {
        if(tile.index === from && tile.piece){
            const newPiece = {...tile.piece, AISelected:true};
            return {...tile, piece:newPiece};
        } 
        else if (tile.index === to){
            return {...tile, AIMoveTo: true};
        } else {
            return tile;
        }
    });

    return {...state, tiles:newTiles} 
};