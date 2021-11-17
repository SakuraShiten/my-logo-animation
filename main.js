const canvas = document.querySelector("#mainCanvas");
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;
const ctx = canvas.getContext("2d");

const arrayCircle = [];

const sizeText = 85;
const circleLength = 200;
const arrayText = "Ветка Сакуры";
const widthLine = arrayText.length * (sizeText / 2);
const toLineWidth = canvas.width / 2 - widthLine / 2;
const moveLineWidth = canvas.width / 2 + widthLine / 2;
const heightLine = canvas.height / 2 - sizeText;

ctx.font = sizeText + "px PT Sans";

window.addEventListener("resize", () => {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    ctx.font = sizeText + "px Pangolin";
})

class circleDrawing {
    constructor() {
        this.posX = randomInteger(0, canvas.width + canvas.width / 3);
        this.size = randomInteger(6, 14);
        this.posY = -randomInteger(this.size, this.size * 100);
        this.speedX = 5;
        this.speedY = randomInteger(6, 8);
        this.speedMaxMin = 5;
        this.color = '#911f64';
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.posX, this.posY, this.size, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    update() {
        this.speedX = this.speedX - this.speedX / 100;
        this.posX += -this.speedX;
        if (this.speedY < this.speedMaxMin) this.speedY += this.speedMaxMin / 15;
        this.posY += this.speedY;
    }
    checkСollision() {
        if (this.posX >= toLineWidth + this.size &&
            this.posX <= moveLineWidth + this.size &&
            this.posY + this.size / 2 >= heightLine - this.size &&
            this.posY <= heightLine + this.size) {
            this.speedY = -randomInteger(2, 6);
            this.speedX = randomInteger(3, 6);
        }
    }
}

const addNewCircle = () => {
    for (let i = 0; i < circleLength - arrayCircle.length; i++) {
        arrayCircle.push(new circleDrawing());
    }
}

const draw = () => {
    for (let i = 0; i < arrayCircle.length; i++) {
        arrayCircle[i].draw();
        arrayCircle[i].update();
        arrayCircle[i].checkСollision();
        if (arrayCircle[i].posY - arrayCircle[i].size > canvas.height) {
            arrayCircle.splice(i, 1);
            i--;
        }
    }
}

const drawText = () => {
    ctx.fillStyle = `rgba(23,23,23)`;
    ctx.textAlign = "center";
    ctx.fillText(arrayText, canvas.width / 2, canvas.height / 2);
    ctx.beginPath();
    ctx.moveTo(toLineWidth, heightLine);
    ctx.lineTo(moveLineWidth, heightLine);
    ctx.closePath();
    ctx.strokeStyle = 'rgba(23,23,23)';
    ctx.lineWidth = 5;
    ctx.stroke();
}

const randomInteger = (min, max) => {
    const rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

const animate = () => {
    ctx.fillStyle = "rgba(225,225,225,0.04)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    addNewCircle();
    draw();
    drawText();

    requestAnimationFrame(animate);
}

animate();
