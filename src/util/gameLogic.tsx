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

const getMidIndex = (fromIndex: number, toIndex:number) => {
    const [fromX, fromY] = indexToCoordinates(fromIndex);
    const [toX, toY] = indexToCoordinates(toIndex);

    const midX = (fromX + toX) / 2;
    const midY = (fromY + toY) / 2;
    return coordinatesToIndex(midX,midY);
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
        return [[-1,-1],[1,-1],[1,1],[-1,1]];
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

export const canMove = (index:number, player:number, king:boolean, state:GameState) => {
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
    if(state.captureChain !== null){
        const newTilesState:TileClass[] = state.tiles.map(tile => {
            if(tile.index === state.captureChain && tile.piece){
                const [ ,hasJump] = canMove(tile.index, tile.piece.player, tile.piece.king, state);
                const newPieceState = {...tile.piece, canDrag: hasJump};
                return {...tile, piece: newPieceState};
            } else {
                return tile;
            }
        })

        return {...state, tiles:newTilesState};
    } else {
        const dragIndex = {};
        const jumpIndex = {};

        const tiles = state.tiles;
        const playerTurn = state.playerTurn;

        tiles.forEach( (tile) => {
            if(tile.piece && tile.piece.player === playerTurn){
                const [canDrag, hasJump] = canMove(tile.index, tile.piece.player, tile.piece.king, state);
                if(canDrag.length > 0) dragIndex[tile.index] = canDrag;
                if(hasJump.length > 0) jumpIndex[tile.index] = hasJump;
            }
        });

        const hasJump = Object.keys(jumpIndex).length > 0; 
        const canDragIndex = hasJump ? jumpIndex : dragIndex;

        const newTileState:TileClass[] = tiles.map( (tile,index) => {
            if(tile.piece){
                const newDrag = canDragIndex[index] ? canDragIndex[index] : [];
                const newPieceState = {...tile.piece, canDrag: newDrag, hasJump: hasJump}
                
                return {...tile, piece: newPieceState}
            } else {
                return tile;
            } 
        });
    
        return {...state, tiles:newTileState};
    }
    
}

export const handleCapture = (fromIndex:number, toIndex:number, state:GameState) => {
    const mid = getMidIndex(fromIndex, toIndex);

    if(!mid) return;

    const piece = state.tiles[mid].piece;

    if(!piece) return;

    if(piece.player === 1){
        state.numPieceOne--;
    } else {
        state.numPieceTwo--;
    }

    state.tiles[mid].piece = null;
}

export const checkKing = (index:number, state:GameState) => {
    const piece = state.tiles[index].piece;

    if(!piece) return;

    if(piece.player === 1 && index < 8){
        piece.king = true;
    }

    if(piece.player === 2 && index >= 56){
        piece.king = true;
    }
}