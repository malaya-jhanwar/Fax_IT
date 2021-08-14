const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const path = require('path');
// const popup=require('popups');
const twilio = require('twilio');
const schedule = require('node-schedule');
const nodemailer = require('nodemailer');
var emails = require('./schemas/emails.js')
var message = require('./schemas/sms.js');
var o,d,t,year,month,dat,hour,minutes,seconds;
var messages,messages1,messages2,messages3,messages4,messages5,messages6,Email,emails1,emails2,emails3,emails4,emails5,emails6;
var uniquemessage, uniqueemail;
var Id1 = "";
var Id2 = "";
var flag = false;

var client = new twilio('AC87c325f8e3701632f1e14bd4d24ab7ec', 'e546ab5417ec80fb46294ba36f0c2090');

var app = express();

// app.set('views', path.join(__dirname, '/'));
// app.engine('ejs');
app.set('view engine','ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname, 'public')));

//nodemailer config
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'aditya.reus11@gmail.com',
      pass: 'marcoreus'
    }
  });
 
//   var year,month,date,hour,minutes,seconds;
  var job;
  var subject;

app.get('/add-email',(req,res)=>{
    res.render('schedule_email.ejs')
});

app.post('/add-email',(req,res)=>{





    console.log(req.body);
    o=req.body;
 
    d=o.date;
 
    year=parseInt(d.substring(0,4));
    month=parseInt(d.substring(5,7)) -1;
    dat=parseInt(d.substring(8,10));
 
    // console.log(year);
    // console.log(month);
    // console.log(dat);
 
    t=o.time;
    hour=parseInt(t.substring(0,2));
    minutes=parseInt(t.substring(3,5));
    seconds=0;
 
    // console.log(hour);
    // console.log(minutes);
    // console.log(seconds);
 
    from='aditya.reus11@gmail.com';
    const{to,subject,text}=o;
 
 // console.log(from);
 // console.log(to);
 // console.log(subject);
 // console.log(text);
 Id1=Id1+'b';
 var email=new emails({subject,from,to,text,date:d,time:t,status:"pending",uniqueId:Id1});
 email.save();
 
 var dts=new Date(year,month,dat,hour,minutes,seconds)
 
 job=schedule.scheduleJob(Id1,dts,()=>{
 
    console.log("EVENT ARRIVED")
    var mailOptions = {
        from,
        to,
        subject,
        text
      };
 
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
 })
 
 
 res.redirect('/menu2');
    // res.end("submitted successfully");
 
 })

app.get('/add-sms',(req,res)=>{
    res.render('formsms.ejs');
})

app.post('/add-sms',(req,res)=>{
    console.log(req.body);
    Id2 = Id2 + 'a';
    var messages = new message({
        subject : req.body.subject,
        date : req.body.date,
        time : req.body.time,
        body : req.body.body,
        receiverNo : req.body.receiverNo,
        uniqueId : Id2
    });
    messages.save((err)=>{
        if(err)
        console.log(err);
        else{
            o=req.body;

             d=o.date;
         
            year=parseInt(d.substring(0,4));
            month=parseInt(d.substring(5,7)) -1;
            dat=parseInt(d.substring(8,10));
         
             t=o.time;
             hour=parseInt(t.substring(0,2));
             minutes=parseInt(t.substring(3,5));
             seconds=0;
         
              var sendMessage = () =>{
                 var sender = '+19852417901';
                 var receiver = req.body.receiverNo;
                 var message = req.body.body;
                 client.messages.create({
                     to: receiver,
                     from: sender,
                     body: message
                 });
             };
             
             var date = new Date(year,month,dat,hour,minutes,0);
             job = schedule.scheduleJob(Id2,date,()=>{
                 console.log('ho gaya');
                 sendMessage();
             });

             res.redirect('/menu2');
            //  res.end("Job Added");
        }
    });
});+



// app.get('/sent',(req,res)=>{
//     res.render('schedule.ejs');
// })

app.get('/dashboard',(req,res)=>{
    message.find({date : '2019-01-01'},(err,messagess)=>{
        if(err)
        console.log(err);
        else{
            messages = messagess;
            emails.find({date : '2019-01-01'},(err,emaill)=>{
                if(err)
                console.log(err);
                else{
                    Email = emaill;
                    message.find({date : '2019-01-02'},(err,messagesss)=>{
                        if(err)
                        console.log(err);
                        else{
                            messages2 = messagesss;
                            emails.find({date : '2019-01-02'},(err,emaill)=>{
                                if(err)
                                console.log(err);
                                else{
                                    emails2 = emaill;
                                    message.find({date : '2019-01-03'},(err,messagesss)=>{
                                        if(err)
                                        console.log(err);
                                        else{
                                            messages3 = messagesss;
                                            emails.find({date : '2019-01-03'},(err,emaill)=>{
                                                if(err)
                                                console.log(err);
                                                else{
                                                    emails3 = emaill;
                                                    message.find({date : '2019-01-04'},(err,messagesss)=>{
                                                        if(err)
                                                        console.log(err);
                                                        else{
                                                            messages4 = messagesss;
                                                            emails.find({date : '2019-01-04'},(err,emaill)=>{
                                                                if(err)
                                                                console.log(err);
                                                                else{
                                                                    emails4 = emaill;
                                                                    message.find({date : '2019-01-05'},(err,messagesss)=>{
                                                                        if(err)
                                                                        console.log(err);
                                                                        else{
                                                                            messages5 = messagesss;
                                                                            emails.find({date : '2019-01-05'},(err,emaill)=>{
                                                                                if(err)
                                                                                console.log(err);
                                                                                else{
                                                                                    emails5 = emaill;
                                                                                    message.find({date : '2019-01-06'},(err,messagesss)=>{
                                                                                        if(err)
                                                                                        console.log(err);
                                                                                        else{
                                                                                            messages6 = messagesss;
                                                                                            emails.find({date : '2019-01-06'},(err,emaill)=>{
                                                                                                if(err)
                                                                                                console.log(err);
                                                                                                else{
                                                                                                    emails6 = emaill;
                                                                                                    res.render('list.ejs',{
                                                                                                        messages : messages,
                                                                                                        messages1 : messages1,
                                                                                                        messages2 : messages2,
                                                                                                        messages3 : messages3,
                                                                                                        messages4 : messages4,
                                                                                                        messages5 : messages5,
                                                                                                        messages6 : messages6,
                                                                                                        Email : Email,
                                                                                                        emails1 : emails1,
                                                                                                        emails2 : emails2,
                                                                                                        emails3 : emails3,
                                                                                                        emails4 : emails4,
                                                                                                        emails5 : emails5,
                                                                                                        emails6 : emails6
                                                                                                    });
                                                                                                }
                                                                                            });
                                                                                        }
                                                                                    });
                                                                                }
                                                                            });
                                                                        }
                                                                    });
                                                                }
                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    })
                }
            })
        }
    });
});


app.get('/delete/sms/:id',(req,res)=>{
    var jb1 = schedule.scheduledJobs[req.params.id];
    jb1.cancel();
    message.findOneAndDelete({uniqueId:req.params.id},(err)=>{
        if(err)
        console.log(err);
        else
        res.redirect('/dashboard');
        
    })
});
app.get('/delete/emails/:id',(req,res)=>{
    var jb2 = schedule.scheduledJobs[req.params.id];
    jb2.cancel();
    emails.findOneAndDelete({uniqueId:req.params.id},(err)=>{
        if(err)
        console.log(err);
        else
        res.redirect('/dashboard');
        
    });    

    // emails.findOneAndDelete({uniqueId:req.params.id},(err)=>{
    //     if(err)
    //     console.log(err);
    //     else
    //     res.redirect('/dashboard');
        
    // });

});

app.get('/details/:id',(req,res)=>{
    message.findOne({_id:req.params.id},(err,uniqueMessage)=>{
        if(err)
        console.log(err);
        else{
            uniquemessage = uniqueMessage;
            emails.findOne({_id:req.params.id},(err,uniqueEmail)=>{
                if(err)
                console.log(err);
                else{
                    uniqueemail = uniqueEmail;
                    res.render('details.ejs',{
                        message : uniquemessage,
                        email : uniqueemail
                    });
                }
            });
        }
    });
})

app.get('/',(req,res)=>{
    res.render('index.ejs');
});

app.get('/signup',(req,res)=>{
    res.render('signup.ejs');
 })

app.post('/signup',(req,res)=>{
    res.redirect('/menu');
}) 

app.get('/menu',(req,res)=>{
    res.render('menu.ejs');
})
app.get('/menu2',(req,res)=>{
    res.render('menu2.ejs');
})

app.listen(7000,()=>{
    console.log('node app running on',7000);
    
});