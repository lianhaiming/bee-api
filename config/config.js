module.exports = {
    beeDB: {
        appId: 'hnYqt9CslgkMahPpggTCSqym-gzGzoHsz',
        appKey: 'Xi26W6xQKQMJmndUd2e6OU5f',
    },
    beeTestDB: {
        appId: '7cJ55lgvs2dtGXVFNer8FBC7-gzGzoHsz',
        appKey: 'iuSaVf4EWIfibgzxt2iG45QL',
    },
    beeResourceUrls: [
        'http://daily.zhihu.com',
        'https://movie.douban.com'
    ],
    beeWorkerPath: 'beeservices/bee-worker',
    beeCrawIntervalTime: 20,
    beeReCrawTime: 3,
    beeApi: {
        lists: 'https://api.leancloud.cn/1.1/cloudQuery?cql=select * from honey limit 0,20 order by pubUser'
    }
}