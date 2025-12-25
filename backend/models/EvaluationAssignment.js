import mongoose from "mongoose"


const assignmentSchema = new mongoose.Schema({
    evaluatorId : {type:mongoose.Schema.Types.ObjectId,ref:"User"},
    participantId : {type:mongoose.Schema.Types.ObjectId, ref:"Participant"},
    round:Number,
    techId : {type:mongoose.Schema.Types.ObjectId, ref:"Technology"}
});


export default mongoose.model("Assignment",assignmentSchema);