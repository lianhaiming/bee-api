'use strict'

module.exports = {
    sExistUrl() {
        return `SELECT count(*) from flower where resourceUrl = ?`;
    }
}