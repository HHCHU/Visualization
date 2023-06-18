const openPage1 = () => {
  if (currentPage != "page1") {
    closeAllPages();
    currentPage = "page1";
    page1.style.opacity = 1;
  }
};

const resetPage1 = () => {
  showChatPromptPlaceholder();
  hideChatPromptTextBox();
  promptBtnTurnOff();
};

const newChatBox = document.getElementById("newChatBox");
newChatBox.addEventListener("click", resetPage1);

const hideChatPromptPlaceholder = () => {
  const chatPromptPlaceholder = document.getElementById(
    "chatPromptPlaceholder"
  );
  chatPromptPlaceholder.style.display = "none";
};
const showChatPromptPlaceholder = () => {
  const chatPromptPlaceholder = document.getElementById(
    "chatPromptPlaceholder"
  );
  chatPromptPlaceholder.style.display = "flex";
};
const hideChatPromptTextBox = () => {
  const chatPromptTextBox = document.getElementById("chatPromptTextBox");
  chatPromptTextBox.style.display = "none";
};
const showChatPromptTextBox = () => {
  const chatPromptTextBox = document.getElementById("chatPromptTextBox");
  chatPromptTextBox.style.display = "flex";
};
const promptBtnTurnOn = () => {
  const chatPromptBtn = document.getElementById("chatPromptBtn");
  const promptSendBtnInactive = document.getElementById(
    "promptSendBtnInactive"
  );
  const promptSendBtnActive = document.getElementById("promptSendBtnActive");

  promptSendBtnInactive.style.display = "none";
  promptSendBtnActive.style.display = "flex";
  chatPromptBtn.style.backgroundColor = "#10a37f";
};

const promptBtnTurnOff = () => {
  const chatPromptBtn = document.getElementById("chatPromptBtn");
  const promptSendBtnInactive = document.getElementById(
    "promptSendBtnInactive"
  );
  const promptSendBtnActive = document.getElementById("promptSendBtnActive");

  promptSendBtnInactive.style.display = "flex";
  promptSendBtnActive.style.display = "none";
  chatPromptBtn.style.backgroundColor = "";
};

const promptInputClicked = (title) => {
  console.log(title);
  hideChatPromptPlaceholder();
  showChatPromptTextBox();
  const chatPromptTextBox = document.getElementById("chatPromptTextBox");
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

const cpi_ld = document.getElementById("cpi-ld");
const cpi_tm = document.getElementById("cpi-tm");
const cpi_vd = document.getElementById("cpi-vd");
const cpi_ch = document.getElementById("cpi-ch");

cpi_ld.addEventListener("click", promptInputClickedLD);
cpi_tm.addEventListener("click", promptInputClickedTM);
cpi_vd.addEventListener("click", promptInputClickedVD);
cpi_ch.addEventListener("click", promptInputClickedCH);
