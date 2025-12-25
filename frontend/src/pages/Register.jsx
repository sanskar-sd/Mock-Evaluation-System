import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("evaluator"); // default evaluator
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    if (!name || !email || !password) return setErr("Please fill all fields");
    setLoading(true);
    try {
      await api.post("/api/auth/register", { name, email, password, role });
      // on success redirect to login with query param
      nav("/login?registered=true");
    } catch (error) {
      setErr(error.response?.data?.message || error.message || "Register failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={submit} className="bg-white p-8 rounded shadow w-96">
        <h2 className="text-2xl font-semibold mb-4">Register</h2>

        <label className="text-sm">Full name</label>
        <input
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
          placeholder="Your name"
        />

        <label className="text-sm">Email</label>
        <input
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          className="w-full mb-3 p-2 border rounded"
          placeholder="you@example.com"
        />

        <label className="text-sm">Password</label>
        <input
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="w-full mb-3 p-2 border rounded"
          placeholder="At least 6 characters"
        />

        <label className="text-sm">Role</label>
        <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full mb-4 p-2 border rounded">
          <option value="evaluator">Evaluator</option>
          <option value="admin">Admin</option>
        </select>

        {err && <div className="text-red-500 mb-3">{err}</div>}

        <div className="flex gap-2">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-2 rounded disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create account"}
          </button>

          <button
            type="button"
            onClick={() => nav("/login")}
            className="flex-1 border rounded py-2"
          >
            Back to login
          </button>
        </div>
      </form>
    </div>
  );
}
