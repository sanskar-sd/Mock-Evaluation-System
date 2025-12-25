import React, { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Participants(){
  const navigate = useNavigate();
  const [participants, setParticipants] = useState([]);
  const [name,setName] = useState("");
  const [batchId,setBatchId] = useState("");
  const [techId,setTechId] = useState("");
  const [batches,setBatches] = useState([]);
  const [techs,setTechs] = useState([]);

  useEffect(()=>{
    api.get("/api/participants").then(r=>setParticipants(r.data)).catch(()=>{});
    api.get("/api/batches").then(r=>setBatches(r.data)).catch(()=>{});
    api.get("/api/technologies").then(r=>setTechs(r.data)).catch(()=>{});
  },[]);

  const create = async () => {
    if(!name || !batchId || !techId) return alert("fill all");
    const res = await api.post("/api/participants", { name, batchId, techId });
    setParticipants(s => [ ...s, res.data]);
    setName(""); setBatchId(""); setTechId("");
  };

  return (
    <div className="container py-6">
      <div className="mb-4">
        <button onClick={()=>navigate('/admin')} className="px-3 py-1 border rounded">← Back to Dashboard</button>
      </div>
      <h2 className="text-xl font-semibold mb-3">Participants</h2>

      <div className="flex gap-2 mb-4">
        <input className="p-2 border rounded" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
        <select className="p-2 border rounded" value={batchId} onChange={e=>setBatchId(e.target.value)}>
          <option value="">Select batch</option>
          {batches.map(b=> <option key={b._id} value={b._id}>{b.name}</option>)}
        </select>
        <select className="p-2 border rounded" value={techId} onChange={e=>setTechId(e.target.value)}>
          <option value="">Select tech</option>
          {techs.map(t=> <option key={t._id} value={t._id}>{t.name}</option>)}
        </select>
        <button className="bg-blue-600 text-white px-3 rounded" onClick={create}>Add</button>
      </div>

      <div className="grid gap-2">
        {participants.map(p=> <div key={p._id} className="p-3 bg-white rounded shadow">{p.name} — {p.batchId?.name || p.batchId}</div>)}
      </div>
    </div>
  );
}
