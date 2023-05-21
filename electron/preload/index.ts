import { contextBridge, ipcRenderer } from "electron";
import type { Items, Transactions } from "../../model";

contextBridge.exposeInMainWorld("db", {
  getItems: async (keyword?: string) => {
    let items = [];

    if (keyword?.length > 0) {
      items = await ipcRenderer.invoke("find-items", keyword);
    } else {
      items = await ipcRenderer.invoke("get-all-items");
    }

    items.map((item) => {
      item.image = URL.createObjectURL(
        new Blob([item.imageBuffer], {
          type: `image/${(item.imageExt as string).substring(1)}`,
        })
      );
      return item;
    });

    return items;
  },
  getItem: async (item: string) => {
    return await ipcRenderer.invoke("get-item", item);
  },
  saveItem: async (item: Items, image: File) => {
    return await ipcRenderer.invoke("save-item", item, image.path);
  },
  updateItem: async (item: Items, image: File) => {
    return await ipcRenderer.invoke("update-item", item, image.path);
  },
  deleteItem: async (item: Items) => {
    return await ipcRenderer.invoke("delete-item", item);
  },
  restockItem: async (item: string, qty: number) => {
    return await ipcRenderer.invoke("restock-item", item, qty);
  },
  saveTransaction: async (transaction: Transactions) => {
    return await ipcRenderer.invoke("save-transaction", transaction);
  },
  getTransactions: async (item?: string) => {
    return await ipcRenderer.invoke("get-transactions", item);
  },
});
