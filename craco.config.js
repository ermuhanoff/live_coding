const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@body-background": "#303030",
              "@component-background": "#303030",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
