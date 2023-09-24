let gameSeq=[];
let userSeq=[];
let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;
let h2 = document.querySelector("h2");
let h1 = document.querySelector(".score");
document.addEventListener("keypress", function(){
    if(started==false){
        console.log("Game Started");
        started=true;
    } 
    levelUp();
});

function levelUp(){
    userSeq=[];
    level++;
    h2.innerText = `Level ${level}`;
    
    //random button
    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameFlash(randBtn);
    gameSeq.push(randColor);
    console.log(`Current Sequence: ${gameSeq}`);
}

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 200);
}
function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(function() {
        btn.classList.remove("userFlash");
    }, 250);
}

function checkAns(idx){
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length==gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    } else{
        let colorBg = document.querySelector("body");
        colorBg.style.backgroundColor = "red";
        h2.innerText = `Game Over.. Press any key to start the game again...`;
        h1.innerText=  `Your Score is: ${level}.`;
        setTimeout(function(){
            colorBg.style.backgroundColor="white";
        },50);
        reset();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click", btnPress);
}
function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}
