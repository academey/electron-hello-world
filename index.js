const {app, BrowserWindow } = require('electron');

let mainWindow;

function createWindow(){
  mainWindow = new BrowserWindow({
    width: 640,
    height: 480
  });

  mainWindow.loadURL(`file://${__dirname}/index.html`);
  mainWindow.on('closed', onClosed);
}
function onClosed() {
  mainWindow = null;
}
// windows 가 모두 닫혔을 때, 이거 안 하면 뭔 quit 이 발생한다.
app.on('window-all-closed', () => {
  // 맥은 윈도우를 껏다고 해서 프로그램을 종료시키면 안 된다. 따라서 맥을 제외하자.
  // platform 이 다윈인건 맥이다. 맥이 아닌 경우에만
  // 자동 종료가 되게 한다.
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// 맥에서는 모든 앱이 없어도 아이콘 누르면 새로운 윈도우가 켜져야 한다.
// 즉, mainWindow 가 없을 때(한 번도 실행되지 않았을 때) 만 윈도우를 키자.
app.on('activate', () => {
  if (!mainWindow) {
    createWindow();
  }
})

app.on('ready', () => {
  createWindow();
})
