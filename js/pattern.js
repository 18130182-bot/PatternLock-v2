const dots = [...document.querySelectorAll(".dot")];
const message = document.getElementById("message");
const loginButton = document.getElementById("loginButton");
const resetButton = document.getElementById("resetButton");

const svg = document.getElementById("patternCanvas");
const patternLock = document.getElementById("patternLock");
let lines = [];
let pattern = [];
let drawing = false;

function activateDot(dot){

    const id = Number(dot.dataset.id);

    if(pattern.includes(id)){
        return;
    }

    pattern.push(id);

    dot.classList.add("active");

}

function clearPattern(){

    pattern = [];

    dots.forEach(dot=>{

        dot.classList.remove("active");

    });

    message.textContent = "";

}

dots.forEach(dot=>{

    dot.addEventListener("mousedown",()=>{

        drawing = true;

        activateDot(dot);

    });

    dot.addEventListener("mouseenter",()=>{

        if(drawing){

            activateDot(dot);

        }

    });

});

document.addEventListener("mouseup",()=>{

    drawing = false;

});

loginButton.addEventListener("click",()=>{

    if(pattern.length<4){

        message.textContent="4点以上選択してください";

        return;

    }

    message.style.color="#16a34a";
    message.textContent="入力パターン: "+pattern.join("-");

});

resetButton.addEventListener("click",clearPattern);
