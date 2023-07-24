// import { drawBoard } from "./drawBoard";
// drawBoard();

//const url="https://sugoku.onrender.com/board";
const url="https://sudoku-api.vercel.app/api/dosuku?query={newboard(limit:1){grids{value}}}";
function drawBoard(){
    const sudokuBoard=document.querySelector("#sudokuBoard");
    const squares = 81

    for (let i=0; i<squares; i++) {
        const inputElement = document.createElement("div")
        inputElement.classList.add('cell');
        //inputElement.classList.add('flex');

        if (
            ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i < 21) ||
            ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i < 27) ||
            ((i % 9 == 3 || i % 9 == 4 || i % 9 == 5) && (i > 27 && i < 53)) ||
            ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i > 53) ||
            ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i > 53)
        ) {
            inputElement.classList.add('odd-section')
        }

        sudokuBoard.appendChild(inputElement)
    }
}
async function getSudoku(){
    const response= await fetch(`${url}`);
    console.log(response);

}
function main(){
    drawBoard();
    window.addEventListener("load", ()=>getSudoku());
}
main();

