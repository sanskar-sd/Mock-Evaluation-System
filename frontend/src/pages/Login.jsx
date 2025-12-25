import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import api from "../api/api";

function RegisterModal({ onClose, onRegistered }) {
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [role,setRole]=useState("evaluator");
  const [err,setErr]=useState("");
  const [loading,setLoading]=useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if(!name||!email||!password) return setErr("Fill all fields");
    setErr(""); setLoading(true);
    try{
      await api.post("/api/auth/register",{name,email,password,role});
      onRegistered();
      onClose();
    }catch(error){
      setErr(error.response?.data?.message || error.message || "Register failed");
    }finally{ setLoading(false); }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-96">
        <h3 className="text-lg font-semibold mb-3">Create account</h3>
        {err && <div className="text-red-500 mb-2">{err}</div>}
        <form onSubmit={submit}>
          <input autoComplete="name" className="w-full mb-2 p-2 border rounded" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
          <input autoComplete="email" className="w-full mb-2 p-2 border rounded" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input autoComplete="new-password" type="password" className="w-full mb-2 p-2 border rounded" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
          <select className="w-full mb-3 p-2 border rounded" value={role} onChange={e=>setRole(e.target.value)}>
            <option value="evaluator">Evaluator</option>
            <option value="admin">Admin</option>
          </select>
          <div className="flex gap-2">
            <button className="flex-1 bg-blue-600 text-white py-2 rounded" disabled={loading}>{loading ? "Creating..." : "Create"}</button>
            <button type="button" onClick={onClose} className="flex-1 border py-2 rounded">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Login(){
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [err,setErr]=useState("");
  const [info,setInfo]=useState("");
  const [showRegister,setShowRegister]=useState(false);
  const nav = useNavigate();
  const loc = useLocation();

  useEffect(()=>{
    const params = new URLSearchParams(loc.search);
    if(params.get("registered")==="true") setInfo("Registration successful. Please login.");
  },[loc.search]);

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try{
      const res = await api.post("/api/auth/login",{ email,password });
      const { token, user } = res.data;
      localStorage.setItem("meval_token", token);
      localStorage.setItem("meval_user", JSON.stringify(user));
      if(user.role === "admin") nav("/admin");
      else nav("/evaluator");
    }catch(error){
      setErr(error.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-96">
        <form onSubmit={submit} className="bg-white p-8 rounded shadow">
          <h2 className="text-2xl font-semibold mb-4">Login</h2>
          {info && <div className="text-green-600 mb-2">{info}</div>}
          {err && <div className="text-red-600 mb-2">{err}</div>}
          <input autoComplete="email" className="w-full mb-3 p-2 border rounded" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input autoComplete="current-password" type="password" className="w-full mb-3 p-2 border rounded" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
          <button className="w-full bg-blue-600 text-white py-2 rounded mb-3">Login</button>

          <div className="text-sm text-center">
            Not registered? <button type="button" onClick={()=>setShowRegister(true)} className="text-blue-600 hover:underline">Create account</button>
          </div>
        </form>

        <div className="text-center text-xs text-gray-500 mt-3">
          Or <Link to="/register" className="text-blue-600">open register route</Link>
        </div>
      </div>

      {showRegister && <RegisterModal onClose={()=>setShowRegister(false)} onRegistered={()=>setInfo("Registered successfully. Please login.")} />}
    </div>
  );
}
