const config = require('../config');
const browserSync = require('browser-sync');

browserSync.init({
    server: config.outputDir
})
module.exports = browserSync