import * as gl from '../util/gameLogic';
import * as gen from '../util/testStateGenerator';

describe('indexToCoordinates function', ()=>{
    it.each`
    index | result
    ${0}  | ${[0,0]}
    ${7}  | ${[7,0]}
    ${8}  | ${[0,1]}
    ${63} | ${[7,7]}
    `('should return $result when index is $index', ({index, result}) => {
        expect(gl.indexToCoordinates(index)).toEqual(result);
    });
});

describe('coordinatesToIndex function', () => {
    it.each`
    coordinates | result
    ${[0,0]}    | ${0}
    ${[7,0]}    | ${7}
    ${[0,1]}    | ${8}
    ${[7,7]}    | ${63}
    `('should return $result when coordinates are $coordinates', ({coordinates,result}) => {
        const x = coordinates[0];
        const y = coordinates[1];

        expect(gl.coordinatesToIndex(x,y)).toEqual(result);
    });
});

describe('getMidIndex function', () => {
    it.each`
    from | to   | result
    ${0} | ${18}| ${9}
    ${34}| ${16}| ${25}
    ${16}| ${2} | ${9}
    ${61}| ${47}| ${54}
    `('returns $result when from = $from and to = $to', ({from, to, result})=>{
        expect(gl.getMidIndex(from, to)).toEqual(result);
    });
});

describe('withinBounds function', () => {
    it.each`
    index | result
    ${-1} | ${false}
    ${0}  | ${true}
    ${20} | ${true}
    ${63} | ${true}
    ${64} | ${false}
    `('returns $result when index = $index', ({index, result})=>{
        expect(gl.withinBounds(index)).toEqual(result);
    });
});

describe('moveDirections function' , () => {
    it.each`
    player | king    | result
    ${1}   | ${false}| ${[[-1,-1],[1,-1]]}
    ${2}   | ${false}| ${[[1,1],[-1,1]]}
    ${1}   | ${true} | ${[[-1,-1],[1,-1],[1,1],[-1,1]]}
    ${2}   | ${true} | ${[[-1,-1],[1,-1],[1,1],[-1,1]]}
    `('return $result when player = $player and king = $king',({player, king, result})=>{
        expect(gl.moveDirections(player,king)).toEqual(result);
    });
});

describe('isTileEmpty function', () => {
    const state = gen.initState();

    it.each`
    index | result
    ${9}  | ${true}
    ${-1} | ${true}
    ${64} | ${true}
    ${44} | ${false}
    `('returns $result when index = $index', ({index, result}) => {
        expect(gl.isTileEmpty(index, state)).toEqual(result);
    });
});

describe('hasEnemyPiece function', () => {
    const state = gen.initState();

    it.each`
    index | player | result
    ${14} | ${1}   | ${true}
    ${14} | ${2}   | ${false}
    ${53} | ${1}   | ${false}
    ${53} | ${2}   | ${true}
    ${25} | ${1}   | ${null}
    ${25} | ${2}   | ${null}
    ${-1} | ${1}   | ${false}
    ${64} | ${2}   | ${false}
    `('returns $result when index = $index', ({index, player, result})=>{
        expect(gl.hasEnemyPiece(index,player,state)).toEqual(result);
    });
});

describe('canJump function', () => {
    it('should have p1 jump', () => {
        const state = gen.p1Jump();
        expect(gl.canJump(26, 1, [-1,-1], state)).toEqual(true);
    });

    it('should have p2 jump', () => {
        const state = gen.p2Jump();
        expect(gl.canJump(37, 2, [-1,1], state)).toEqual(true);
    });

    it.each`
    index | player | directions
    ${17} | ${2}   | ${[1,1]}
    ${0}  | ${1}   | ${[-1,-1]}
    `('should not have jumps', ({index,player,directions}) => {
        const state = gen.initState();

        expect(gl.canJump(index,player,directions, state)).toEqual(false)
    })
});

describe('canMove function', () => {
    const state = gen.p1Jump();

    it.each`
    index | result
    ${0}  | ${[[],[]]}
    ${12} | ${[[],[]]}
    ${35} | ${[[28],[17]]}
    ${40} | ${[[33],[]]}
    ${26} | ${[[33],[]]}
    `('', ({index, result}) => {
        expect(gl.canMove(index, state)).toEqual(result);
    });
});