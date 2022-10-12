
const express = require("express");

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(express.static("public"))

//mongoose connection
main().catch(err=>console.log(err));
async function main(){
await mongoose.connect("mongodb://localhost:27017/vehicleDB");
}
///////////////////////////////////////////////Model schema//////////////////////////////////////
//Vehicle Schema
const vehicleSchema= new mongoose.Schema({
    id: Number,
    licensePlateNumber: Number,
    manufacturerName: String,
    model: String,
    fuelType: {
        enum: [ "petrol", "desiel", "electric" ],
        description: "Must be either petrol, desiel, or electric"
     },
    ownerName: String,
    rc_status: {
        enum: [ "Active", "Inactive"],
        description: "Must be either Active or Inactive"
     },
    vehicleColor: String,
    registrationDate: Date,
    insuranceUpto: Date,
    fitnessUpto: Date,
    roadTaxUpto: Date
});

//Vehicle Model
const Vehicle = mongoose.model("Vehicle",vehicleSchema);


//Violation Schema
const violationSchema= new mongoose.Schema({
    id: Number,
    licensePlateNumber: Number,
    violationType: String,
    status: {
        enum: [ "paid", "unpaid"],
        description: "Must be either paid or unpaid"
     },
    date: Date,
    time: String,
    location: String,
    videoUrl: String
});

//Violation Model
const Violation = mongoose.model("Violation",violationSchema);


///////////////////////////////////////////////handling all vehicle related requests//////////////////////////////////////
//read
app.get("/vehicle", function(req, res){
    Vehicle.find(function(err, foundItems){
        if(err){res.send(err);}
        else{res.send(foundItems); }
    })
});

//create
app.post("/vehicle", function(req, res){
    const updatedObject= JSON.parse(req.body);
    const newVehicle = new Vehicle({
     title : req.body.title,
     content: req.body.content
    });
    newVehicle.save(function(err){
     if(!err){res.send("Successfully added the data")}
     else{res.send(err);}
    });
 });

 //update
 app.post("/vehicle/update", function(req, res){
    
    const updatedObject= JSON.parse(req.body);
    const vehicleID=updatedObject.id;
    Vehicle.updateOne({id:vehicleID}, updatedObject, function(err){
        if(!err){res.send("Successfully updated the data")}
        else{res.send(err);}
       });
});

///delete
 app.post("/vehicle/delete", function(req, res){
    const updatedObject= JSON.parse(req.body);
    const vehicleID=updatedObject.id;
    Vehicle.deleteOne({id:vehicleID}, function(err){
        if(!err){res.send("Successfully deleted the data")}
        else{res.send(err);}
       });
});

///////////////////////////////////////////////handling all violation related requests//////////////////////////////////////
//read
app.get("/violation", function(req, res){
    Violation.find(function(err, foundItems){
        if(err){res.send(err);}
        else{res.send(foundItems); }
    })
});

//create
app.post("/violation", function(req, res){
    const updatedObject= JSON.parse(req.body);
    const newViolation = new Violation({

    });
    newViolation.save(function(err){
     if(!err){res.send("Successfully added the data")}
     else{res.send(err);}
    });
 });

 //update
 app.post("/violation/update", function(req, res){
    
    const updatedObject= JSON.parse(req.body);
    const violationID=updatedObject.id;
    Violation.updateOne({id:violationID}, updatedObject, function(err){
        if(!err){res.send("Successfully updated the data")}
        else{res.send(err);}
       });
});

///delete
 app.post("/violation/delete", function(req, res){
    const updatedObject= JSON.parse(req.body);
    const ViolationID=updatedObject.id;
    Violation.deleteOne({id:ViolationID}, function(err){
        if(!err){res.send("Successfully deleted the data")}
        else{res.send(err);}
       });
});


app.listen(3000, function(){
    console.log("Server is running on port 3000");
})