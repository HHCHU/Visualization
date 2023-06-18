const PAGE2_STATUS_A_P_S_D = "PAGE2_STATUS_A_P_S_D";
const PAGE2_STATUS_AP_SD = "PAGE2_STATUS_AP_SD";

let page2Status = PAGE2_STATUS_A_P_S_D;
let blockHeight = 15;
let colNames = {
  Active: "능동",
  Passive: "수동",
  Subjective: "주체",
  Dependent: "종속",
};
let cnt_active;
let cnt_passive;
let cnt_subjective;
let cnt_dependent;
let cnts_A_P_S_D;

// DOM
const lyricLines = document.getElementById("lyricLines");
const chatItemLoveDive = document.getElementById("chatItemLoveDive");
const chatItemTroubleMaker = document.getElementById("chatItemTroubleMaker");
const chatItemEmpty = document.getElementById("chatItemEmpty");
const chatItemChainedUp = document.getElementById("chatItemChainedUp");
const lgTitle = document.getElementById("lgTitle");
const lgvCols = document.getElementById("lgvCols");
// const lgCount = document.getElementById("lgCount");
// const lgVis = document.getElementById("lgVis");
// const lgLabel = document.getElementById("lgLabel");
// const lyricGraph = document.getElementById("lyricGraph");

const createPage2 = () => {
  // Init
  clearDOMHTML(lyricLines);
  clearDOMHTML(lgvCols);
  // Data
  let lData = lyricData[currentTitle];
  let lineNums = lData["lineNo"];
  let lyrics = lData["lyric"];
  let actives = lData["active"];
  let subjects = lData["subject"];
  let lines = [];

  cnt_active = 0;
  cnt_passive = 0;
  cnt_subjective = 0;
  cnt_dependent = 0;

  // create LyricLines
  for (let i = 0; i < Object.keys(lineNums).length; i++) {
    let dan = dActiveName(actives[i]);
    let dsn = dSubjectName(subjects[i]);
    let line = `${lineNums[i]}. ${lyrics[i]}`;
    if (actives[i] === "Active") {
      cnt_active += 1;
    }
    if (actives[i] === "Passive") {
      cnt_passive += 1;
    }
    if (subjects[i] === "Subjective") {
      cnt_subjective += 1;
    }
    if (subjects[i] === "Dependent") {
      cnt_dependent += 1;
    }

    // lines.push(line);
    let lyricLine = document.createElement("div");
    let llLyric = document.createElement("div");
    let llbActive = document.createElement("div");
    let llbSubject = document.createElement("div");
    lyricLine.classList.add("LyricLine");
    llLyric.classList.add("llLyric");
    llbActive.classList.add("llBadge");
    llbActive.classList.add(actives[i]);
    llbSubject.classList.add("llBadge");
    llbSubject.classList.add(subjects[i]);
    lyricLine.appendChild(llLyric);
    lyricLine.appendChild(llbActive);
    lyricLine.appendChild(llbSubject);
    llLyric.innerText = `${lineNums[i]}. ${lyrics[i]}`;
    llbActive.innerText = dan;
    llbSubject.innerText = dsn;
    lyricLines.appendChild(lyricLine);
  }
  // create Graph A_P_S_D
  lgTitle.innerText = currentTitle;
  cnts_A_P_S_D = [cnt_active, cnt_passive, cnt_subjective, cnt_dependent];
  let maxCnt_A_P_S_D = Math.max(...cnts_A_P_S_D);
  let visHeight = Math.floor(0.4713 * window.innerHeight);
  blockHeight = Math.floor(
    (visHeight - (maxCnt_A_P_S_D - 1) * 4) / maxCnt_A_P_S_D
  );
  //   console.log(visHeight, maxCnt_A_P_S_D, blockHeight);
  addLgvCol4HTML(cnts_A_P_S_D);
  //   lgCount.innerHTML = getLgvColsHTML(cnts_A_P_S_D);
  //   lgVis.innerHTML = getLgvBlockColsHTML(cnts_A_P_S_D);
  //   let labels_A_P_S_D = ["능동", "수동", "주체", "종속"];
  //   lgLabel.innerHTML = getLgvColsHTML(labels_A_P_S_D);
};

const addLgvCol4HTML = (colVals) => {
  let colClassNames = ["Active", "Passive", "Subjective", "Dependent"];
  let labels_A_P_S_D = ["능동", "수동", "주체", "종속"];
  colVals.forEach((cnt, idx) => {
    let colHTML = "";
    colHTML += `<div class='lgvText'>${labels_A_P_S_D[idx]}</div>`;
    for (let i = 0; i < cnt; i++) {
      colHTML += getDivHTML(
        "",
        `lgvBlock ${colClassNames[idx]}`,
        `height: ${blockHeight}px`
      );
    }
    colHTML += `<div class='lgvText'>${cnt}</div>`;
    let lgvCol = document.createElement("div");
    lgvCol.classList.add("lgvCol");
    lgvCol.classList.add("col4");
    lgvCol.innerHTML = colHTML;
    lgvCols.appendChild(lgvCol);
  });

  //   return colHTML;
};
const addLgvCol2HTML = (colVals) => {
  let colClassNames = ["Active", "Passive", "Subjective", "Dependent"];
  let labels_AP_SD = ["능동-수동", "주체-종속"];
  let blockColHTMLs = [];
  colVals.forEach((cnt, idx) => {
    let blockColHTML = "";
    for (let i = 0; i < cnt; i++) {
      blockColHTML += getDivHTML(
        "",
        `lgvBlock ${colClassNames[idx]}`,
        `height: ${blockHeight}px`
      );
    }
    blockColHTMLs.push(blockColHTML);
    // colHTML += `<div class='lgvText'>${cnt}</div>`;
    // let lgvCol = document.createElement("div");
    // lgvCol.classList.add("lgvCol");
    // lgvCol.classList.add("col4");
    // lgvCol.innerHTML = colHTML;
    // lgvCols.appendChild(lgvCol);
  });
  for (let i = 0; i < 2; i++) {
    let i1 = 2 * i;
    let i2 = 2 * i + 1;
    let lgvCol = document.createElement("div");
    lgvCol.classList.add("lgvCol");
    lgvCol.classList.add("col2");
    let colHTML = "";
    colHTML += `<div class='lgvText'>${labels_AP_SD[i]}</div>`;
    colHTML += blockColHTMLs[i1];
    colHTML += blockColHTMLs[i2];
    let ratio = (colVals[i1] / (colVals[i1] + colVals[i2])).toFixed(2);
    colHTML += `<div class='lgvText'>${ratio}</div>`;
    lgvCol.innerHTML = colHTML;
    lgvCols.appendChild(lgvCol);
  }

  //   return colHTML;
};

const getDivHTML = (v, c, s) => {
  return `<div class="${c}" style="${s}">${v}</div>`;
};

const change_Graph_A_P_S_D = () => {
  clearDOMHTML(lgvCols);

  let maxCnt_AP_SD = Math.max(
    cnt_active + cnt_passive,
    cnt_subjective + cnt_dependent
  );
  let visHeight = Math.floor(0.4713 * window.innerHeight);
  blockHeight = Math.floor((visHeight - (maxCnt_AP_SD - 1) * 4) / maxCnt_AP_SD);
  //   console.log(visHeight, maxCnt_AP_SD, blockHeight);
  addLgvCol2HTML(cnts_A_P_S_D);
};
// const getLgvColsHTML = (colVals) => {
//   let colHTML = "";
//   colVals.forEach((v) => {
//     colHTML += `<div class="lgvCol">${v}</div>`;
//   });
//   return colHTML;
// };
// const getLgvBlockColsHTML = (colCnts) => {
//   let colHTML = "";
//   let colClassNames = ["Active", "Passive", "Subjective", "Dependent"];
//   colCnts.forEach((cnt, i) => {
//     console.log(cnt, i);
//     let blockHTML = "";
//     let colClassName = colClassNames[i];
//     console.log(colClassName);
//     for (let i = 0; i < cnt; i++) {
//       blockHTML += `<div class="lgvBlock ${colClassName}" style="height: ${blockHeight}px;"></div>`;
//     }
//     colHTML += `<div class="lgvCol">${blockHTML}</div>`;
//   });
//   return colHTML;
// };

// const getLgvBlocksHTML = (blocks) => {
//   console.log(blocks);
//   let blockHTML = blocks.map((b) => {
//     `<div class="lgvBlock ${b}"></div>`;
//   });
//   console.log(blockHTML);
//   return blockHTML;
// };

const onClickChatItemLoveDive = () => {
  currentTitle = "LOVE DIVE";
  createPage2();
};
const onClickChatItemTroubleMaker = () => {
  currentTitle = "Trouble Maker";
  createPage2();
};
const onClickChatItemEmpty = () => {
  currentTitle = "공허해";
  createPage2();
};
const onClickChatItemChainedUp = () => {
  currentTitle = "사슬";
  createPage2();
};

chatItemLoveDive.addEventListener("click", onClickChatItemLoveDive);
chatItemTroubleMaker.addEventListener("click", onClickChatItemTroubleMaker);
chatItemEmpty.addEventListener("click", onClickChatItemEmpty);
chatItemChainedUp.addEventListener("click", onClickChatItemChainedUp);
