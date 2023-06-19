let page3Canvas;

let p3g_love_dive;
let p3g_trouble_maker;
let p3g_empty;
let p3g_chained_up;

let p3g_default;

let p3g_ps10;

let p3g_sub_high;

let p3g_act_high;

let area_ps1;
let area_ps2;
let area_ps3;
let area_ps4;
let area_ps5;
let area_ps6;
let area_ps7;
let area_ps8;
let area_ps9;
let area_ps10;

// let p3gMode = "COORDINATE";

function preload() {
  p3g_default = loadImage("assets/images/p3g_default.png");

  p3g_love_dive = loadImage("assets/images/p3g_love_dive.png");
  p3g_trouble_maker = loadImage("assets/images/p3g_trouble_maker.png");
  p3g_empty = loadImage("assets/images/p3g_empty.png");
  p3g_chained_up = loadImage("assets/images/p3g_chained_up.png");

  p3g_ps10 = loadImage("assets/images/p3g_ps10.png");

  p3g_sub_high = loadImage("assets/images/p3g_sub_high.png");

  p3g_act_high = loadImage("assets/images/p3g_act_high.png");

  area_ps1 = loadImage("assets/images/area_ps1.png");
  area_ps2 = loadImage("assets/images/area_ps2.png");
  area_ps3 = loadImage("assets/images/area_ps3.png");
  area_ps4 = loadImage("assets/images/area_ps4.png");
  area_ps5 = loadImage("assets/images/area_ps5.png");
  area_ps6 = loadImage("assets/images/area_ps6.png");
  area_ps7 = loadImage("assets/images/area_ps7.png");
  area_ps8 = loadImage("assets/images/area_ps8.png");
  area_ps9 = loadImage("assets/images/area_ps9.png");
  area_ps10 = loadImage("assets/images/area_ps10.png");
}
function setup() {
  page3Canvas = createCanvas(canvasWidth, canvasHeight);
  page3Canvas.parent(p3MainCC);
  imageMode(CENTER);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(16);
}
function draw() {
  if (page3Status === PAGE3_STATUS_COORDINATE) {
    drawCoordinate();
  } else if (page3Status === PAGE3_STATUS_IMP_OVERALL) {
    drawOverall();
  } else if (page3Status === PAGE3_STATUS_IMP_SUBJECT) {
    drawImplicationSubject();
  } else if (page3Status === PAGE3_STATUS_IMP_ACTIVE) {
    drawImplicationActive();
  }
  // image(p3g_default, width / 2, height / 2, width, height);
}

function drawCoordinate() {
  if (currentTitle === TITLE_LOVE_DIVE) {
    image(p3g_love_dive, width / 2, height / 2, width, height);
    text(currentTitle, width * 0.86 + 10, height * (1 - 0.93) + 50);
    text("(0.86, 0.93)", width * 0.86 + 10, height * (1 - 0.93) + 50 + 25);
  } else if (currentTitle === TITLE_TROUBLE_MAKER) {
    image(p3g_trouble_maker, width / 2, height / 2, width, height);
    text(currentTitle, width * 0.7 + 30, height * (1 - 0.46) + 30);
    text("(0.70, 0.46)", width * 0.7 + 30, height * (1 - 0.46) + 30 + 25);
  } else if (currentTitle === TITLE_EMPTY) {
    image(p3g_empty, width / 2, height / 2, width, height);
    text(currentTitle, width * 0.16 + 10, height * (1 - 0.6) + 50);
    text("(0.16, 0.60)", width * 0.16 + 10, height * (1 - 0.6) + 50 + 25);
  } else if (currentTitle === TITLE_CHAINED_UP) {
    image(p3g_chained_up, width / 2, height / 2, width, height);
    text(currentTitle, width * 0.36 + 100, height * (1 - 0.24) - 120);
    text("(0.36, 0.24)", width * 0.36 + 100, height * (1 - 0.24) - 120 + 25);
  }
}

function drawOverall() {
  image(p3g_default, width / 2, height / 2, width, height);
}

function drawImplicationSubject() {
  if (inputSubject == "HIGH") {
    image(p3g_sub_high, width / 2, height / 2, width, height);
    image(area_ps7, width / 2, height / 2 + height * 0.05, width, height);
    image(area_ps10, width / 2, height / 2 + height * 0.05, width, height);
  }
}
function drawImplicationActive() {
  if (inputActive == "HIGH") {
    image(p3g_act_high, width / 2, height / 2, width, height);
    image(
      area_ps3,
      width / 2 + width * 0.05,
      height / 2,
      width * 0.8,
      height * 0.8
    );
    image(
      area_ps4,
      width / 2 - width * 0.05,
      height / 2,
      width * 0.9,
      height * 0.9
    );
  }
}