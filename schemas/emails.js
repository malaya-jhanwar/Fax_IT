const mongoose=require('mongoose');
mongoose.connect('mongodb://Sriharsh11:Marcoreus11@ds115263.mlab.com:15263/social-media-scheduler',()=>{
    console.log('connected with database');
});

const Schema=mongoose.Schema;

const mailSchema=new Schema({
   subject:{
       type:String,
       required:true
   },
   from:{
       type:String,
       required:true
   },
   to:{
       type:String,
       required:true
   },
   text:{
       type:String,
       required:true
   },
   date:{
       type:String,
       required:true
   },
   time:{
       type:String,
       required:true
   },
   status:{
       type:String,
       required:true
   },
   uniqueId:{
       type:String,
       required:true
   }
})

module.exports=mongoose.model('emails',mailSchema);