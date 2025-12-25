import React, { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Reports(){
  const [results,setResults]=useState([]);
  const navigate = useNavigate();

  useEffect(()=>{ api.get("/api/evaluations").then(r=>setResults(r.data)).catch(()=>{}); },[]);

  return (
    <div className="container py-6">
      <div className="mb-4">
        <button onClick={()=>navigate('/admin')} className="px-3 py-1 border rounded">← Back to Dashboard</button>
      </div>
      <h2 className="text-xl font-semibold mb-3">Reports</h2>
      <div className="overflow-auto">
        <table className="w-full table-auto bg-white rounded shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Participant</th>
              <th className="p-2">Evaluator</th>
              <th className="p-2">Tech</th>
              <th className="p-2">Round</th>
              <th className="p-2">Score</th>
              <th className="p-2">Comment</th>
            </tr>
          </thead>
          <tbody>
            {results.map(r => (
              <tr key={r._id} className="border-b">
                <td className="p-2">{r.participantId?.name || r.participantId}</td>
                <td className="p-2">{r.evaluatorId?.name || r.evaluatorId}</td>
                <td className="p-2">{r.techId?.name || r.techId}</td>
                <td className="p-2">{r.round}</td>
                <td className="p-2">{r.score}</td>
                <td className="p-2">{r.comment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
