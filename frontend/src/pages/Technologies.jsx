import React, { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Technologies(){
  const [techs,setTechs]=useState([]);
  const [name,setName]=useState("");

  useEffect(()=>{ api.get("/api/technologies").then(r=>setTechs(r.data)).catch(()=>{}); },[]);

  const create = async () => {
    if(!name) return;
    const res = await api.post("/api/technologies", { name });
    setTechs(s=>[...s,res.data]);
    setName("");
  };

  const navigate = useNavigate();

  return (
    <div className="container py-6">
      <div className="mb-4">
        <button onClick={()=>navigate('/admin')} className="px-3 py-1 border rounded">← Back to Dashboard</button>
      </div>
      <h2 className="text-xl font-semibold mb-3">Technologies</h2>
      <div className="flex gap-2 mb-4">
        <input className="p-2 border rounded" placeholder="Tech name" value={name} onChange={e=>setName(e.target.value)} />
        <button className="bg-blue-600 text-white px-3 rounded" onClick={create}>Add</button>
      </div>

      <div className="grid gap-2">
        {techs.map(t=> <div key={t._id} className="p-3 bg-white rounded shadow">{t.name}</div>)}
      </div>
    </div>
  );
}
