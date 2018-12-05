const fs = require("fs");

let { writeFile, videoValid, validator } = require("./vimeo");

let csvFile = process.argv[2];

function dataRetriever(err, data) {
  if (err) throw err;

  const totalVideos = data
    .trim(" ")
    .split(`\n`)
    .slice(1);

  const validVideos = validator(totalVideos);
  console.log(`Total videos: ${totalVideos.length}`);
  console.log(`Valid videos: ${validVideos.valid.length}`);
  console.log(`Invalid videos: ${validVideos.invalid.length}`);
}

fs.readFile(csvFile, "utf-8", dataRetriever);

module.exports = {
  dataRetriever
};
