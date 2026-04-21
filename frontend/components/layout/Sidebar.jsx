import { NavLink } from "react-router-dom";

const links = [
  { to: "/app/dashboard", label: "Dashboard" },
  { to: "/app/transactions", label: "Transactions" },
  { to: "/app/budgets", label: "Budgets" },
  { to: "/app/analytics", label: "Analytics" },
  { to: "/app/profile", label: "Profile" },
  { to: "/app/settings", label: "Settings" }
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand-block">
        <div className="brand-logo">BB</div>
        <div>
          <h2>BudgetBrain</h2>
          <p className="muted">Personal finance OS</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
