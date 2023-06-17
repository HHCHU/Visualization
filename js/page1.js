const openPage1 = () => {
  if (currentPage != "page1") {
    closeAllPages();
    currentPage = "page1";
    page1.style.opacity = 1;
  }
};

const resetPage1 = () => {};
