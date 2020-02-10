# Hello Spring

本节记录如何创建并且运行 Spring Boot 输出 Hello Spring



## 修改 Maven 源

总所周知的原因，使用默认的 Maven 源下依赖是非常的慢的。因此需要添加镜像，我选择的是阿里云的镜像。

进入 IDEA 的安装目录下的 `plugins/maven/lib/maven3/conf/settings.xml`

添加以下内容到 `mirros` 中

```xml
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











## 编写接口





<Vssue title="hello-spring" />