const express = require("express");

let app = express(); // application

// 路由 route / router
// app.Method(Path, handler);
// Method: GET, POST, DELETE, PUT, PATCH, ...
// Handler 是一個函式，會有 request response 兩個參數
app.get("/", (req, res) => {
  res.send("我是 Express 首頁");
});

app.get("/member", (req, res) => {
  res.send("我是 Express 會員頁");
});

// 3001 port
app.listen(3001, () => {
  console.log("express app 啟動了喔");
});
