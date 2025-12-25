import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/api";
import { Link } from "react-router-dom";

export default function EvaluatorDashboard(){
  const user = JSON.parse(localStorage.getItem("meval_user") || "null");
  const [assignments,setAssignments]=useState([]);
  const [evaluations,setEvaluations]=useState([]);

  useEffect(()=>{
    api.get("/api/assignments").then(r=>{
      const list = r.data.filter(a => {
        const eid = String(a.evaluatorId?._id || a.evaluatorId || "");
        const uid = String(user?.id || user?._id || "");
        return eid === uid;
      });
      setAssignments(list);
    }).catch(()=>{});
  },[user]);

  useEffect(()=>{
    api.get("/api/evaluations").then(r=>{
      setEvaluations(r.data || []);
    }).catch(()=>{
      setEvaluations([]);
    });
  },[]);

  return (
    <>
      <Navbar />
      <div className="container py-6">
        <h1 className="text-2xl font-bold mb-4">Evaluator Dashboard</h1>

        <div className="grid gap-3">
          {assignments.length === 0 && <div className="text-gray-600">No assignments found.</div>}
          {assignments.map(a => {
            const matched = evaluations.find(ev => {
              const p = String(ev.participantId?._id || ev.participantId || "");
              const e = String(ev.evaluatorId?._id || ev.evaluatorId || "");
              const t = String(ev.techId?._id || ev.techId || "");
              const ap = String(a.participantId?._id || a.participantId || "");
              const ae = String(a.evaluatorId?._id || a.evaluatorId || "");
              const at = String(a.techId?._id || a.techId || "");
              return p === ap
                && e === ae
                && (String(ev.round) === String(a.round))
                && (t === at);
            });

            return (
              <div key={a._id} className="p-3 bg-white rounded shadow flex justify-between items-center">
                <div>
                  <div className="font-semibold">{a.participantId?.name || a.participantId}</div>
                  <div className="text-sm text-gray-600">Round {a.round} — Tech: {a.techId?.name || a.techId}</div>
                </div>
                <div className="flex items-center gap-3">
                  {matched ? (
                    <span className="text-sm px-2 py-1 bg-green-100 text-green-800 rounded">Evaluated</span>
                  ) : null}
                  <Link to={`/evaluator/evaluate/${a._id}`} className="bg-blue-600 text-white px-3 py-1 rounded">Evaluate</Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
