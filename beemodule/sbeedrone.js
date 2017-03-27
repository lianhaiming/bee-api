'use strict'

module.exports = {
    sExistHoneyByUrl() {
        return `SELECT count(*) from honey where originalUrl = ?`
    },
    sInsertHoney() {
        return `insert into honey(originalUrl, title ,subhead ,summary ,author ,image ,content ,date, tag ,commentsm, bio) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    }
}