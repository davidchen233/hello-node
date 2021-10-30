const express = require("express");
const mysql = require("mysql");
const Promise = require("bluebird");
require("dotenv").config();
const cors = require("cors");

let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
});
// 把 connection 包裝成 promise
connection = Promise.promisifyAll(connection);

let app = express();

let corsOptions = { origin: "*" };
app.use(cors(corsOptions)); // 有參數可以設定，也可以先用預設值

app.use((req, res, next) => {
  let now = new Date();
  console.log(`在${now}的時候有人來訪喔`);
  next();
});

app.get("/", (req, res) => {
  console.log("我是首頁");
  res.send("我是 Express 首頁");
});

app.get("/member", (req, res, next) => {
  console.log("我是會員頁");
  res.send("我是會員頁");
});

// get members id=? (單筆資料)
app.get("/api/members/:memberId", async (req, res) => {
  let data = await connection.queryAsync("SELECT * FROM members WHERE id=?", [
    req.params.memberId,
  ]);
  if (data.length > 0) {
    // 因為回覆的只會有一個物件
    res.json(data[0]);
  } else {
    res.send(null);
    // 也可以 res.status(404).send("Not Found");
  }
});

// get todos 列表 (全部物件)
app.get("/api/todos", async (req, res) => {
  let data = await connection.queryAsync("SELECT * FROM todos");
  res.json(data);
});

// get todos id=? 的物件 (單筆資料)
app.get("/api/todos/:todoId", async (req, res) => {
  let data = await connection.queryAsync("SELECT * FROM todos WHERE id=?", [
    req.params.todoId,
  ]);
  if (data.length > 0) {
    // 因為回覆的只會有一個物件
    res.json(data[0]);
  } else {
    res.send(null);
    // 也可以 res.status(404).send("Not Found");
  }
});

app.use((req, res, next) => {
  console.log("我是路由後面的中間件");
  res.status(404).send("Page Not Found");
});

app.listen(3001, () => {
  connection.connect();
  console.log("express app 已啟動");
});
