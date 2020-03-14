# Lombok

Lombok是一个Java库，能自动插入编辑器并构建工具，简化Java开发。通过添加注解的方式，不需要为类编写getter或eques方法，同时可以自动化日志变量。

[了解更多](https://blog.csdn.net/ThinkWon/article/details/101392808)



使用原生 getter

```java
@Component
@ConfigurationProperties(prefix = "top.yeek")
public class FooProperties {

    private String foo;

    @Override
    public String toString() {
        return "FooProperties{" +
                "foo='" + foo + '\'' +
                '}';
    }

    public String getFoo() {
        return foo;
    }

    public void setFoo(String foo) {
        this.foo = foo;
    }
}
```



使用 `@Data` 注解

```java
@Data
@Component
@ConfigurationProperties(prefix = "com.didispace")
public class FooProperties {
    private String foo;
}
```



## 添加 Lombok 依赖

在 `pom.xml` 上添加依赖

```xml
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
</dependency>
```



## IDEA 设置

添加插件

![](http://markdown.yeek.top/20200225234617.png)



打开注解处理

![](http://markdown.yeek.top/20200226182534.png)

