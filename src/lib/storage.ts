// Safely import electron only if running in the app (not in a normal browser)
const electron = typeof window !== 'undefined' && (window as any).require 
  ? (window as any).require('electron') 
  : null;

const ipcRenderer = electron ? electron.ipcRenderer : null;

export const storage = {
  async getEvents() {
    if (!ipcRenderer) {
      console.warn("Not running in Electron. Returning empty array.");
      return [];
    }
    return await ipcRenderer.invoke('get-events');
  },

  async saveEvents(events: any[]) {
    if (!ipcRenderer) {
      console.warn("Not running in Electron. Data not saved.");
      return;
    }
    await ipcRenderer.invoke('save-events', events);
  }
};