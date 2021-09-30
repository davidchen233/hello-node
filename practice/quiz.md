# event loop 作業

## 程式 1

```javascript
function readData(idx) {
  for (let i = 0; i < 100; i++) {
    idx++;
    console.log(idx);
  }
  if (idx < 500) {
    readData(idx);
  }
}

readData(0);
console.log("after");
```

--> 顯示 1~499 after / after 會顯示再 499 後

--> 程式會照順序執行，依序進入 stack 再處理顯示到 console

- 呼叫 readData(0)，印出 1~100
- 因為 idx < 500，再次呼叫 readData(100)，印出 101~200
- 因為 idx < 500，再次呼叫 readData(200)，印出 201~300
- 因為 idx < 500，再次呼叫 readData(300)，印出 301~400
- 因為 idx < 500，再次呼叫 readData(400)，印出 401~500
- idx = 500，結束這段程式，接著前往下一段程式，印出 after

## 程式 2

```javascript
function readData(idx) {
  for (let i = 0; i < 100; i++) {
    idx++;
    console.log(idx);
  }
  if (idx < 500) {
    setTimeout(function () {
      readData(idx);
    }, 0);
  }
}

readData(0);
console.log("after");
```

--> 顯示 1~100 after 101~500 / after 會顯示再 100 後

- 程式先跑 第一次 for 迴圈，印出 1~100
- 因為 idx < 500，遇到 setTimeout()外包工作給 webapis，便繼續往下執行
- 印出 after
- 剛剛 webapis 執行完會先把結果存放在 taskque，等印完 after，stack 空了以後，便會移動到 stack 裡面接著再次呼叫 readData(100)，跑完迴圈後印出 101~200，因為 idx < 500，再次遇到 setTimeout()
- 因為後面沒有程式了，便會直接在 webapis 執行完後移動到 stack 後再次呼叫 readData(200)，印出 201~300
- 相同的流程一直到最後印出 401~500
