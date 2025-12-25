import React, { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function SubmitEvaluation(){
  const navigate = useNavigate();
  const [evaluators,setEvaluators]=useState([]);
  const [participants,setParticipants]=useState([]);
  const [techs,setTechs]=useState([]);

  const [evaluatorId,setEvaluatorId]=useState("");
  const [participantId,setParticipantId]=useState("");
  const [techId,setTechId]=useState("");
  const [round,setRound]=useState(1);
  const [score,setScore]=useState(0);
  const [comment,setComment]=useState("");

  useEffect(()=>{
    api.get('/api/users').then(r=> setEvaluators(r.data.filter(u=>u.role==='evaluator'))).catch(()=>{});
    api.get('/api/participants').then(r=> setParticipants(r.data)).catch(()=>{});
    api.get('/api/technologies').then(r=> setTechs(r.data)).catch(()=>{});
  },[]);

  const submit = async () => {
    if(!evaluatorId||!participantId||!techId) return alert('Please select evaluator, participant and tech');
    await api.post('/api/evaluations',{ evaluatorId, participantId, techId, round, score: Number(score), comment });
    alert('Evaluation submitted');
    // reset
    setEvaluatorId(''); setParticipantId(''); setTechId(''); setRound(1); setScore(0); setComment('');
    navigate('/admin/results');
  };

  return (
    <div className="container py-6">
      <div className="mb-4">
        <button onClick={()=>navigate('/admin')} className="px-3 py-1 border rounded hover:bg-gray-100">← Back to Dashboard</button>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Submit Evaluation</h2>

      <div className="bg-white p-4 rounded shadow w-full max-w-2xl">
        <div className="flex flex-col gap-3">

          <select value={evaluatorId} onChange={e=>setEvaluatorId(e.target.value)} className="p-2 border rounded">
            <option value="">Select evaluator</option>
            {evaluators.map(ev=> <option key={ev._id} value={ev._id}>{ev.name} ({ev.email})</option>)}
          </select>

          <select value={participantId} onChange={e=>setParticipantId(e.target.value)} className="p-2 border rounded">
            <option value="">Select participant</option>
            {participants.map(p=> <option key={p._id} value={p._id}>{p.name}</option>)}
          </select>

          <select value={techId} onChange={e=>setTechId(e.target.value)} className="p-2 border rounded">
            <option value="">Select tech</option>
            {techs.map(t=> <option key={t._id} value={t._id}>{t.name}</option>)}
          </select>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="round" className="text-sm font-medium text-gray-700">Round</label>
              <input id="round" type="number" value={round} onChange={e=>setRound(e.target.value)} className="mt-1 p-2 border rounded w-full" placeholder="Round number" />
            </div>

            <div>
              <label htmlFor="score" className="text-sm font-medium text-gray-700">Score</label>
              <input id="score" type="number" value={score} onChange={e=>setScore(e.target.value)} className="mt-1 p-2 border rounded w-full" placeholder="Score awarded" />
            </div>
          </div>

          <div>
            <label htmlFor="comment" className="text-sm font-medium text-gray-700">Comment</label>
            <textarea id="comment" value={comment} onChange={e=>setComment(e.target.value)} className="mt-1 p-2 border rounded w-full" rows={4} />
          </div>

          <div className="flex gap-2">
            <button onClick={submit} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Submit</button>
            <button onClick={()=>navigate('/admin')} className="border px-4 py-2 rounded hover:bg-gray-100">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}
