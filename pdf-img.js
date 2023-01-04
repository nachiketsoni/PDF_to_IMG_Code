const { Poppler } = require("node-poppler");
const { dirname } = require("path");
var path = require("path");

const fs = require("fs");
const file = path.join(__dirname, "pdf");
const poppler = new Poppler();

const options = {
  firstPageToConvert: 1,
  pngFile: true,
};

fs.readdir(file, "utf-8", (err, files) => {
  if (err) {
    console.log(err);
  } else {
    files.forEach(async (e) => {
      const pathy = path.join(__dirname, "image");
      const filename = e.split(".")[0];

      fs.mkdir(path.join(__dirname, "image", filename), (err) => {
        if (err) {
          console.log("folder already exist");
        } else {
          console.log("folder created");
        }
      });

      const outputFile = path.join(pathy, filename, filename);

      try {
        const res = await poppler.pdfToCairo(
          path.join(file, e),
          outputFile,
          options
        );
        console.log(res);
      } catch (err) {
        console.log("already file exist", err);
      }
    });
  }
});
