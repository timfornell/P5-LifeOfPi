let pi;
let index;
let piDigits;
let digitsToRead;
let radius;
let radiusIncrease;
let previousAngle;
let angleIncrement;
let drawing;
let goalAngle;
let direction;
let currentAngle;
let digits = [];
let num = 0;

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
  radius = 10;
  radiusIncrease = 10;
  previousAngle = 0;
  angleIncrement = 10;
  drawing = false;
}

function draw() {
  if (index < piDigits && !drawing) {
    if (digits.length == 0) {
      for (i = 0; i < digitsToRead; i++) {
        digits.push(pi[0][index + i]);
      }
    } else {
      index += 1;
      digits.shift()
      digits.push(pi[0][index]);
    }

  goalAngle = (join(digits, "") % 360);
  // Add the strokeweight
  if (radius + 4 <= width && radius <= height && radius > 0) {
    drawing = true;

    direction = angleIncrement;
    var diff = previousAngle - goalAngle;
    if (previousAngle > goalAngle) {
      direction = - angleIncrement;
    }

    // Make sure the "closest" route is always taken
    if (abs(diff) >= 180) {
      if (previousAngle > goalAngle) {
        goalAngle += 360;
      } else {
        previousAngle += 360;
      }

      direction = direction * (- 1);
    }

    console.log(previousAngle, goalAngle, diff);
    currentAngle = previousAngle;
  }
}

if (drawing) {
  stroke(goalAngle, 360, 360);

  if ((currentAngle >= goalAngle && direction > 0) || (currentAngle <= goalAngle && direction < 0)) {
      drawArc();
      previousAngle = goalAngle % 360;
      radius += radiusIncrease;
      drawing = false;
    } else {
      num += 1;
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
