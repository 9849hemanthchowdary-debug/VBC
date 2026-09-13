import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../services/api";

function Contact() {
  const location = useLocation();
  const selectedProduct = location.state?.product;
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: selectedProduct ? `I would like a quote for ${selectedProduct}.` : "" });
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);
  const update = (field) => (event) => setForm({ ...form, [field]: event.target.value });
  const submit = async (event) => {
    event.preventDefault(); setSaving(true); setStatus("");
    try { const response = await api.post("/contact", form); setStatus(response.data.message); setForm({ name: "", email: "", phone: "", message: "" }); }
    catch (error) { setStatus(error.response?.data?.message || "Your message could not be saved."); }
    finally { setSaving(false); }
  };
  return (
    <main className="form-page"><section className="form-card">
      <p className="eyebrow">CONTACT VBC BRICKS</p><h1>Let’s build something strong</h1>
      <p>VBC Bricks, Nakkalapally, Shambhunipet Road, Warangal, Telangana 506002.</p>
      {selectedProduct && <div className="form-status">Quote request: <strong>{selectedProduct}</strong>. Add your quantity and delivery location below.</div>}
      <a className="map-link" href="https://maps.app.goo.gl/3sKhsiRpruWD8tUv6" target="_blank" rel="noreferrer">Open our factory location in Google Maps →</a>
      {status && <div className="form-status">{status}</div>}
      <form onSubmit={submit}>
        <label>Your name<input required value={form.name} onChange={update("name")} /></label>
        <label>Email address<input required type="email" value={form.email} onChange={update("email")} /></label>
        <label>Phone number<input type="tel" value={form.phone} onChange={update("phone")} /></label>
        <label>Message<textarea required rows="5" value={form.message} onChange={update("message")} /></label>
        <button className="save-btn" disabled={saving}>{saving ? "Sending…" : "Send message"}</button>
      </form>
    </section></main>
  );
}

export default Contact;
