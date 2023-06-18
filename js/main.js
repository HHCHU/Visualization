const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");
const pages = [page1, page2];
let currentPage = "page1";
const nextPageBtn = document.getElementById("nextPageBtn");
const newChatBoxes = document.getElementsByClassName("newChatBox");

const closeAllPages = () => {
  for (let page of pages) {
    // hideDOM(page);
    fadeDOMout(page);
    goDownDOM(page);
  }
};
const openPage = (pageDOM) => {
  fadeDOMin(pageDOM);
  goDownUP(pageDOM);
};

const hideDOM = (dom) => {
  dom.style.display = "none";
};
const showDOM = (dom) => {
  dom.style.display = "flex";
};

const fadeDOMout = (dom) => {
  dom.style.opacity = 0;
};
const fadeDOMin = (dom) => {
  dom.style.opacity = 1;
};

const goDownDOM = (dom) => {
  dom.style.zIndex = 1;
};
const goDownUP = (dom) => {
  dom.style.zIndex = 2;
};

const scrollDown = (dom) => {
  dom.scrollTop = dom.scrollHeight;
};

const clearDOMHTML = (dom) => {
  dom.innerHTML = "";
};

const onClickNextPageBtn = (e) => {
  console.log("From", currentPage);
  closeAllPages();
  if (currentPage === "page1") {
    currentPage = "page2";
    openPage(page2);
    hideDOM(nextPageBtn);
  }
  console.log("To", currentPage);
};

// Add Event Listener
nextPageBtn.addEventListener("click", onClickNextPageBtn);
for (let newChatBox of newChatBoxes) {
  newChatBox.addEventListener("click", openPage1);
}

//Initialize
openPage1();
