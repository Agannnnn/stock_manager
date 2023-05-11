import { contextBridge } from "electron";

contextBridge.exposeInMainWorld("db", {});
