const url="https://sudoku-api.vercel.app/api/dosuku?query={newboard(limit:1){grids{value}}}";
let sudokuInitial=[];
let sudokuFinal=[];

export async function getSudoku(){
    clearValues();
    const response= await fetch(`${url}`);
    const data=await response.json();
    const board=data.newboard.grids;
    //console.log(board[0].value);
    sudokuInitial=board[0].value;
   // sudokuFinal=[...board[0].value];
    for(let i=0; i<9; i++){
        let innerArray=[];
        for(let j=0; j<9; j++){
            innerArray.push(sudokuInitial[i][j]);
        }
        sudokuFinal.push(innerArray);
    }
    displaySudoku(board[0].value)
    
}
 function clearValues(){
    for(let i=0; i<81; i++){
        let sudokuCell=document.getElementById(i.toString());
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
                
                let sudokuCell=document.getElementById(count.toString());
                sudokuCell.innerHTML=sudoku[i][j];
                
            }
            count++;
        }
    }
}


export function solveSudoku(){
    solveHelper(sudokuFinal);
    printFinalSudoku(sudokuFinal, sudokuInitial);
}
// let countBoard=-1;
function solveHelper(board) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            // countBoard++;
            if (board[i][j] === 0) {
                for (let ch = 1; ch <= 9; ch++) {
                    if (isValid(ch, i, j, board)) {
                        board[i][j] = ch;
                        // let boardCell1=document.getElementById(countBoard.toString());
                        // boardCell1.innerHTML=ch;
                        // boardCell1.style.color="rgba(206,28,44,255)";
                        if (solveHelper(board)) {
                            return true;
                        } else {
                            board[i][j] = 0;
                            // let boardCell2=document.getElementById(count.toString());
                            // boardCell2.innerHTML="";
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

function printFinalSudoku(board, sudokuInitial){
    let count=0;
    for(let i=0; i<9; i++){
        for(let j=0; j<9; j++){
            if(sudokuInitial[i][j]===0){
                let sudokuCell=document.getElementById(count.toString());
                sudokuCell.innerHTML=board[i][j];   
                sudokuCell.style.color="rgba(206,28,44,255)";
            } 
            count++;
        }
    }
}