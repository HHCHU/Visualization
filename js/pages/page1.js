const PAGE1_STATUS_MAIN = "PAGE1_STATUS_MAIN";
const PAGE1_STATUS_CHAT = "PAGE1_STATUS_CHAT";

let page1Status = PAGE1_STATUS_MAIN;
let sendBtnActive = false;

let currentReply = "";
// let crDOM;
let crIdx = 0;
let crSpeed = 15;

let crSv = 3; // Current Reply Speed Variance
let dialogScrollUpDetected = false;
let dialogLastScrollPosition;

// DOM
const chatPromptPlaceholder = document.getElementById("chatPromptPlaceholder");
const chatPromptTextBox = document.getElementById("chatPromptTextBox");
const chatPromptBtn = document.getElementById("chatPromptBtn");
const promptSendBtnInactive = document.getElementById("promptSendBtnInactive");
const promptSendBtnActive = document.getElementById("promptSendBtnActive");
const cpi_ld = document.getElementById("cpi-ld"); // ChatInputItem
const cpi_tm = document.getElementById("cpi-tm");
const cpi_vd = document.getElementById("cpi-vd");
const cpi_ch = document.getElementById("cpi-ch");
const chatDialogMain = document.getElementById("chatDialogMain");
const chatDialogThread = document.getElementById("chatDialogThread");
const chatInterfaceShadow = document.getElementById("chatInterfaceShadow");

const openPage1 = () => {
  currentPage = "page1";
  hideDOM(nextPageBtn);
  closeAllPages();
  hideDOM(homeBtn);
  openPage(page1);
  resetPage1();
  nextPageBtn.innerText = "Next";
};

const resetPage1 = () => {
  showDOM(chatDialogMain);
  hideDOM(chatDialogThread);
  showDOM(chatPromptPlaceholder);
  hideDOM(chatPromptTextBox);
  promptBtnTurnOff();
  fadeDOMin(chatInterfaceShadow);
  clearDOMHTML(chatDialogThread);
  page1Status = PAGE1_STATUS_MAIN;
};

const promptBtnTurnOn = () => {
  sendBtnActive = true;
  hideDOM(promptSendBtnInactive);
  showDOM(promptSendBtnActive);
  chatPromptBtn.style.backgroundColor = "#10a37f";
  chatPromptBtn.style.cursor = "pointer";
};

const promptBtnTurnOff = () => {
  sendBtnActive = false;
  showDOM(promptSendBtnInactive);
  hideDOM(promptSendBtnActive);
  chatPromptBtn.style.backgroundColor = "";
  chatPromptBtn.style.cursor = "default";
};

const promptInputClicked = (title) => {
  currentTitle = title;
  console.log(title);
  hideDOM(chatPromptPlaceholder);
  showDOM(chatPromptTextBox);
  let prompt = `내가 제시한 ‘능동', ‘수동', ‘주체', ‘종속'의 정의를 바탕으로 ‘능동-수동', '주체-종속'의 축 안에서 <${title}> 속 화자의 태도가 어떠한지 분석해줘.`;
  chatPromptTextBox.innerText = prompt;
  promptBtnTurnOn();
};

const promptInputClickedLD = () => {
  promptInputClicked("LOVE DIVE");
};
const promptInputClickedTM = () => {
  promptInputClicked("Trouble Maker");
};
const promptInputClickedVD = () => {
  promptInputClicked("공허해");
};
const promptInputClickedCH = () => {
  promptInputClicked("사슬");
};

const onClickchatPromptBtn = () => {
  if (sendBtnActive) {
    if (page1Status === PAGE1_STATUS_MAIN) {
      page1Status = PAGE1_STATUS_CHAT;
      hideDOM(chatDialogMain);
      showDOM(chatDialogThread);
      fadeDOMin(chatInterfaceShadow);
    } else if (page1Status === PAGE1_STATUS_CHAT) {
    }
    showDOM(chatPromptPlaceholder);
    hideDOM(chatPromptTextBox);
    promptBtnTurnOff();
    generateChatThread("me");
    generateChatThread("gpt");
  }
};

const getLyricWithLineNo = () => {
  let lData = lyricData[currentTitle];
  // console.log(lData);
  let lineNums = lData["lineNo"];
  // console.log(lineNums);
  let lyrics = lData["lyric"];
  let lines = [];
  for (let i = 0; i < Object.keys(lineNums).length; i++) {
    let line = `${lineNums[i]}. ${lyrics[i]}`;
    lines.push(line);
  }

  return lines.join("\n");
};
const dActiveName = (dActive) => {
  if (dActive === "Active") {
    return "능동";
  }
  if (dActive === "Passive") {
    return "수동";
  }
  return `XX${dActive}XX`;
};
const dSubjectName = (dSubject) => {
  if (dSubject === "Subjective") {
    return "주체";
  }
  if (dSubject === "Dependent") {
    return "종속";
  }
  if (dSubject === "Neutral") {
    return "중립";
  }
  return `XX${dSubject}XX`;
};
const getLyricWithLineAnalysis = () => {
  let lData = lyricData[currentTitle];
  let lineNums = lData["lineNo"];
  let lyrics = lData["lyric"];
  let actives = lData["active"];
  let subjects = lData["subject"];
  let lines = [];
  // console.log(lData);
  for (let i = 0; i < Object.keys(lineNums).length; i++) {
    let dan = dActiveName(actives[i]);
    let dsn = dSubjectName(subjects[i]);
    let line = `${lineNums[i]}. ${lyrics[i]}: ${dan} / ${dsn}`;
    lines.push(line);
  }

  return lines.join("\n");
};

const generateChatThread = (speaker) => {
  let qBox = document.createElement("div");
  let qIcon = document.createElement("div");
  let qText = document.createElement("div");
  qBox.classList.add("ThreadBox");
  qBox.classList.add(speaker);
  qIcon.classList.add("ThreadIcon");
  // qIcon.classList.add(speaker);
  let qIconName = "";
  qText.classList.add("ThreadText");
  if (speaker === "me") {
    qIconName = "ME";
    qText.innerText = chatQuestion + getLyricWithLineNo();
    // qText.innerText = chatQuestion + lyricWithLineNo[currentTitle];
  }
  if (speaker === "gpt") {
    qIconName = "GPT";
    currentReply = getLyricWithLineAnalysis();
    crIdx = 0;
    setTimeout(() => {
      gptReply(qText);
    }, 100);
  }
  qIcon.innerHTML = `<img src="assets/images/icon${qIconName}.png" alt="" />`;
  qBox.appendChild(qIcon);
  qBox.appendChild(qText);
  chatDialogThread.appendChild(qBox);
  dialogScrollDown();
};

const gptReply = (dom) => {
  let sVar = Math.random() * (crSv * 2 - 1) - crSv;
  let speed = crSpeed + sVar;
  crIdx += speed;
  if (crIdx < currentReply.length) {
    dom.innerText = currentReply.substring(0, crIdx);
    setTimeout(() => {
      gptReply(dom);
    }, 100);
  } else {
    // Reply Complete
    dom.innerText = currentReply;
    showDOM(nextPageBtn);
  }
  // console.log(dialogScrollUpDetected);
  if (!dialogScrollUpDetected) {
    dialogScrollDown();
  }
};

const dialogScrollUpDetectStart = () => {
  dialogLastScrollPosition = chatDialogThread.scrollTop;
  dialogScrollUpDetected = false;
};
const dialogScrollDown = () => {
  dialogScrollUpDetectStart();
  chatDialogThread.scrollTop = chatDialogThread.scrollHeight;
};

// addEventListener

cpi_ld.addEventListener("click", promptInputClickedLD);
cpi_tm.addEventListener("click", promptInputClickedTM);
cpi_vd.addEventListener("click", promptInputClickedVD);
cpi_ch.addEventListener("click", promptInputClickedCH);
chatPromptBtn.addEventListener("click", onClickchatPromptBtn);

chatDialogThread.addEventListener("scroll", function () {
  // console.log(chatDialogThread.scrollTop);
  if (!dialogScrollUpDetected) {
    let currentScrollPosition = chatDialogThread.scrollTop;
    if (currentScrollPosition < dialogLastScrollPosition) {
      dialogScrollUpDetected = true;
      // console.log("scrollup");
    }
  }
});
