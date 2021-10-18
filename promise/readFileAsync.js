let fs = require("fs");

function readFilePromise() {
  return new Promise((resolve, reject) => {
    fs.readFile("./input.txt", "utf-8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

(async function readFile() {
  try {
    const file = await readFilePromise();
    console.log("data", file);
  } catch (err) {
    console.error("err", err);
  }
})();
