'use strict'

const {google} = require('googleapis');
var sheets = google.sheets('v4');
const fs = require('fs');

// Check why is this not working, meanwhile using require() to load the secrets file.
function readSecrets(){
    let reqSecrets;
    fs.readFile('topsecrets','utf8',(err,data)=>{
        if(err) return console.log('Error loading the secrect file',err);
        reqSecrets = JSON.parse(data);
        console.log('secrets loaded', reqSecrets);
        return reqSecrets;
    })
}

function prepareReturnRequest(){
    console.log('Preparing Request Body');
    const requiredSecrets = require('./topsecrets.json');
    if(isEmpty(!requiredSecrets)){
        try{
            const {sId,sRange,sValueRenderOption,sDateTimeRenderOption,sAPIKey } = requiredSecrets;
            let request = {
                // The ID of the spreadsheet to retrieve data from.
                spreadsheetId: sId,  // TODO: Update placeholder value.
                // The A1 notation of the values to retrieve.
                range: sRange,  // TODO: Update placeholder value.
                // How values should be represented in the output.
                // The default render option is ValueRenderOption.FORMATTED_VALUE.
                valueRenderOption: sValueRenderOption,  // TODO: Update placeholder value.
                // How dates, times, and durations should be represented in the output.
                // This is ignored if value_render_option is
                // FORMATTED_VALUE.
                // The default dateTime render option is [DateTimeRenderOption.SERIAL_NUMBER].
                dateTimeRenderOption: sDateTimeRenderOption,  // TODO: Update placeholder value.
                key: sAPIKey,
              };
              console.log("Request Body:", request);
              return request;
        } catch(e){
            console.log('Destructuring Error:',e);
        }
    } else {
        console.log('Error reading secret file');
    }
}

function authorize(callback) {
    // TODO: Change placeholder below to generate authentication credentials. See
    // https://developers.google.com/sheets/quickstart/nodejs#step_3_set_up_the_sample
    //
    // Authorize using one of the following scopes:
    //   'https://www.googleapis.com/auth/drive'
    //   'https://www.googleapis.com/auth/drive.file'
    //   'https://www.googleapis.com/auth/drive.readonly'
    //   'https://www.googleapis.com/auth/spreadsheets'
    //   'https://www.googleapis.com/auth/spreadsheets.readonly'
    var authClient = 'https://www.googleapis.com/auth/spreadsheets.readonly';
  
    if (authClient == null) {
      console.log('authentication failed');
      return;
    }
    callback(authClient);
  }

function getFromSpreadSheet () {
let request = prepareReturnRequest();
  sheets.spreadsheets.values.get(request, function(err, response) {
    if (err) {
      console.error(err);
      return;
    }
    // TODO: Change code below to process the `response` object:
    // console.log(JSON.stringify(response, null, 2));
    console.log("Response from getFromSpreadSheet:",response);
  });
};

function isEmpty(obj){
    let keys = Object.keys(obj)
    console.log('Checking if object is empty:',keys);
    return (keys).length===0
}

// let obj = {};
// console.log(isEmpty(obj));

// readSecrets();
// prepareReturnRequest();
authorize(getFromSpreadSheet);
