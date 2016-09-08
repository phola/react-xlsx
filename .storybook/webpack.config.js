var webpack = require('webpack');
module.exports = function(storybookBaseConfig, configType) {
  //this config is to get working in browserland commonJS

   storybookBaseConfig.plugins.push(new webpack.IgnorePlugin(/cptable/))
  storybookBaseConfig.plugins.push(new webpack.IgnorePlugin(/\b(ods)\b/))

    storybookBaseConfig.node = {
          fs: "empty"
      }
      storybookBaseConfig.externals = [
          {  "./cptable": "var cptable",  "./jszip": "jszip" }
      ]
  // Return the altered config
  return storybookBaseConfig;
};
