const PAGE2_STATUS_A_P_S_D = "PAGE2_STATUS_A_P_S_D";
const PAGE2_STATUS_AP_SD = "PAGE2_STATUS_AP_SD";

let page2Status = PAGE2_STATUS_A_P_S_D;

const lyricLines = document.getElementById("lyricLines");
const chatItemLoveDive = document.getElementById("chatItemLoveDive");
const chatItemTroubleMaker = document.getElementById("chatItemTroubleMaker");
const chatItemEmpty = document.getElementById("chatItemEmpty");
const chatItemChainedUp = document.getElementById("chatItemChainedUp");

const createPage2 = () => {
  // Init
  clearDOMHTML(lyricLines);
  // Data
  let lData = lyricData[currentTitle];
  let lineNums = lData["lineNo"];
  let lyrics = lData["lyric"];
  let actives = lData["active"];
  let subjects = lData["subject"];
  let lines = [];
  // create LyricLines
  for (let i = 0; i < Object.keys(lineNums).length; i++) {
    let dan = dActiveName(actives[i]);
    let dsn = dSubjectName(subjects[i]);
    let line = `${lineNums[i]}. ${lyrics[i]}`;
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
};

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
