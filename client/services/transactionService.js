import api from "./api";

export async function fetchTransactions() {
  const { data } = await api.get("/transactions");
  return data;
}

export async function createTransaction(payload) {
  const { data } = await api.post("/transactions", payload);
  return data;
}

export async function updateTransaction(id, payload) {
  const { data } = await api.put(`/transactions/${id}`, payload);
  return data;
}

export async function deleteTransaction(id) {
  const { data } = await api.delete(`/transactions/${id}`);
  return data;
}
