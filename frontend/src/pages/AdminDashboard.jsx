import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import api from "../api/api";

/* Simple subcomponents implemented inside this file for brevity:
   - Batches management
   - Technologies management
   - Participants management
   - Assignments (assign evaluator)
   - View evaluation results
*/

function Batches() {
  const [batches,setBatches]=useState([]);
  const [name,setName]=useState("");
  useEffect(()=>{ api.get("/api/batches").then(r=>setBatches(r.data)).catch(()=>{}); },[]);
  const create=async()=>{ if(!name) return; const r=await api.post("/api/batches",{name,startDate:new Date(),endDate:new Date()}); setBatches(s=>[...s,r.data]); setName(""); };
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Batches</h3>
      <div className="flex gap-2 mb-4">
        <input value={name} onChange={e=>setName(e.target.value)} className="p-2 border rounded" placeholder="Batch name" />
        <button onClick={create} className="bg-blue-600 text-white px-3 rounded">Create</button>
      </div>
      <div className="grid gap-2">{batches.map(b=> <div key={b._id} className="p-2 bg-white rounded shadow">{b.name}</div>)}</div>
    </div>
  );
}

function Technologies(){
  const [techs,setTechs]=useState([]);
  const [name,setName]=useState("");
  useEffect(()=>{ api.get("/api/technologies").then(r=>setTechs(r.data)).catch(()=>{}); },[]);
  const create=async()=>{ if(!name) return; const r=await api.post("/api/technologies",{name}); setTechs(s=>[...s,r.data]); setName(""); };
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Technologies</h3>
      <div className="flex gap-2 mb-4">
        <input value={name} onChange={e=>setName(e.target.value)} className="p-2 border rounded" placeholder="Tech name" />
        <button onClick={create} className="bg-blue-600 text-white px-3 rounded">Add</button>
      </div>
      <div className="grid gap-2">{techs.map(t=> <div key={t._id} className="p-2 bg-white rounded shadow">{t.name}</div>)}</div>
    </div>
  );
}

function Participants(){
  const [participants,setParticipants]=useState([]);
  const [name,setName]=useState("");
  const [batchId,setBatchId]=useState("");
  const [techId,setTechId]=useState("");
  const [batches,setBatches]=useState([]);
  const [techs,setTechs]=useState([]);
  useEffect(()=>{
    api.get("/api/participants").then(r=>setParticipants(r.data)).catch(()=>{});
    api.get("/api/batches").then(r=>setBatches(r.data)).catch(()=>{});
    api.get("/api/technologies").then(r=>setTechs(r.data)).catch(()=>{});
  },[]);
  const create=async()=>{ if(!name||!batchId||!techId) return alert("fill all"); const r=await api.post("/api/participants",{name,batchId,techId}); setParticipants(s=>[...s,r.data]); setName(""); setBatchId(""); setTechId(""); };
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Participants</h3>
      <div className="flex gap-2 mb-4">
        <input value={name} onChange={e=>setName(e.target.value)} className="p-2 border rounded" placeholder="Name" />
        <select value={batchId} onChange={e=>setBatchId(e.target.value)} className="p-2 border rounded">
          <option value="">Select batch</option>
          {batches.map(b=> <option key={b._id} value={b._id}>{b.name}</option>)}
        </select>
        <select value={techId} onChange={e=>setTechId(e.target.value)} className="p-2 border rounded">
          <option value="">Select tech</option>
          {techs.map(t=> <option key={t._id} value={t._id}>{t.name}</option>)}
        </select>
        <button onClick={create} className="bg-blue-600 text-white px-3 rounded">Add</button>
      </div>
      <div className="grid gap-2">{participants.map(p=> <div key={p._id} className="p-2 bg-white rounded shadow">{p.name} — {p.batchId?.name || p.batchId}</div>)}</div>
    </div>
  );
}

function Assignments(){
  const [evaluators,setEvaluators]=useState([]);
  const [participants,setParticipants]=useState([]);
  const [evaluatorId,setEvaluatorId]=useState("");
  const [participantId,setParticipantId]=useState("");
  const [round,setRound]=useState(1);
  useEffect(()=>{
    api.get("/api/users").then(r=> setEvaluators(r.data.filter(u=>u.role==="evaluator"))).catch(()=>{});
    api.get("/api/participants").then(r=> setParticipants(r.data)).catch(()=>{});
  },[]);
  const assign=async()=>{ if(!evaluatorId||!participantId) return alert("choose"); await api.post("/api/assignments",{evaluatorId,participantId,round}); alert("Assigned"); };
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Assign Evaluator</h3>
      <div className="flex gap-2 mb-4">
        <select value={evaluatorId} onChange={e=>setEvaluatorId(e.target.value)} className="p-2 border rounded">
          <option value="">Select evaluator</option>
          {evaluators.map(ev=> <option key={ev._id} value={ev._id}>{ev.name}</option>)}
        </select>
        <select value={participantId} onChange={e=>setParticipantId(e.target.value)} className="p-2 border rounded">
          <option value="">Select participant</option>
          {participants.map(p=> <option key={p._id} value={p._id}>{p.name}</option>)}
        </select>
        <input type="number" value={round} onChange={e=>setRound(e.target.value)} className="p-2 border rounded w-20" />
        <button onClick={assign} className="bg-blue-600 text-white px-3 rounded">Assign</button>
      </div>
    </div>
  );
}

function EvaluationResults(){
  const [results,setResults]=useState([]);
  useEffect(()=>{ api.get("/api/evaluations").then(r=>setResults(r.data)).catch(()=>{}); },[]);
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Evaluation Results</h3>
      <div className="overflow-auto">
        <table className="w-full table-auto bg-white rounded shadow">
          <thead><tr className="bg-gray-100"><th className="p-2">Participant</th><th>Round</th><th>Score</th><th>Evaluator</th><th>Comment</th></tr></thead>
          <tbody>
            {results.map(r=>(
              <tr key={r._id} className="border-b">
                <td className="p-2">{r.participantId?.name || r.participantId}</td>
                <td className="p-2">{r.round}</td>
                <td className="p-2">{r.score}</td>
                <td className="p-2">{r.evaluatorId?.name || r.evaluatorId}</td>
                <td className="p-2">{r.comment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function AdminDashboard(){
  return (
    <>
      <Navbar />
      <div className="container py-6">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card */}
          <Link to="/admin/batches" className="flex items-start gap-4 p-6 rounded shadow hover:shadow-xl transition bg-white hover:bg-blue-50">
            <div className="w-12 h-12 rounded-md bg-blue-600 text-white flex items-center justify-center">1</div>
            <div>
              <h3 className="text-lg font-semibold">Batches</h3>
              <p className="text-sm text-gray-600">Create and manage batches (start/end dates).</p>
            </div>
          </Link>

          <Link to="/admin/technologies" className="flex items-start gap-4 p-6 rounded shadow hover:shadow-xl transition bg-white hover:bg-green-50">
            <div className="w-12 h-12 rounded-md bg-green-600 text-white flex items-center justify-center">2</div>
            <div>
              <h3 className="text-lg font-semibold">Technologies</h3>
              <p className="text-sm text-gray-600">Add and view technology stacks.</p>
            </div>
          </Link>

          <Link to="/admin/participants" className="flex items-start gap-4 p-6 rounded shadow hover:shadow-xl transition bg-white hover:bg-indigo-50">
            <div className="w-12 h-12 rounded-md bg-indigo-600 text-white flex items-center justify-center">3</div>
            <div>
              <h3 className="text-lg font-semibold">Participants</h3>
              <p className="text-sm text-gray-600">Create participants and assign batch & technology.</p>
            </div>
          </Link>

          <Link to="/admin/assignments" className="flex items-start gap-4 p-6 rounded shadow hover:shadow-xl transition bg-white hover:bg-yellow-50">
            <div className="w-12 h-12 rounded-md bg-yellow-600 text-white flex items-center justify-center">4</div>
            <div>
              <h3 className="text-lg font-semibold">Assign Evaluator</h3>
              <p className="text-sm text-gray-600">Assign evaluator to participant with round and tech.</p>
            </div>
          </Link>

          <Link to="/admin/evaluators" className="flex items-start gap-4 p-6 rounded shadow hover:shadow-xl transition bg-white hover:bg-pink-50">
            <div className="w-12 h-12 rounded-md bg-pink-600 text-white flex items-center justify-center">5</div>
            <div>
              <h3 className="text-lg font-semibold">Registered Evaluators</h3>
              <p className="text-sm text-gray-600">View a list of registered evaluators.</p>
            </div>
          </Link>

          <Link to="/admin/results" className="flex items-start gap-4 p-6 rounded shadow hover:shadow-xl transition bg-white hover:bg-red-50">
            <div className="w-12 h-12 rounded-md bg-red-600 text-white flex items-center justify-center">6</div>
            <div>
              <h3 className="text-lg font-semibold">Evaluation Results</h3>
              <p className="text-sm text-gray-600">View submitted evaluation results.</p>
            </div>
          </Link>

          <Link to="/admin/submit-evaluation" className="flex items-start gap-4 p-6 rounded shadow hover:shadow-xl transition bg-white hover:bg-teal-50">
            <div className="w-12 h-12 rounded-md bg-teal-600 text-white flex items-center justify-center">7</div>
            <div>
              <h3 className="text-lg font-semibold">Submit Evaluation</h3>
              <p className="text-sm text-gray-600">Manually submit an evaluation (admin).</p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
