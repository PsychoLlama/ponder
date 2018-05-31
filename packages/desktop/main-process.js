const { app, BrowserWindow } = require('electron');
const path = require('path');

app.once('ready', () => {
  const browser = new BrowserWindow({
    height: 600,
    width: 800,
  });

  const mainPage = path.resolve(__dirname, './index.html');
  browser.loadFile(mainPage);
});
