const visualization = document.getElementById("visualization");

const graphFunctions = {};

let vw = visualization.getBoundingClientRect().width;
console.log(vw);
let vm = vw * 0.1;

let margin = { top: vm, right: vm, bottom: vm, left: vm };
let width = vw - (margin.left + margin.right);
let height = vw - (margin.top + margin.bottom);
let svg = d3
  .select("#d3graph")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);
let personaColor = {
  지배자: "#21F2FF",
  수호자: "#FFFFFF",
  "강한 자아": "#0057FF",
  불도저: "#FF006B",
  유혹자: "#FF71A3",
  순정파: "#FF9337",
  숭배자: "#7978F1",
  순수파: "#FFD800",
  "약한 자아": "#7ED321",
  순종자: "#00A980",
  "": "#000000",
};
let legend_ps_to_persona_name = {
  legend_ps_1: "순종자",
  legend_ps_2: "순수파",
  legend_ps_3: "유혹자",
  legend_ps_4: "숭배자",
  legend_ps_5: "순정파",
  legend_ps_6: "약한 자아",
  legend_ps_7: "강한 자아",
  legend_ps_8: "불도저",
  legend_ps_9: "수호자",
  legend_ps_10: "지배자",
};

let legend_fm_to_fm_name = {
  f: "여성",
  m: "남성",
  fm: "혼성",
};

d3.csv("data/data.csv").then((data) => {
  console.log(data);
  // Add X axis

  let x = d3.scaleLinear().domain([0, 1]).range([0, width]);

  // Create a linear gradient
  const xGradient = svg
    .append("linearGradient")
    .attr("id", "xAxisGradient")
    .attr("gradientUnits", "userSpaceOnUse")
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", width)
    .attr("y2", 0);

  // Create a linear gradient
  const yGradient = svg
    .append("linearGradient")
    .attr("id", "yAxisGradient")
    .attr("gradientUnits", "userSpaceOnUse")
    .attr("x1", 0)
    .attr("y1", height)
    .attr("x2", 0)
    .attr("y2", 0);

  // Add gradient color stops
  xGradient.append("stop").attr("offset", "0%").attr("stop-color", "#FDCA40");
  xGradient.append("stop").attr("offset", "61%").attr("stop-color", "#FDCA40");
  xGradient.append("stop").attr("offset", "71%").attr("stop-color", "#34D1BF");
  xGradient.append("stop").attr("offset", "100%").attr("stop-color", "#34D1BF");

  // Add gradient color stops
  yGradient.append("stop").attr("offset", "0%").attr("stop-color", "#6665DD");
  yGradient.append("stop").attr("offset", "35%").attr("stop-color", "#6665DD");
  yGradient.append("stop").attr("offset", "45%").attr("stop-color", "#F17105");
  yGradient.append("stop").attr("offset", "100%").attr("stop-color", "#F17105");

  svg
    .append("line")
    .style("stroke", "url(#xAxisGradient)")
    .style("stroke-width", 3)
    .style("stroke-linecap", "round")
    .attr("x1", 0)
    .attr("y1", height)
    .attr("x2", width)
    .attr("y2", height)
    .attr("opacity", 0.8);

  svg
    .append("line")
    .style("stroke", "white")
    .style("stroke-dasharray", "8, 8")
    .style("stroke-width", 2)
    .style("stroke-linecap", "round")
    .attr("x1", 0)
    .attr("y1", 0.6 * height)
    .attr("x2", width)
    .attr("y2", 0.6 * height)
    .attr("opacity", 0.3);

  svg
    .append("line")
    .style("stroke", "url(#yAxisGradient)")
    .style("stroke-width", 3)
    .style("stroke-linecap", "round")
    .attr("x1", 0)
    .attr("y1", height)
    .attr("x2", 0)
    .attr("y2", 0)
    .attr("opacity", 0.8);

  svg
    .append("line")
    .style("stroke", "white")
    .style("stroke-dasharray", "8, 8")
    .style("stroke-width", 2)
    .style("stroke-linecap", "round")
    .attr("x1", 0.66 * width)
    .attr("y1", height)
    .attr("x2", 0.66 * width)
    .attr("y2", 0)
    .attr("opacity", 0.3);

  svg
    .append("text")
    .style("fill", "white")
    .style("font-size", "20px")
    .attr("dy", ".35em")
    .attr("text-anchor", "middle")
    .attr("transform", "translate(-30,10) rotate(0)")
    .text("주체");
  svg
    .append("text")
    .style("fill", "white")
    .style("font-size", "20px")
    .attr("dy", ".35em")
    .attr("text-anchor", "middle")
    .attr("transform", `translate(-30,${height - 10}) rotate(0)`)
    .text("종속");

  svg
    .append("text")
    .style("fill", "white")
    .style("font-size", "20px")
    .attr("dy", ".35em")
    .attr("text-anchor", "middle")
    .attr("transform", `translate(20,${height + 20}) rotate(0)`)
    .text("수동");
  svg
    .append("text")
    .style("fill", "white")
    .style("font-size", "20px")
    .attr("dy", ".35em")
    .attr("text-anchor", "middle")
    .attr("transform", `translate(${width - 20},${height + 20}) rotate(0)`)
    .text("능동");

  //   let xAxis = d3.axisBottom(x).tickValues([]).ticks(0).tickFormat("");
  //   svg
  //     .append("g")
  //     .attr("transform", "translate(0," + height + ")")
  //     .call(xAxis);

  // Add Y axis
  let y = d3.scaleLinear().domain([0, 1]).range([height, 0]);
  //   let yAxis = d3
  //     .axisLeft(y)
  //     .ticks(0)
  //     .tickFormat(() => "");

  //   svg.append("g").call(yAxis);

  let mouseover = function (event, d) {
    // console.log(d);
    // console.log(d.title);
    let songInfo = document.getElementById("song_info");
    function createInfoLine(k, v, pc = "") {
      return `<p class="songDesc"><b>${k}</b>: <span style="color: ${pc}">${v}</span></p>`;
    }
    function createAlbumImg(imageURL) {
      return `<div style="width:200px; height: 200px; background-color: #40414e;"><img src="${imageURL}" style="width: 100%"/></div><br /><br /><br />`;
    }
    function createLyricBox(lyric) {
      return `<div id='lyricBox'style="width:200px; height: 300px; overflow:scroll">${lyric}</div>`;
    }
    let songInfoHTML = "";
    // console.log(d.imageURL);
    songInfoHTML += createAlbumImg(d.imageURL);
    songInfoHTML += createInfoLine("제목", d.Title);
    songInfoHTML += createInfoLine("가수", d.Singer);
    songInfoHTML += createInfoLine("남/여", d.FM);
    songInfoHTML += createInfoLine("애플 뮤직 연도", d.AppleMusicYear);
    let floatActive = parseFloat(d.Active);
    let floatSubject = parseFloat(d.Subject);
    let activeSubject = `${floatActive.toFixed(2)}, ${floatSubject.toFixed(2)}`;
    songInfoHTML += createInfoLine("능동, 주체", activeSubject);
    let pc = "";
    let personaStr = d.Persona;
    if (d.Persona !== "") {
      pc = personaColor[d.Persona];
    } else {
      personaStr = "-";
    }
    songInfoHTML += createInfoLine("페르소나", personaStr, pc);
    songInfoHTML += createInfoLine("가사", "");
    let replacedLyrics = d.Lyrics.replace(/\n/g, "<br />");
    songInfoHTML += createLyricBox(replacedLyrics);
    // console.log(songInfoHTML);
    songInfo.innerHTML = songInfoHTML;
    event.target.setAttribute("r", 7.5);
  };
  let mouseleave = function (event, d) {
    // console.log(event.target);
    event.target.setAttribute("r", 5);
  };

  const dpColorFM = (d) => {
    if (d.FM === "남성") {
      return "#7CB8FF";
    }
    if (d.FM === "여성") {
      return "#FFA7A7";
    }
    return "white";
  };

  const dpColorPS = (d) => {
    return personaColor[d.Persona];
  };

  const dpColor = (d) => {
    if (current_color_code === "FM") {
      return dpColorFM(d);
    }
    return personaColor[d.Persona];
  };

  const dpOpacityPS = (d) => {
    if (d.Persona === "") {
      return 0.3;
    }
    return 1;
  };

  const dpOpacity = (d) => {
    if (data_by_year) {
      if (d.AppleMusicYear === current_year) {
        if (current_color_code === "PS") {
          return dpOpacityPS(d);
        }
        return 1;
      }
      return 0.3;
    }
    if (current_color_code === "PS") {
      return dpOpacityPS(d);
    }
    return 0.3;
  };

  // Add dots
  svg
    .append("g")
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", function (d) {
      return x(d.Active);
    })
    .attr("cy", function (d) {
      return y(d.Subject);
    })
    .attr("r", 5)
    .attr("title", function (d) {
      return d.Title;
    })
    .style("fill", dpColorFM)
    .on("mouseover", mouseover)
    .on("mouseleave", mouseleave);

  ["f", "m", "fm"].forEach((fm) => {
    graphFunctions[`highlight_on_legend_fm_${fm}`] = () => {
      svg
        .selectAll("circle")
        .attr("r", (d) => {
          if (current_color_code == "FM") {
            if (d.FM === legend_fm_to_fm_name[fm]) {
              return 7.5;
            }
          }
          if (current_color_code == "PS") {
            if (d.FM === legend_fm_to_fm_name[fm] && d.Persona !== "") {
              return 7.5;
            }
          }
          return 5;
        })
        .attr("opacity", (d) => {
          if (current_color_code == "FM") {
            if (d.FM === legend_fm_to_fm_name[fm]) {
              return 1;
            }
          }
          if (current_color_code == "PS") {
            if (d.Persona == "") {
              return 0.3;
            }
            if (d.FM === legend_fm_to_fm_name[fm]) {
              return 1;
            }
          }
          return 0.3;
        });
    };
  });

  for (let i = 1; i <= 10; i++) {
    let lid = `legend_ps_${i}`;
    graphFunctions[`highlight_on_legend_ps_${i}`] = () => {
      svg
        .selectAll("circle")
        .attr("r", (d) => {
          if (d.Persona === legend_ps_to_persona_name[lid]) {
            return 7.5;
          }
          return 5;
        })
        .attr("opacity", (d) => {
          if (d.Persona === legend_ps_to_persona_name[lid]) {
            return 1;
          }
          return 0.3;
        });
    };
  }

  graphFunctions["highlight_off"] = () => {
    svg
      .selectAll("circle")
      .attr("r", (d) => {
        return 5;
      })
      .attr("opacity", (d) => {
        if (current_color_code == "PS") {
          if (d.Persona === "") {
            return 0.3;
          }
        }
        return 1;
      });
  };

  graphFunctions["color_code_fm"] = () => {
    // console.log("color_code_fm");
    svg.selectAll("circle").style("fill", dpColorFM).attr("opacity", 1);
  };
  graphFunctions["color_code_ps"] = () => {
    // console.log("color_code_ps");
    svg
      .selectAll("circle")
      .style("fill", dpColorPS)
      .attr("opacity", dpOpacityPS);
  };
  for (let i = 2004; i <= 2022; i++) {
    graphFunctions[`year_filter_${i}`] = () => {
      svg.selectAll("circle").style("fill", dpColor).attr("opacity", dpOpacity);
    };
  }

  interfaceSetup();
});
