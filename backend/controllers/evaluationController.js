import EvaluationResult from "../models/EvaluationResult.js";


export const submitEvaluation = async (req, res) => {
    try{
        const result = await EvaluationResult.create(req.body);
        res.json({message:"Evaluation submitted successfully",result});
    }catch(err){
        res.status(500).json({error:err.message});
    }
};

export const getResults = async (req,res) => {
    try{
        const results = await EvaluationResult.find()
        .populate("participantId")
        .populate("evaluatorId")
        res.json(results)
    }catch(err){
        res.status(500).json({error:err.message});
    }
};