import React, { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Batches(){
  const [batches,setBatches]=useState([]);
  const [name,setName]=useState("");
  const [startDate,setStartDate]=useState("");
  const [endDate,setEndDate]=useState("");

  useEffect(()=>{ api.get("/api/batches").then(r=>setBatches(r.data)).catch(()=>{}); },[]);

  const create = async () => {
    if(!name||!startDate||!endDate) return alert("Please provide name, start and end date");
    const res = await api.post("/api/batches",{ name, startDate: new Date(startDate).toISOString(), endDate: new Date(endDate).toISOString() });
    setBatches(s=>[...s,res.data]);
    setName(""); setStartDate(""); setEndDate("");
  };

  const navigate = useNavigate();

  return (
    <div className="container py-6">
      <div className="mb-4">
        <button onClick={()=>navigate('/admin')} className="px-3 py-1 border rounded">← Back to Dashboard</button>
      </div>
      <h2 className="text-xl font-semibold mb-3">Batches</h2>
      <div className="flex gap-2 mb-4">
        <input className="p-2 border rounded" placeholder="Batch name" value={name} onChange={e=>setName(e.target.value)} />
        <input type="date" className="p-2 border rounded" value={startDate} onChange={e=>setStartDate(e.target.value)} />
        <input type="date" className="p-2 border rounded" value={endDate} onChange={e=>setEndDate(e.target.value)} />
        <button className="bg-blue-600 text-white px-3 rounded" onClick={create}>Create</button>
      </div>
      <div className="grid gap-2">
        {batches.map(b => <div key={b._id} className="p-3 bg-white rounded shadow">{b.name} — {new Date(b.startDate).toLocaleDateString()} to {new Date(b.endDate).toLocaleDateString()}</div>)}
      </div>
    </div>
  );
}
