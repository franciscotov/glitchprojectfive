'use strict';

var express = require('express');
var cors = require('cors');
var multer = require('multer');

// require and use "multer"...
var upload = multer({dest:'uploads/'});
var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
});

/* Data HTML
<form enctype="multipart/form-data" method="POST" action="/api/fileanalyse">
  <input id="inputfield" type="file" name="upfile">
  <input id="button" type="submit" value="Upload">
</form>
{"name":"Express projects.txt","type":"text/plain","size":633}
{"fieldname":"upfile",
"originalname":"Express projects.txt",
"encoding":"7bit",
"mimetype":"text/plain",
"destination":"uploads/",
"filename":"7e515c4166d9a68826ef1d01016ba487",
"path":"uploads/7e515c4166d9a68826ef1d01016ba487",
"size":633}
*/
app.post('/api/fileanalyse', upload.single('upfile'),(req, res, next)=>{
  var response= {name: req.file.originalname, type: req.file.mimetype, size: req.file.size}
  res.send(response);
  next();
})

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
