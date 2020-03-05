# 基本操作

## 数据库

#### 查看所有数据库

默认会有三个数据库和一个隐藏的数据库 `test`。

```
> show dbs
admin   0.000GB
config  0.000GB
local   0.000GB
```

`admin` :  “root” 数据库。将用户添加到数据库，用户会自动继承**所有**数据库的权限

`config` : 保存分片的相关信息 (集群)

`local` : 存储本地单台服务器的任意集合

#### 当前使用的数据库

```
> db
test
```

#### 切换数据库

如果数据库不存在会 **自动创建** 。切换 `hello` 数据库

```
> use hello
switched to db hello
```

#### 删除数据库 

```
> db.dropDatabase()
{ "ok" : 1 }
```

## 集合

#### 创建集合

创建一个 `world` 集合，如果插入文档的时候不存在改集合，则**自动创建**该集合

```
> db.createCollection("world")
{ "ok" : 1 }
```

#### 显示集合

有两种方法

```
> show collections
或
> show tables
world
```

#### 删除集合

成功会返回 true，失败会返回 false

```
> db.world.drop()
true / false
```

