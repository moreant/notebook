# MongoDB是什么

`mongodb` 是一个典型的 `NoSQL`（非关系型数据库），与 `SQL` 数据库对比如下

| SQL术语/概念 | MongoDB术语/概念 | 解释/说明                           |
| :----------- | :--------------- | :---------------------------------- |
| database     | database         | 数据库                              |
| table        | collection       | 数据库表/集合                       |
| row          | document         | 数据记录行/文档                     |
| column       | field            | 数据字段/域                         |
| index        | index            | 索引                                |
| table joins  |                  | 表连接,MongoDB不支持                |
| primary key  | primary key      | 主键,MongoDB自动将_id字段设置为主键 |

通过下图实例，我们也可以更直观的了解Mongo中的一些概念：

![img](https://www.runoob.com/wp-content/uploads/2013/10/Figure-1-Mapping-Table-to-Collection-1.png)

摘自 [菜鸟教程](https://www.runoob.com/mongodb/mongodb-databases-documents-collections.html)



我学习 `MongoDB` 是因为想尝试 `NoSQL` ，并且集合的形势很像 `Json` 。