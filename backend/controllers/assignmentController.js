import Assignment from "../models/EvaluationAssignment.js";

export const assignEvaluator = async (req, res) => {
  try {
    const assignment = await Assignment.create(req.body);
    res.json(assignment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find()
      .populate("evaluatorId")
      .populate("participantId");
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
