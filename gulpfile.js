const { series, src, dest, parallel, watch} = require('gulp');
const fileInclude = require("gulp-file-include");
const del = require("del");
const rename = require("gulp-rename");
const sass = require('gulp-sass')(require('sass'));
const webpack = require('webpack-stream')
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');

const config = {
    outputDir: './dist',
    outputAssetsDir: './dist/assets',
    srcAssetsGlob: ['./src/assets/**/*'],
    srcHtmlGlob: ['./src/**/*.html', '!./src/**/html-parts/*'],
    watchHtmlGlob: ['./src/**/*.html'],
    srcStyleGlob: ['./src/style/style.scss'],
    watchStyleGlob: ['./src/style/**/*.scss'],
    srcScriptGlob: ['./src/script/script.js'],
    watchScriptGlob: ['./src/script/**/*.js'],
}

function clean() {
    return del(config.outputDir)
}

function copyAssets() {
    return src(config.srcAssetsGlob)
        .pipe(dest(config.outputAssetsDir))
}

function htmlHandler () {
    return src(config.srcHtmlGlob)
        .pipe(fileInclude({ prefix: '@@', basepath: '@file' }))
        .pipe(dest(config.outputDir))
        .pipe(browserSync.stream())
}

function style() {
    return src(config.srcStyleGlob)
        .pipe(sass().on('error', sass.logError))
        .pipe(rename('style.min.css'))
        .pipe(dest(config.outputDir))
        .pipe(browserSync.stream())
}

function script() {
    return src(config.srcScriptGlob)
        .pipe(webpack({
            mode: 'development',
            devtool: 'inline-source-map',
            module: {
                rules: [
                    {
                        test: /\.m?js$/,
                        exclude: /(node_modules|bower_components)/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: ['@babel/preset-env']
                            }
                        }
                    }
                ]
            },

        }))
        .pipe(rename('script.min.js'))
        .pipe(sourcemaps.write())
        .pipe(dest(config.outputDir))
        .pipe(browserSync.stream())
}

function watcher() {
    browserSync.init({
        server: config.outputDir
    })

    watch(config.watchStyleGlob, style)
    watch(config.watchScriptGlob, script)
    watch(config.watchHtmlGlob, htmlHandler)
    watch(config.srcAssetsGlob, series(clean, copyAssets)).on('change', browserSync.reload)
}

exports.dev = series(clean, copyAssets, style, script, htmlHandler, watcher)