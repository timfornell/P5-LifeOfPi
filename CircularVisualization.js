class CircularVisualization extends Visualizer{
   constructor(pi) {
      super(pi, 3);

      this.radius = 10;
      this.radiusIncrease = 10;

      this.goalAngle;
      this.currentAngle;
      this.previousAngle = 0;
      this.angleIncrement = 1;

      this.drawing = false;
      this.direction;
   }

   draw() {
      colorMode(HSB, 360);
      fill(0, 0, 0, 0);
      strokeWeight(4);

      if (this.getNewDigitsFromPi(true) && !this.drawing) {
         this.goalAngle =  this.getJoinedDigitsAsString() % 360;
         // Compensate for the strokeweight
         if (this.radius + 4 <= width && this.radius <= height && this.radius > 0) {
            this.drawing = true;

            this.direction = this.angleIncrement;
            var diff = this.previousAngle - this.goalAngle;
            if (this.previousAngle > this.goalAngle) {
               this.direction = - this.angleIncrement;
            }

            // Make sure the "closest" route is always taken
            if (abs(diff) >= 180) {
               if (this.previousAngle > this.goalAngle) {
                  this.goalAngle += 360;
               } else {
                  this.previousAngle += 360;
               }

               this.direction = this.direction * (-1);
            }

            this.currentAngle = this.previousAngle;
         }
      }

      if (this.drawing) {
         stroke(this.goalAngle, 360, 360);

         if ((this.currentAngle >= this.goalAngle && this.direction > 0) ||
             (this.currentAngle <= this.goalAngle && this.direction < 0)) {
            this.drawArc();
            this.previousAngle = this.goalAngle % 360;
            this.radius += this.radiusIncrease;
            this.drawing = false;
         } else {
            this.drawArc();
            this.previousAngle = this.currentAngle;
            this.currentAngle += this.direction;
         }
      }
   }

   drawArc() {
      if (this.currentAngle < this.previousAngle) {
         arc(width / 2, height / 2, this.radius, this.radius, this.currentAngle * PI / 180, this.previousAngle * PI / 180, OPEN);
      } else {
         arc(width / 2, height / 2, this.radius, this.radius, this.previousAngle * PI / 180, this.currentAngle * PI / 180, OPEN);
      }
   }
}