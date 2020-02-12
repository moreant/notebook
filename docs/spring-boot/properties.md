# 配置文件

Spring Boot 使用一个全局的配置文件，配置文件名`application`是固定的；

- application.properties
- application.yml
- application.yaml

配置文件的作用：修改 Spring Boot 自动配置的默认值



## YAML

 YAML：**以数据为中心**，比 json、xml等更适合做配置文件



### 语法

以 `空格` 的缩进来控制层级关系；只要是左对齐的一列数据，都是同一个层级的

次等级的前面是空格，不能使用制表符(tab)

冒号之后如果有值，那么冒号和值之间至少有一个空格，不能紧贴着



### 字面量：普通的值

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



### 对象、Map （属性和值）

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



## 配置文件注入

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



### @ConfigurationProperties 获取全局配置



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



### 解决乱码问题

在设置中搜索 `file encodings` 统统设置成 `UTF-8`

![](http://markdown.yeek.top/20200213012733.png)



::: warning  

需要 **重新新建** `application.properties` 文件，否则还是乱码

:::



###  @value 获取配置

配置文件值注入有两种方式，一个是Spring Boot的`@ConfigurationProperties`注解，另一个是spring原先的`@value`注解



#### 读取配置文件中的值

``` java
@Value("${person.name}")
private String name;
```

#### 运算值

``` java
@Value("#{11*3}")
private Integer age;
```



#### 区别

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



### @PropertySource

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



### @ImportResource

用于导入 Spring 的配置文件，让配置文件里面的内容生效；(就是以前写的springmvc.xml、applicationContext.xml)

<Vssue title="hello-spring" />

