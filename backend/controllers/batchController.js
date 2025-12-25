import Batch from "../models/Batch.js";

//create a new batch
export const createBatch = async (req, res) => {
    const batch = await Batch.create(req.body);
    res.json(batch);
};

//get all batches
export const getbatches = async (req, res) => {
    const batches = await Batch.find();
    res.json(batches);
}