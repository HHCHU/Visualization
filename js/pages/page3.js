const PAGE3_STATUS_COORDINATE = "PAGE3_STATUS_COORDINATE";
const PAGE3_STATUS_IMP_OVERALL = "PAGE3_STATUS_IMP_OVERALL";
const PAGE3_STATUS_IMP_SUBJECT = "PAGE3_STATUS_IMP_SUBJECT";
const PAGE3_STATUS_IMP_ACTIVE = "PAGE3_STATUS_IMP_ACTIVE";
//
let page3Status = PAGE3_STATUS_COORDINATE;
let inputSubject = "HIGH";
let inputActive = "HIGH";

let canvasWidth;
let canvasHeight;
//DOM
const p3MainCC = document.getElementById("p3MainCC");

canvasWidth = p3MainCC.getBoundingClientRect().width;
canvasHeight = p3MainCC.getBoundingClientRect().height;
