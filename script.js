let boxes = document.querySelectorAll(".box");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let resetBtn = document.querySelector("#reset-btn");
let newBtn =document.querySelector("#new-btn");
let turnO = true; 
let count = 0;

// TO GET WINNER 

let winPattern = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

const getWinner = () =>{
    for(let pattern of winPattern){
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if( pos1val != "" && pos2val != "" && pos3val != "" ){
            if(pos1val === pos2val && pos2val === pos3val){
                console.log(`Winner is ${pos1val}`);
                showWinner(pos1val);
            }
        }
    }
};


const showWinner = (winner) =>{
    msg.innerHTML = `<p>Congratulations Player ${winner}, You Won</p>`;
    disable();
    msgContainer.classList.remove("hide");
};

// BUTTON DISABLE FEATURES

const enable = () =>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
        box.classList.add("box");
        box.classList.remove("box-used");
    }
};

const disable = () => {
    for(let box of boxes){
        box.disabled = true;
    }
};

// RESET GAME

let resetGame = () =>{
    count = 0;
    turnO = true;  // so that game always start with O
    msgContainer.classList.add("hide");
    enable();
}

// DRAW GAME 
const drawGame = () =>{
    console.log("Game is Drawn");
    msg.innerHTML = `<p>Game is Drawn</p>`;
    disable();
    msgContainer.classList.remove("hide");
};

// MAIN LOGIC 

boxes.forEach( box => box.addEventListener("click", () =>{
    if(turnO){
        box.innerHTML = "<p>O</p>";
        turnO = false;
        box.classList.remove("box");
        box.classList.add("box-used");
    }
    else{
        box.innerHTML = "<p>X</p>";
        turnO = true;
        box.classList.remove("box");
        box.classList.add("box-used");
    }
    box.disabled = true;
    let isWinner = getWinner();

    count++;
    if(count === 9 && !isWinner){
        drawGame();
    }
}));


// RESET AND NEW GAME LOGIC

resetBtn.addEventListener("click",resetGame);
newBtn.addEventListener("click",resetGame);