const express=require("express");
const bodyParser=require("body-parser");
const app = express();

const mongoose = require("mongoose");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/dataListDB");


const dataSchema={

    name:String,
    productName:String,
 
    kilogram:Number,
    price:Number,
   
};
const Data=mongoose.model("data", dataSchema);
    
    // other fields...

  
app.set('view engine', 'ejs');


app.get("/", function(req, res) {
 
    let today=new Date();
    let options={
        weekday:"long",
        day:"numeric",
        month:"long"
    };
    let day=today.toLocaleDateString("en-US",options);
    Data.find({},function(err, foundItems){
        if(foundItems.length==0){
            Data.insertMany({day,foundItems},function(err){ 
                if(err){
                    console.log(err);
                }else{
                    console.log("inserted");
                }
            });
            res.redirect("/");
        }else
        {
        res.render("list",{kindOfday:day,fulldetails:foundItems});
        }
    });
    //data to ejs
});

app.post("/", function(req, res) {
  
   let persondetails=new Data( {
     name:req.body.personName,
     productName:req.body.productName,
   
     kilogram:req.body.productKilogram,
     price:req.body.productPrice
    });
   
    persondetails.save();
    res.redirect('/');
});



app.listen(3000,function(req,res){
    console.log("server listening on port 3000")
})