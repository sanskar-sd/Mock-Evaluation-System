import React, { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Assignments(){
  const [evaluators,setEvaluators]=useState([]);
  const [participants,setParticipants]=useState([]);
  const [evaluatorId,setEvaluatorId]=useState("");
  const [participantId,setParticipantId]=useState("");
  const [round,setRound]=useState(1);
  const [techs,setTechs]=useState([]);
  const [techId,setTechId]=useState("");
  const [assignments, setAssignments] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    api.get("/api/users").then(r=> setEvaluators(r.data.filter(u=>u.role==="evaluator"))).catch(()=>{});
    api.get("/api/participants").then(r=> setParticipants(r.data)).catch(()=>{});
    api.get("/api/technologies").then(r=> setTechs(r.data)).catch(()=>{});
    api.get("/api/assignments").then(r=> setAssignments(r.data)).catch(()=>{});
  },[]);

  const assign = async () => {
    if(!evaluatorId||!participantId||!techId) return alert("choose evaluator, participant and tech");
    await api.post("/api/assignments",{ evaluatorId, participantId, round, techId });
    alert("Assigned");
    // reset
    setEvaluatorId(""); setParticipantId(""); setRound(1); setTechId("");
  };

  return (
    <div className="container py-6">
      <div className="mb-4">
        <button onClick={()=>navigate('/admin')} className="px-3 py-1 border rounded hover:bg-gray-100">← Back to Dashboard</button>
      </div>
      <h2 className="text-xl font-semibold mb-3">Assign Evaluator</h2>
      <div className="flex gap-2 mb-4">
        <select className="p-2 border rounded" value={evaluatorId} onChange={e=>setEvaluatorId(e.target.value)}>
          <option value="">Select evaluator</option>
          {evaluators.map(ev=> <option key={ev._id} value={ev._id}>{ev.name}</option>)}
        </select>

        <select className="p-2 border rounded" value={participantId} onChange={e=>setParticipantId(e.target.value)}>
          <option value="">Select participant</option>
          {participants.map(p=> <option key={p._id} value={p._id}>{p.name}</option>)}
        </select>

        <select className="p-2 border rounded" value={techId} onChange={e=>setTechId(e.target.value)}>
          <option value="">Select tech</option>
          {techs.map(t=> <option key={t._id} value={t._id}>{t.name}</option>)}
        </select>

        <input className="p-2 border rounded w-20" type="number" value={round} onChange={e=>setRound(e.target.value)} />

        <button className="bg-blue-600 text-white px-3 rounded" onClick={assign}>Assign</button>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Assigned Evaluators</h3>
        <div className="bg-white rounded shadow overflow-auto">
          <table className="w-full table-auto">
            <thead className="bg-gray-100"><tr><th className="p-2">Participant</th><th className="p-2">Evaluator</th><th className="p-2">Tech</th><th className="p-2">Round</th></tr></thead>
            <tbody>
              {assignments.map(a=> (
                <tr key={a._id} className="border-b">
                  <td className="p-2">{a.participantId?.name || a.participantId}</td>
                  <td className="p-2">{a.evaluatorId?.name || a.evaluatorId}</td>
                  <td className="p-2">{a.techId?.name || a.techId}</td>
                  <td className="p-2">{a.round}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
