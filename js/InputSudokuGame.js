let board = [];
let puzzleInitial=[];
let puzzleFinal=[];
export function InputSudokuFunc(){
    clearBoard();
    drawInputBoard();
    return true;
}
function clearBoard(){
    for(let i=0; i<81; i++){
        let cellR=document.getElementById(i.toString());
        cellR.remove();
    }
}
function drawInputBoard(){
    const sudokuBoard = document.querySelector("#sudokuBoard")
    const squares = 81

    for (let i=0; i<squares; i++) {
        const inputElement = document.createElement("input")
        inputElement.classList.add('cell');
        inputElement.setAttribute('type', 'number')
        inputElement.setAttribute('min', '1')
        inputElement.setAttribute('max', '9')
        let idElement=i.toString()+"input"
        inputElement.setAttribute('id', idElement);

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
    document.getElementById("solveSudoku").style.display="none";
    document.getElementById("solveInputSudoku").style.display="inline";
}
export function insertValues() {
    const inputs = document.querySelectorAll('input')
    
    inputs.forEach((input) => {
        if(input.value) {
            board.push(parseInt(input.value))
            input.classList.add('input-el') 
        } else {
            board.push(0)
            input.classList.add('empty-el')
        }
    })
    addinPuzzle(board);
}
function addinPuzzle(input){
    let count=0;
    for(let i=0; i<9; i++){
        smallArr=[];
        for(let j=0; j<9; j++){
            smallArr.push(input[count]);
            count++;
        }
        puzzleInitial.push(smallArr);
        puzzleFinal.push(smallArr);
    }
}
export function solveInput(){
    solveHelper2(puzzleFinal);
    printFinalSudoku(puzzleFinal, puzzleInitial);
}
function solveHelper2(board){
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            // countBoard++;
            if (board[i][j] === 0) {
                for (let ch = 1; ch <= 9; ch++) {
                    if (isValid2(ch, i, j, board)) {
                        board[i][j] = ch;
                        // let boardCell1=document.getElementById(countBoard.toString());
                        // boardCell1.innerHTML=ch;
                        // boardCell1.style.color="rgba(206,28,44,255)";
                        if (solveHelper2(board)) {
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
function isValid2(ch, row, col, board) {
    for (let i = 0; i < 9; i++) {
        if (board[i][col] === ch) return false;
        if (board[row][i] === ch) return false;
        let valRow = 3 * Math.floor(row / 3) + Math.floor(i / 3);
        let valCol = 3 * Math.floor(col / 3) + (i % 3);
        if (board[valRow][valCol] === ch) return false;
    }
    return true;
}

export function printFinalSudoku(board, sudokuInitial){
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



