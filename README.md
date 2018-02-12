# bee-api
## 爬虫系统，用来收集网络信息
爬虫根据配置的url地址爬取对应页面的数据

## 项目结构实现功能
**bee-queen(蜂王)**

- 将蜂蜜分发给雄蜂处理
- 将花丛分发给工蜂采集

**bee-worker(工蜂)**

*工蜂的职责是到指定花丛地点采集蜂蜜和收集花丛信息*

**bee-drone(雄蜂)**

*雄蜂的职责是对工蜂采集到的蜂蜜和花丛进行处理*

## 开发环境
* node

## 安装依赖包并启动项目
```
npm install && npm start
```
## 支持命令行定向爬取url

如爬取*http://daily.zhihu.com/story/9300775*

```
npm start -u http://daily.zhihu.com/story/9300775
```

## 数据结构（资讯类的数据）
**cluster**
```
{   
    listsUrl: [] // 列表
    ,originalUrl: '' // 爬取列表的爬虫源
    ,isRelate: true // 是否是相关链接
    ,page: 1 // 分页处理
}
```
**honey**
```
{
    title: '' // 内容标题
    ,subTitle: '' // 内容副标题
    ,summary: '' // 内容摘要
    ,author: '' // 内容作者
    ,image: '' // 内容baner图
    ,content: '' // 内容
    ,date: '' // 内容日期
    ,originalUrl: '' // 内容源链接
    ,tag: [], //内容类型，如篮球类的信息
    ,comments: [{
        author: '' // 评论人名字
        ,authorInfo: '' // 评论人介绍
        ,authorImg: '' // 评论人头像
        ,date: '' // 评论时间
        ,content: '' // 评论内容
    }] // 文章评论
} 
```
**flower**
```
{   
    ,cluster: {}
    ,honey: {} 
    ,extend: {}// 额外补充
}
```
