# Vimeo Live Platform Engineering Coding Challenge Summer 2019

Vimeo's coding challenge for the Live Platform Engineering team in Summer 2019. This code parses through CSV data and identifies if a
clip is valid or invalid based off of given requirements. It will then write the video Id's to their respective files.

### Prerequisites

This project works with node 10.6.0, testing on other versions has not been performed please check your version below.

```
node --version
```

### Installing

Make sure you have node installed on your machine. Then clone this repository, navigate to directory and perform an npm install
For example:

```
Vimeo-Live-Platform-Challenge YOUR-USERNAME$ npm install
```

### Running

After installing simply run the following commands

Start:

```
npm start
```

Test:

`````````
npm start
`````````

### How it works

Although user input on feeding the CSV file was up to discretion, I decided to to make it a process argument variable. Meaning without 
`````````
npm start  
`````````
we would run   
``````````````````````````````
node main.js ./data/clips.csv  
``````````````````````````````
by doing so, we can add different csv files to the program to run the diagnostics without changing any code. 

The way the program works is it has two main functions for validation. One function noted as `videoValid()` will perform the actual logic needed to confirm whether or not a video is invalid or valid. It will traverse through the entire csv file and store key value pairs of video_ids and "valid" or "invalid". We then have our main `validator()` function that traverses the object returned from `videoValid()` and the video ID's in a "valid" or "invalid" array. The function then uses these two arrays to write the appropriate files.
The function also returns these arrays to be called later in `main.js` where it brings it all together for some easy to read totals in the console. Although not necessary, by returning these two arrays, it allows for more dynamic data manipulation ready to be used in the future if necessary without having to refactor a lot of code, if any. For a more detailed breakdown on how the code works, I have also commented notes in the code itself.  


### Issues

Due to other responsibilites such as coursework, finals, and needing to complete challenges for two other teams at Vimeo there are some slight issues that I know of, but do not necessarily have time to resolve. 
1. One issue is checking & identifying if the the CSV file follows
the appropriate format as shown by clips.csv. 
2. Although my "validated" object checks for repeated video id's, it does not check if the CSV file contains repeated video ID's. As per 
requirements, I decided to append a file of video id's in case we feed the system different CSV's to check for data and append to 1 CSV
containing all valid and invalid clips.
If requirements were to change such as, writing a different CSV every time we run the process, I would just do one fs.writeFile and give the appropriate file name as a process argument variable. Negative impacts on this include losing previous data if we were to write the same file twice. 


