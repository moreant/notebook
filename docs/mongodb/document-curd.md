

# 文档的 CRUD

## 小知识

清屏大师 `cls`

插入会自动添加**主键**，也就是 `_id`。当然是可以手动指定的



## 插入

### 基本插入

可以使用 insert 和 save。如果不存在 world 集合，会自动创建。

```
> db.world.insert({"name":"hello!","text":"Hello MongoDB","time":new Date()})
WriteResult({ "nInserted" : 1 })
```

### 批量插入

使用 `json` 格式。插入后是 `bson` 格式（二进制的 `json`）

```
> db.comment.insertMany([    {"_id":"1","articleid":"100001","content":"我们不应该把清晨浪费在手机上，健康很重要，一杯温水幸福你我 他。","userid":"1002","nickname":"相忘于江湖","createdatetime":new Date("2019-0805T22:08:15.522Z"),"likenum":NumberInt(1000),"state":"1"},    {"_id":"2","articleid":"100001","content":"我夏天空腹喝凉开水，冬天喝温开水","userid":"1005","nickname":"伊人憔 悴","createdatetime":new Date("2019-08-05T23:58:51.485Z"),"likenum":NumberInt(888),"state":"1"},    {"_id":"3","articleid":"100001","content":"我一直喝凉开水，冬天夏天都喝。","userid":"1004","nickname":"杰克船 长","createdatetime":new Date("2019-08-06T01:05:06.321Z"),"likenum":NumberInt(666),"state":"1"},    {"_id":"4","articleid":"100001","content":"专家说不能空腹吃饭，影响健康。","userid":"1003","nickname":"凯 撒","createdatetime":new Date("2019-08-06T08:18:35.288Z"),"likenum":NumberInt(2000),"state":"1"},    {"_id":"5","articleid":"100001","content":"研究表明，刚烧开的水千万不能喝，因为烫 嘴。","userid":"1003","nickname":"凯撒","createdatetime":new Date("2019-0806T11:01:02.521Z"),"likenum":NumberInt(3000),"state":"1"}])
```

结果如下

```
{
        "acknowledged" : true,
        "insertedIds" : [
                "1",
                "2",
                "3",
                "4",
                "5"
        ]
}
```



### 使用 try catch 进行异常捕捉

```
> try{
db.comment.insertMany([    {"_id":"1","articleid":"100001","content":"我们不应该把清晨浪费在手机上，健康很重要，一杯温水幸福你我 他。","userid":"1002","nickname":"相忘于江湖","createdatetime":new Date("2019-0805T22:08:15.522Z"),"likenum":NumberInt(1000),"state":"1"},    {"_id":"2","articleid":"100001","content":"我夏天空腹喝凉开水，冬天喝温开水","userid":"1005","nickname":"伊人憔 悴","createdatetime":new Date("2019-08-05T23:58:51.485Z"),"likenum":NumberInt(888),"state":"1"},    {"_id":"3","articleid":"100001","content":"我一直喝凉开水，冬天夏天都喝。","userid":"1004","nickname":"杰克船 长","createdatetime":new Date("2019-08-06T01:05:06.321Z"),"likenum":NumberInt(666),"state":"1"},    {"_id":"4","articleid":"100001","content":"专家说不能空腹吃饭，影响健康。","userid":"1003","nickname":"凯 撒","createdatetime":new Date("2019-08-06T08:18:35.288Z"),"likenum":NumberInt(2000),"state":"1"},    {"_id":"5","articleid":"100001","content":"研究表明，刚烧开的水千万不能喝，因为烫 嘴。","userid":"1003","nickname":"凯撒","createdatetime":new Date("2019-0806T11:01:02.521Z"),"likenum":NumberInt(3000),"state":"1"}])
} catch (e) {
  print(e)
}
```

输出略

## 查询

### 基本查询

```
> db.comment.find()
{ "_id" : "1", "articleid" : "100001", "content" : "我们不应该把清晨浪费在手机上，健康很重要，一杯温水幸福你我 他。", "userid" : "1002", "nickname" : "相忘于江湖", "createdatetime" : ISODate("1970-01-01T00:00:00Z"), "likenum" : 1000, "state" : "1" }
{ "_id" : "2", "articleid" : "100001", "content" : "我夏天空腹喝凉开水，冬天喝温开水", "userid" : "1005", "nickname" : "伊人憔 悴", "createdatetime" : ISODate("2019-08-05T23:58:51.485Z"), "likenum" : 888, "state" : "1" }
{ "_id" : "3", "articleid" : "100001", "content" : "我一直喝凉开水，冬天夏天都喝。", "userid" : "1004", "nickname" : "杰克船 长", "createdatetime" : ISODate("2019-08-06T01:05:06.321Z"), "likenum" : 666, "state" : "1" }
{ "_id" : "4", "articleid" : "100001", "content" : "专家说不能空腹吃饭，影响健康。", "userid" : "1003", "nickname" : "凯 撒", "createdatetime" : ISODate("2019-08-06T08:18:35.288Z"), "likenum" : 2000, "state" : "1" }
{ "_id" : "5", "articleid" : "100001", "content" : "研究表明，刚烧开的水千万不能喝，因为烫 嘴。", "userid" : "1003", "nickname" : "凯撒", "createdatetime" : ISODate("1970-01-01T00:00:00Z"), "likenum" : 3000, "state" : "1" }
```

### 格式化返回的结果

加入 .pretty() 可以格式化所有的文档

```
> db.comment.find().pretty()
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

### 指定查询条件

```
> db.comment.find({userid:"1003"}).pretty()
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

### 模糊查找

使用正则表达式进行模糊查找，查找正文中含有 `“我”` 字的文档

```
> db.comment.find({content:/我/}).pretty())
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

### 只返回第一条数据

```
> db.comment.findOne({userid:"1003"})
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
```

### 投影查询

只展示部分数据，`_id` 默认显示

```
> db.comment.find({userid:"1003"},{content:1,nickname:1})
{ "_id" : "4", "content" : "专家说不能空腹吃饭，影响健康。", "nickname" : "凯 撒" }
{ "_id" : "5", "content" : "研究表明，刚烧开的水千万不能喝，因为烫 嘴。", "nickname" : "凯撒" }
```

排除部分数据

```
> db.comment.find({userid:"1003"},{content:0,nickname:0}).pretty()
{
        "_id" : "4",
        "articleid" : "100001",
        "userid" : "1003",
        "createdatetime" : ISODate("2019-08-06T08:18:35.288Z"),
        "likenum" : 2000,
        "state" : "1"
}
{
        "_id" : "5",
        "articleid" : "100001",
        "userid" : "1003",
        "createdatetime" : ISODate("1970-01-01T00:00:00Z"),
        "likenum" : 3000,
        "state" : "1"
}
```

**显示** 和 **排除** 不可用 **混用** 

```
> db.comment.find({userid:"1003"},{content:1,nickname:0}).pretty()
Error: error: {
        "ok" : 0,
        "errmsg" : "Projection cannot have a mix of inclusion and exclusion.",
        "code" : 2,
        "codeName" : "BadValue"
}
```

除了 `_id` 

```
> db.comment.find({userid:"1003"},{_id:0,nickname:1})
{ "nickname" : "凯 撒" }
{ "nickname" : "凯撒" }
```

若不想指定查询条件参数 `query` 可以 用 `{}` 代替，但是需要指定 `projection` 参数：

```
querydb.collection.find({}, {title: 1})
```



### OR条件 $or

默认是 AND 条件，可以使用 `$or` 关键字指定 `OR条件` 。下面是查询 `_id` 值为 `“5”` 或者 `userid` 为 `1004` 的文档

```
> db.comment.find({$or:[{_id:"5"},{userid:"1004"}]}).pretty()
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





### MongoDB 与 RDBMS Where 语句比较

> 此节来自 [菜鸟教程](https://www.runoob.com/mongodb/mongodb-query.html)

如果你熟悉常规的 SQL 数据，通过下表可以更好的理解 MongoDB 的条件语句查询：

| 操作       | 范例                        | RDBMS中的类似语句       |
| :--------- | :-------------------------- | :---------------------- |
| 等于       | `find({"by":"菜鸟教程"})`   | `where by = '菜鸟教程'` |
| 小于       | `find({"likes":{$lt:50}})`  | `where likes < 50`      |
| 小于或等于 | `find({"likes":{$lte:50}})` | `where likes <= 50`     |
| 大于       | `find({"likes":{$gt:50}})`  | `where likes > 50`      |
| 大于或等于 | `find({"likes":{$gte:50}})` | `where likes >= 50`     |
| 不等于     | `find({"likes":{$ne:50}})`  | `where likes != 50`     |

eg: 指定查询 `_id` 小于或等于 `“3”` ，并且 `_id` 值为 `“2”` 或者 `userid` 值大于`“1002”` 小于等于 `“1004”` 的文档

```
> db.comment.find({_id:{$lte:"3"},$or:[{_id:"2"},{userid:{$gt:"1002",$lte:"1004"}}]}).pretty()
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





## 更新

### 覆盖更新

将查询到的文档全部替，去掉其他字段。

执行以下语句，会将含有 `"name":"hello!"` 的字段替换成 `{text:"hai"}`

```
db.world.update({name:"hello!"},{text:"hai"})
===>
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
```

### 更新单个

```
db.world.update({name:"hello!"},{$set:{text:"hai"}})
===>
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
```

### 批量更新

MongoDB 默认只会修改第一条数据，可以指定 multi 全部更新。

```
db.world.update({text:"hai"},{$set:{text:"Hello"}},{multi:true})
===>
WriteResult({ "nMatched" : 3, "nUpserted" : 0, "nModified" : 3 })
```

### 3.2版新增方法

可以使用

- db.collection.updateOne() 向指定集合更新单个文档
- db.collection.updateMany() 向指定集合更新多个文档

### 更新或添加

如果查询不到 `text:"hai"` ，则插入这一段

```
db.world.update({text:"hai"},{$set:{text:"Hello"}},{upsert:true})
```

可以省略参数，

**批量更新** eg:

```
db.world.update({text:"hai"},{$set:{text:"Hello"}},false,true)
```

**全部添加** eg:

```
db.world.update({text:"hai"},{$set:{text:"Hello"}},true,true)
```



### 列值增长

先插入一个点赞数

```
db.world.insert({"likenum":100})
===>
WriteResult({ "nInserted" : 1 })
```

让 `likenum` 自增 1

```
db.world.update({likenum:100},{$inc:{likenum:1}})
===>
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
```

## 删除

按条件删除

```
db.world.remove({likenum:101})
===>
WriteResult({ "nRemoved" : 1 })
```

**删库**

```
db.world.remove({})
===>
WriteResult({ "nRemoved" : 4 })
```

### 推荐的删除

remove() 方法已经过时了，现在官方推荐使用 deleteOne() 和 deleteMany() 方法。

如删除集合下全部文档：

```
db.inventory.deleteMany({})
```

删除 status 等于 A 的全部文档：

```
db.inventory.deleteMany({ status : "A" })
```

删除 status 等于 D 的一个文档：

```
db.inventory.deleteOne( { status: "D" } )
```

### 释放空间

remove() 方法 并不会真正释放空间。

需要继续执行 db.repairDatabase() 来回收磁盘空间。

```
> db.repairDatabase()
或者
> db.runCommand({ repairDatabase: 1 })
```