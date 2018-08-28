import { overwolf } from 'overwolf';

/* You can add global scripts to this file */
alert('I started...');
function setupCurrentWindowNormal(page) {
  overwolf.games.getRunningGameInfo(gameInfo => {
    if (true) {
      overwolf.utils.getMonitorsList(function(result) {
        const _screenWidth = 0;
        const _screenHeight = 0;
        for (const display in result.displays) {
          if (result.displays[display].is_primary) {
            this._screenWidth = result.displays[display].width;
            this._screenHeight = result.displays[display].height;
          }
        }
        overwolf.windows.getCurrentWindow(res => {
          const _windowWidth = 560;
          const _windowHeight = 750;
          const _subWindowWidth = 560;
          const _left = Math.round((_screenWidth - _windowWidth) / 2);
          const _subWindowHeight = 450;
          const _top = Math.round((_screenHeight - _windowHeight) / 2);

          if (page === 'home') {
            overwolf.windows.changePosition(
              res.window.id,
              _left,
              _top,
              null
            );
            overwolf.windows.changeSize(
              res.window.id,
              _windowWidth,
              _windowHeight,
              null
            );
            location.href += '#!Home';
          } else if (page === 'sub') {
            overwolf.windows.changePosition(
              res.window.id,
              0,
              Math.round(_screenHeight - _subWindowHeight),
              null
            );
            overwolf.windows.changeSize(
              res.window.id,
              _subWindowWidth,
              _subWindowHeight,
              null
            );
            location.href += '#!SubHome';
          }
        });
      });
    }
  });
}
alert('I finished!');
