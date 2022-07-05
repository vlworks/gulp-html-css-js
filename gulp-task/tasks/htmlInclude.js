const config = require('../config')
const browserSync = require('./serve')

const {src, dest} = require("gulp");
const fileInclude = require('gulp-file-include');

module.exports = function htmlHandler () {
    return src(config.srcHtmlGlob)
        .pipe(fileInclude({ prefix: '@@', basepath: '@file' }))
        .pipe(dest(config.outputDir))
        .pipe(browserSync.reload({ stream: true }));
}