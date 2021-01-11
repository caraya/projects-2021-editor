const { app, BrowserWindow, Menu } = require('electron');
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
			{ label: 'New' },
			{ label: 'Open' },
			{ type: 'separator' },
			{ label: 'Save' },
			{ label: 'Save As' },
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
			{ label: 'Web Package' },
			{ label: 'epub' },
			{ label: 'zip' }
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

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
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
});
