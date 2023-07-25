import { drawBoard } from "./drawBoard.js";
import { getSudoku } from "./SudokuLogic.js";
import { solveSudoku } from "./SudokuLogic.js";
window.getSudoku=getSudoku;
window.solveSudoku=solveSudoku;
    
function main(){
    drawBoard();
    window.addEventListener("load", ()=>getSudoku());
}
main();

