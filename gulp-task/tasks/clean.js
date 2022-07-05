const config = require("../config")

const del = require("del");

module.exports = function clean() {
    return del(config.outputDir)
}