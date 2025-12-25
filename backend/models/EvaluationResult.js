import mongoose from "mongoose"


const evaluationResultSchema = new mongoose.Schema({
    participantId : {type:mongoose.Schema.Types.ObjectId, ref:"Participant"},
    evaluatorId : {type:mongoose.Schema.Types.ObjectId, ref:"User"},
    techId : {type:mongoose.Schema.Types.ObjectId, ref: "Technology"},
    round : Number,
    score : Number,
    comment : String
});


export default mongoose.model("EvaluationResult",evaluationResultSchema);