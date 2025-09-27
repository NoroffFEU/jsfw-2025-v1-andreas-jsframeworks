import { useState } from "react";
import toast from "react-hot-toast";

const isEmail = (v) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v).toLowerCase());

export default function ContactPage() {
  const [form, setForm] = useState({
    fullName: "",
    subject: "",
    email: "",
    body: "",
  });
  const [errors, setErrors] = useState({});

  function validate(values) {
    const e = {};
    if (!values.fullName || values.fullName.trim().length < 3)
      e.fullName = "Full name must be at least 3 characters.";
    if (!values.subject || values.subject.trim().length < 3)
      e.subject = "Subject must be at least 3 characters.";
    if (!values.email || !isEmail(values.email))
      e.email = "Please enter a valid email address.";
    if (!values.body || values.body.trim().length < 3)
      e.body = "Body must be at least 3 characters.";
    return e;
  }

  function handleChange(ev) {
    const { name, value } = ev.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      const fieldErrors = validate({ ...form, [name]: value });
      if (fieldErrors[name]) next[name] = fieldErrors[name];
      else delete next[name];
      return next;
    });
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    const e = validate(form);
    setErrors(e);
    if (Object.keys(e).length > 0) {
      toast.error("Please fix the errors and try again.");
      return;
    }
    console.log({
      fullName: form.fullName.trim(),
      subject: form.subject.trim(),
      email: form.email.trim(),
      body: form.body.trim(),
    });
    toast.success("Message ready! (Logged to console)");
    setForm({ fullName: "", subject: "", email: "", body: "" });
  }

  return (
    <div className="container">
      <h1>Contact</h1>
      <form className="form" onSubmit={handleSubmit} noValidate>
        {/* Full name */}
        <div className="form-group">
          <label htmlFor="fullName">Full name</label>
          <input
            id="fullName"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
            required
            minLength={3}
            placeholder="Andreas Vds"
          />
          {errors.fullName && (
            <div id="fullName-error" className="error">
              {errors.fullName}
            </div>
          )}
        </div>

        {/* Subject */}
        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <input
            id="subject"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            aria-invalid={Boolean(errors.subject)}
            aria-describedby={errors.subject ? "subject-error" : undefined}
            required
            minLength={3}
            placeholder="Order question"
          />
          {errors.subject && (
            <div id="subject-error" className="error">
              {errors.subject}
            </div>
          )}
        </div>

        {/* Email */}
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            required
            placeholder="you@example.com"
          />
          {errors.email && (
            <div id="email-error" className="error">
              {errors.email}
            </div>
          )}
        </div>

        {/* Body */}
        <div className="form-group">
          <label htmlFor="body">Message</label>
          <textarea
            id="body"
            name="body"
            rows={5}
            value={form.body}
            onChange={handleChange}
            aria-invalid={Boolean(errors.body)}
            aria-describedby={errors.body ? "body-error" : undefined}
            required
            minLength={3}
            placeholder="Write your message..."
          />
          {errors.body && (
            <div id="body-error" className="error">
              {errors.body}
            </div>
          )}
        </div>

        <button className="btn" type="submit">Send</button>
      </form>
    </div>
  );
}
