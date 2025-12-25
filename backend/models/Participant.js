import mongoose from "mongoose"

const participantSchema = new mongoose.Schema({
    name : String,
    batchId : {type:mongoose.Schema.Types.ObjectId, ref:"Batch"},
    techId : {type:mongoose.Schema.Types.ObjectId, ref: "Technology"}
});


export default mongoose.model("Participant",participantSchema);

