# bee-api
##爬虫小系统，用来收集信息。
1. bee-drone
* 雄蜂负责对爬取到的内容信息进行统一处理

2. bee-queen
* 蜂王负责分发flower任务
** 工蜂获取到的蜂蜜honey分发给雄蜂进行统一处理
** 工蜂获取到的花丛cluster分发给工蜂进行采集

3. bee-worker
* 工蜂负责对蜂王分发的任务飞到目的地进行蜂蜜采集，采集蜂蜜是可以花丛的地址带回

**cluster列表的数据结构**

{   
    listsUrl: [] // 列表
    ,tag: '' // 列表的种类，如前端，ios
    ,originalUrl: '' // 爬取列表的爬虫源
    ,isRelate: true // 是否是相关链接
    ,page: 1 // 分页处理
}

**honey内容的数据结构**
{
    title: '' // 内容标题
    ,subhead: '' // 内容副标题
    ,summary: '' // 内容摘要
    ,author: '' // 内容作者
    ,image: '' // 内容门面图
    ,content: '' // 内容
    ,date: '' // 内容日期
    ,originalUrl: '' // 内容源链接
    ,comments: [{
        author: '' // 评论人名字
        authorInfo: '' // 评论人介绍
        authorImg: '' // 评论人头像
        date: '' // 评论时间
        content: '' // 评论内容

    }] // 文章评论
} 

**flower数据结构**

{   
    cluster: {}
    ,honey: {} 
    ,extend: {}// 额外补充
}
###重构
**TODO:**
* MVC分层(完成)
* 异步方案由Promise变成co
* 添加pm2进程管理
* 添加日志（完成）
* 配置命令行参数处理对应的逻辑
