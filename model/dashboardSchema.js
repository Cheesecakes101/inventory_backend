const mongoose=require("mongoose");
const dashboardSchema= new mongoose.Schema({
    // "sr_no":{type:String},
    "name":{type:String},
    "category":{type:String},
    "stock":{type:String},
    "price":{type:String},
},{
    collection:"dashboard"
})

module.exports=mongoose.model("dashboardSchema",dashboardSchema);