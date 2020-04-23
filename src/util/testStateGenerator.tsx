import {GameState, initialState} from '../hooks/useBoard';
import {movePiece} from '../util/gameLogic';

// initial state when game starts
export const initState = ():GameState => {
    return initialState();
};

//state where p1 has a jump from 35 to 17
export const p1Jump = ():GameState => {
    let state = initState();
    
    state = movePiece(42,35,state);
    state = movePiece(17,26,state);
    return state;
}

//state where p2 has a jump from  30 to 44
export const p2Jump = ():GameState => {
    let state = initState();

    state = movePiece(46,37, state);
    state = movePiece(21,30, state);
    state = movePiece(44,35, state);
    return state;
}
