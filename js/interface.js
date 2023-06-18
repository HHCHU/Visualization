let current_color_code = "FM";
let data_by_year = false;
let current_year = 2022;
let current_clicked = "";

function interfaceSetup() {
  const legend_fm_m = document.getElementById("legend_fm_m");
  const legend_fm_f = document.getElementById("legend_fm_f");
  const legend_fm_fm = document.getElementById("legend_fm_fm");

  const legends = [legend_fm_m, legend_fm_f, legend_fm_fm];
  for (let i = 1; i <= 10; i++) {
    legends.push(document.getElementById(`legend_ps_${i}`));
  }

  const highlightOn = (e) => {
    if (!data_by_year) {
      graphFunctions[`highlight_on_${e.currentTarget.id}`]();
      e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
    }
  };
  const highlightOff = (e) => {
    if (!data_by_year) {
      let legend_id = e.currentTarget.id;
      if (current_clicked === "") {
        graphFunctions["highlight_off"]();
        e.currentTarget.style.backgroundColor = "";
      } else if (legend_id !== current_clicked) {
        graphFunctions[`highlight_on_${current_clicked}`]();
        e.currentTarget.style.backgroundColor = "";
      }
    }
  };
  const onClickLegend = (e) => {
    let legend_id = e.currentTarget.id;
    for (let legend of legends) {
      if (legend_id !== legend.id) {
        console.log(legend);
        legend.style.backgroundColor = "";
      }
    }
    if (current_clicked === "") {
      current_clicked = legend_id;
    } else if (current_clicked !== legend_id) {
      current_clicked = legend_id;
    } else {
      current_clicked = "";
    }
  };

  legends.forEach((legend) => {
    console.log(legend.id);
    legend.addEventListener("mouseover", highlightOn);
    legend.addEventListener("mouseleave", highlightOff);
    legend.addEventListener("click", onClickLegend);
  });

  const ccFM = document.getElementById("ccFM");
  const ccPS = document.getElementById("ccPS");

  const onClickCCFM = (e) => {
    current_color_code = "FM";
    graphFunctions["color_code_fm"]();
  };
  const onClickCCPS = (e) => {
    current_color_code = "PS";
    graphFunctions["color_code_ps"]();
  };
  ccFM.addEventListener("click", onClickCCFM);
  ccPS.addEventListener("click", onClickCCPS);

  let cb_years = document.getElementById("cb_years");
  let rangeYear = document.getElementById("rangeYear");
  let inputRangeYearLabel = document.getElementById("inputRangeYearLabel");
  let dataLegend = document.getElementById("dataLegend");

  const onClickCheckBoxYears = (e) => {
    data_by_year = cb_years.checked;
    rangeYear.disabled = !cb_years.checked;
    let year = rangeYear.value;
    if (cb_years.checked) {
      inactiveLegends();
    } else {
      activeLegends();
    }
  };
  const onInputRangeYear = (e) => {
    current_year = e.target.value;
    graphFunctions[`year_filter_${current_year}`]();
    inputRangeYearLabel.innerText = `년도: ${e.target.value}`;
  };
  const activeLegends = () => {
    dataLegend.style.opacity = 1;
  };
  const inactiveLegends = () => {
    dataLegend.style.opacity = 0.2;
    graphFunctions[`year_filter_${current_year}`]();
  };
  cb_years.addEventListener("click", onClickCheckBoxYears);
  rangeYear.addEventListener("input", onInputRangeYear);
}
