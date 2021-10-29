const express = require("express");

let app = express(); // application

// app.use 告訴 express 這裡有一個中間件(middleware)
// middleware 只是一個函式，會有三個參數
app.use((req, res, next) => {
  console.log("我是 N.1 中間件");
  // 如果沒有 next，那就停在這裡

  next(); // next 可以讓他往下一關前進
  // 完全不關心 next 是誰，只知道要給下一個 (低耦合)
});

app.use((req, res, next) => {
  let now = new Date();
  console.log(`在${now}的時候有人來訪喔`);
  next();
});

// 路由 route / router --> 本身也算是一種中間件
// app.Method(Path, handler)
// Method - GET, POST, PUT, DELETE, PATCH, ...
// Handler 是一個函式，會有 request, response 兩個參數 (其實還有 use)
app.get("/", (req, res) => {
  console.log("我是首頁");
  res.send("我是 Express 首頁");
});

app.get("/member", (req, res, next) => {
  console.log("我是會員頁1");
  // res.send("我是 Express 會員頁");

  // 如果沒有跟他說要幹嘛，就會在這個區塊繼續等待response
  // 不會離開找到下一個一樣路由並進入
  next();
});

app.get("/member", (req, res) => {
  console.log("我是會員頁2");
  res.send("我是 Express 會員頁");
});

// 職責切割，便於修改與維護

// 這個中間件是負責做紀錄
app.use((req, res, next) => {
  console.log(`${req.url} 找不到路由`);
  next();
});

// 既然會走到所有路由後面的這個中間件
// 就表示前面所有路由中間件的 path 都比不到
// --> 404 (完美的巧合) !!
app.use((req, res, next) => {
  console.log("我是路由後面的中間件");
  res.status(404).send("Page Not Found");
});

// 3001 port
app.listen(3001, () => {
  console.log("express app 已啟動");
});
