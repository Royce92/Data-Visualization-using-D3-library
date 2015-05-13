var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
var College = require('../models/record');
var ifErr = function (err, callback) {
    mongoose.connection.close();
    callback(err);
    console.log(err);
};

exports.index = function (req, res, next) {
    College.find({}).select('_id INSTNM').lean().exec(function (err, colleges) {
        if (err) {
            console.log('err', err);
            ifErr(err);
        } else {
            res.render('collegelist', {
                colleges: colleges
            });
        }
    });
};


exports.getCollegeById = function (req, res) {
    var id = req.params.id;
    College.findOne({_id: id}).lean().exec(function (err, college) {
        if (err) {
            console.log(err);
            ifErr(err);
        } else {
            delete college._id;
            delete college.__v;
            res.render('college', {
                title: 'College Information Details',
                college: college
            });
        }
    });
};

exports.genderInformation = function(req, res){
    var id = req.params.id;

    College.findOne({_id: id}, 'GENDER', function(err, document){
        if(err){
            console.log(err);
        } else {
            if(document.GENDER){
                res.send(document.GENDER);
            } else {
                console.log('The college does not contain gender information');
            }
        }

    })
};

exports.topcolleges = function (req, res) {
    College.find({}).sort({TOTAL: -1}).limit(10)
        .exec(function (err, topcolleges) {
        if (err) {
            console.log('err', err);
            ifErr(err);
        } else {
            if(topcolleges){
               topcolleges.forEach(function(value)
                {
                    console.log(value);
                })
            }
            res.render('topcolleges', {
                colleges: topcolleges
            });
        }
    });
};

exports.topten = function(req, res){

    College.find({}).sort({TOTAL: -1}).limit(10)
        .exec(function (err, topten) {
            if (err) {
                console.log('err', err);
            } else {
                if(topten){
                    var college = [];
                    for (var i = 0, len = topten.length; i < len; i++){

                        var holder = [topten[i].TOTAL];
                        college.push(holder);
                        console.log(holder);
                        console.log(college);
                    }
                    console.log(college);
                    res.send(college);
                } else {
                    console.log("Not total data");
                }

            }
        });
};

exports.getTuitionInfo = function(req, res){
  var id = req.params.id;
  College.findOne({_id: id}, 'TUITION',  function(err, mydoc){
      if(err){
          console.log(err)
      } else {
          if(mydoc.TUITION && mydoc.TUITION.length != 0){
              res.send({
                  title: 'Enrollment by Year',
                  tuition: mydoc.TUITION
              });
          } else {
              res.send('This college does not have tuition');
              res.end();
          }
      }

  })
};
