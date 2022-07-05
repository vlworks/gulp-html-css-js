const config = require('./gulp-task/config')

const { series, watch, } = require('gulp');

const {
    clean,
    copyAssets,
    htmlInclude,
} = require("./gulp-task/tasks")

function watcher() {
    watch(config.srcWatchHtml, htmlInclude)
}

exports.html = series(clean, copyAssets, htmlInclude);
exports.dev = series(clean, copyAssets, htmlInclude, watcher)