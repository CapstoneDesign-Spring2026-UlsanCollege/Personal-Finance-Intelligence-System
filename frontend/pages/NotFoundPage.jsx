import { Link } from "react-router-dom";
import Button from "../components/ui/Button";

export default function NotFoundPage() {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <p className="eyebrow">404</p>
        <h1>Page not found</h1>
        <p className="muted">The page you were looking for does not exist.</p>
        <Link to="/"><Button>Go home</Button></Link>
      </div>
    </div>
  );
}
