import { contextBridge, ipcRenderer } from "electron";
import type { Items } from "../../model";

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
  saveItem: async (item: Items, image: File) => {
    return await ipcRenderer.invoke("save-item", item, image.path);
  },
  updateItem: async (item: Items, image: File) => {
    return await ipcRenderer.invoke("update-item", item, image.path);
  },
  deleteItem: async (item: Items) => {
    return await ipcRenderer.invoke("delete-item", item);
  },
});
