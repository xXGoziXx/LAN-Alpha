/* You can add global scripts to this file */
//alert('I started...');
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
            overwolf.windows.changePosition(res.window.id, _left, _top, null);
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
function dragResize(edge) {
  overwolf.windows.getCurrentWindow(function(result) {
    if (result.status == 'success') {
      overwolf.windows.dragResize(result.window.id, edge);
    }
  });
}

function dragMove() {
  overwolf.windows.getCurrentWindow(function(result) {
    if (result.status == 'success') {
      overwolf.windows.dragMove(result.window.id);
      document.getElementById('content').style.cursor = 'move';
    }
  });
}

function cursorNormal() {
  document.getElementById('content').style.cursor = 'default';
}

function closeWindow() {
  overwolf.windows.getCurrentWindow(function(result) {
    if (result.status == 'success') {
      overwolf.windows.close(result.window.id);
    }
  });
}

function openSubWindow() {
  //alert("the subwindow will only be visible inside a game");
  overwolf.windows.obtainDeclaredWindow('SubWindow', function(result) {
    if (result.status == 'success') {
      overwolf.windows.restore(result.window.id, function(result) {
        console.log(result);
      });
    }
  });
}

function takeScreenshot() {
  overwolf.media.takeScreenshot(function(result) {
    if (result.status == 'success') {
      var img = document.getElementById('screenshot');
      img.src = result.url;
      img.onload = function() {
        overwolf.media.shareImage(img, 'Screen Shot');
      };
    }
  });
}

function runTeamSpeak() {
  overwolf.extensions.launch('lafgmhfbkjljkgoggomibmhlpijaofafbdhpjgif');
}

// this a subset of the features that LoL events provides - however,
// when writing an app that consumes events - it is best if you request
// only those features that you want to handle.
//
// NOTE: in the future we'll have a wildcard option to allow retreiving all
// features
var g_interestedInFeatures = [
  'summoner_info',
  'gameMode',
  'teams',
  'matchState',
  'spellsAndAbilities',
  'death',
  'kill',
  'assist',
  'minions',
  //'gold'
];

function setFeatures() {
  overwolf.games.events.setRequiredFeatures(g_interestedInFeatures, function(
    info
  ) {
    if (info.status == 'error') {
      //console.log("Could not set required features: " + info.reason);
      //console.log("Trying in 2 seconds");
      window.setTimeout(setFeatures, 2000);
      return;
    }

    console.log('Set required features:');
    console.log(JSON.stringify(info));
  });
}

function registerEvents() {
  // general events errors
  overwolf.games.events.onError.addListener(function(info) {
    console.log('Error: ' + JSON.stringify(info));
  });

  // "static" data changed (total kills, username, steam-id)
  // This will also be triggered the first time we register
  // for events and will contain all the current information
  overwolf.games.events.onInfoUpdates2.addListener(function(info) {
    console.log('Info UPDATE: ' + JSON.stringify(info));
  });

  // an event triggerd
  overwolf.games.events.onNewEvents.addListener(function(info) {
    console.log('EVENT FIRED: ' + JSON.stringify(info));
    //opens the SubWindow when the death event has occured
    if (info.events[0].name == 'death') {
      overwolf.windows.obtainDeclaredWindow('SubWindow', function(result) {
        if (result.status == 'success') {
          overwolf.windows.restore(result.window.id, function(result) {});
        }
      });
    }
  });

  // on hotkey pressed
  overwolf.settings.registerHotKey('disable_marquee', function(arg) {
    if (arg.status == 'success') {
      var x = document.getElementById('hotkey');
      if (x.style.display === 'none') {
        x.style.display = 'block';
      } else {
        x.style.display = 'none';
      }
    }
  });
}

function gameLaunched(gameInfoResult) {
  if (!gameInfoResult) {
    return false;
  }

  if (!gameInfoResult.gameInfo) {
    return false;
  }

  if (!gameInfoResult.runningChanged && !gameInfoResult.gameChanged) {
    return false;
  }

  if (!gameInfoResult.gameInfo.isRunning) {
    return false;
  }

  // NOTE: we divide by 10 to get the game class id without it's sequence number
  if (Math.floor(gameInfoResult.gameInfo.id / 10) != 5426) {
    return false;
  }

  console.log('LoL Launched');
  return true;
}

function gameRunning(gameInfo) {
  if (!gameInfo) {
    return false;
  }

  if (!gameInfo.isRunning) {
    return false;
  }

  // NOTE: we divide by 10 to get the game class id without it's sequence number
  if (Math.floor(gameInfo.id / 10) != 5426) {
    return false;
  }

  console.log('LoL Running');
  return true;
}

// Start here
overwolf.games.onGameInfoUpdated.addListener(function(res) {
  console.log('onGameInfoUpdated: ' + JSON.stringify(res));
  if (gameLaunched(res)) {
    registerEvents();
    setTimeout(setFeatures, 1000);
  }
});

overwolf.games.getRunningGameInfo(function(res) {
  if (gameRunning(res)) {
    registerEvents();
    setTimeout(setFeatures, 1000);
  }
  console.log('getRunningGameInfo: ' + JSON.stringify(res));
});

// alert('I finished!');
