const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

// --- FIX IMPORTS ---
// 1. Fix Store: Works perfectly with electron-store@6.0.1
const Store = require('electron-store'); 

// 2. Fix Serve: Handle both CommonJS and Default exports
const serveHandler = require('electron-serve');
const serve = serveHandler.default || serveHandler;
// -------------------

const loadURL = serve({ directory: 'out' });
const store = new Store();

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false, // Required for our ipcRenderer setup
    },
    autoHideMenuBar: true,
  });

  // In dev mode, try localhost. If that fails (or in prod), load files.
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:3000').catch(() => {
        // Fallback if dev server isn't ready yet
        loadURL(mainWindow);
    });
    mainWindow.webContents.openDevTools();
  } else {
    loadURL(mainWindow);
  }
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// --- LOCAL BACKEND API ---

// 1. Get Events
ipcMain.handle('get-events', async () => {
  return store.get('events', []); 
});

// 2. Save Events
ipcMain.handle('save-events', async (event, data) => {
  store.set('events', data);
  return { success: true };
});