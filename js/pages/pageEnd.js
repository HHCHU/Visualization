// const chatDialogThread_END = document.getElementById("chatDialogThread_END");
const endingMsg = document.getElementById("endingMsg");
const endingSpeed = 5;
let endingIdx = 0;
const endingSv = 3;

const endingPrompt = `
(경민 소감)
<br />
이제는 케이팝 제목만 들어도 '주체종속능동수동' 태도 분류가 먼저
떠올라 버리는 지경에 이르렀답니다..?하하
<br />
그래도 열정 넘치는 팀원들과 함께여서 행복했어요)(
<br />
중국에서 넘어 온 담배까지.....ㅋㅎ 마지막까지 짜릿했던 우리 팀
쵝오🫶   
<br /><br />
(서우 소감)
<br /><br />
(유진 소감)
<br />
한 학기 간 뜨겁게 달려온 저희 팀 너무 고생 많았어요. 이름은
F조지만.. 열정만은 A++..😎
<br />
함께 꼼꼼하게 단계단계 쌓아온 덕분에 자랑스러운 결과물이
나왔어요!
<br />
우리 팀원들 이제는 22시부터 새벽2시 수면 황금시간대에 줌회의가
아닌 꿀잠을 자기를..🍯😴💓
<br /><br />
(혜현 소감)
<br />
사라지는 팀원들과 발등이 아닌 목까지 뜨거운 팀플...거기에 중국
담배까지
<br />
하지만 똑똑걸즈 팀원들과 함께 KPOP의 깊은 심연까지 본 경험 아주
보람찼달까.?
<br />
한학기 동안 다들 너무 수고하셨고 경민서우유진혜현 렛츠고고고✨
`;

const writeEnding = (dom) => {
  console.log("writing...");
  let sVar = Math.random() * (endingSv * 2 - 1) - endingSv;
  let speed = endingSpeed + sVar;
  endingIdx += speed;
  if (endingIdx < endingPrompt.length) {
    dom.innerHTML = endingPrompt.substring(0, endingIdx);
    setTimeout(() => {
      writeEnding(dom);
    }, 100);
  } else {
    // Reply Complete
    dom.innerHTML = endingPrompt;
    showDOM(nextPageBtn);
  }
  // console.log(dialogScrollUpDetected);
  if (!dialogScrollUpDetected) {
    dialogScrollDown();
  }
};
