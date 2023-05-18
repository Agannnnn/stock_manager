import { contextBridge, ipcRenderer } from "electron";
import type { Items } from "../../model";

contextBridge.exposeInMainWorld("db", {
  getItems: async (keyword?: string) => {
    let items: Items[] = [];

    if (keyword?.length > 0) {
      items = await ipcRenderer.invoke("find-items", keyword);
    } else {
      items = await ipcRenderer.invoke("get-all-items");
    }

    return items;
  },
});
