
//import { drawBoard } from "./drawBoard.js";
import { drawBoard, getSudoku, solveSudoku } from "./sudokuLogic.js";
import { InputSudokuFunc, solveInput } from "./InputSudokuGame.js";

window.socialMedia=socialMedia;
function main(){
    drawBoard();
    window.addEventListener("load", ()=>getSudoku());
    document.getElementById("getSudoku").addEventListener("click", ()=>getSudoku());
    document.getElementById("solveSudoku").addEventListener("click", ()=>solveSudoku());
    document.getElementById("inputSudoku").addEventListener("click",()=>InputSudokuFunc());
    document.getElementById("solveInputSudoku").addEventListener("click", ()=>solveInput());

}
function socialMedia(id){
    if(id==="github"){
        window.open("https://github.com/ShrutiKishore15", "_blank");
    }
    else{
        window.open("https://www.linkedin.com/in/shruti-kishore-ba474222a", "_blank");
    }
}
main();

