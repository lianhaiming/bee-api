module.exports = [
    [/movie\.douban\.com\/review\/best\/\?start=\d*/, 'lists'],
    [/movie\.douban\.com\/review\/best/, 'lists'],
    [/movie\.douban\.com\/review\/[\w\W]+/, 'detail'],
    [/movie\.douban\.com$/, 'lists'],
]