let promises = require('./helper/promises');

div.launcher = exports;
let pvt = {};

pvt.isOpen = false;
pvt.openingProcedures = 0;

Object.defineProperty(exports, 'isOpen', {
  get: () => pvt.isOpen,

  set: val => {
    pvt.isOpen = val;

    (async () => {
      if (!val) {
        return;
      }

      ++pvt.openingProcedures;

      try {
        exports.makeActive(exports.results[0]);

        await promises.nextFrame();
        exports.findSearchFormInputEl().focus();

        await promises.clickOutside(exports.findEl());

        if (pvt.openingProcedures > 1) {
          return;
        }

        exports.close();
      }
      finally {
        --pvt.openingProcedures;
      }
    })()
    .catch(err => console.error(err));
  },
});

exports.findEl = () => jr.findFirst('.launcher');

exports.findSearchFormInputEl =
  () => jr.findFirst('.launcher-searchFormInput');

exports.open = () => {
  if (exports.isOpen) {
    return;
  }

  exports.isOpen = true;
  jr.update();
};

exports.close = () => {
  if (!exports.isOpen) {
    return;
  }

  exports.isOpen = false;
  jr.update();
};

exports.toggle = () => {
  exports.isOpen = !exports.isOpen;
  jr.update();
};

exports.results = [
  {
    name: 'Hello SVG',
    iconSrc: 'apps/helloSvg/icon.svg',
    appPath: 'apps/helloSvg',
    appArgs: ['World'],
  },

  {
    name: 'Terminal Emulator',
    iconSrc: 'apps/term/icon.svg',
    appPath: 'apps/term',
  },

  {
    name: 'Files',
    iconSrc: 'apps/files/icon.svg',
    appPath: 'apps/files',
  },

  {
    name: 'Metal Web Browser',
    iconSrc: 'apps/metal/icon.svg',
    appPath: 'apps/metal',
  },
];

exports.makeActive = result => {
  for (let another of exports.results) {
    another.isActive = another === result;
  }

  jr.update();
};

exports.selectResult = async result => {
  try {
    exports.close();

    await div.apps.launch(
      result.appPath, ...result.appArgs || [],
    );
  }
  catch (err) {
    console.error(err);
  }
};
