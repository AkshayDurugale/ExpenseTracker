import axios from "axios";

const API_URL = "http://localhost:5000/transactions";

export const getTransactions = () => axios.get(API_URL).then((res) => res.data);
export const addTransaction = (transaction) =>
  axios.post(API_URL, transaction).then((res) => res.data);
export const updateTransaction = (id, transaction) =>
  axios.put(`${API_URL}/${id}`, transaction).then((res) => res.data);
export const deleteTransaction = (id) =>
  axios.delete(`${API_URL}/${id}`).then((res) => res.data);
