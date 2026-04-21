import { useEffect, useState } from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Toast from "../components/ui/Toast";
import LoadingState from "../components/ui/LoadingState";
import { fetchSettings, updateSettings } from "../services/userService";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    monthlyReports: true,
    twoFactorEnabled: false
  });
  const [loading, setLoading] = useState(true);
  const [savingKey, setSavingKey] = useState("");
  const [toast, setToast] = useState({ message: "", type: "success" });

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchSettings();
        setSettings(data.settings);
      } catch (error) {
        setToast({ message: error.response?.data?.message || "Failed to load settings.", type: "error" });
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function toggleSetting(key) {
    const next = { ...settings, [key]: !settings[key] };
    try {
      setSavingKey(key);
      const data = await updateSettings(next);
      setSettings(data.settings);
      setToast({ message: data.message, type: "success" });
    } catch (error) {
      setToast({ message: error.response?.data?.message || "Failed to update settings.", type: "error" });
    } finally {
      setSavingKey("");
    }
  }

  if (loading) return <LoadingState text="Loading settings..." />;

  return (
    <Card title="Settings" subtitle="Update product preferences and security options">
      <Toast message={toast.message} type={toast.type} />
      <div className="settings-list">
        {[
          { key: "emailNotifications", title: "Email notifications", desc: "Receive important finance and budget updates." },
          { key: "monthlyReports", title: "Monthly reports", desc: "Keep automated month-end financial summaries enabled." },
          { key: "twoFactorEnabled", title: "Two-factor verification", desc: "Toggle the account security preference." }
        ].map((item) => (
          <div className="setting-row" key={item.key}>
            <div>
              <strong>{item.title}</strong>
              <p className="muted">{item.desc}</p>
            </div>
            <Button
              variant="secondary"
              loading={savingKey === item.key}
              onClick={() => toggleSetting(item.key)}
            >
              {settings[item.key] ? "Enabled" : "Disabled"}
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
}
