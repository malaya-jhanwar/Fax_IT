const mongoose = require('mongoose');
mongoose.connect('mongodb://Sriharsh11:Marcoreus11@ds115263.mlab.com:15263/social-media-scheduler',()=>{
    console.log('connected with database');
});

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    subject : {
      type : String,
    },
    date : {
        type : String,
        required : true
    },
    time : {
        type : String,
        required : true
    },
    body : {
        type : String,
        required : true
    },
    receiverNo : {
      type : Number,
      required : true
    },
    uniqueId : {
      type : String
    }
  });
  
  var message = mongoose.model('message',UserSchema);
  
  module.exports = message;