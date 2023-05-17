import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("db", {
  getItems: async () => {},
  insertItem: async () => {},
  updateItem: async () => {},
  deleteItem: async () => {},
  getTransactions: async () => {},
  insertTransaction: async () => {},
  updateTransaction: async () => {},
});
