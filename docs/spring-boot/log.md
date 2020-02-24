# 日志设置

## 市面上的日志框架

`JUL`、`JCL`、`Jboss-logging`、`logback`、`log4j`、`log4j2`、`slf4j`....

| 日志门面 （日志的抽象层）                                    | 日志实现                                          |
| ------------------------------------------------------------ | ------------------------------------------------- |
| JCL（Jakarta Commons Logging **SLF4j（Simple Logging Facade for Java）** jboss-loggi | JUL（java.util.logging） Log4j Log4j2 **Logback** |

左边选一个门面（抽象层）、右边来选一个实现；

例：SLF4j-->Logback

?> SpringBoot选用 `SLF4j` 和 `logback`



## SLF4j 的使用

如何在系统中使用SLF4j ：[https://www.slf4j.org](https://www.slf4j.org/)

以后开发的时候，日志记录方法的调用，不应该来直接调用日志的实现类，而是调用日志抽象层里面的方法；

给系统里面导入slf4j的jar和 logback的实现jar

```java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class HelloWorld {
  public static void main(String[] args) {
    Logger logger = LoggerFactory.getLogger(HelloWorld.class);
    logger.info("Hello World");
  }
}
```



![](http://markdown.yeek.top/20200221180144.png)





## 遗留问题

项目中依赖的框架可能使用不同的日志：

Spring（commons-logging）、Hibernate（jboss-logging）、MyBatis、xxxx

当项目是使用多种日志API时，可以统一适配到SLF4J，中间使用SLF4J或者第三方提供的日志适配器适配到SLF4J，SLF4J在底层用开发者想用的一个日志框架来进行日志系统的实现，从而达到了多种日志的统一实现。

![](http://markdown.yeek.top/20200221194716.png)



### 如何让系统中所有的日志都统一到slf4j

1. 将系统中其他日志框架先排除出去；
2. 用中间包来替换原有的日志框架（适配器的类名和包名与替换的被日志框架一致）；
3. 我们导入slf4j其他的实现



总结：

1. Spring Boot 底层也是使用 slf4j + logback 的方式进行日志记录
2. Spring Boot 也把其他的日志都替换成了 slf4j
3. 替换中间包



!> 如果我们要引入其他框架，一定要把这个框架的默认日志依赖移除掉



Spring框架用的是commons-logging；

```xml
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-core</artifactId>
            <exclusions>
                <exclusion>
                    <groupId>commons-logging</groupId>
                    <artifactId>commons-logging</artifactId>
                </exclusion>
            </exclusions>
        </dependency>Copy to clipboardErrorCopied
```

**SpringBoot能自动适配所有的日志，而且底层使用slf4j+logback的方式记录日志，引入其他框架的时候，只需要把这个框架依赖的日志框架排除掉即可；**



## 默认配置

### 日志级别

由低到高，Spring Boot 默认是 `info` 级别 ，在控制台中只会输出 `info` 及以上级别的日志

```java
logger.trace("trace");  // 跟踪
logger.debug("debug");
logger.info("info");
logger.warn("warn");
logger.error("error");
```

可以在配置文件中设置级别

```properties
# 也可以指定一个包路径 logging.level.com.xxx=error
logging.level.root=error
```

```yaml
logging:
  level:
    root:
      trace

#logging:
#  level:
#    top.yeek.vue:
#      trace      
```



### 日志路径

`file.path` 

在当前路径下创建 `log` 目录存放日志文件，默认文件是 spring.log

```yaml
logging:
  file:
    path: log
```



### 日志格式

`pattern.console` / `file`

指定日志生成的格式

- `%d` 日期时间
- `%thread` 线程名
- `%-5level` 级别从左显示5个字符宽度
- `%logger{50}` 表示logger名字最长50个字符，否则按照句点分割
- `%msg` 日志消息
- `%n` 是换行符

```yaml
logging:
  pattern:
    console: %d{yyyy-MM-dd} [%thread] %-5level %logger{50} - %msg%n
    file: %d{yyyy-MM-dd} [%thread] %-5level %logger{50} - %msg%n
```



## 指定配置

给类路径下放上每个日志框架自己的配置文件即可； Spring Boot 就不使用他默认配置的了

| Logging System          | Customization                                                |
| ----------------------- | ------------------------------------------------------------ |
| Logback                 | `logback-spring.xml`, `logback-spring.groovy`, `logback.xml` or `logback.groovy` |
| Log4j2                  | `log4j2-spring.xml` or `log4j2.xml`                          |
| JDK (Java Util Logging) | `logging.properties`                                         |

`logback.xml`：日志框架直接识别

`logback-spring.xml`：日志框架就不直接加载日志的配置项，由 Spring Boot 解析日志配置，可以使用 Spring Boot 的高级Profile功能