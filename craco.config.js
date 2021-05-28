const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@body-background": "#1b1b1b",
              "@component-background": "#1b1b1b",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
