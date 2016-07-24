import { app, shell } from 'electron';

let template = [
    {
        label: 'Edit',
        submenu: [
            { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
            { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
            { type: "separator" },
            { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
            { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
            { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
            { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
        ]
    },
    {
        role: 'window',
        submenu: [
            { label: 'Close', accelerator: 'CmdOrCtrl+W', role: 'close' },
            { label: 'Minimize', accelerator: 'CmdOrCtrl+M', role: 'minimize' },
            { type: 'separator' },
            { label: 'Bring All to Front', role: 'front' }
        ]
    },
    {
        role: 'help',
        submenu: [
            { label: 'Donate', click() { shell.openExternal('https://github.com/chrisenytc/ubauth#donate'); } },
            { label: 'Author', click() { shell.openExternal('https://github.com/chrisenytc'); } },
            { label: 'Contribute', click() { shell.openExternal('https://github.com/chrisenytc/ubauth#contributing'); } },
            { label: 'Learn More', click() { shell.openExternal('http://ubauth.enytc.com'); } }
        ]
    },
];

if (process.platform === 'darwin') {
    let name = app.getName();

    template.unshift({
        label: name,
        submenu: [
            {
                role: 'about'
            },
            {
                type: 'separator'
            },
            {
                role: 'services',
                submenu: []
            },
            {
                type: 'separator'
            },
            {
                role: 'hide'
            },
            {
                role: 'hideothers'
            },
            {
                role: 'unhide'
            },
            {
                type: 'separator'
            },
            {
                role: 'quit'
            },
        ]
    });
}

export default template;
