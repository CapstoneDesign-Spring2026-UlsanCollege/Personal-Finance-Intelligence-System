import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import useForm from "../hooks/useForm";
import InputField from "../components/ui/InputField";
import Button from "../components/ui/Button";
import Toast from "../components/ui/Toast";

export default function LoginPage() {
  const { values, handleChange } = useForm({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    const result = await login(values);
    if (result.ok) {
      navigate(location.state?.from || "/app/dashboard");
    } else {
      setError(result.error);
    }
  }

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <p className="eyebrow">Welcome back</p>
        <h1>Sign in to BudgetBrain</h1>
        <p className="muted">Use your account to manage your finances and insights.</p>
        <Toast message={error} type="error" />
        <InputField label="Email" name="email" type="email" value={values.email} onChange={handleChange} required />
        <InputField label="Password" name="password" type="password" value={values.password} onChange={handleChange} required />
        <Button type="submit" loading={loading}>Sign In</Button>
        <p className="muted auth-switch">No account yet? <Link to="/signup">Create one</Link></p>
      </form>
    </div>
  );
}
