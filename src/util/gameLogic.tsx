import {GameState} from '../hooks/useBoard';
import {TileClass} from '../Tile';

// convert index to x,y coordinates
export const indexToCoordinates = (index: number) => {
    const x = index % 8;
    const y = Math.floor(index/8);
    return [x, y];
}

// convert x,y coordinates to index
export const coordinatesToIndex =  (x: number, y: number) => {
    if(x < 0 || x > 7 || y < 0 || y > 7) return undefined;
    return x + (y*8);
}

// get the mid point between two indices
export const getMidIndex = (fromIndex: number, toIndex:number) => {
    const mid = (fromIndex + toIndex) / 2;
    return mid;
}

// check if index is within bounds
export const withinBounds = (index:number) => {
    if(index >= 0 && index < 64){
        return true;
    } else {
        return false;
    }
};

// movement directions for different checker pieces
export const moveDirections = (player:1|2, king:boolean) => {
    if(king){
        return [[-1,-1],[1,-1],[1,1],[-1,1]];
    } else {
        return player === 1 ? [[-1,-1],[1,-1]] : [[1,1],[-1,1]];
    }
};

// check if tile has a piece
export const isTileEmpty = (index:number, state:GameState) => {
    return withinBounds(index) && state.tiles[index].piece ? false : true;
};

// check if tile has an enemy piece
export const hasEnemyPiece = (index:number, player:number, state: GameState) => {
    if(!withinBounds(index)) return false;

    const piece = state.tiles[index].piece;
    return piece && piece.player !== player;
};

// check if a piece can jump over the piece at the following index
export const canJump = (index:number, player:number, direction:number[], state: GameState) => {
    const [x,y] = indexToCoordinates(index);
    const newIndex = coordinatesToIndex(x + direction[0], y + direction[1]);

    if(newIndex === undefined) return false;
    return hasEnemyPiece(index,player,state) && isTileEmpty(newIndex,state);
}

// check if piece can move
export const canMove = (index:number, player:1|2, king:boolean, state:GameState) => {
    let directions = moveDirections(player, king);
    const [x,y] = indexToCoordinates(index);

    let canDrag:number[] = [];
    let hasJump:number[] = [];

    //check each direction of that the piece can move
    for(let i = 0; i < directions.length; i++){
        const adjX = directions[i][0], adjY = directions[i][1];
        const newIndex = coordinatesToIndex(x + adjX, y + adjY);

        if(newIndex === undefined) continue;

        // if the index is empty, the piece can move
        if(isTileEmpty(newIndex,state)){
            canDrag.push(newIndex);
        }
        // check if the piece has a valid jump in that direction
        else if (canJump(newIndex,player,directions[i], state)){
            const jumpIndex = coordinatesToIndex(x + (adjX * 2), y + (adjY * 2));
            if(jumpIndex !== undefined) hasJump.push(jumpIndex);
        } 
    }

    return [canDrag, hasJump];
};

export const handleJumping = (state:GameState) => {
    const newTilesState:TileClass[] = state.tiles.map(tile => {
        if(tile.index === state.jumping && tile.piece){
            const [ ,hasJump] = canMove(tile.index, tile.piece.player, tile.piece.king, state);
            const newPieceState = {...tile.piece, canDrag: hasJump};
            return {...tile, piece: newPieceState};
        } 
        else if (tile.piece) {
            const newPieceState = {...tile.piece, canDrag: []}
            return {...tile, piece: newPieceState};
        }
        else {
            return tile;
        }
    })

    return {...state, tiles:newTilesState};
}

export const handleMovement = (state:GameState) => {
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
};

export const updateBoard = (state:GameState) => {
    const newState = state.jumping !== null ? handleJumping(state) : handleMovement(state);
    return newState;
};

export const movePiece = (fromIndex:number, toIndex:number, state:GameState) => {
    const canDrag = state.tiles[fromIndex].piece?.canDrag;
    const hasJump = state.tiles[fromIndex].piece?.hasJump;

    if(canDrag && canDrag.includes(toIndex)){
        let newBoardState:GameState = {...state};
        let temp = newBoardState.tiles[toIndex].piece;
        newBoardState.tiles[toIndex].piece = newBoardState.tiles[fromIndex].piece;
        newBoardState.tiles[fromIndex].piece = temp;

        if(hasJump){
            handleCapture(fromIndex, toIndex, newBoardState);
            const currPiece = newBoardState.tiles[toIndex].piece;
            
            if(currPiece){
                const [,hasJump] = canMove(toIndex, currPiece.player, currPiece.king, newBoardState);
                newBoardState.jumping = hasJump.length > 0 ? toIndex : null;
            }
        }

        checkKing(toIndex, newBoardState);
        if(newBoardState.jumping === null) newBoardState.playerTurn = newBoardState.playerTurn === 1 ? 2 : 1;
        return updateBoard(newBoardState);
    }

    return updateBoard(state);
};

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
};

export const checkKing = (index:number, state:GameState) => {
    const piece = state.tiles[index].piece;

    if(!piece) return;

    if(piece.player === 1 && index < 8){
        piece.king = true;
    }

    if(piece.player === 2 && index >= 56){
        piece.king = true;
    }
};