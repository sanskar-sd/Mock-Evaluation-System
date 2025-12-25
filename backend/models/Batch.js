import mongoose  from "mongoose";


const batchSchema = new mongoose.Schema({
    name : {type:String,unique:true},
    startDate : Date,
    endDate : Date
});

export default mongoose.model("Batch",batchSchema);


