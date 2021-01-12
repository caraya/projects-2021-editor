const { 
	app, 
	BrowserWindow, 
	Menu,
	dialog,
	ipcMain,
} = require('electron');
const fs = require('fs');
const isMac = process.platform === 'darwin'

const template = [
	// { role: 'appMenu' }
	...(isMac ? [{
		label: app.name,
		submenu: [
			{ role: 'about' },
			{ type: 'separator' },
			{ role: 'services' },
			{ type: 'separator' },
			{ role: 'hide' },
			{ role: 'hideothers' },
			{ role: 'unhide' },
			{ type: 'separator' },
			{ role: 'quit' }
		]
	}] : []),
	// { role: 'fileMenu' }
	{
		label: 'File',
		submenu: [
			{
				label: 'New',
				accelerator: 'CmdOrCtrl+n',
			},
			{
				label: 'Open',
				accelerator: 'CmdOrCtrl+o',
			},
			{ type: 'separator' },
			{
				label: 'Save',
				accelerator: 'CmdOrCtrl+s',
			},
			{
				label: 'Save As',
				accelerator: 'CmdOrCtrl+Shift+s'
			},
			{ type: 'separator' },
			{
				'label': 'Open Recent',
				'role': 'recentdocuments',
				'submenu': [
					{
						'label': 'Clear Recent',
						'role': 'clearrecentdocuments'
					}
				]
			},
			{ type: 'separator' },
			isMac ? { role: 'close' } : { role: 'quit' }
		]
	},
	// { role: 'editMenu' }
	{
		label: 'Edit',
		submenu: [
			{ role: 'undo' },
			{ role: 'redo' },
			{ type: 'separator' },
			{ role: 'cut' },
			{ role: 'copy' },
			{ role: 'paste' },
			...(isMac ? [
				{ role: 'pasteAndMatchStyle' },
				{ role: 'delete' },
				{ role: 'selectAll' },
				{ type: 'separator' },
				{
					label: 'Speech',
					submenu: [
						{ role: 'startSpeaking' },
						{ role: 'stopSpeaking' }
					]
				}
			] : [
					{ role: 'delete' },
					{ type: 'separator' },
					{ role: 'selectAll' }
				])
		]
	},
	// { role: 'viewMenu' }
	{
		label: 'View',
		submenu: [
			{ role: 'reload' },
			{ role: 'forceReload' },
			{ role: 'toggleDevTools' },
			{ type: 'separator' },
			{ role: 'resetZoom' },
			{ role: 'zoomIn' },
			{ role: 'zoomOut' },
			{ type: 'separator' },
			{ role: 'togglefullscreen' }
		]
	},
	// { role: 'windowMenu' }
	{
		label: 'Window',
		submenu: [
			{ role: 'minimize' },
			{ role: 'zoom' },
			...(isMac ? [
				{ type: 'separator' },
				{ role: 'front' },
				{ type: 'separator' },
				{ role: 'window' }
			] : [
					{ role: 'close' }
				])
		]
	},
	{
		label: 'Process',
		submenu: [
			{
				label: 'Web Package',
				accelerator: 'CmdOrCtrl+Alt+Shift+w',
			},
			{
				label: 'epub',
				accelerator: 'CmdOrCtrl+Alt+Shift+e'
			},
			{
				label: 'zip',
				accelerator: 'CmdOrCtrl+Alt+Shift+z'
			}
		]
	},

	{
		role: 'help',
		submenu: [
			{
				label: 'Learn More',
				click: async () => {
					const { shell } = require('electron')
					await shell.openExternal('https://electronjs.org')
				}
			}
		]
	}
]

const menu = Menu.buildFromTemplate(template)

let mainWindow;

const getFile = getFileFromUser = () => {
	dialog.showOpenDialog(mainWindow, {
		properties: [
			'openFile',
		],
	}).then(result => {
		console.log(result.canceled);
		console.log(result.filePaths);
		file = result.filePaths[0]
		console.log(file)
		content = fs.readFileSync(file).toString()
		console.log(content)
	}).catch(err => {
		console.log(err)
	})
}

const putFile = saveFileForUser = () => {
	dialog.showSaveDialog(mainWindow, {
		properties: [
			'createDirectory',
			'showOverwriteConfirmation'
		]
	}).then(result => {
		console.log(result.canceled)
		console.log(result.filePaths)
	}).catch(err => {
		console.log(err)
	})
}

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 1600,
		height: 1200,
		webPreferences: { worldSafeExecuteJavaScript: true }
	});

	mainWindow.loadURL(`file://${__dirname}/dist/electron-index.html`);

	// mainWindow.webContents.openDevTools();

	mainWindow.on('closed', function () {
		mainWindow = null;
	});
}

app.on('ready', () => {
	Menu.setApplicationMenu(menu);
	createWindow();
	getFile();
});

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', function () {
	if (mainWindow === null) {
		createWindow();
	}
})
