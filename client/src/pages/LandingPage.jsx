import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

export default function LandingPage() {
  return (
    <div className="landing-page">
      <header className="landing-nav">
        <div className="brand-inline">
          <div className="brand-logo">BB</div>
          <span>BudgetBrain</span>
        </div>

        <div className="nav-actions">
          <Link to="/login" className="text-link">Login</Link>
          <Link to="/signup"><Button>Get Started</Button></Link>
        </div>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Smart personal finance management</p>
          <h1>Track money, control budgets, and understand spending with confidence.</h1>
          <p className="hero-description">
            BudgetBrain gives you a modern dashboard for income, expenses, budgets, analytics,
            and account management in one clean product experience.
          </p>
          <div className="hero-actions">
            <Link to="/signup"><Button>Start Free</Button></Link>
            <Link to="/login"><Button variant="secondary">Sign In</Button></Link>
          </div>
        </div>

        <Card title="Live finance snapshot" subtitle="Designed like a real product">
          <div className="hero-stat-list">
            <div><strong>$4,980</strong><span>Income</span></div>
            <div><strong>$1,527</strong><span>Expenses</span></div>
            <div><strong>$3,453</strong><span>Balance</span></div>
          </div>
        </Card>
      </section>

      <section className="feature-grid">
        <Card title="Transactions" subtitle="Full income and expense management">
          <p className="muted">Add, edit, delete, and categorize financial activity with real persistence.</p>
        </Card>
        <Card title="Budgets" subtitle="Category-based planning">
          <p className="muted">Set limits by category and instantly see what is spent and what remains.</p>
        </Card>
        <Card title="Analytics" subtitle="Readable visual reporting">
          <p className="muted">Track monthly trends and category distribution with dashboard charts.</p>
        </Card>
      </section>
    </div>
  );
}
