# 配置文件

Spring Boot 使用一个全局的配置文件，配置文件名`application`是固定的；

- application.properties
- application.yml
- application.yaml

配置文件的作用：修改 Spring Boot 自动配置的默认值



## - YAML

 YAML：**以数据为中心**，比 json、xml等更适合做配置文件



### - 语法

以 `空格` 的缩进来控制层级关系；只要是左对齐的一列数据，都是同一个层级的

次等级的前面是空格，不能使用制表符(tab)

冒号之后如果有值，那么冒号和值之间至少有一个空格，不能紧贴着



### - 字面量：普通的值

`k: v`

普通的值可以是数字、字符串、布尔

字符串默认不用加上单引号或者双引号；

` "" `：双引号；不会转义字符串里面的特殊字符；特殊字符会作为本身想表示的意思

**eg**:

``` yaml
name: "zhangsan \n lisi"
```

**输出：**

```
zhangsan
lisi
```

` '' `：单引号；会转义特殊字符，特殊字符最终只是一个普通的字符串数据

**eg:**

``` yaml
name: 'zhangsan \n lisi'
```

**输出：**

```
zhangsan \n lisi
```



### - 对象、Map （属性和值）

`k: v`在下一行来写对象的属性和值的关系；注意缩进

**eg:**

``` yaml
person:
  name: 张三
  gender: 男
  age: 22
```

**行内写法：**

``` yaml
person: {name: 张三,gender: 男,age: 22}
```



## - 配置文件注入

在 `pron.xml` 文件中加入

``` xml
        <!--导入配置文件处理器，配置文件进行绑定就会有提示-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-configuration-processor</artifactId>
            <optional>true</optional>
        </dependency>
```



在包下新建 `bean.Preson.class` 用于测试 内容如下

::: details 点击查看代码

``` java
package top.yeek.vue.bean;

import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;
import java.util.Map;

// 在容器内
@Component
public class Person {

    private String name;
    private Integer age;
    private Boolean boos;
    private Date birth;

    private Map<String,Object> maps;
    private List<Object> lists;

    private Dog dog;

    @Override
    public String toString() {
        return "Person{" +
                "name='" + name + '\'' +
                ", age=" + age +
                ", boos=" + boos +
                ", birth=" + birth +
                ", maps=" + maps +
                ", lists=" + lists +
                ", dog=" + dog +
                '}';
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public Boolean getBoos() {
        return boos;
    }

    public void setBoos(Boolean boos) {
        this.boos = boos;
    }

    public Date getBirth() {
        return birth;
    }

    public void setBirth(Date birth) {
        this.birth = birth;
    }

    public Map<String, Object> getMaps() {
        return maps;
    }

    public void setMaps(Map<String, Object> maps) {
        this.maps = maps;
    }

    public List<Object> getLists() {
        return lists;
    }

    public void setLists(List<Object> lists) {
        this.lists = lists;
    }

    public Dog getDog() {
        return dog;
    }

    public void setDog(Dog dog) {
        this.dog = dog;
    }
}
```

:::



新建 `application.yml` ，存放配置信息

``` yaml
person:
  name: 张三
  age: 20
  boos: false
  birth: 2000/1/14
  maps: {k1: 2,k3: 3}
  lists:
    - abc
    - cba
    - bac
  dog:
    name: d
    age: 3
```



或者可以存放在 `application.properties` 中

``` properties
person.name=张柳
person.age=20
person.boos=false
person.birth=2000/1/14
person.maps.k1=2
person.maps.k2=4
person.lists=abc,cba,bac
person.dog.name=d
person.dog.age=3
```



## - @ConfigurationProperties 获取全局配置



一一对应的批量注入配置文件中的属性， prefix 指定了配置的前缀

**eg: 读取 person 下的配置**

``` java
@ConfigurationProperties(prefix = "person")
public class Person {
    // something
}
```



进入 /src/test/java/包名 的 `ApplicationTests.class` ，这是 Spring Boot 的单元测试文件

新版的 Spring Boot 不用指定 Runwith 也可以运行。代码如下

``` java
package top.yeek.vue;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import top.yeek.vue.bean.Person;

//@Runwith 新版可以不用
@SpringBootTest
class VueApplicationTests {

    // 自动装配 https://www.cnblogs.com/fnlingnzb-learner/p/9723834.html
    @Autowired
    Person person;

    @Test
    void contextLoads() {
        System.out.println(person.toString());
    }

}
```



### - 解决乱码问题

在设置中搜索 `file encodings` 统统设置成 `UTF-8`

![](http://markdown.yeek.top/20200213012733.png)



::: warning  

需要 **重新新建** `application.properties` 文件，否则还是乱码

:::



##  - @value 获取配置

配置文件值注入有两种方式，一个是Spring Boot的`@ConfigurationProperties`注解，另一个是spring原先的`@value`注解



### - 读取配置文件中的值

``` java
@Value("${person.name}")
private String name;
```

### - 运算值

``` java
@Value("#{11*3}")
private Integer age;
```



### - 区别

|                      | @ConfigurationProperties | @Value     |
| -------------------- | ------------------------ | ---------- |
| 功能                 | 批量注入配置文件中的属性 | 一个个指定 |
| 松散绑定（松散语法） | 支持                     | 不支持     |
| SpEL                 | 不支持                   | 支持       |
| JSR303数据校验       | 支持                     | 不支持     |
| 复杂类型封装         | 支持                     | 不支持     |

> SpEL: 形如 #{11*3}
>
> JSR303数据校验: @Validated



## - @PropertySource

用于加载指定的 propertise 配置文件，默认不支持 yml

> [关于@PropertySource注解对于yml的支持](https://blog.csdn.net/WuQingLaoXingXing/article/details/89413075)

**eg:**

``` java
// ...
@PropertySource(value = {"classpath:person.properties"})
public class Person {
    // something...
}
```



## - @ImportResource

用于导入 Spring 的配置文件，让配置文件里面的内容生效；(就是以前写的springmvc.xml、applicationContext.xml)

<Vssue title="hello-spring" />





## - @Configuration（推荐）

Spring Boot 推荐给容器中添加组件的方式——全注解。

@Configuration：**指明当前类是一个配置类**，用来替代之前的 Spring 配置文件



### - @Bean

将方法中的返回值添加到容器中，容器中这个组件默认的 id 就是方法名



**eg:**

在包目录下新建 `server.HelloServer.java` 文件，内容如下

``` java
package top.yeek.vue.server;

/**
 * @author moreant
 * @date 2020/02/13 17:31
 */
public class HelloService {
}

```

在包目录下新建 `config.AppConfig.class` 文件，内容如下

``` java
package top.yeek.vue.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import top.yeek.vue.server.HelloService;

/**
 * @author moreant
 * @date 2020/02/13 17:18
 */
@Configuration
public class AppConfig {

    @Bean
    public HelloService helloServer(){
        System.out.println("添加组件");
        return new HelloService();
    }
}
```

在单元测试文件 `ApplicationTest.java` 中**添加**

``` java
    @Autowired
    ApplicationContext ioc;

    @Test
    public void testHelloServer(){
        boolean b = ioc.containsBean("helloServer");
        System.out.println(b);
    }
```

运行 `testHelloServer` ，在控制台中依次输出

```
添加组件
true
```



当修改文件 `AppConfig.java` 中的方法名或者修改 `containsBean` 中的值后再运行 `testHelloServer` 

控制台中的结果是

```
添加组件
false
```



![](http://markdown.yeek.top/20200213174525.png)



## - 配置文件占位符

随机值

``` properties
person.age=${random.int}
person.dog.age=${random.uuid}
```



引用值

``` properties
person.name=王五
person.dog.name=${person.name}
```





## - Profile

Profile是Spring对不同环境提供不同配置功能的支持，可以通过激活、指定参数等方式快速切换环境



### - 多 Profile 文件

文件名格式：application-{profile}.properties/yml，例如：

- application-dev.properties

``` properties
server.port=8080
```

- application-prod.properties

``` properties
server.port=80
```

程序启动时会默认加载`application.properties`，可以在主配置文件中指定激活哪个配置文件

eg: 激活生产环境的 `Profile`

``` properties
spring.profiles.active=prod
```


### - YAML 文档块

使用 `---` 来分割

eg:

``` yaml
server:
  port: 8080
# application.properties 的优先级高于 YAML  
spring:
  profiles:
    active: dev
---

server:
  port: 2333
spring:
  profiles: dev


---
server:
  port: 80
spring:
  profiles: prod
```



### - 命令行激活

在命令行中加入参数

``` 
--spring.profiles.active=dev
```

1. 在打包后加入

```
java -jar xxx.jar --spring.profiles.active=dev；
```

2. 在 IDEA 中加入

![](http://markdown.yeek.top/20200214235527.png)

3. 在虚拟机中加入

![](http://markdown.yeek.top/20200215000138.png)



## - 配置文件加载位置

Spring Boot 会扫描以下位置的配置文件作为默认配置文件。

优先级如下，高优先级配置会**覆盖**低优先级配置

1.  file: ./config/
2.  file: ./
3. classpath: /config/
4. classpath: /

SpringBoot会从这四个位置全部加载主配置文件；**互补配置**；



还可以使用 `spring.config.location `来改变默认的配置文件位置

**项目打包好以后，我们可以使用命令行参数的形式，启动项目的时候来指定配置文件的新位置；指定配置文件和默认加载的这些配置文件共同起作用形成互补配置；**

*eg:*

```
java -jar xxx.jar --spring.config.location=/home/cloudlandboy/application.yaml
```



## - 外部配置加载顺序

**SpringBoot也可以从以下位置加载配置； 优先级从高到低；高优先级的配置覆盖低优先级的配置，所有的配置会形成互补配置**

1. **命令行参数** 

   所有的配置都可以在命令行上进行指定多个配置用空格分开

   `--{配置项}={值}`

   ```
   java -jar xxx.jar --server.port=8087  --server.context-path=/abcCopy to clipboardErrorCopied
   ```

2. 来自 java:comp/env 的JNDI属性

3. Java系统属性（System.getProperties()）

4. 操作系统环境变量

5. RandomValuePropertySource配置的random.*属性值

<br>

**优先加载带 profile，再来加载不带 profile，由 jar 包外向内进行寻找**

6. jar包外部的 `application-{profile}.properties` 或 `application.yml `(带spring.profile)配置文件 
7. jar包内部的 `application-{profile}.properties` 或 `application.yml` (带spring.profile)配置文件 

8. jar包外部的 `application.properties` 或 `application.yml` (不带spring.profile)配置文件 
9. jar包内部的 `application.properties` 或 `application.yml` (不带spring.profile)配置文件 

<br>

10. `@Configuration` 注解类上的 `@PropertySource`
11. 通过 `SpringApplication.setDefaultProperties` 指定的默认属性 

所有支持的配置加载来源：

[参考官方文档](https://docs.spring.io/spring-boot/docs/2.2.1.RELEASE/reference/htmlsingle/#boot-features-external-config)



## - 自动配置原理