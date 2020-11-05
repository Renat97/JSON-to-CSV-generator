const express = require('express');
const path = require('path');
const app = express();
var multiparty = require('multiparty');
const port = 3000;
const multer = require('multer');
var bodyParser = require('body-parser');
var util = require('util');
var upload = multer({ dest: './uploads/' })
const fs = require('fs');

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

var cpUpload = upload.fields([{name: 'upload', maxCount: 1}]);
app.post('/upload_json', cpUpload, (req, res) => {
  console.log('files', req.files['upload'][0]);
  fs.readFile(req.files['upload'][0].path, 'utf8', (err, data) => {
    console.log('file data', JSON.parse(data)['username']);
    for(var i = 0; i < Object.keys(JSON.parse(data)).length; i++) {
    res.write(Object.keys(JSON.parse(data))[i] + ' ');
    }
    res.write('\n');
    for(var j = 0; j < Object.keys(JSON.parse(data)).length; j++) {
      res.write(JSON.parse(data)[Object.keys(JSON.parse(data))[j]] + ' ');
    }
    // res.end();
    res.end();

  });

});

app.post('/upload_json', (req, res) => {
  console.log('GREAT SUCCESS', req.body);
});

app.use(express.static(path.join(__dirname, 'client')));

/* OUTPUT
firstName,lastName,county,city,role,sales
Joshie,Wyattson,San Mateo,San Mateo,Broker,1000000
Beth Jr.,Johnson,San Mateo,Pacifica,Manager,2900000
Smitty,Won,San Mateo,Redwood City,Sales Person,4800000
Allen,Price,San Mateo,Burlingame,Sales Person,2500000
Beth,Johnson,San Francisco,San Francisco,Broker/Sales Person,7500000
*/