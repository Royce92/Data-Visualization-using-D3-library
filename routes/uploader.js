var csv = require('csv');
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.load = function(req, res) {
  var records = new Array();
  
  
  csv(records)
   .from.stream(fs.createReadStream('./csv/hd2013.csv'), { columns: true })
   .on('record', function (row, index) {
    records.push(row);
    console.log(row);
    }).on('end', function (count) {
    
      MongoClient.connect("mongodb://localhost:3000/", function (err, db) {
        var collection = db.collection('data')
        collection.insert(records, function (err, doc) {
           console.log(doc);
      });
   });
});
  
  console.log("done"); 
  res.redirect('/'); 
  res.render('index', { title: "Import Successful"}); 
};
