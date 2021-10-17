const axios = require("axios");

let stockCode = "006208";
let today = "20211017";
let format = "json";

axios
  .get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
    params: {
      response: format,
      date: today,
      stockNo: stockCode,
    },
  })
  .then((res) => {
    // HTTP response
    console.log(res.data);
  })
  .catch((e) => {
    console.error("發生錯誤啦", e);
  });
