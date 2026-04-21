import { useEffect, useState } from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import InputField from "../components/ui/InputField";
import Toast from "../components/ui/Toast";
import LoadingState from "../components/ui/LoadingState";
import useForm from "../hooks/useForm";
import { fetchProfile, updateProfile } from "../services/userService";

export default function ProfilePage() {
  const { values, handleChange, setValues } = useForm({
    name: "",
    email: "",
    currency: "USD",
    monthlyIncomeGoal: 0
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "success" });

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchProfile();
        setValues({
          name: data.user.name,
          email: data.user.email,
          currency: data.user.currency,
          monthlyIncomeGoal: data.user.monthlyIncomeGoal || 0
        });
      } catch (error) {
        setToast({ message: error.response?.data?.message || "Failed to load profile.", type: "error" });
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [setValues]);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setSaving(true);
      const data = await updateProfile({
        name: values.name,
        currency: values.currency,
        monthlyIncomeGoal: Number(values.monthlyIncomeGoal || 0)
      });
      setValues({
        name: data.user.name,
        email: data.user.email,
        currency: data.user.currency,
        monthlyIncomeGoal: data.user.monthlyIncomeGoal || 0
      });
      setToast({ message: data.message, type: "success" });
    } catch (error) {
      setToast({ message: error.response?.data?.message || "Failed to update profile.", type: "error" });
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <LoadingState text="Loading profile..." />;

  return (
    <Card title="Profile" subtitle="Manage your account information">
      <Toast message={toast.message} type={toast.type} />
      <form className="form-grid" onSubmit={handleSubmit}>
        <InputField label="Full name" name="name" value={values.name} onChange={handleChange} required />
        <InputField label="Email" name="email" value={values.email} onChange={handleChange} readOnly />
        <InputField label="Currency" name="currency" value={values.currency} onChange={handleChange} required />
        <InputField label="Monthly income goal" name="monthlyIncomeGoal" type="number" min="0" step="0.01" value={values.monthlyIncomeGoal} onChange={handleChange} />
        <div className="form-actions">
          <Button type="submit" loading={saving}>Save changes</Button>
        </div>
      </form>
    </Card>
  );
}
