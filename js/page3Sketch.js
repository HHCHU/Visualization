let page3Canvas;
let p3g_ps10;
function preload() {
  p3g_ps10 = loadImage("../assets/images/p3g_ps10.png");
}
function setup() {
  page3Canvas = createCanvas(canvasWidth, canvasHeight);
  page3Canvas.parent(p3MainCC);
  imageMode(CENTER);
}
function draw() {
  background("#343540");
  image(p3g_ps10, width / 2, height / 2, width, height);
}
