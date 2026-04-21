import api from "./api";

export async function fetchBudgets() {
  const { data } = await api.get("/budgets");
  return data;
}

export async function createBudget(payload) {
  const { data } = await api.post("/budgets", payload);
  return data;
}

export async function updateBudget(id, payload) {
  const { data } = await api.put(`/budgets/${id}`, payload);
  return data;
}

export async function deleteBudget(id) {
  const { data } = await api.delete(`/budgets/${id}`);
  return data;
}
