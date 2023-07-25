import { drawBoard, getSudoku, solveSudoku } from "./sudokuLogic.js";
import { InputSudokuFunc, solveInput } from "./InputSudokuGame.js";
import { socialMedia } from "./socialMediaFile.js";
window.socialMedia=socialMedia;
function main(){
    drawBoard();
    window.addEventListener("load", ()=>getSudoku());
    document.getElementById("getSudoku").addEventListener("click", ()=>getSudoku());
    document.getElementById("solveSudoku").addEventListener("click", ()=>solveSudoku());
    document.getElementById("inputSudoku").addEventListener("click",()=>InputSudokuFunc());
    document.getElementById("solveInputSudoku").addEventListener("click", ()=>solveInput());

}

main();

