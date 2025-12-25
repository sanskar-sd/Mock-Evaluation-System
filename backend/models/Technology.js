import mongoose from "mongoose";


const techSchema = new mongoose.Schema({
    name : {type:String, unique:true}
});

export default mongoose.model("Technology",techSchema);

