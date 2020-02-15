# Hello Spring

本节记录如何创建并且运行 Spring Boot 输出 Hello Spring



## 修改 Maven 源

总所周知的原因，使用默认的 Maven 源下依赖是非常的慢的。因此需要添加镜像，我选择的是阿里云的镜像。

进入 IDEA 的安装目录下的 `plugins/maven/lib/maven3/conf/settings.xml`

添加以下内容到 `mirros` 中

``` xml
<mirror>  
      <id>alimaven</id>  
      <name>aliyun maven</name>  
      <url>http://maven.aliyun.com/nexus/content/groups/public/</url>  
      <mirrorOf>central</mirrorOf>          
</mirror>
```



![](http://markdown.yeek.top/20200210230739.png)



## 创建项目

在 IDEA 中使用 Spring Initializr 来创建 Spring Boot 项目

![](http://markdown.yeek.top/20200210225728.png)

完善项目信息

![](http://markdown.yeek.top/20200210230028.png)

![](http://markdown.yeek.top/20200212172511.png)



## 编写接口

在 `/src/main/java/包名` 下新建 controller.HelloController.class

``` java
package com.mojuchen.vue.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * RestController：是spring4里的新注解，是@ResponseBody和@Controller的缩写。
 */
@RestController
public class HelloController {

    @RequestMapping("/hello")
    public String hello(){
        return "hello SpringBoot,this is my first Application";
    }
}
```



## 启动 APP

进入包名下的 Application.class 运行 `主类`

![](http://markdown.yeek.top/20200212220714.png)

或者直接在 IDEA 右上角启动

![](http://markdown.yeek.top/20200212220634.png)

启动后可以在控制台里看到启动了 `Tomcat` 服务，并且监听的是 `2333` 端口

![](http://markdown.yeek.top/20200212220814.png)



访问

http://localhost:2333/hello 





<Vssue title="hello-spring" />