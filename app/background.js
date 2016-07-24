// This is main process of Electron, started as first thing when your
// app starts. This script is running through entire life of your application.
// It doesn't have any windows which you can see on screen, but we can open
// window from here.

import { app, dialog, ipcMain, Menu } from 'electron';
import devMenuTemplate from './helpers/dev_menu_template';
import appMenuTemplate from './helpers/app_menu_template';
import createWindow from './helpers/window';

// Special module holding environment letiables which you declared
// in config/env_xxx.json file.
import env from './env';

let pkg = require('./package.json');

let mainWindow;

let setApplicationMenu = () => {
    let menus = appMenuTemplate;
    if (env.name !== 'production') {
        menus.push(devMenuTemplate);
    }
    Menu.setApplicationMenu(Menu.buildFromTemplate(menus));
};

let handleError = (win, msg) => {
    const options = {
        type: 'info',
        title: 'Error',
        message: msg,
        buttons: ['Reload', 'Close']
    }

    dialog.showMessageBox(options, (index) => {
        if (index === 0) {
            win.reload();
        }
        else {
            win.close();
        }
    })
};

app.on('ready', () => {
    setApplicationMenu();

    let mainWindow = createWindow('main', {
        minWidth: 300,
        minHeight: 700,
        width: 350,
        height: 830,
        titleBarStyle: 'hidden'
    });

    mainWindow.setTitle(pkg.productName);

    mainWindow.webContents.on('crashed', () => {
        return handleError('An unexpected error has occurred.', mainWindow);
    });

    mainWindow.on('unresponsive', () => {
        return handleError('The app is not responding.', mainWindow);
    });

    mainWindow.loadURL('file://' + __dirname + '/pages/app.html');

    if (env.name == 'development') {
        mainWindow.openDevTools({ mode: 'detach' });
        require('devtron').install();
    }

    ipcMain.on('open-error-dialog', () => {
        dialog.showErrorBox('Error', 'Oops! Something went wrong and we couldn\'t log you in using Uber. Please try again.');
    });

    ipcMain.on('load-success-page', (event, access_token) => {
        mainWindow.loadURL('file://' + __dirname + '/pages/success.html');
        mainWindow.webContents.on('did-finish-load', () => {
            mainWindow.webContents.send('show-access-token', access_token);
        });
    });
});

app.on('window-all-closed', () => {
    app.quit();
});

process.on('uncaughtException', () => {
   return handleError('Oops! Something went wrong.', mainWindow);
});
