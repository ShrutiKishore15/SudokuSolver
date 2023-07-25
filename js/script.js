// import { drawBoard } from "./drawBoard";
// drawBoard();

//const url="https://sugoku.onrender.com/board";
const url="https://sudoku-api.vercel.app/api/dosuku?query={newboard(limit:1){grids{value}}}";
let sudokuInitial=[];
let sudokuFinal=[];
function drawBoard(){
    const sudokuBoard=document.querySelector("#sudokuBoard");
    const squares = 81

    for (let i=0; i<squares; i++) {
        const inputElement = document.createElement("div")
        inputElement.classList.add('cell');
        //inputElement.classList.add('flex');
        inputElement.setAttribute("id", i.toString() );

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
        clearValues();
        const response= await fetch(`${url}`);
        const data=await response.json();
        const board=data.newboard.grids;
        //console.log(board[0].value);
        sudokuInitial=board[0].value;
        sudokuFinal=sudokuInitial;
        displaySudoku(board[0].value)
        
}
function clearValues(){
    for(let i=0; i<81; i++){
        sudokuCell=document.getElementById(i.toString());
        sudokuCell.innerHTML="";
    }
}

function displaySudoku(sudoku){
    //const board=document.querySelector("#sudokuBoard");
    //console.log(sudoku);
    let count=0;
    for(let i=0; i<9; i++){
        for(let j=0; j<9; j++){
            if(sudoku[i][j]!==0){
                
                sudokuCell=document.getElementById(count.toString());
                sudokuCell.innerHTML=sudoku[i][j];
                
            }
            count++;
        }
    }
}

function solveSudoku(){
    solveHelper(sudokuFinal);
    printFinalSudoku(sudokuFinal);
}
function solveHelper(board) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] === 0) {
                for (let ch = 1; ch <= 9; ch++) {
                    if (isValid(ch, i, j, board)) {
                        board[i][j] = ch;
                        if (solveHelper(board)) {
                            return true;
                        } else {
                            board[i][j] = 0;
                        }
                    }
                }
                return false;
            }
        }
    }
    return true;
}

function isValid(ch, row, col, board) {
    for (let i = 0; i < 9; i++) {
        if (board[i][col] === ch) return false;
        if (board[row][i] === ch) return false;
        let valRow = 3 * Math.floor(row / 3) + Math.floor(i / 3);
        let valCol = 3 * Math.floor(col / 3) + (i % 3);
        if (board[valRow][valCol] === ch) return false;
    }
    return true;
}

function printFinalSudoku(board){
    let count=0;
    for(let i=0; i<9; i++){
        for(let j=0; j<9; j++){ 
            sudokuCell=document.getElementById(count.toString());
            sudokuCell.innerHTML=board[i][j];   
            count++;
        }
    }
}

    
function main(){
    drawBoard();
    window.addEventListener("load", ()=>getSudoku());
}
main();

