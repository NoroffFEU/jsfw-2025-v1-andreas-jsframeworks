// src/pages/ContactPage.jsx
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function ContactPage() {
  const [form, setForm] = useState({
    fullName: "",
    subject: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  function validate() {
    const e = {};
    if (!form.fullName || form.fullName.trim().length < 3)
      e.fullName = "Full Name must be at least 3 characters";
    if (!form.subject || form.subject.trim().length < 3)
      e.subject = "Subject must be at least 3 characters";
    if (!/^\S+@\S+\.\S+$/.test(form.email))
      e.email = "Enter a valid email";
    if (!form.message || form.message.trim().length < 10)
      e.message = "Message must be at least 10 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function onSubmit(e) {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fix the errors");
      return;
    }
    console.log("Contact form data:", form); // as requested by brief
    toast.success("Message sent");
    setForm({ fullName: "", subject: "", email: "", message: "" });
    setErrors({});
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <h1>Contact</h1>

      <label>
        Full Name
        <input
          value={form.fullName}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
        />
        {errors.fullName && <div className="error">{errors.fullName}</div>}
      </label>

      <label>
        Subject
        <input
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
        />
        {errors.subject && <div className="error">{errors.subject}</div>}
      </label>

      <label>
        Email
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        {errors.email && <div className="error">{errors.email}</div>}
      </label>

      <label>
        Message
        <textarea
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />
        {errors.message && <div className="error">{errors.message}</div>}
      </label>

      <button className="btn">Send</button>
    </form>
  );
}
