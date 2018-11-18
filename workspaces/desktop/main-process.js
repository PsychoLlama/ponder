// @flow
const { app, BrowserWindow } = require('electron');
const path = require('path');

app.once('ready', async () => {
  const browser = new BrowserWindow({
    titleBarStyle: 'hidden',
    height: 600,
    width: 800,
  });

  const mainPage = path.resolve(__dirname, './index.html');
  browser.loadFile(mainPage);

  if (process.env.NODE_ENV !== 'production') {
    const {
      default: installExtension,
      REACT_DEVELOPER_TOOLS,
      REDUX_DEVTOOLS,
    } = require('electron-devtools-installer');

    await Promise.all([
      installExtension(REACT_DEVELOPER_TOOLS),
      installExtension(REDUX_DEVTOOLS),
    ]);
  }
});
