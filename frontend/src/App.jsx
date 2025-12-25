import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import EvaluatorDashboard from "./pages/EvaluatorDashboard";
import EvaluationPage from "./pages/EvaluationPage";
import Batches from "./pages/Batches";
import Technologies from "./pages/Technologies";
import Participants from "./pages/Participants";
import Assignments from "./pages/Assignments";
import Reports from "./pages/Reports";
import Evaluators from "./pages/Evaluators";
import SubmitEvaluation from "./pages/SubmitEvaluation";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/admin/*"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* admin sub-pages */}
      <Route
        path="/admin/batches"
        element={<ProtectedRoute role="admin"><Batches /></ProtectedRoute>}
      />
      <Route
        path="/admin/technologies"
        element={<ProtectedRoute role="admin"><Technologies /></ProtectedRoute>}
      />
      <Route
        path="/admin/participants"
        element={<ProtectedRoute role="admin"><Participants /></ProtectedRoute>}
      />
      <Route
        path="/admin/assignments"
        element={<ProtectedRoute role="admin"><Assignments /></ProtectedRoute>}
      />
      <Route
        path="/admin/evaluators"
        element={<ProtectedRoute role="admin"><Evaluators /></ProtectedRoute>}
      />
      <Route
        path="/admin/results"
        element={<ProtectedRoute role="admin"><Reports /></ProtectedRoute>}
      />
      <Route
        path="/admin/submit-evaluation"
        element={<ProtectedRoute role="admin"><SubmitEvaluation /></ProtectedRoute>}
      />

      <Route
        path="/evaluator/*"
        element={
          <ProtectedRoute role="evaluator">
            <EvaluatorDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/evaluator/evaluate/:assignmentId"
        element={
          <ProtectedRoute role="evaluator">
            <EvaluationPage />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<div className="container py-10">Page not found. <a href="/login" className="text-blue-600">Login</a></div>} />
    </Routes>
  );
}
