import { useEffect, useState } from "react";
import Card from "../components/ui/Card";
import LoadingState from "../components/ui/LoadingState";
import EmptyState from "../components/ui/EmptyState";
import MonthlyBarChart from "../components/charts/MonthlyBarChart";
import CategoryPieChart from "../components/charts/CategoryPieChart";
import { fetchDashboard } from "../services/dashboardService";

export default function AnalyticsPage() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchDashboard();
        setDashboard(data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load analytics.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <LoadingState text="Loading analytics..." />;
  if (error) return <Card title="Analytics error"><p>{error}</p></Card>;

  return (
    <div className="page-stack">
      <Card title="Monthly cash flow" subtitle="Income versus expense trend">
        <MonthlyBarChart data={(dashboard.monthly || []).map((item) => ({
          month: item.month,
          income: Number(item.income),
          expense: Number(item.expense)
        }))} />
      </Card>

      <Card title="Expense category mix" subtitle="Where your money goes">
        {dashboard.categories?.length ? (
          <CategoryPieChart data={(dashboard.categories || []).map((item) => ({
            name: item.name,
            value: Number(item.value)
          }))} />
        ) : (
          <EmptyState title="No analytics yet" description="Add expense transactions to generate category insights." />
        )}
      </Card>
    </div>
  );
}
