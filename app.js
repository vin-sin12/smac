const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const router = express.Router();

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function (req, res) {
  res.sendFile(__dirname+"/index.html");
});

app.get("/ourteam",function(req,res){
  res.sendFile(__dirname+"/our-team.html");
})

app.get("/signup",function(req,res){
  res.sendFile(__dirname+"/signupp.html");
})

module.exports = router;

app.post("/",function(req,res){
  const firstname = req.body.fname;
  const lastname = req.body.lname;
  const address= req.body.addr;
  const dob = req.body.dob;
  const admission = req.body.adm;
  const course = req.body.course;
  const city = req.body.city;
  const institute = req.body.inst;
  const email = req.body.email;
  const gender = req.body.gend;


  const data={
    members: [
      {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstname,
        LNAME: lastname,
        ADDRESS: address,
        CITY: city,
        DOB: dob,
        YOA: admission,
        COURSE: course,
        INSTITUTE: institute,
        GENDER: gender
      }
    }
    ]
  };

  const jsondata = JSON.stringify(data);

  const url =   "https://us11.api.mailchimp.com/3.0/lists/5965416ecf";


  const options = {
    method: "POST",
    auth: "Sahil:f41100538dd007bd476320696c830bf2-us11"
  }

  const request = https.request(url,options, function(response){

    if(response.statusCode===200){
      res.sendFile(__dirname+"/sucess.html");
    }
    else{
      res.sendFile(__dirname+"/failure.html");
    }
      response.on("data", function(data){
        console.log(JSON.parse(data));
      })
    })

  //  console.log(JSON.parse(data));

//  console.log(firstname,lastname,email);

request.write(jsondata);
request.end();
});

app.listen(process.env.PORT || 3000,function(){
  console.log("server is running on port 3000");
});

//api key
//c9c1ee1b88dcf933fbae574b8e14122f-us11
// list // IDEA: //5965416ecf
