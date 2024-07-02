let userSeq = [];
let gameSeq = [];

let h2 = document.querySelector("h2");

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

document.addEventListener("click", function() {
    if (!started) {
        console.log("Game has started");
        started = true;
        level = 0; // Ensure level is reset
        gameSeq = []; // Ensure gameSeq is reset
        levelUp();
    }
});

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 300);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    }, 300);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let rndm = Math.floor(Math.random() * 4); // Change to *4 to include all buttons
    let rndmColor = btns[rndm];
    let rndmBtn = document.querySelector(`.${rndmColor}`);
    gameSeq.push(rndmColor);
    console.log("Game sequence:", gameSeq);
    btnFlash(rndmBtn);
}

function check(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game over! Your score is <b>${level}</b> <br> Press any key to start`;
        reset();
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
    }
}

function btnPress() {
    let btn = this;

    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    console.log("User sequence:", userSeq);

    check(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
allBtns.forEach(btn => {
    btn.addEventListener("click", btnPress);
});

function reset() {
    started = false;
    level = 0;
    userSeq = [];
    gameSeq = [];
}
