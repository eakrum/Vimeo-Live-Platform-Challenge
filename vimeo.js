const fs = require("fs");

/***  FUNCTION THAT WRITES DATA TO RESPECTIVE FILE  ***/
function writeFile(fileName, filteredData) {
  fs.appendFile(fileName, filteredData, err => {
    if (err) throw err;
  });
}

/****************************************************************************************************************************** 
 *                                FUNCTION THAT CHECKS IF VIDEOS ARE VALID OR INVALID 
 I used an object because it can account for repeated video id's,  because each video_id is a "key" it will just reassign!
 *
 ****************************************************************************************************************************/
function videoValid(videoData) {
  return videoData.reduce((acc, rowString) => {
    const row = rowString.split(",");

    //if clause that will check for validity (valid), if valid, object key value pair will be assigned
    if (
      row[1].length < 30 &&
      row[2] === "anybody" &&
      parseInt(row[3]) > 200 &&
      parseInt(row[5]) > 10
    ) {
      const validValue = parseInt(row[0]);
      acc[validValue] = "valid";

      //else clause that will check for validity (invalid), if invalid, object key value pair will be assigned
    } else {
      const invalidValue = parseInt(row[0]);
      acc[invalidValue] = "invalid";
    }
    return acc; //this is the object that contains all key value pairs of ID's and appropriate validity tag i.e { "200088": "invalid" }
  }, {});
}

/**************************************************************************************************************************
*                                          MAIN VALIDATOR FUNCTION
This function calls the "videoValid" helper function to validate all videos. Although this function combination 
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

  //return an object that cointains all the valid and invalid video id's!
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
