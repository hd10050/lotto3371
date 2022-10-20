import './App.css';
import { Button } from 'react-bootstrap';
import { data, curPrice } from './data';
import { useEffect, useState, useRef } from 'react';
import Result from './component/Result'
import Number from './component/Number'
import Player from './component/Player'
import ResultTable from './component/ResultTable'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

function App() {
  const winPrice = curPrice;
  /**
   * 지난 회차수
   */
  const maxRound = data.length;

  /**
   * 공 색상
   */
  const colorArr = ["#ff4c4c", "#ff8e4f", "#fcd153", "#3cbcff"]

  /**
   * 0회차 전용 빈 값
   */
  const emptyData =
  {
    round: " - ",
    date: " - ",
    num: ["-", "-", "-", "-"],
    price: " - "
  };

  /**
   * Result Component 에 들어가는 지난 회차의 결과
   */
  let [resultData, setResultData] = useState(maxRound < 1 ? emptyData : data[0]);

  /**
   * data.js(지난 회차 Array) 인덱스
   */
  let [currentIdx, setCurrentIdx] = useState(0);

  /**
   * 회차별 결과 Table 보이는 여부
   */
  let [isShow, setIsShow] = useState([false, "light"]);

  /**
   * 추첨하기 버튼클릭 남은 횟수
   */
  let [btnClickCnt, setBtnClickCnt] = useState(5);

  /**
   * 이번 회차 최종 숫자
   */
  // let [numArr, setNumArr] = useState("-", "-", "-", "-"]);
  let [num1, setNum1] = useState("-");
  let [num2, setNum2] = useState("-");
  let [num3, setNum3] = useState("-");
  let [num4, setNum4] = useState("-");
  let [numArr, setNumArr] = useState([0, 0, 0, 0]);

  /**
   * 타이머
   */
  let intervalRef1 = useRef(null);
  let intervalRef2 = useRef(null);
  let intervalRef3 = useRef(null);
  let intervalRef4 = useRef(null);

  // useEffect(() => {
  //   let tempArr;

  //   // 1 ~ 15 난수 발생
  //   if (btnClickCnt == 4) {
  //     timer1 = setInterval(() => {
  //       let randomNum = Math.floor(Math.random() * 16) + 1;
  //       setNum1(randomNum);
  //     }, 100)

  //     timer2 = setInterval(() => {
  //       let randomNum = Math.floor(Math.random() * 16) + 1;
  //       setNum2(randomNum);
  //     }, 100)

  //     timer3 = setInterval(() => {
  //       let randomNum = Math.floor(Math.random() * 16) + 1;
  //       setNum3(randomNum);
  //     }, 100)

  //     timer4 = setInterval(() => {
  //       let randomNum = Math.floor(Math.random() * 16) + 1;
  //       setNum4(randomNum);
  //     }, 100)
  //   }

  //   return () => {

  //     console.log(num1);
  //     clearInterval


  //   }

  // }, [btnClickCnt])

  return (
    <div className="App" >
      <div className="container mainContent">
        <h1 className="m-5">🎉3371배 미니복권🎆</h1>

        <Result data={resultData} colorArr={colorArr} prevBtn={clickPrevBtn} nextBtn={clickNextBtn} />

        {/* ****************이번 회차 추첨**************** */}
        <div className="mt-5">
          <h1 className="">{maxRound + 1} 회 추첨</h1>
          <h5>당첨 금액 : {winPrice}원</h5>
          {/* {
            numArr.map((num, i) =>
              <Number color={colorArr[i > 3 ? 0 : i]} number={num} key={i} />
            )
          } */}
          <Number color={colorArr[0]} number={num1} key={0} />
          <Number color={colorArr[1]} number={num2} key={1} />
          <Number color={colorArr[2]} number={num3} key={2} />
          <Number color={colorArr[3]} number={num4} key={3} />
        </div>
        {/* ********************************************** */}

        <Button className="col-4 m-5" variant={isShow[1]} onClick={() => {
          if (!isShow[0])
            setIsShow([true, "secondary"]);
          else
            setIsShow([false, "light"]);
        }}>회차별 결과</Button>
        <Button className="col-4 m-5" variant="success" onClick={() => { clickDrawBtn() }}>{"추첨하기 ..." + btnClickCnt}</Button>

        {
          !isShow[0] ? null : <ResultTable colorArr={colorArr} />
        }
      </div>
      <Player />
    </div>
  );

  /**
   * 지난 회차 결과 변경 (다음 회차)
   */
  function clickNextBtn() {
    if (maxRound < 1)
      return;

    let tempIdx = currentIdx;
    tempIdx = tempIdx - 1 < 0 ? 0 : tempIdx - 1;
    setResultData(data[tempIdx]);
    setCurrentIdx(tempIdx);
  }

  /**
   * 지난 회차 결과 변경 (이전 회차)
   */
  function clickPrevBtn() {
    if (maxRound < 1)
      return;

    let tempIdx = currentIdx;
    tempIdx = tempIdx + 1 > maxRound - 1 ? maxRound - 1 : tempIdx + 1;
    setResultData(data[tempIdx]);
    setCurrentIdx(tempIdx);
  }

  /**
   * 추첨하기 버튼 클릭
   */
  function clickDrawBtn() {
    if (btnClickCnt < 1)
      return;

    let tempCnt = btnClickCnt;
    tempCnt -= 1;
    setBtnClickCnt(tempCnt);

    if (tempCnt == 4) {
      drawNumber();
    }
    else if (tempCnt == 3) {
      clearInterval(intervalRef1.current);
      intervalRef1.current = null;
      setNum1(numArr[0]);
    }
    else if (tempCnt == 2) {
      clearInterval(intervalRef2.current);
      intervalRef2.current = null;
      setNum2(numArr[1]);
    }
    else if (tempCnt == 1) {
      clearInterval(intervalRef3.current);
      intervalRef3.current = null;
      setNum3(numArr[2]);
    }
    else if (tempCnt == 0) {
      clearInterval(intervalRef4.current);
      intervalRef4.current = null;
      setNum4(numArr[3]);
    }
  }

  /**
   * 최종 추첨 숫자 생성 / 숫자 돌리기
   */
  function drawNumber() {
    // Set에 4개의 숫자 생성
    let tempSet = new Set();
    while (tempSet.size != 4) {
      let randomNum = Math.floor(Math.random() * 15) + 1;
      tempSet.add(randomNum);
    }

    // Set to Array
    let tempArr = [...Array.from(tempSet)];
    setNumArr(tempArr.sort(function (a, b) {
      return a - b;
    }));

    // 숫자돌리기
    intervalRef1.current = setInterval(() => {
      let randomNum = Math.floor(Math.random() * 15) + 1;
      setNum1(randomNum);
    }, 100)

    intervalRef2.current = setInterval(() => {
      let randomNum = Math.floor(Math.random() * 15) + 1;
      setNum2(randomNum);
    }, 100)

    intervalRef3.current = setInterval(() => {
      let randomNum = Math.floor(Math.random() * 15) + 1;
      setNum3(randomNum);
    }, 100)

    intervalRef4.current = setInterval(() => {
      let randomNum = Math.floor(Math.random() * 15) + 1;
      setNum4(randomNum);
    }, 100)
  }

  // function useInterval(callback, delay) {
  //   const savedCallback = useRef();

  //   // Remember the latest callback.
  //   useEffect(() => {
  //     savedCallback.current = callback;
  //   }, [callback]);

  //   // Set up the interval.
  //   useEffect(() => {
  //     function tick() {
  //       savedCallback.current();
  //     }
  //     if (delay !== null) {
  //       let id = setInterval(tick, delay);
  //       return () => clearInterval(id);
  //     }
  //   }, [delay]);
  // }
}

export default App;
