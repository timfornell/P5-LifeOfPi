let pi;
let chosenVisualizer;
let visualizers = {};
let dropDrown;

function preload() {
   pi = loadStrings("Pi.txt");
}

function setup() {
   createCanvas(1000, 1000);
   background(125);

   chosenVisualizer = "CircularVisualization";
   visualizers = {
      CircularVisualization: new CircularVisualization(pi),
      PulsingCircle: new PulsingCircle(pi, true),
      PulsingCircleStaticBackground: new PulsingCircle(pi, false)
   };

   textAlign(CENTER);
   dropDrown = createSelect();
   dropDrown.position(0, 0);
   dropDrown.style("font-size", "20px")
   dropDrown.option("None");

   for (const viz in visualizers) {
      dropDrown.option(viz);
   }

   dropDrown.selected("PulsingCircleStaticBackground");
   chosenVisualizer = "None";
}

function draw() {
   if (chosenVisualizer != dropDrown.selected()) {
      resetCanvas();
      chosenVisualizer = dropDrown.selected();
   }

   if (chosenVisualizer != "None") {
      visualizers[chosenVisualizer].draw();
   }
}

function resetCanvas() {
   colorMode(RGB);
   background(125);
}