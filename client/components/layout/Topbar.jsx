import { useAuth } from "../../contexts/AuthContext";
import Button from "../ui/Button";

export default function Topbar() {
  const { user, logout } = useAuth();

  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">Smart finance management</p>
        <h1 className="page-title">Welcome back, {user?.name || "User"}</h1>
      </div>
      <div className="topbar-actions">
        <div className="user-chip">{user?.email}</div>
        <Button variant="secondary" onClick={logout}>Logout</Button>
      </div>
    </header>
  );
}
