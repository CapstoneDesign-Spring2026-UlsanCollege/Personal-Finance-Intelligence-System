import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import useForm from "../hooks/useForm";
import InputField from "../components/ui/InputField";
import Button from "../components/ui/Button";
import Toast from "../components/ui/Toast";

export default function SignupPage() {
  const { values, handleChange } = useForm({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const { signup, loading } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    if (values.password !== values.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    const result = await signup({
      name: values.name,
      email: values.email,
      password: values.password
    });
    if (result.ok) {
      navigate("/app/dashboard");
    } else {
      setError(result.error);
    }
  }

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <p className="eyebrow">Create your account</p>
        <h1>Start using BudgetBrain</h1>
        <Toast message={error} type="error" />
        <InputField label="Full name" name="name" value={values.name} onChange={handleChange} required />
        <InputField label="Email" name="email" type="email" value={values.email} onChange={handleChange} required />
        <InputField label="Password" name="password" type="password" value={values.password} onChange={handleChange} required />
        <InputField label="Confirm password" name="confirmPassword" type="password" value={values.confirmPassword} onChange={handleChange} required />
        <Button type="submit" loading={loading}>Create Account</Button>
        <p className="muted auth-switch">Already have an account? <Link to="/login">Sign in</Link></p>
      </form>
    </div>
  );
}
