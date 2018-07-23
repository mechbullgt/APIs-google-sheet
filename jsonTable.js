const fs = require('fs');

function readJSON(location) {
    return JSON.parse(fs.readFileSync(location, 'utf8'));
}

// var resultArr = readJSON('./data.json').results.map(obj => ({
//     'apiName': obj.name,
//     'resCode': obj.responseCode.code,
//     'resName': obj.responseCode.name,
//     'resTime': obj.time,
//     'testStatus': obj.tests.status,
//     'testDetail': obj.responseCode.detail.detail
// }))

var ourReportData =(location)=>( {
    'reportName': readJSON(location).name,
    'reportCollectionName': readJSON(location).collection.name,
    'results': readJSON(location).results.map(obj => ({
        'apiName': obj.name,
        'resCode': obj.responseCode.code,
        'resName': obj.responseCode.name,
        'resTime': obj.time,
        'testStatus': obj.tests.status,
        'testDetail': obj.responseCode.detail.detail
    }))
})

console.log(ourReportData('/Users/mindstix/Desktop/SPMR_MyWorld_V2.3.postman_test_run.json'));

// var jsonData = function (location) {
//     fs.readFile(location, (err, data) => {
//         if (err) {
//             console.log('Error' + err.message);
//         } else {
//             // console.log(JSON.parse(data));
//             var reportData = JSON.parse(data);
//             var reportName = reportData.name;
//             var collectioName = reportData.collection.name;
//             var reportResultsArray = reportData.results;
//             reportResultsArray.forEach(element => {
//                 console.log(element.name);
//                 // console.log(element.url);
//                 var resCode = element.responseCode.code;
//                 var resName = element.responseCode.name;
//                 var resDetail= element.responseCode.detail.detail;
//                 console.log(resCode+'|'+resName+'|'+resDetail);
//                 var testStatus = element.tests.status;
//                 var responseTime = element.time;
//                 console.log(testStatus+'|'+responseTime);
//             });
//         }
//     });
// };