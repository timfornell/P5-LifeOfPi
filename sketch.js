let pi;
let index;
let piDigits;
let digitsToRead;
let radius;
let previousAngle;
let angleIncrement;
let drawing;
let goalAngle;
let direction;
let currentAngle

function preload() {
  pi = loadStrings("Pi.txt");
}

function setup() {
  createCanvas(1000, 1000);
  background(125);
  colorMode(HSB, 360);
  fill(0, 0, 0, 0);
  strokeWeight(4);

  index = 0;
  piDigits = pi[0].length;
  digitsToRead = 3;
  radius = 100;
  previousAngle = 0;
  angleIncrement = 1;
  drawing = false;
}

function draw() {
  if (index < piDigits && !drawing) {
    var digits = [];
    for (i = 0; i < digitsToRead; i++) {
      digits.push(pi[0][index + i]);
    }

    goalAngle = (join(digits, "") % 360);
    if (radius <= width && radius <= height && radius > 0) {
      drawing = true;

      console.log(previousAngle, goalAngle);
      direction = angleIncrement;
      if (previousAngle > goalAngle) {
        direction = - angleIncrement;
      }

      currentAngle = previousAngle;
    }
  }

  if (drawing) {
    stroke(goalAngle, 360, 360);

    if ((currentAngle >= goalAngle && direction > 0) || (currentAngle <= goalAngle && direction < 0)) {
      drawArc();
      previousAngle = goalAngle;
      radius += 20;
      index += digitsToRead;
      drawing = false;
    } else {
      drawArc();
      previousAngle = currentAngle;
      currentAngle += direction;
    }
  }
}

function drawArc() {
  if (currentAngle < previousAngle) {
    arc(width / 2, height / 2, radius, radius, currentAngle * PI / 180, previousAngle * PI / 180, OPEN);
  } else {
    arc(width / 2, height / 2, radius, radius, previousAngle * PI / 180, currentAngle * PI / 180, OPEN);
  }
}
