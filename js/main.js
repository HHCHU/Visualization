const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");
const page3 = document.getElementById("page3");
const pages = [page1, page2, page3];
let currentPage = "page1";
let currentTitle = "";
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
  // showDOM(page);
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

  if (currentPage === "page1") {
    closeAllPages();
    currentPage = "page2";
    openPage(page2);
    createPage2();
    // hideDOM(nextPageBtn);
  } else if (currentPage === "page2") {
    if (page2Status === PAGE2_STATUS_A_P_S_D) {
      page2Status = PAGE2_STATUS_AP_SD;
      change_Graph_A_P_S_D();
    } else if ((page2Status = PAGE2_STATUS_AP_SD)) {
      closeAllPages();
      openPage(page3);
      currentPage = "page3";
    }
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
