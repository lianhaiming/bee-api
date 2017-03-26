'use strict'

module.exports = {
    sExistUrl() {
        return `SELECT count(*) from flower where url = ?`
    },
    sInsertFlower() {
        return `insert into flower(url, originalUrl, page, isRelate) values(?, ?, ?, ?)`
    }
}