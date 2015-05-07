var app = require('app');
var BrowserWindow = require('browser-window');
require('crash-reporter').start();

var mainWindow = null;

app.on('window-all-closed', function() {
	if (process.platform != 'darwin')
		app.quit();
});

app.on('ready', function() {
	openMainWindow();
});

openMainWindow = function(){
	mainWindow = new BrowserWindow({
		width: 600,
		height: 400,
		center: true,
		"min-width": 300,
		"min-height": 200,
		resizable: true,
		fullscreen: false
	});

	createAppMenu();

	mainWindow.loadUrl('file://' + __dirname + '/index.html');

	mainWindow.on('closed', function() {
		mainWindow = null;
		app.quit();
	});
};

createAppMenu = function(){
	var Menu = require('menu');
	template = [
		{
			label: 'Timer',
			submenu: [
				{
					label: 'About Timer',
					selector: 'orderFrontStandardAboutPanel:'
				},
				{
					type: 'separator'
				},
				{
					label: 'Hide',
					accelerator: 'Command+H',
					selector: 'hide:'
				},
				{
					label: 'Quit',
					accelerator: 'Command+W',
					click: function() { app.quit(); }
				}
			]
		},
		{
			label: 'Developer',
			submenu: [
				{
					label: 'Reload',
					accelerator: 'Command+R',
					click: function() { BrowserWindow.getFocusedWindow().reloadIgnoringCache(); }
				},
				{
					label: 'Toggle DevTools',
					accelerator: 'Alt+Command+I',
					click: function() { BrowserWindow.getFocusedWindow().toggleDevTools(); }
				}
			]
		}
	];
	menu = Menu.buildFromTemplate(template);
	Menu.setApplicationMenu(menu);
};