//jshint esversion:6
const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");
const app =express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
  res.sendFile(__dirname +"/signup.html");

});
app.post("/",function(req,res){
  var firstName=req.body.fName;
  var lastName=req.body.lName;
  var email=req.body.email;

  var data={
    members:[
      {
        email_address:email,
        status:"pending",
        merge_fields:{
          FNAME:firstName,
          LNAME:lastName
        }

      }
    ]

  };
  var jsonData=JSON.stringify(data);
  const url="https://us6.api.mailchimp.com/3.0/lists/11df6d0ce9";
  const options={
    method:"POST",
    auth:"chetan1:171055bd3270236a1da8d7b95bd93beb5-us6"

  }
  const request=https.request(url,options,function(response){
     if(response.statusCode === 200){
       res.sendFile(__dirname+"/success.html");
     }else{
       res.sendFile(__dirname+"/failure.html");
     }
     response.on("data",function(data){
       console.log(JSON.parse(data));
     });
  });
  request.write(jsonData);
  request.end();
});
app.post("/failure",function(req,res){
  res.redirect("/");
});


app.listen(process.env.PORT || 3000,function(){
  console.log("server listening on port 3000");
});
// 71055bd3270236a1da8d7b95bd93beb5-us6
// 11df6d0ce9
