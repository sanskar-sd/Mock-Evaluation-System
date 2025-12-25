import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";

export default function EvaluationPage(){
  const { assignmentId } = useParams();
  const nav = useNavigate();
  const [assignment,setAssignment]=useState(null);
  const [score,setScore]=useState("");
  const [comment,setComment]=useState("");
  const [existingEval,setExistingEval]=useState(null);
  const [submitting,setSubmitting]=useState(false);

  useEffect(()=>{
    api.get("/api/assignments").then(r=>{
      const a = r.data.find(x=> x._id === assignmentId);
      setAssignment(a);
    }).catch(()=>{});
  },[assignmentId]);

  useEffect(()=>{
    // try to find existing evaluation for this assignment (match participant, evaluator, tech, round)
    const loadEval = async () => {
      try{
        const res = await api.get('/api/evaluations');
        const list = res.data || [];
        const found = list.find(ev => {
          const p = ev.participantId?._id || ev.participantId;
          const e = ev.evaluatorId?._id || ev.evaluatorId;
          const t = ev.techId?._id || ev.techId;
          if(!assignment) return false;
          const ap = assignment.participantId?._id || assignment.participantId;
          const ae = assignment.evaluatorId?._id || assignment.evaluatorId;
          const at = assignment.techId?._id || assignment.techId || assignment.techId;
          return p === ap && e === ae && (ev.round === assignment.round || String(ev.round) === String(assignment.round)) && (t === at || t === assignment.techId);
        });
        if(found){
          setExistingEval(found);
          setScore(found.score != null ? String(found.score) : '');
          setComment(found.comment || '');
        }
      }catch(err){
        // ignore
      }
    };
    loadEval();
  },[assignment]);

  const submit=async()=>{
    if(!assignment) return;
    setSubmitting(true);
    const payload = {
      participantId: assignment.participantId?._id || assignment.participantId,
      evaluatorId: assignment.evaluatorId?._id || assignment.evaluatorId,
      techId: assignment.techId,
      round: assignment.round,
      score: Number(score),
      comment
    };
    try{
      if(existingEval && existingEval._id){
        // try update
        await api.put(`/api/evaluations/${existingEval._id}`, payload);
      } else {
        await api.post("/api/evaluations", payload);
      }
      alert("Evaluation submitted");
      nav(-1);
    }catch(err){
      // fallback: try post if put failed
      try{
        await api.post("/api/evaluations", payload);
        alert("Evaluation submitted");
        nav(-1);
      }catch(e){
        alert("Failed to submit evaluation");
      }
    }finally{
      setSubmitting(false);
    }
  };

  if(!assignment) return <div className="container py-6">Loading...</div>;

  return (
    <div className="container py-6">
      <h2 className="text-xl font-bold mb-4">Evaluate — {assignment.participantId?.name || assignment.participantId}</h2>

      {existingEval ? (
        <div className="mb-3 p-3 bg-yellow-50 border rounded">
          <div className="text-sm text-yellow-800">You have an existing submission for this participant/round. You can update it below.</div>
          <div className="mt-2 text-sm">Previous score: <strong>{existingEval.score}</strong></div>
          <div className="text-sm">Previous comment: <em>{existingEval.comment || '—'}</em></div>
        </div>
      ) : null}

      <div className="mb-3">
        <label className="block mb-1">Score</label>
        <input type="number" min="0" value={score} onChange={e=>setScore(e.target.value)} className="p-2 border rounded w-40" />
      </div>

      <div className="mb-3">
        <label className="block mb-1">Comment</label>
        <textarea value={comment} onChange={e=>setComment(e.target.value)} className="w-full p-2 border rounded" rows={4} />
      </div>

      <div className="flex gap-2">
        <button onClick={submit} disabled={submitting} className="bg-blue-600 disabled:opacity-50 text-white px-4 py-2 rounded">{existingEval ? 'Update' : 'Submit'}</button>
        <button onClick={()=>nav(-1)} className="border px-4 py-2 rounded">Cancel</button>
      </div>
    </div>
  );
}
