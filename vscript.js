const FRAME_SIZE = 700;
const DROPLET_LENGTH = 10;
const DROPLET_THICKNESS = 2;
const Y_LOWER_LIMIT = 250;
const Y_UPPER_LIMIT = 280;

let numDroplets = 100;
let dropletX = [];
let dropletY = [];
let dropletSpeed = 8.0;
let gravity = 9.8;
let lastUpdateTime;

let movingDropletImage;
let fixedDropletImage;
let newFixedDropletImage;

let velocityInput;
let touchesLabel;
let sLabel;
let numTouches = 1;
let s = 0.0;
let k = 1;

let timer;

// Load droplet images
function loadDropletImages() {
    movingDropletImage = new Image();
    movingDropletImage.src = "qq.png";

    fixedDropletImage = new Image();
    fixedDropletImage.src = "Screenshot from 2024-01-31 20-44-09.png";

    newFixedDropletImage = new Image();
    newFixedDropletImage.src = "Screenshot from 2024-01-31 20-53-19.png";
}

// Update velocity function
function updateVelocity() {
    let inputVelocity = parseFloat(document.getElementById("velocityInput").value);
    if (!isNaN(inputVelocity)) {
        dropletSpeed = inputVelocity;
    } else {
        alert("Invalid input for velocity!");
    }
    document.getElementById("velocityInput").value = dropletSpeed.toString();
}

// Update S label function
function updateSLabel() {
    s = numTouches * 0.05;
    document.getElementById("sLabel").innerText = "S: " + s;
}

// Initialize droplet positions
function initDroplets() {
    for (let i = 0; i < numDroplets; i++) {
        dropletX[i] = 250;
        dropletY[i] = Y_LOWER_LIMIT;
    }
}

// Function to update droplet positions
function updateDroplets() {
    let currentTime = Date.now();
    let elapsedTime = (currentTime - lastUpdateTime) / 1000.0;

    for (let i = 0; i < numDroplets; i++) {
        dropletY[i] += dropletSpeed * elapsedTime + 0.5 * gravity * Math.pow((currentTime % 1000) / 1000.0, 2);

        if (dropletY[i] > Y_UPPER_LIMIT) {
            dropletY[i] = Y_LOWER_LIMIT;
            if (dropletY[i] >= dropletX[i] && dropletY[i] - dropletSpeed * elapsedTime < dropletX[i]) {
                k++;
                numTouches = Math.floor(k / 100);
                document.getElementById("touchesLabel").innerText = "Touches: " + numTouches;
                updateSLabel();
            }
        }
    }

    lastUpdateTime = currentTime;
}

// Paint function to render the simulation
function paint() {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, FRAME_SIZE, FRAME_SIZE);

    ctx.fillStyle = "blue";

    if (s <= 8.3) {
        ctx.drawImage(fixedDropletImage, 175, 172, 200, 200);
    } else {
        ctx.drawImage(newFixedDropletImage, 175, 172, 200, 200);
    }

    for (let i = 0; i < numDroplets; i++) {
        ctx.drawImage(movingDropletImage, dropletX[i], dropletY[i], 10, 10);
    }

    // Draw S label
    ctx.fillText("S: " + s, 500, 20);

    // Draw Touches label
    ctx.fillText("Touches: " + numTouches, 500, 40);
}

// Main function to initialize the simulation
function init() {
    loadDropletImages();
    initDroplets();
    lastUpdateTime = Date.now();

    // Start simulation loop
    setInterval(function() {
        updateDroplets();
        paint();
    }, 50);
}

// Call init function when the document is loaded
document.addEventListener("DOMContentLoaded", function() {
    init();
});

