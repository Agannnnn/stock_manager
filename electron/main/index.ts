import {
  BrowserWindow,
  Notification,
  app,
  ipcMain,
  nativeImage,
  shell,
} from "electron";
import { createHash, randomBytes } from "node:crypto";
import { copyFileSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { release } from "node:os";
import { extname, join } from "node:path";
import postgres, { Sql } from "postgres";
import { Items } from "../../model";

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
const uploadedImages = join(app.getPath("documents"), "/Stock Manager");

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

  // Checks if directory for images exists
  if (!existsSync(uploadedImages)) {
    mkdirSync(uploadedImages);
  }
  if (process.env.VITE_DEV_SERVER_URL) {
    // If not then make one

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
  win.setProgressBar(2);
  const items = (await sql`select * from items`).map((item) => {
    item.imageExt = extname(item.image);
    item.imageBuffer = nativeImage
      .createFromPath(join(uploadedImages, `/${item.image}`))
      .toJPEG(75).buffer;

    return item;
  });
  win.setProgressBar(-1);

  return items;
};
ipcMain.handle("get-all-items", getAllItems);

// Fetch items that mathces search keyword
const findItems = async (keyword: string) => {
  keyword = keyword.toLowerCase();

  win.setProgressBar(2);
  const items = (
    await sql`select * from items where LOWER(code) LIKE ${`%${keyword}%`} OR LOWER(name) LIKE ${`%${keyword}%`} OR LOWER(categories) LIKE ${`%${keyword}%`}`
  ).map((item) => {
    item.imageExt = extname(item.image);
    item.imageBuffer = nativeImage
      .createFromPath(join(uploadedImages, `/${item.image}`))
      .toJPEG(75).buffer;

    return item;
  });
  win.setProgressBar(-1);

  return items;
};
ipcMain.handle("find-items", (_, keyword) => findItems(keyword));

// Save Item
const saveItem = async (item: Items, uploadedImagePath: string) => {
  const filename = createHash("sha256")
    .update(randomBytes(32))
    .digest("hex")
    .concat(extname(uploadedImagePath));
  copyFileSync(uploadedImagePath, join(uploadedImages, `/${filename}`));

  item.image = filename;

  const itemCode = await sql`insert into items ${sql(
    item,
    "code",
    "name",
    "image",
    "qty",
    "price",
    "categories"
  )} returning code`;

  if (itemCode.count > 0) {
    new Notification({
      icon: join(process.env.PUBLIC, "favicon.ico"),
      title: "Proses Berhasil",
      body: "Item baru telah disimpan",
    }).show();
    return true;
  } else {
    new Notification({
      icon: join(process.env.PUBLIC, "favicon.ico"),
      title: "Proses Gagal",
      body: "Terjadi kesalahan saat menyimpan item baru",
    }).show();
    return false;
  }
};
ipcMain.handle("save-item", (_, ...args) => saveItem(args[0], args[1]));

// Save Item
const updateItem = async (item: Items, uploadedImagePath: string) => {
  const oldItemImages = await sql<
    { image: string }[]
  >`select image from items where code = ${item.code}`;

  rmSync(join(uploadedImagePath, oldItemImages[0].image));

  const filename = createHash("sha256").update(randomBytes(32)).digest("hex");
  copyFileSync(
    uploadedImagePath,
    join(uploadedImages, `/${filename}${extname(uploadedImagePath)}`)
  );

  const itemCode = await sql`update items set ${sql(
    item,
    "name",
    "image",
    "qty",
    "price",
    "categories"
  )} where code = ${item.code} returning code`;

  if (itemCode.count > 0) {
    new Notification({
      icon: join(process.env.PUBLIC, "favicon.ico"),
      title: "Proses Berhasil",
      body: "Item telah diperbarui",
    }).show();
    return true;
  } else {
    new Notification({
      icon: join(process.env.PUBLIC, "favicon.ico"),
      title: "Proses Gagal",
      body: "Terjadi kesalahan saat memperbarui item",
    }).show();
    return false;
  }
};
ipcMain.handle("update-item", (_, ...args) => updateItem(args[0], args[1]));
