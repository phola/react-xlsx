var webpack = require('webpack');
module.exports = function(storybookBaseConfig, configType) {
  //this config is to get working in browserland commonJS
  console.log(storybookBaseConfig)
   storybookBaseConfig.plugins.push(new webpack.IgnorePlugin(/cptable/))
  storybookBaseConfig.plugins.push(new webpack.IgnorePlugin(/\b(ods)\b/))

    storybookBaseConfig.node = {
          fs: "empty"
      }
      storybookBaseConfig.externals = [
          {  "./cptable": "var cptable",  "./jszip": "jszip" }
      ]

 //      storybookBaseConfig.output = {
 //   path: 'dist',
 //   filename: 'index.js'
 // }

//  storybookBaseConfig.externals = {
//   'react': 'commonjs react',
//   'react-dom' : 'commonjs react-dom'
// }
  // Return the altered config
  return storybookBaseConfig;
};
