import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const submit = async (event) => {
    event.preventDefault(); setSaving(true); setStatus("");
    try {
      const response = await api.post("/auth/login", { email, password });
      localStorage.setItem("vbcToken", response.data.token);
      localStorage.setItem("vbcUser", JSON.stringify(response.data.user));
      setStatus(`Welcome back, ${response.data.user.name}.`);
      const destination = location.state?.from || (response.data.user.role === "admin" ? "/admin/products" : "/products");
      setTimeout(() => navigate(destination), 600);
    } catch (error) { setStatus(error.response?.data?.message || "Login could not be completed."); }
    finally { setSaving(false); }
  };
  return (
    <main className="form-page"><section className="form-card">
      <p className="eyebrow">VBC BRICKS</p><h1>Welcome back</h1><p>Log in to continue with VBC Bricks.</p>
      {status && <div className="form-status">{status}</div>}
      <form onSubmit={submit}>
        <label>Email address<input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
        <label>Password<input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></label>
        <button className="save-btn" disabled={saving}>{saving ? "Signing in…" : "Login"}</button>
      </form>
      <p className="form-switch">New to VBC Bricks? <Link to="/register">Create your account</Link></p>
    </section></main>
  );
}

export default Login;
