
/**
 * 모든 회차의 당첨 정보를 기록
 * 최근 정보를 담은 인덱스는 항상 0
 */
let data = [
  {
    round: "6",
    date: "2022-11-27",
    num: ["1", "3", "6", "10"],
    price: " - "
  },
  {
    round: "5",
    date: "2022-11-27",
    num: ["3", "8", "10", "12"],
    price: " - "
  },
  {
    round: "4",
    date: "2022-11-20",
    num: ["3", "10", "11", "12"],
    price: " - "
  },
  {
    round: "3",
    date: "2022-11-06",
    num: ["1", "3", "10", "12"],
    price: " - "
  },
  {
    round: "2",
    date: "2022-10-30",
    num: ["1", "6", "13", "14"],
    price: " - "
  },
  {
    round: "1",
    date: "2022-10-23",
    num: ["1", "2", "7", "10"],
    price: " - "
  }
];

let curPrice = "49,000";

export { data, curPrice };
