import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const userRaw = localStorage.getItem("meval_user");
  let user = null;
  if (userRaw) {
    try {
      user = JSON.parse(userRaw);
    } catch (e) {
      // malformed user value, remove to avoid crashes
      localStorage.removeItem("meval_user");
      user = null;
    }
  }

  const logout = () => {
    localStorage.removeItem("meval_token");
    localStorage.removeItem("meval_user");
    window.location.href = "/login";
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-3">
      <div className="container flex items-center justify-between">
        <div className="font-bold">Mock Evaluation</div>
        <div className="space-x-4">
          {user?.role === "admin" && <Link to="/admin" className="hover:underline">Admin</Link>}
          {user?.role === "evaluator" && <Link to="/evaluator" className="hover:underline">Evaluator</Link>}
          {user && <button onClick={logout} className="ml-4 bg-white text-blue-600 px-3 py-1 rounded">Logout</button>}
        </div>
      </div>
    </nav>
  );
}
