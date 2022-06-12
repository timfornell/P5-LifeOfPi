class PulsingCircle extends Visualizer {
   constructor(pi, repaintBackground) {
      super(pi, 3);
      this.baseRadius = 200;
      this.basePeriod = 120;
      this.piRadius = 0;
      this.period = 100;
      this.phase = 2 * PI / this.period;
      this.frame = 0;
      this.startPoint = null;
      this.startingPointFound = false;

      this.repaintBackground = repaintBackground;
      if (repaintBackground) {
         this.maxPoints = 1000;
      } else {
         this.maxPoints = 1;
      }

      this.points = [];
   }

   draw() {
      if (this.repaintBackground) {
         colorMode(RGB);
         background(125);
      }

      stroke(255, 60);
      strokeWeight(1);


      if (this.frame == 0 || this.startingPointFound) {
         this.getNewDigitsFromPi(false);
         var newRadius = int(this.getJoinedDigitsAsString());
         this.piRadius = newRadius;
         this.startingPointFound = false;
      }

      // Move origin to center of canvas
      translate(width / 2, height / 2);
      var radius = this.baseRadius - this.piRadius * sin(this.phase * this.frame);
      var newPoint = createVector(radius * cos(2 * PI * this.frame / this.basePeriod), radius * sin(2 * PI * this.frame / this.basePeriod));

      if (this.frame == 0) {
         this.startPoint = newPoint.copy();
      }

      if (this.points.length == this.maxPoints) {
         this.points.shift();
      }

      this.points.push(newPoint);

      var lastPoint = this.points[this.points.length - 1];
      var xDiff = abs(lastPoint.x - this.startPoint.x);
      var yDiff = abs(lastPoint.y - this.startPoint.y);
      this.startingPointFound = (xDiff < 0.00005 && yDiff < 0.00005) && this.frame > 0;

      if (this.startingPointFound) {
         this.startPoint = newPoint.copy();
      }

      this.paintPoints();

      this.frame += 0.5;
   }

   paintPoints() {
      colorMode(HSB, this.maxPoints);

      for (let i = this.points.length; i--; i > 0) {
         stroke(255, i + 1);
         point(this.points[i].x, this.points[i].y);
      }
   }
}