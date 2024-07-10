const express = require("express");
const dashboardSchema = require("../model/dashboardSchema");
const dashboardRoute = express.Router();
const mongoose=require("mongoose");

dashboardRoute.post("/create-item",(req,res)=>{
  dashboardSchema.create(req.body,(err,data)=>{
    if(err) return err;
    else res.json(data);
  })
})

dashboardRoute.get("/", (req, res) => {
  dashboardSchema.find((err, data) => {
    if (err) return err;
    else res.json(data);
  });
});


dashboardRoute.route("/upadate-item/:id").get((req,res)=>{
    dashboardSchema.find(mongoose.Types.ObjectId(req.params.id),(err,data)=>{
      if(err) return err;
      else res.json(data);
    })
}).put((req,res)=>{
    dashboardSchema.findByIdAndUpdate(mongoose.Types.ObjectId(req.params.id),
    {$set:req.body},(err,data)=>{
      if(err) return err;
      else res.json(data);
    })
})


dashboardRoute.delete("/delete-item/:id",(req,res)=>{
  dashboardSchema.findByIdAndRemove(mongoose.Types.ObjectId(req.params.id),(err,data)=>{
    if(err) return err;
    else res.json(data);
  })
})

module.exports = dashboardRoute;
