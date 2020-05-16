// @flow
import { app, BrowserWindow } from 'electron';
import { initialize } from '@ponder/sdk';
import * as path from 'path';

app.once('ready', async () => {
  await initialize();

  const browser = new BrowserWindow({
    titleBarStyle: 'hidden',
    height: 600,
    width: 800,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  const mainPage = path.resolve(__dirname, '../index.html');
  browser.loadFile(mainPage);

  if (process.env.NODE_ENV !== 'production') {
    const {
      default: installExtension,
      REACT_DEVELOPER_TOOLS,
      REDUX_DEVTOOLS,
    } = await import('electron-devtools-installer');

    await Promise.all([
      installExtension(REACT_DEVELOPER_TOOLS),
      installExtension(REDUX_DEVTOOLS),
    ]);
  }
});
