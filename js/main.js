const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");
const page3 = document.getElementById("page3");
const page4 = document.getElementById("page4");
const page5 = document.getElementById("page5");
const page6 = document.getElementById("page6");
const page7 = document.getElementById("page7");
const pages = [page1, page2, page3, page4, page5, page6, page7];
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
  } else if (currentPage === "page3") {
    closeAllPages();
    currentPage = "page4";
    openPage(page4);
    createPage2();
  } else if (currentPage === "page4") {
    closeAllPages();
    currentPage = "page5";
    openPage(page5);
    createPage2();
  } else if (currentPage === "page5") {
    closeAllPages();
    currentPage = "page6";
    openPage(page6);
    createPage2();
  } else if (currentPage === "page6") {
    closeAllPages();
    currentPage = "page7";
    openPage(page7);
    createPage2();
  } else if (currentPage === "page7") {
    closeAllPages();
    currentPage = "page8";
    openPage(page8);
    createPage2();
  } else if (currentPage === "page8") {
    closeAllPages();
    onClick=location.reload(true);
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
