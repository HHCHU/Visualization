const page1 = document.getElementById("page1");
const pages = [page1];
let currentPage = "page1";

const closeAllPages = () => {
  for (let page of pages) {
    page.style.opacity = 0;
  }
};
