import Technology from "../models/technology.js";

//create new technology
export const createTech = async (req,res) => {
    try{
    const tech = await Technology.create(req.body);
    res.json(tech);
    }catch(err){
        res.status(500).json({error:err.message});
    }
};


export const getTech = async (req,res) => {
    try{   
    const techs = await Technology.find();
    res.json(techs);
    }catch(err){
        res.status(500).json({error:err.message});
    }
};