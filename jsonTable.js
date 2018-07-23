const fs = require('fs');

var jsonData = function (location) {
    fs.readFile(location, (err, data) => {
        if (err) {
            console.log('Error' + err.message);
        } else {
            //        console.log(JSON.parse(data));
            var reportData = JSON.parse(data);
            var reportName = reportData.name;
            var collectioName = reportData.collection.name;
            var reportResultsArray = reportData.results;
            reportResultsArray.forEach(element => {
                console.log(element.name);
                // console.log(element.url);
                var resCode = element.responseCode.code;
                var resName = element.responseCode.name;
                var resDetail= element.responseCode.detail.detail;
                console.log(resCode+'|'+resName+'|'+resDetail);
                var testStatus = element.tests.status;
                var responseTime = element.time;
                console.log(testStatus+'|'+responseTime);
            });
        }
    });
}

console.log(jsonData('./data.json'));
