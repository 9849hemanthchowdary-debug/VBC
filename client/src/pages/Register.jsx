import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);
  const submit = async (event) => {
    event.preventDefault(); setSaving(true); setStatus("");
    try {
      const response = await api.post("/auth/register", form);
      setStatus(`${response.data.message}. You can now log in.`);
      setForm({ name: "", email: "", phone: "", password: "" });
    } catch (error) { setStatus(error.response?.data?.message || "Registration could not be completed."); }
    finally { setSaving(false); }
  };
  return <main className="form-page"><section className="form-card">
    <p className="eyebrow">VBC BRICKS</p><h1>Create your account</h1>
    <p>Register once to keep your details safely stored for future orders.</p>
    {status && <div className="form-status">{status}</div>}
    <form onSubmit={submit}>
      <label>Full name<input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
      <label>Email address<input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
      <label>Phone number<input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></label>
      <label>Password<input required minLength="6" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></label>
      <button className="save-btn" disabled={saving}>{saving ? "Creating account…" : "Create account"}</button>
    </form>
    <p className="form-switch">Already registered? <Link to="/login">Login here</Link></p>
  </section></main>;
}

export default Register;
