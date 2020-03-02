# 快速入门

[原文地址](http://blog.didispace.com/spring-boot-learning-21-1-1/)



## 编写单元测试用例

原文中使用了 `junit` 包的 `@RunWith` 、`@Before`  、`Test` 、 注解，这需要在 `pom.xml` 中提前引入才行。

``` xml
<dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <scope>test</scope>
</dependency>
```

![](http://markdown.yeek.top/20200225213200.png)



可以在 [github](https://github.com/dyc87112/SpringBoot-Learning/blob/master/2.1.x/chapter1-1/src/test/java/com/didispace/chapter11/Chapter11ApplicationTests.java) 上看到具体引用的包，避免引用错的包导致运行失败