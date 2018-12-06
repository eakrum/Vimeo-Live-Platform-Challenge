require("mocha-sinon");
const chai = require("chai");
const expect = chai.expect;
const { validator, videoValid, writeFile } = require("../vimeo.js");

const invalidObj = { "200088": "invalid" };
const validObj = { "200111": "valid" };

const processed = {
  valid: ["200111", "200224", "200318"],
  invalid: ["200019", "200088", "200354"]
};

const mockData = [
  "200019,Drift Day,users,205,10,6",
  "200088,Bloc Party- The Prayer,anybody,751,0,10",
  "200111,5 Memorial Weekend Vignettes,anybody,689,24,21",
  "200224,show us the muscles,anybody,341,8,12",
  "200318,My 5 Vignettes ,anybody,673,10,11",
  "200354,Musical 5 X 5 X Ctd3,anybody,125,10,7"
];

describe("Testing function videoValid() for accuracy", () => {
  it("videoValid() should return an object with a key of 'video_id' and value of 'valid' i.e {'200318': 'valid'}", () => {
    expect(
      videoValid(["200111,5 Memorial Weekend Vignettes,anybody,689,24,21"])
    ).to.deep.equal(validObj);
  });

  it("videoValid() should return an object with a key of 'video_id' and value of 'invalid' i.e {'200354': 'invalid'}", () => {
    expect(
      videoValid(["200088,Bloc Party- The Prayer,anybody,751,0,10"])
    ).to.deep.equal(invalidObj);
  });
});

describe("Testing function validator() for accuracy", () => {
  it("validator() should return an object of arrays of valid and invalid clips", () => {
    expect(validator(mockData)).to.deep.equal(processed);
  });
});


