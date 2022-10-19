import './App.css';
import { Button } from 'react-bootstrap';
import data from './data';
import { useState } from 'react';
import Result from './component/Result'
import Number from './component/Number'
import Player from './component/Player'

function App() {

  const maxRound = data.length;
  const colorArr = ["#ff4c4c", "#ff8e4f", "#fcd153", "#3cbcff"]
  const numArr = ["-", "-", "-", "-"]
  const emptyData =
  {
    round: " - ",
    date: " - ",
    num: ["-", "-", "-", "-"],
    price: " - "
  };
  let [resultData, setResultData] = useState(maxRound < 1 ? emptyData : data[0]);
  let [currentIdx, setCurrentIdx] = useState(0);

  
  return (
    <div className="App" >
      <div className="container">
        <h1 className="m-5">🎉3371배 미니복권🎆</h1>
        <Player />
        <Result data={resultData} colorArr={colorArr} prevBtn={prevBtn} nextBtn={nextBtn} />

        <div className="mt-5">
          <h1 className="m-5">{maxRound + 1} 회 추첨</h1>
          {
            numArr.map((num, i) =>
              <Number color={colorArr[i > 3 ? 0 : i]} number={num} key={i} />
            )
          }
        </div>

        <Button className="col-4 m-5" variant="light">회차별 결과</Button>
        <Button className="col-4 m-5" variant="success">추첨하기</Button>
      </div>
    </div>
  );

  function prevBtn() {
    if (maxRound < 1)
      return;

    let tempIdx = currentIdx;
    tempIdx = tempIdx - 1 < 0 ? 0 : tempIdx - 1;
    setResultData(data[tempIdx]);
    setCurrentIdx(tempIdx);
  }
  
  function nextBtn() {
    if (maxRound < 1)
      return;

    let tempIdx = currentIdx;
    tempIdx = tempIdx + 1 > maxRound - 1 ? maxRound - 1 : tempIdx + 1;
    setResultData(data[tempIdx]);
    setCurrentIdx(tempIdx);
  }
}

export default App;
