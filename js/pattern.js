const dots = [...document.querySelectorAll(".dot")];
const message = document.getElementById("message");
const loginButton = document.getElementById("loginButton");
const resetButton = document.getElementById("resetButton");

const svg = document.getElementById("patternCanvas");

let pattern = [];
let drawing = false;
let currentLine = null;

// --------------------
// ドットの中心座標
// --------------------
function getCenter(dot) {
    const rect = dot.getBoundingClientRect();
    const svgRect = svg.getBoundingClientRect();

    return {
        x: rect.left + rect.width / 2 - svgRect.left,
        y: rect.top + rect.height / 2 - svgRect.top
    };
}

// --------------------
// 線を描く
// --------------------
function drawLine(dot1, dot2) {

    const p1 = getCenter(dot1);
    const p2 = getCenter(dot2);

    const line = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
    );

    line.setAttribute("x1", p1.x);
    line.setAttribute("y1", p1.y);
    line.setAttribute("x2", p2.x);
    line.setAttribute("y2", p2.y);
    line.setAttribute("stroke", "#2563eb");
    line.setAttribute("stroke-width", "6");
    line.setAttribute("stroke-linecap", "round");

    svg.appendChild(line);
}

// --------------------
// ドット選択
// --------------------
function activateDot(dot) {

    const id = Number(dot.dataset.id);

    if (pattern.includes(id)) return;

    if (pattern.length > 0) {

        const prev = document.querySelector(
            `.dot[data-id="${pattern[pattern.length - 1]}"]`
        );

        drawLine(prev, dot);
        function updateCurrentLine(x, y) {

    if (!currentLine || pattern.length === 0) return;

    currentLine.setAttribute("x2", x);
    currentLine.setAttribute("y2", y);
}

function startCurrentLine(dot) {

    const p = getCenter(dot);

    currentLine = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
    );

    currentLine.setAttribute("x1", p.x);
    currentLine.setAttribute("y1", p.y);
    currentLine.setAttribute("x2", p.x);
    currentLine.setAttribute("y2", p.y);
    currentLine.setAttribute("stroke", "#60a5fa");
    currentLine.setAttribute("stroke-width", "4");
    currentLine.setAttribute("stroke-linecap", "round");

    svg.appendChild(currentLine);
}

function finishCurrentLine() {

    if (currentLine) {
        currentLine.remove();
        currentLine = null;
    }

}
        
    }

    pattern.push(id);

    dot.classList.add("active");
}

// --------------------
// リセット
// --------------------
function clearPattern() {

    pattern = [];

    dots.forEach(dot => {
        dot.classList.remove("active");
    });

    svg.innerHTML = "";

    message.textContent = "";
}

// --------------------
// マウス操作
// --------------------
dots.forEach(dot => {

    dot.addEventListener("mousedown", () => {

        drawing = true;
        activateDot(dot);

    });

    dot.addEventListener("mouseenter", () => {

        if (drawing) {
            activateDot(dot);
        }

    });

});

document.addEventListener("mouseup", () =>　｛


    if (!drawing) return;

    const rect = svg.getBoundingClientRect();

    updateCurrentLine(
        e.clientX - rect.left,
        e.clientY - rect.top
    );

});

// --------------------
// タッチ操作
// --------------------
dots.forEach(dot => {

    dot.addEventListener("touchstart", e => {

        e.preventDefault();

        drawing = true;

        activateDot(dot);

    });

    dot.addEventListener("touchmove", e => {

        e.preventDefault();

        const touch = e.touches[0];

        const element = document.elementFromPoint(
            touch.clientX,
            touch.clientY
        );

        if (element && element.classList.contains("dot")) {
            activateDot(element);
            finishCurrentLine();
startCurrentLine(dot);
        }

    });

});

document.addEventListener("touchend", () => {

    drawing = false;

});

// --------------------
// ログイン
// --------------------
loginButton.addEventListener("click", () => {

    if (pattern.length < 4) {

        message.style.color = "#dc2626";
        message.textContent = "4点以上選択してください";

        return;
    }

    message.style.color = "#16a34a";
    message.textContent = "入力パターン: " + pattern.join("-");

});

// --------------------
// リセット
// --------------------
resetButton.addEventListener("click", clearPattern);
