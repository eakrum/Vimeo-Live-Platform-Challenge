const fs = require("fs");

/***  FUNCTION THAT WRITES DATA TO RESPECTIVE FILE  ***/
function writeFile(fileName, filteredData) {
  fs.appendFile(fileName, filteredData, err => {
    if (err) throw err;
  });
}
/*** FUNCTION THAT CHECKS IF VIDEOS ARE VALID OR INVALID ***/
function videoValid(videoData) {
  const validated = {}; //object that will have key value pair of video id and valid or invalid videos. i.e {200111: "valid"}

  //validate all of the data received from the CSV file based on requirements outlined by the problem given
  videoData.reduce((acc, rowString) => {
    const row = rowString.split(",");

    //if clause that will check for validity (valid), if valid object key value pair will be assigned
    if (
      row[1].length < 30 &&
      row[2] === "anybody" &&
      parseInt(row[3]) > 200 &&
      parseInt(row[5]) > 10
    ) {
      const validValue = parseInt(row[0]);
      validated[validValue] = "valid";

      //else clause that will check for validity (invalid), if invalid object key value pair will be assigned
    } else {
      const invalidValue = parseInt(row[0]);
      validated[invalidValue] = "invalid";
    }
  }, []);

  //returns the object of key value pairs indicating if valid or invalid
  return validated;
}

/**************************************************************************************************************************
*                                          MAIN VALIDATOR FUNCTION
This function calls the "videoValid" and "writeFile" helper functions to verify and append files. Although this function combination 
goes through an extra pass, it has an added functionality of returning an object of two arrays, one of invalid videos and one 
of valid videos. Doing so can add more features or data manipulation and is easily available to use at anybody else's discretion.
*
******************************************************************************************************************************/
function validator(csvData) {
  const valid = []; //an array to hold valid video ID's.
  const invalid = []; //an array to hold invalid video ID's
  const checkedVideos = videoValid(csvData); //this will be an object of all valid and invalid videos.

  //traverses through the object's key value pairs, pushes each video ID into respective array.
  Object.entries(checkedVideos).forEach(([key, value]) => {
    if (value === "valid") {
      valid.push(key);
    } else if (value === "invalid") {
      invalid.push(key);
    }
  });

  //write the respective files with data stored
  writeFile("./data/invalid.csv", invalid);
  writeFile("./data/valid.csv", valid);

  //I didn't need to do this part but figured it would be a nice added feature for future functionality and
  //to just see some quick totals in the console.
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
