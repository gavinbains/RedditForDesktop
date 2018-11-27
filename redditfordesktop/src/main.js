const {app, BrowserWindow, BrowserView, ipcMain} = require('electron');

let mainWindow;
let subView;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1400,
        height: 750,
        resizable: false
    });

    subView = new BrowserView(
    );
    // mainWindow.setBrowserView(subView);
    [width, height] = mainWindow.getContentSize();
    subView.setBounds({x: 0, y: 0, width: width / 2, height: height});

    mainWindow.loadURL('http://localhost:3000');
    mainWindow.on('closed', function () {
        mainWindow = null;
        mainWindow.setBrowserView(null);
        subView = null;
    })
}

ipcMain.on('poop', (event, args) => {
    console.log(event, args);
})

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});