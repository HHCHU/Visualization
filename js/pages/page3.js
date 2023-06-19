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
const p3LeftOverall = document.getElementById("p3LeftOverall");
const mainSongs = document.getElementById("mainSongs");
const mainSongLyric = document.getElementById("mainSongLyric");

const p3RightOverall = document.getElementById("p3RightOverall");
const personaImg = document.getElementById("personaImg");
const personaHashtag = document.getElementById("personaHashtag");
const personaDesc = document.getElementById("personaDesc");

const rangeSubjectVertical = document.getElementById("rangeSubjectVertical");
const p3LeftSubjectHigh = document.getElementById("p3LeftSubjectHigh");
const p3LeftSubjectMid = document.getElementById("p3LeftSubjectMid");
const p3LeftSubjectLow = document.getElementById("p3LeftSubjectLow");
const p3RightSubject = document.getElementById("p3RightSubject");

const rangeActive = document.getElementById("rangeActive");

const resetPage3 = () => {
  //reset DOM
  clearDOMHTML(mainSongs);
  clearDOMHTML(personaImg);
  clearDOMHTML(personaHashtag);
  clearDOMHTML(personaDesc);
  hideAllSubjects();
  //reset Variables
  page3Status = PAGE3_STATUS_COORDINATE;
  inputSubject = "HIGH";
  inputActive = "HIGH";
  //reset Sketch
  currentPS = "";
  overallShow = false;
  //reset Slider
  hideDOM(rangeSubjectVertical);
  hideDOM(rangeActive);
  rangeSubjectVertical.value = 2;
  rangeActive.value = 2;
};

const showOverall = (ps) => {
  //LEFT
  clearDOMHTML(mainSongs);
  let psInfo = personaMainSongInfo[ps];
  //   console.log(psInfo);
  let mainSongsData = psInfo.mainSongs;
  for (let msd of mainSongsData) {
    let mainSong = document.createElement("div");
    // console.log(mainSong);
    mainSong.classList.add("mainSong");
    mainSong.classList.add("buttonHoverBlue");
    let mainSongTitle = document.createElement("div");
    mainSongTitle.classList.add("mainSongTitle");
    let mainSongSinger = document.createElement("div");
    mainSongSinger.classList.add("mainSongSinger");
    mainSongTitle.innerText = msd.title;
    mainSongSinger.innerText = msd.singer;

    mainSong.appendChild(mainSongTitle);
    mainSong.appendChild(mainSongSinger);
    mainSong.addEventListener("click", () => {
      console.log("update lyrics");
      mainSongLyric.innerHTML = msd.lyricHTML;
    });
    mainSongs.appendChild(mainSong);
  }
  //RIGHT
  personaImg.innerHTML = psInfo.profileHTML;
  showDOM(p3LeftOverall);
  showDOM(p3RightOverall);
  personaHashtag.innerText = psInfo.hashtag;
  personaDesc.innerHTML = psInfo.descHTML;
};

const hideOverall = () => {
  hideDOM(p3LeftOverall);
  hideDOM(p3RightOverall);
};

const onInputRangeSubjectVertical = (e) => {
  let sv = e.currentTarget.value;
  if (sv == 2) {
    inputSubject = "HIGH";
  } else if (sv == 1) {
    inputSubject = "MID";
  } else if (sv == 0) {
    inputSubject = "LOW";
  }
  setp3LeftSubject(inputSubject);
  //   console.log(inputSubject);
};

const onInputRangeActive = (e) => {
  let sv = e.currentTarget.value;
  if (sv == 2) {
    inputActive = "HIGH";
  } else if (sv == 1) {
    inputActive = "MID";
  } else if (sv == 0) {
    inputActive = "LOW";
  }
  //   console.log(inputActive);
};

const setp3LeftSubject = (subject) => {
  hideAllSubjects();
  if (subject === "HIGH") {
    showDOM(p3LeftSubjectHigh);
  } else if (subject === "MID") {
    showDOM(p3LeftSubjectMid);
  } else if (subject === "LOW") {
    showDOM(p3LeftSubjectLow);
  }
};
const hideAllSubjects = () => {
  hideDOM(p3LeftSubjectHigh);
  hideDOM(p3LeftSubjectMid);
  hideDOM(p3LeftSubjectLow);
};

canvasWidth = p3MainCC.getBoundingClientRect().width;
canvasHeight = p3MainCC.getBoundingClientRect().height;

rangeSubjectVertical.addEventListener("input", onInputRangeSubjectVertical);
rangeActive.addEventListener("input", onInputRangeActive);
