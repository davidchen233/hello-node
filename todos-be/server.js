const express = require("express");
const mysql = require("mysql");
const Promise = require("bluebird");
require("dotenv").config();

let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
});
connection = Promise.promisifyAll(connection);

let app = express();

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

app.get("/api/todos", async (req, res) => {
  let data = await connection.queryAsync("SELECT * FROM todos");
  res.json(data);
});

app.use((req, res, next) => {
  console.log("我是路由後面的中間件");
  res.status(404).send("Page Not Found");
});

app.listen(3001, () => {
  connection.connect();
  console.log("express app 已啟動");
});
