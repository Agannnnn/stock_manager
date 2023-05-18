import { BrowserWindow, app, ipcMain, shell } from "electron";
import { release } from "node:os";
import { join } from "node:path";
import postgres, { Sql } from "postgres";
import type { Items } from "../../model";

process.env.DIST_ELECTRON = join(__dirname, "..");
process.env.DIST = join(process.env.DIST_ELECTRON, "../dist");
process.env.PUBLIC = process.env.VITE_DEV_SERVER_URL
  ? join(process.env.DIST_ELECTRON, "../public")
  : process.env.DIST;

// Disable GPU Acceleration for Windows 7
if (release().startsWith("6.1")) app.disableHardwareAcceleration();

// Set application name for Windows 10+ notifications
if (process.platform === "win32") app.setAppUserModelId(app.getName());

if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}

let win: BrowserWindow | null = null;
let sql: Sql;

const preload = join(__dirname, "../preload/index.js");
const url = process.env.VITE_DEV_SERVER_URL;
const indexHtml = join(process.env.DIST, "index.html");

async function createWindow() {
  win = new BrowserWindow({
    title: "Main window",
    icon: join(process.env.PUBLIC, "favicon.ico"),
    minWidth: 1000,
    minHeight: 600,
    webPreferences: {
      preload,
    },
  });

  sql = postgres({
    host: "localhost",
    port: 5432,
    user: "postgres",
    pass: "root",
    db: "db_stock_manager",
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    // electron-vite-vue#298
    win.loadURL(url);
    // Open devTool if the app is not packaged
    win.webContents.openDevTools();
  } else {
    win.menuBarVisible = false;
    win.loadFile(indexHtml);
  }

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("https:")) shell.openExternal(url);
    return { action: "deny" };
  });
  // win.webContents.on('will-navigate', (event, url) => { }) #344
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  win = null;
  if (process.platform !== "darwin") app.quit();
});

app.on("second-instance", () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore();
    win.focus();
  }
});

app.on("activate", () => {
  const allWindows = BrowserWindow.getAllWindows();
  if (allWindows.length) {
    allWindows[0].focus();
  } else {
    createWindow();
  }
});

// Fetch all items
const getAllItems = async () => {
  const items = await sql<Items[]>`select * from items`;
  return items;
};
ipcMain.handle("get-all-items", getAllItems);

// Fetch items that mathces search keyword
const findItems = async (keyword: string) => {
  keyword = keyword.toLowerCase();
  const items = await sql<
    Items[]
  >`select * from items where LOWER(code) LIKE ${`%${keyword}%`} OR LOWER(name) LIKE ${`%${keyword}%`} OR LOWER(categories) LIKE ${`%${keyword}%`}`;
  return items;
};
ipcMain.handle("find-items", (_, keyword) => findItems(keyword));
