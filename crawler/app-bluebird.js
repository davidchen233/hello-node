const axios = require("axios");
const fs = require("fs/promises");
const mysql = require("mysql");
const moment = require("moment");
require("dotenv").config();
const Promise = require("bluebird");

const connection = mysql.createConnection({
  host: process.env.DB_HOST, // 本機 127.0.0.1
  port: process.env.DB_PORT, // 埠號 mysql 預設就是 3306
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
});

connection = Promise.promisifyAll();
// connection.connect();

function insertData(stockData) {
  return new Promise((resolve, reject) => {
    connection.query(
      "INSERT IGNORE INTO stock (stock_no, date, deal, amount, count) VALUES (?, ?, ?, ?, ?);",
      stockData,
      (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      }
    );
  });
}

async function queryData() {
  let today = moment().format("YYYYMMDD");
  let format = "json";
  try {
    let stockCode = await fs.readFile("stock.txt", "utf-8");
    let res = await axios.get(
      "https://www.twse.com.tw/exchangeReport/STOCK_DAY",
      {
        params: {
          response: format,
          date: today,
          stockNo: stockCode,
        },
      }
    );
    let firstItem = res.data.data[0];
    let firstItemData = [
      stockCode,
      firstItem[0],
      firstItem[1],
      firstItem[2],
      firstItem[8],
    ];

    let data = await insertData(firstItemData);
    console.log("輸入成功", data);
  } catch (e) {
    console.error(e);
  } finally {
    connection.end();
  }
}

queryData();
