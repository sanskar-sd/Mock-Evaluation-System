import React, { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Evaluators(){
  const [evaluators,setEvaluators]=useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    api.get("/api/users").then(r=> setEvaluators(r.data.filter(u=>u.role==="evaluator"))).catch(()=>{});
  },[]);

  return (
    <div className="container py-6">
      <div className="mb-4">
        <button onClick={()=>navigate('/admin')} className="px-3 py-1 border rounded">← Back to Dashboard</button>
      </div>
      <h2 className="text-2xl font-semibold mb-4">Registered Evaluators</h2>
      <div className="bg-white rounded shadow overflow-auto">
        <table className="w-full table-auto">
          <thead className="bg-gray-100"><tr><th className="p-2 text-left">Name</th><th className="p-2 text-left">Email</th><th className="p-2">Actions</th></tr></thead>
          <tbody>
            {evaluators.map(ev=> (
              <tr key={ev._id} className="border-b">
                <td className="p-2">{ev.name}</td>
                <td className="p-2">{ev.email}</td>
                <td className="p-2">{ev._id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
