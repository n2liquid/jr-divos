(() => {
  let appCtrl = { launch };

  document.currentScript.div.load.resolve(appCtrl);

  async function launch(...args) {
    let app = new FilesApp();
    await app.launch(...args);

    return app;
  }

  class FilesApp {
    constructor() {
      this.dir = {
        entries: [
          { name: 'hello.txt' },
          { name: 'world.jpg' },
        ],
      };
    }

    async launch(...args) {
      await div.scriptManager.loadStylesheet(
        `${appCtrl.appPath}/icons.css`,
      );

      await div.scriptManager.loadStylesheet(
        `${appCtrl.appPath}/styles.css`,
      );

      let wnd = this.wnd = jr(div.windowManager.create({
        args,
        title: 'Files',
      }));

      wnd.jr.scope.filesApp = this;

      wnd.classList.add('filesApp');

      let contentBoxEl =
        wnd.div.wm.stdHeader.getContentBoxEl();

      contentBoxEl.innerHTML = `
        <div class="filesApp_headerActions">
          <div class="btn-group">
            <button class="btn btn-default">
              <i class="icon icon-left"></i>
            </button>

            <button class="btn btn-default">
              <i class="icon icon-right"></i>
            </button>
          </div>

          <div class="btn-group">
            <button class="btn btn-default">
              <i class="icon icon-home"></i>
            </button>

            <button class="btn btn-default">
              <i class="icon icon-cw"></i>
            </button>
          </div>

          <div class="btn-group">
            <button class="btn btn-default">
              <i class="icon icon-layout"></i>
            </button>

            <button class="btn btn-default">
              <i class="icon icon-list"></i>
            </button>
          </div>
        </div>
      `;

      wnd.appendChild(jr.createElement(`
        <div class="window-content">
          <div class="pane-group">
            <div class="pane-sm sidebar">
              <div class="nav-group">
                <div class="nav-group-title">
                  Personal
                </div>

                <div class="nav-group-item active">
                  <i class="icon icon-home"></i>
                  Home
                </div>
              </div>

              <div class="nav-group">
                <div class="nav-group-title">
                  Devices
                </div>

                <div class="nav-group-item">
                  <i class="icon icon-drive"></i>
                  File system
                </div>
              </div>
            </div>

            <div class="pane">
              <div
                class="
                  filesApp_dirBrowser
                  filesApp_dirBrowser--grid
                "

                jr-list="for dirEntry of filesApp.dir.entries"
              >
                <button class="
                  filesApp_dirEntry
                  filesApp_dirEntry--grid
                ">
                  <div jr-class="
                    filesApp_dirEntry-icon

                    filesApp_dirEntry-icon--{{
                      dirEntry.name.split('.')[1]
                    }}
                  "></div>

                  <span
                    class="filesApp_dirEntry-name"
                    jr-textcontent.bind="dirEntry.name"
                  ></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      `));
    }
  }
})();