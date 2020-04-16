import {GameState} from '../hooks/useBoard';
import {TileClass} from '../Tile';



export const indexToCoordinates = (index: number) => {
    const x = index % 8;
    const y = Math.floor(index/8);
    return [x, y];
}

export const coordinatesToIndex =  (x: number, y: number) => {
    if(x < 0 || x > 7 || y < 0 || y > 7) return undefined;
    return x + (y*8);
}

const withinBounds = (index:number) => {
    if(index >= 0 && index < 64){
        return true;
    } else {
        return false;
    }
};

const moveDirections = (player:number, king:boolean) => {
    if(king){
        return [[-1,-1],[1,-1],[1,1],[1,-1]];
    } else {
        return player === 1 ? [[-1,-1],[1,-1]] : [[1,1],[-1,1]];
    }
};

const isTileEmpty = (index:number, state:GameState) => {
    return withinBounds(index) && state.tiles[index].piece ? false : true;
};

const hasEnemyPiece = (index:number, player:number, state: GameState) => {
    const piece = state.tiles[index].piece;
    return piece && piece.player !== player;
};

const canJump = (index:number, player:number, direction:number[], state: GameState) => {
    const [x,y] = indexToCoordinates(index);
    const newIndex = coordinatesToIndex(x + direction[0], y + direction[1]);

    if(newIndex === undefined) return false;
    return hasEnemyPiece(index,player,state) && isTileEmpty(newIndex,state);
}

const canMove = (index:number, player:number, king:boolean, state:GameState) => {
    let directions = moveDirections(player, king);
    const [x,y] = indexToCoordinates(index);

    let canDrag:number[] = [];
    let hasJump:number[] = [];

    for(let i = 0; i < directions.length; i++){
        const adjX = directions[i][0], adjY = directions[i][1];
        const newIndex = coordinatesToIndex(x + adjX, y + adjY);

        if(newIndex === undefined) continue;

        if(isTileEmpty(newIndex,state)){
            canDrag.push(newIndex);
        }
        else if (canJump(newIndex,player,directions[i], state)){
            const jumpIndex = coordinatesToIndex(x + (adjX * 2), y + (adjY * 2));
            if(jumpIndex !== undefined) hasJump.push(jumpIndex);
        } 
    }

    return [canDrag, hasJump];
};

export const updateBoard = (state:GameState) => {
    const dragIndex = {};
    const jumpIndex = {};

    const tiles = state.tiles;

    tiles.forEach( (tile) => {
        if(tile.piece){
            const [canDrag, hasJump] = canMove(tile.index, tile.piece.player, tile.piece.king, state);
            if(canDrag.length > 0) dragIndex[tile.index] = canDrag;
            if(hasJump.length > 0) jumpIndex[tile.index] = hasJump;
        }
    });

    const canDragIndex = Object.keys(jumpIndex).length > 0 ? jumpIndex : dragIndex;

    const newTileState:TileClass[] = tiles.map( (tile,index) => {
        if(tile.piece){
            const newDrag = canDragIndex[index] ? canDragIndex[index] : [];
            const newPieceState = {...tile.piece, canDrag: newDrag}
            
            return {...tile, piece: newPieceState}
        } else {
            return tile;
        } 
    });
    
    return {...state, tiles:newTileState};
}