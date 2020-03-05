# 进阶查询

先插入一段数据

```
db.comment.insertMany([    {"_id":"1","articleid":"100001","content":"我们不应该把清晨浪费在手机上，健康很重要，一杯温水幸福你我 他。","userid":"1002","nickname":"相忘于江湖","createdatetime":new Date("2019-0805T22:08:15.522Z"),"likenum":NumberInt(1000),"state":"1"},    {"_id":"2","articleid":"100001","content":"我夏天空腹喝凉开水，冬天喝温开水","userid":"1005","nickname":"伊人憔 悴","createdatetime":new Date("2019-08-05T23:58:51.485Z"),"likenum":NumberInt(888),"state":"1"},    {"_id":"3","articleid":"100001","content":"我一直喝凉开水，冬天夏天都喝。","userid":"1004","nickname":"杰克船 长","createdatetime":new Date("2019-08-06T01:05:06.321Z"),"likenum":NumberInt(666),"state":"1"},    {"_id":"4","articleid":"100001","content":"专家说不能空腹吃饭，影响健康。","userid":"1003","nickname":"凯 撒","createdatetime":new Date("2019-08-06T08:18:35.288Z"),"likenum":NumberInt(2000),"state":"1"},    {"_id":"5","articleid":"100001","content":"研究表明，刚烧开的水千万不能喝，因为烫 嘴。","userid":"1003","nickname":"凯撒","createdatetime":new Date("2019-0806T11:01:02.521Z"),"likenum":NumberInt(3000),"state":"1"}])
```



## 计数 Count

基础

```
db.comment.count()
===>
5
```

条件

```
 db.comment.count({userid:"1003"})
 ===>
 2
```







## 限制 Limit

指定查询2条记录

```
> db.comment.find().pretty().limit(2)
{
        "_id" : "1",
        "articleid" : "100001",
        "content" : "我们不应该把清晨浪费在手机上，健康很重要，一杯温水幸福你我 他。",
        "userid" : "1002",
        "nickname" : "相忘于江湖",
        "createdatetime" : ISODate("1970-01-01T00:00:00Z"),
        "likenum" : 1000,
        "state" : "1"
}
{
        "_id" : "2",
        "articleid" : "100001",
        "content" : "我夏天空腹喝凉开水，冬天喝温开水",
        "userid" : "1005",
        "nickname" : "伊人憔 悴",
        "createdatetime" : ISODate("2019-08-05T23:58:51.485Z"),
        "likenum" : 888,
        "state" : "1"
}
```



## 跳跃 Skip

跳过前三条，显示两条

```
> db.comment.find().pretty().limit(2).skip(3)
{
        "_id" : "4",
        "articleid" : "100001",
        "content" : "专家说不能空腹吃饭，影响健康。",
        "userid" : "1003",
        "nickname" : "凯 撒",
        "createdatetime" : ISODate("2019-08-06T08:18:35.288Z"),
        "likenum" : 2000,
        "state" : "1"
}
{
        "_id" : "5",
        "articleid" : "100001",
        "content" : "研究表明，刚烧开的水千万不能喝，因为烫 嘴。",
        "userid" : "1003",
        "nickname" : "凯撒",
        "createdatetime" : ISODate("1970-01-01T00:00:00Z"),
        "likenum" : 3000,
        "state" : "1"
}
```



## 分页

skip 和 limit 结合可以实现分页，

```
// 第 1-2 条
> db.comment.find().pretty().limit(2).skip()
// 第 3-4 条
> db.comment.find().pretty().limit(2).skip(3)
```



## 排序 Sort

 1 为升序排列，而 -1 是用于降序排列。

```
> db.comment.find().pretty().sort({_id:-1}).limit(2).skip(3)
{
        "_id" : "2",
        "articleid" : "100001",
        "content" : "我夏天空腹喝凉开水，冬天喝温开水",
        "userid" : "1005",
        "nickname" : "伊人憔 悴",
        "createdatetime" : ISODate("2019-08-05T23:58:51.485Z"),
        "likenum" : 888,
        "state" : "1"
}
{
        "_id" : "1",
        "articleid" : "100001",
        "content" : "我们不应该把清晨浪费在手机上，健康很重要，一杯温水幸福你我 他。",
        "userid" : "1002",
        "nickname" : "相忘于江湖",
        "createdatetime" : ISODate("1970-01-01T00:00:00Z"),
        "likenum" : 1000,
        "state" : "1"
}
```



skip(), limilt(), sort()三个放在一起执行的时候，执行的顺序是**先 sort(), 然后是 skip()，最后是显示的 limit()。**



## 包含 $in

查询 `userid` 中包含 `1004` 和 `1002` 的文档

```
> db.comment.find({userid:{$in:["1004","1002"]}}).pretty()
{
        "_id" : "1",
        "articleid" : "100001",
        "content" : "我们不应该把清晨浪费在手机上，健康很重要，一杯温水幸福你我 他。",
        "userid" : "1002",
        "nickname" : "相忘于江湖",
        "createdatetime" : ISODate("1970-01-01T00:00:00Z"),
        "likenum" : 1000,
        "state" : "1"
}
{
        "_id" : "3",
        "articleid" : "100001",
        "content" : "我一直喝凉开水，冬天夏天都喝。",
        "userid" : "1004",
        "nickname" : "杰克船 长",
        "createdatetime" : ISODate("2019-08-06T01:05:06.321Z"),
        "likenum" : 666,
        "state" : "1"
}
```

