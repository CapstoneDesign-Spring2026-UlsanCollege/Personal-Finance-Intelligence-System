import { useEffect, useState } from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import InputField from "../components/ui/InputField";
import SelectField from "../components/ui/SelectField";
import Toast from "../components/ui/Toast";
import LoadingState from "../components/ui/LoadingState";
import EmptyState from "../components/ui/EmptyState";
import Modal from "../components/ui/Modal";
import useForm from "../hooks/useForm";
import {
  fetchTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction
} from "../services/transactionService";

const initialForm = {
  title: "",
  amount: "",
  type: "expense",
  category: "Food",
  date: "",
  notes: ""
};

const categoryOptions = [
  { value: "Food", label: "Food" },
  { value: "Housing", label: "Housing" },
  { value: "Transport", label: "Transport" },
  { value: "Salary", label: "Salary" },
  { value: "Side Hustle", label: "Side Hustle" },
  { value: "Entertainment", label: "Entertainment" },
  { value: "Health", label: "Health" },
  { value: "Utilities", label: "Utilities" }
];

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [editing, setEditing] = useState(null);
  const [toast, setToast] = useState({ message: "", type: "success" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const { values, handleChange, setValues, reset } = useForm(initialForm);

  useEffect(() => {
    loadTransactions();
  }, []);

  async function loadTransactions() {
    try {
      setLoading(true);
      const data = await fetchTransactions();
      setTransactions(data.transactions || []);
    } catch (error) {
      setToast({ message: error.response?.data?.message || "Failed to load transactions.", type: "error" });
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setSaving(true);
      if (editing) {
        const data = await updateTransaction(editing.id, values);
        setTransactions((prev) => prev.map((item) => item.id === editing.id ? data.transaction : item));
        setToast({ message: data.message, type: "success" });
      } else {
        const data = await createTransaction(values);
        setTransactions((prev) => [data.transaction, ...prev]);
        setToast({ message: data.message, type: "success" });
      }
      reset(initialForm);
      setEditing(null);
    } catch (error) {
      setToast({ message: error.response?.data?.message || "Failed to save transaction.", type: "error" });
    } finally {
      setSaving(false);
    }
  }

  function startEdit(item) {
    setEditing(item);
    setValues({
      title: item.title,
      amount: item.amount,
      type: item.type,
      category: item.category,
      date: item.date,
      notes: item.notes || ""
    });
  }

  async function confirmDelete() {
    try {
      const data = await deleteTransaction(deleteId);
      setTransactions((prev) => prev.filter((item) => item.id !== deleteId));
      if (editing?.id === deleteId) {
        setEditing(null);
        reset(initialForm);
      }
      setToast({ message: data.message, type: "success" });
    } catch (error) {
      setToast({ message: error.response?.data?.message || "Failed to delete transaction.", type: "error" });
    } finally {
      setDeleteId(null);
    }
  }

  if (loading) return <LoadingState text="Loading transactions..." />;

  return (
    <div className="page-stack">
      <Toast message={toast.message} type={toast.type} />
      <Card title={editing ? "Edit transaction" : "Add transaction"} subtitle="Create and manage income and expenses">
        <form className="form-grid" onSubmit={handleSubmit}>
          <InputField label="Title" name="title" value={values.title} onChange={handleChange} required />
          <InputField label="Amount" name="amount" type="number" min="0.01" step="0.01" value={values.amount} onChange={handleChange} required />
          <SelectField
            label="Type"
            name="type"
            value={values.type}
            onChange={handleChange}
            options={[
              { value: "expense", label: "Expense" },
              { value: "income", label: "Income" }
            ]}
          />
          <SelectField label="Category" name="category" value={values.category} onChange={handleChange} options={categoryOptions} />
          <InputField label="Date" name="date" type="date" value={values.date} onChange={handleChange} required />
          <InputField label="Notes" name="notes" value={values.notes} onChange={handleChange} placeholder="Optional" />
          <div className="form-actions">
            <Button type="submit" loading={saving}>{editing ? "Update transaction" : "Add transaction"}</Button>
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

      <Card title="All transactions" subtitle="Stored in the database">
        {transactions.length === 0 ? (
          <EmptyState title="No transactions yet" description="Add your first transaction to begin tracking money." />
        ) : (
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((item) => (
                  <tr key={item.id}>
                    <td>{item.title}</td>
                    <td>{item.category}</td>
                    <td><span className={`pill ${item.type}`}>{item.type}</span></td>
                    <td>{item.date}</td>
                    <td>${Number(item.amount).toLocaleString()}</td>
                    <td className="table-actions">
                      <Button variant="secondary" onClick={() => startEdit(item)}>Edit</Button>
                      <Button variant="ghost" onClick={() => setDeleteId(item.id)}>Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Modal open={Boolean(deleteId)} title="Delete transaction?" onClose={() => setDeleteId(null)}>
        <p className="muted">This action cannot be undone.</p>
        <div className="form-actions modal-actions">
          <Button variant="ghost" onClick={confirmDelete}>Delete</Button>
          <Button variant="secondary" onClick={() => setDeleteId(null)}>Cancel</Button>
        </div>
      </Modal>
    </div>
  );
}
