const fs = require("fs");

fs.readFile("a.txt", "utf-8", (err, data) => {
  console.log(data);
  data = data.replace(/\s+/g, " ");
  fs.writeFile("a.txt", data, "utf-8", () => {});
});
