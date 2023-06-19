const PAGE3_STATUS_COORDINATE = "PAGE3_STATUS_COORDINATE";
const PAGE3_STATUS_IMP_OVERALL = "PAGE3_STATUS_IMP_OVERALL";
const PAGE3_STATUS_IMP_SUBJECT = "PAGE3_STATUS_IMP_SUBJECT";
const PAGE3_STATUS_IMP_ACTIVE = "PAGE3_STATUS_IMP_ACTIVE";
//
let page3Status = PAGE3_STATUS_COORDINATE;
let inputSubject = "HIGH";
let inputActive = "HIGH";

let p3OverallSongSelectFuncs = [];

let canvasWidth;
let canvasHeight;

//DOM
const p3MainCC = document.getElementById("p3MainCC");
const p3LeftOverall = document.getElementById("p3LeftOverall");
const mainSongs = document.getElementById("mainSongs");
const mainSongLyric = document.getElementById("mainSongLyric");

const p3RightOverall = document.getElementById("p3RightOverall");
const personaImg = document.getElementById("personaImg");
const personaName = document.getElementById("personaName");
const personaHashtag = document.getElementById("personaHashtag");
const personaDesc = document.getElementById("personaDesc");

const rangeSubjectVertical = document.getElementById("rangeSubjectVertical");
const p3LeftSubjectHigh = document.getElementById("p3LeftSubjectHigh");
const p3LeftSubjectMid = document.getElementById("p3LeftSubjectMid");
const p3LeftSubjectLow = document.getElementById("p3LeftSubjectLow");
const p3RightSubject = document.getElementById("p3RightSubject");

const rangeActive = document.getElementById("rangeActive");
const p3LeftActiveHigh = document.getElementById("p3LeftActiveHigh");
const p3LeftActiveMid = document.getElementById("p3LeftActiveMid");
const p3LeftActiveLow = document.getElementById("p3LeftActiveLow");
const p3RightActive = document.getElementById("p3RightActive");

const resetPage3 = () => {
  //reset DOM
  clearDOMHTML(mainSongs);
  clearDOMHTML(personaImg);
  clearDOMHTML(personaHashtag);
  clearDOMHTML(personaDesc);
  hideAllSubjects();
  hideAllActives();
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
  p3OverallSongSelectFuncs = [];
  let psInfo = personaMainSongInfo[ps];
  //   console.log(psInfo);
  let mainSongsData = psInfo.mainSongs;
  let firstSelected = false;
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
    const onClickSong = () => {
      //   console.log("update lyrics");
      for (let song of mainSongs.childNodes) {
        song.classList.remove("selected");
      }
      currentSongTitle = msd.title;
      mainSongLyric.innerHTML = msd.lyricHTML;
    };
    mainSong.addEventListener("click", onClickSong);
    p3OverallSongSelectFuncs.push(onClickSong);
    if (!firstSelected) {
      currentSongTitle = msd.title;
      mainSong.classList.add("selected");
      mainSongLyric.innerHTML = msd.lyricHTML;
      firstSelected = true;
    }
    mainSongs.appendChild(mainSong);
  }
  //RIGHT
  personaImg.innerHTML = psInfo.profileHTML;
  showDOM(p3LeftOverall);
  showDOM(p3RightOverall);
  personaName.innerText = psInfo.personaName;
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
  setp3LeftActive(inputActive);
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

const setp3LeftActive = (active) => {
  hideAllActives();
  if (active === "HIGH") {
    showDOM(p3LeftActiveHigh);
  } else if (active === "MID") {
    showDOM(p3LeftActiveMid);
  } else if (active === "LOW") {
    showDOM(p3LeftActiveLow);
  }
};
const hideAllActives = () => {
  hideDOM(p3LeftActiveHigh);
  hideDOM(p3LeftActiveMid);
  hideDOM(p3LeftActiveLow);
};

canvasWidth = p3MainCC.getBoundingClientRect().width;
canvasHeight = p3MainCC.getBoundingClientRect().height;

rangeSubjectVertical.addEventListener("input", onInputRangeSubjectVertical);
rangeActive.addEventListener("input", onInputRangeActive);
