import { useEffect, useMemo, useState } from "react";
import Card from "../components/ui/Card";
import LoadingState from "../components/ui/LoadingState";
import EmptyState from "../components/ui/EmptyState";
import MonthlyBarChart from "../components/charts/MonthlyBarChart";
import CategoryPieChart from "../components/charts/CategoryPieChart";
import { fetchDashboard } from "../services/dashboardService";

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const response = await fetchDashboard();
        setData(response);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load dashboard.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const stats = useMemo(() => {
    if (!data?.summary) return [];
    return [
      { label: "Total income", value: `$${Number(data.summary.totalIncome).toLocaleString()}` },
      { label: "Total expense", value: `$${Number(data.summary.totalExpense).toLocaleString()}` },
      { label: "Balance", value: `$${Number(data.summary.balance).toLocaleString()}` },
      { label: "Budget pool", value: `$${Number(data.summary.totalBudget).toLocaleString()}` }
    ];
  }, [data]);

  if (loading) return <LoadingState text="Loading dashboard..." />;
  if (error) return <Card title="Dashboard error"><p>{error}</p></Card>;

  return (
    <div className="page-stack">
      <section className="stats-grid">
        {stats.map((item) => (
          <Card key={item.label} title={item.label}>
            <div className="metric-value">{item.value}</div>
          </Card>
        ))}
      </section>

      <section className="content-grid">
        <Card title="Income vs expenses" subtitle="Monthly overview">
          <MonthlyBarChart data={(data.monthly || []).map((item) => ({
            month: item.month,
            income: Number(item.income),
            expense: Number(item.expense)
          }))} />
        </Card>

        <Card title="Spending by category" subtitle="Expense breakdown">
          {data.categories?.length ? (
            <CategoryPieChart data={(data.categories || []).map((item) => ({
              name: item.name,
              value: Number(item.value)
            }))} />
          ) : (
            <EmptyState title="No category data yet" description="Add some expense transactions to populate analytics." />
          )}
        </Card>
      </section>
    </div>
  );
}
