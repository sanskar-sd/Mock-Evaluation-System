import Participant from "../models/Participant.js";

export const createParticipant = async (req, res) => {
    try{
        const participant = await Participant.create(req.body);
        res.json(participant);
    }catch(err){
        res.status(500).json({error:err.message})
    }
};



export const getParticipants = async (req, res) => {
    try{
        const participants=await Participant.find()
             .populate("batchId")
             .populate("techId")
        res.json(participants);
    }catch(err){
        res.status(500).json({error:err.message});
    }
}