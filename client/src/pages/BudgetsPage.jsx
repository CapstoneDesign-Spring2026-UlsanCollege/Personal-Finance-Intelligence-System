import { useEffect, useState } from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import InputField from "../components/ui/InputField";
import Toast from "../components/ui/Toast";
import LoadingState from "../components/ui/LoadingState";
import EmptyState from "../components/ui/EmptyState";
import Modal from "../components/ui/Modal";
import useForm from "../hooks/useForm";
import { fetchBudgets, createBudget, updateBudget, deleteBudget } from "../services/budgetService";

const initialForm = {
  category: "",
  amount: ""
};

export default function BudgetsPage() {
  const [budgets, setBudgets] = useState([]);
  const [editing, setEditing] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [toast, setToast] = useState({ message: "", type: "success" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { values, handleChange, setValues, reset } = useForm(initialForm);

  useEffect(() => {
    loadBudgets();
  }, []);

  async function loadBudgets() {
    try {
      setLoading(true);
      const data = await fetchBudgets();
      setBudgets(data.budgets || []);
    } catch (error) {
      setToast({ message: error.response?.data?.message || "Failed to load budgets.", type: "error" });
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setSaving(true);
      if (editing) {
        const data = await updateBudget(editing.id, values);
        setBudgets((prev) => prev.map((item) => item.id === editing.id ? data.budget : item));
        setToast({ message: data.message, type: "success" });
      } else {
        const data = await createBudget(values);
        setBudgets((prev) => [...prev, data.budget]);
        setToast({ message: data.message, type: "success" });
      }
      reset(initialForm);
      setEditing(null);
    } catch (error) {
      setToast({ message: error.response?.data?.message || "Failed to save budget.", type: "error" });
    } finally {
      setSaving(false);
    }
  }

  function startEdit(item) {
    setEditing(item);
    setValues({
      category: item.category,
      amount: item.amount
    });
  }

  async function confirmDelete() {
    try {
      const data = await deleteBudget(deleteId);
      setBudgets((prev) => prev.filter((item) => item.id !== deleteId));
      if (editing?.id === deleteId) {
        setEditing(null);
        reset(initialForm);
      }
      setToast({ message: data.message, type: "success" });
    } catch (error) {
      setToast({ message: error.response?.data?.message || "Failed to delete budget.", type: "error" });
    } finally {
      setDeleteId(null);
    }
  }

  if (loading) return <LoadingState text="Loading budgets..." />;

  return (
    <div className="page-stack">
      <Toast message={toast.message} type={toast.type} />
      <Card title={editing ? "Edit budget" : "Create budget"} subtitle="Set category spending targets">
        <form className="form-grid budget-form" onSubmit={handleSubmit}>
          <InputField label="Category" name="category" value={values.category} onChange={handleChange} required />
          <InputField label="Budget amount" name="amount" type="number" min="0.01" step="0.01" value={values.amount} onChange={handleChange} required />
          <div className="form-actions">
            <Button type="submit" loading={saving}>{editing ? "Update budget" : "Create budget"}</Button>
            {editing && (
              <Button type="button" variant="secondary" onClick={() => {
                setEditing(null);
                reset(initialForm);
              }}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </Card>

      <Card title="Budget overview" subtitle="Tracked against expense transactions">
        {budgets.length === 0 ? (
          <EmptyState title="No budgets created" description="Create a budget to monitor category spending." />
        ) : (
          <div className="budget-list">
            {budgets.map((item) => {
              const progress = item.amount > 0 ? Math.min((Number(item.spent) / Number(item.amount)) * 100, 100) : 0;
              return (
                <div key={item.id} className="budget-item-card">
                  <div className="budget-top">
                    <div>
                      <h3>{item.category}</h3>
                      <p className="muted">Spent ${Number(item.spent).toLocaleString()} of ${Number(item.amount).toLocaleString()}</p>
                    </div>
                    <div className="table-actions">
                      <Button variant="secondary" onClick={() => startEdit(item)}>Edit</Button>
                      <Button variant="ghost" onClick={() => setDeleteId(item.id)}>Delete</Button>
                    </div>
                  </div>
                  <div className="progress-bar">
                    <span style={{ width: `${progress}%` }} />
                  </div>
                  <div className="budget-foot">
                    <span>Remaining: ${Number(item.remaining).toLocaleString()}</span>
                    <span>{progress.toFixed(0)}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>

      <Modal open={Boolean(deleteId)} title="Delete budget?" onClose={() => setDeleteId(null)}>
        <p className="muted">This category budget will be removed.</p>
        <div className="form-actions modal-actions">
          <Button variant="ghost" onClick={confirmDelete}>Delete</Button>
          <Button variant="secondary" onClick={() => setDeleteId(null)}>Cancel</Button>
        </div>
      </Modal>
    </div>
  );
}
