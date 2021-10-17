const axios = require("axios");

let stockCode = "006208";
let today = "20211017";
let format = "json";

function getData() {
  return axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
    params: {
      response: format,
      date: today,
      stockNo: stockCode,
    },
  });
}

(async () => {
  try {
    const stockData = await getData();
    console.log(stockData.data);
  } catch (err) {
    console.error("err", err);
  }
})();
