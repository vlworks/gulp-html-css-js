const config = require('../config')
const {src, dest} = require("gulp");

module.exports = function copyAssets() {
    return src(config.assetsSrcDir)
        .pipe(dest(config.outputAssetsDir))
}