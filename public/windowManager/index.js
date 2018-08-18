div.windowManager = module.exports = exports = {
  lastZIndex: 0,

  Resizable: require('resizable'),

  update() {
    for (let wnd of jr.find('.window')) {
      wnd.div = wnd.div || {};
      wnd.div.wm = wnd.div.wm || {};

      if (wnd.div.wm.dragCtrl) {
        continue;
      }

      wnd.div.wm.resizableCtrl = new exports.Resizable(wnd, {
        draggable: {
          handle: jr(wnd).jr.findFirst('.window-handle'),
        },
      });
    }
  },
};

document.addEventListener('mousedown', ev => {
  let wnd = ev.target.closest('.window');

  if (!wnd) {
    return;
  }

  if (
    !wnd.style.zIndex ||
    Number(wnd.style.zIndex) < exports.lastZIndex
  ) {
    wnd.style.zIndex = ++exports.lastZIndex;
  }
});
