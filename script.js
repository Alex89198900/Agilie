const testData = require("./arguments.json");
const fs = require("fs");

const answers = {
  task1: "",
  task2: "",
  task3f: "",
  task3s: "",
  task4: "",
};
/////////////////////////////////////////////task#1/////////////////////////////////////////////////////////////////////////////////////////////
function numbers(firstNum, secondNum) {
  let res = false;
  if (firstNum * 2 === b) {
    res = true;
  } else if (String(firstNum) + "1" === String(secondNum)) {
    res = true;
  }
  return res;
}

function numbers2(firstNum, secondNum) {
  let res = false;
  if (firstNum === secondNum) {
    res = true;
    return res;
  }
  if (firstNum > secondNum) {
    res = false;
    return res;
  }
  if (secondNum % 2 == 0) {
    res = numbers2(firstNum, secondNum / 2);
  } else {
    res = numbers2(firstNum, (secondNum - 1) / 10);
  }

  return res;
}

answers.task1 = testData.task1.map((el) => numbers2(el.firstNum, el.secondNum));

/////////////////////////////////////////////////////task#2/////////////////////////////////////////////////////////////////////////////////
function findDuplicate(arr) {
  let tortoise = arr[0];
  let hare = arr[0];
  while (true) {
    tortoise = arr[tortoise];
    hare = arr[arr[hare]];
    if (tortoise === hare) {
      break;
    }
  }

  tortoise = arr[0];

  while (tortoise !== hare) {
    tortoise = arr[tortoise];
    hare = arr[hare];
  }

  return tortoise;
}

answers.task2 = testData.task2.map((el) => findDuplicate(el));
//////////////////////////////////////////////////////////task#3.1///////////////////////////////////////////////////////////////////////////////
function recordWeight(weight) {
  const availableNotes = [
    25, 20.41, 20, 15.89, 15, 11.34, 10, 5, 4.54, 2.5, 1, 0.5,
  ];
  let result = 0;
  let count = 0;
  weight = weight - 20;
  for (let i = 0; i < availableNotes.length; i++) {
    let note = availableNotes[i] * 2;
    if (count > 12) {
      return "incorrect weight";
    }
    while (weight - note >= 0) {
      count++;
      weight -= parseFloat(`${note}`);
      result += parseFloat(`${note}`);
    }
  }

  return result + 21;
}
answers.task3f = testData.task3f.map((el) => recordWeight(el));

/////////////////////////////////////////////////////////task#3.2////////////////////////////////////////////////////////////////////////////
function countTshirt(sizeHave, sizeNeed) {
  const countSizes = {
    S: sizeHave[0],
    M: sizeHave[1],
    L: sizeHave[2],
    XL: sizeHave[3],
    XXL: sizeHave[4],
    XXXL: sizeHave[5],
  };
  let res = [];
  let count = 0;
  for (let i = 0; i < sizeNeed.length; i++) {
    if (countSizes[sizeNeed[i][0]] > 0 || countSizes[sizeNeed[i][1]] > 0) {
      if (countSizes[sizeNeed[i][0]] && countSizes[sizeNeed[i][0]] > 0) {
        res.push(sizeNeed[i][0]);
      }
      if (countSizes[sizeNeed[i][1]] && countSizes[sizeNeed[i][1]] > 0) {
        res.push(sizeNeed[i][1]);
      }
      count++;
    }
  }
  let answer = count === sizeNeed.length ? "YES:" + res.join(",") : "NO";
  return answer;
}
answers.task3s = testData.task3s.map((el) =>
  countTshirt(el.sizeHave, el.sizeNeed)
);
//////////////////////////////////////////////////////////task#4//////////////////////////////////////////////////////////////////////////////

function goodPos(grid) {
  if (grid.length === 0) return 0;
  let rowsL = grid.length;
  let colsL = grid[0].length;
  let counter = 0;
  function checkNeighbours(binaryMatrix, R, C) {
    if (binaryMatrix?.[R - 1]?.[C] === 1) {
      counter++;
    }
    if (binaryMatrix?.[R + 1]?.[C] === 1) {
      counter++;
    }
    if (binaryMatrix[R][C - 1] === 1) {
      counter++;
    }
    if (binaryMatrix[R][C + 1] === 1) {
      counter++;
    }
  }
  for (let R = 0; R < rowsL; R++) {
    for (let C = 0; C < colsL; C++) {
      if (grid[R][C] === 0) {
        checkNeighbours(grid, R, C);
      }
    }
  }

  return counter;
}

answers.task4 = testData.task4.map((el) => goodPos(el));
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
fs.writeFileSync("./results.json", JSON.stringify(answers));
