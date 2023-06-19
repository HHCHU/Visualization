const TITLE_LOVE_DIVE = "LOVE DIVE";
const TITLE_TROUBLE_MAKER = "Trouble Maker";
const TITLE_EMPTY = "공허해";
const TITLE_CHAINED_UP = "사슬";

const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");
const page3 = document.getElementById("page3");
const page4 = document.getElementById("page4");
const page5 = document.getElementById("page5");
const page6 = document.getElementById("page6");
const page7 = document.getElementById("page7");

const pageEnd = document.getElementById("pageEnd");
const pages = [page1, page2, page3, page4, page5, page6, page7, pageEnd];
let currentPage = "page1";
let currentTitle = "";
const nextPageBtn = document.getElementById("nextPageBtn");
const newChatBoxes = document.getElementsByClassName("newChatBox");
const homeBtn = document.getElementById("homeBtn");

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
      page2Status = PAGE2_STATUS_A_P_S_D;
      currentPage = "page3";
      page3Status = PAGE3_STATUS_COORDINATE;
      showDOM(homeBtn);
      resetPage3();
    }
  } else if (currentPage === "page3") {
    console.log("From", page3Status);
    if (page3Status === PAGE3_STATUS_COORDINATE) {
      page3Status = PAGE3_STATUS_IMP_OVERALL;
    } else if (page3Status === PAGE3_STATUS_IMP_OVERALL) {
      hideDOM(p3LeftOverall);
      hideDOM(p3RightOverall);
      showDOM(rangeSubjectVertical);
      showDOM(p3LeftSubject);
      page3Status = PAGE3_STATUS_IMP_SUBJECT;
    } else if (page3Status === PAGE3_STATUS_IMP_SUBJECT) {
      hideDOM(rangeSubjectVertical);
      showDOM(rangeActive);
      page3Status = PAGE3_STATUS_IMP_ACTIVE;
    } else if (page3Status === PAGE3_STATUS_IMP_ACTIVE) {
      hideDOM(rangeActive);
      currentPage = "pageEnd";
      closeAllPages();
      openPage(pageEnd);
      nextPageBtn.innerText = "To Start";
      hideDOM(homeBtn);
    }
    console.log("To", page3Status);
    // <<<<<<< Updated upstream
    // closeAllPages();
    // currentPage = "page4";
    // openPage(page4);
    // createPage2();
  }
  // else if (currentPage === "page4") {
  //   closeAllPages();
  //   currentPage = "page5";
  //   openPage(page5);
  //   createPage2();
  // } else if (currentPage === "page5") {
  //   closeAllPages();
  //   currentPage = "page6";
  //   openPage(page6);
  //   createPage2();
  // } else if (currentPage === "page6") {
  //   closeAllPages();
  //   currentPage = "page7";
  //   openPage(page7);
  //   createPage2();
  // } else if (currentPage === "page7") {
  //   closeAllPages();
  //   currentPage = "page8";
  //   openPage(page8);
  //   createPage2();
  // } else if (currentPage === "page8") {
  //   closeAllPages();
  //   onClick = location.reload(true);
  // }
  else if (currentPage === "pageEnd") {
    closeAllPages();
    openPage1();

    // onClick = location.reload(true);
  }
  console.log("To", currentPage);
};
// PAGE3_STATUS_IMP_OVERALL
// const PAGE3_STATUS_COORDINATE = "PAGE3_STATUS_COORDINATE";
// const PAGE3_STATUS_IMP_SUBJECT = "PAGE3_STATUS_IMP_SUBJECT";
// const PAGE3_STATUS_IMP_ACTIVE = "PAGE3_STATUS_IMP_ACTIVE";
// //
// let page3Status = PAGE3_STATUS_COORDINATE;

// Add Event Listener
nextPageBtn.addEventListener("click", onClickNextPageBtn);
for (let newChatBox of newChatBoxes) {
  newChatBox.addEventListener("click", openPage1);
}

homeBtn.addEventListener("click", openPage1);

//Initialize
window.onload = function () {
  openPage1();
  let rangeWidth = canvasHeight * 0.8;
  rangeSubjectVertical.style.width = `${rangeWidth}px`;
  rangeActive.style.width = `${rangeWidth}px`;
};
