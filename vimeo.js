const fs = require("fs");

const csvFile = "./test.csv";

function writeFile(fileName, filteredData) {
  fs.appendFile(fileName, filteredData, err => {
    if (err) throw err;
  });
}

function videoValid(videoData) {
  //validate all of the data received from the CSV file based on requirements outlined by the problem given
  const validated = {};

  videoData.reduce((acc, rowString) => {
    const row = rowString.split(",");
    if (
      row[1].length < 30 &&
      row[2] === "anybody" &&
      parseInt(row[3]) > 200 &&
      parseInt(row[5]) > 10
    ) {
      const validValue = parseInt(row[0]);
      validated[validValue] = "valid";
    } else {
      const invalidValue = parseInt(row[0]);
      validated[invalidValue] = "invalid";
    }
  }, []);

  return validated;
}

/** MAIN VALIDATOR FUNCTION  **/
function validator(csvData) {
  const valid = [];
  const invalid = [];
  const checkedVideos = videoValid(csvData);
  Object.entries(checkedVideos).forEach(([key, value]) => {
    if (value == "valid") {
      valid.push(key);
    } else if (value == "invalid") {
      invalid.push(key);
    }
  });

  writeFile("./data/invalid.csv", invalid);
  writeFile("./data/valid.csv", valid);

  //I didn't need to do this part but figured it would be a nice added feature to just see some quick totals in the console.
  return {
    valid: valid,
    invalid: invalid
  };
}

module.exports = {
  writeFile,
  videoValid,
  validator
};
