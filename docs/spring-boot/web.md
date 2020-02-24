# web 开发



## 静态资源映射

### 源码

在 ide中可以双击 <kbd>Shift</kbd> 打开搜索，找到 `WebMvcAutoConfiguration.class` 中的 `addResourceHandlers` 方法。

```java
public void addResourceHandlers(ResourceHandlerRegistry registry) {
    if (!this.resourceProperties.isAddMappings()) {
        logger.debug("Default resource handling disabled");
    } else {
        Duration cachePeriod = this.resourceProperties.getCache().getPeriod();
        CacheControl cacheControl = this.resourceProperties.getCache().getCachecontrol().toHttpCacheControl();
        if (!registry.hasMappingForPattern("/webjars/**")) {
            this.customizeResourceHandlerRegistration(registry.addResourceHandler(new String[]{"/webjars/**"}).addResourceLocations(new String[]{"classpath:/META-INF/resources/webjars/"}).setCachePeriod(this.getSeconds(cachePeriod)).setCacheControl(cacheControl));
        }
        String staticPathPattern = this.mvcProperties.getStaticPathPattern();
        if (!registry.hasMappingForPattern(staticPathPattern)) {
            this.customizeResourceHandlerRegistration(registry.addResourceHandler(new String[]{staticPathPattern}).addResourceLocations(WebMvcAutoConfiguration.getResourceLocations(this.resourceProperties.getStaticLocations())).setCachePeriod(this.getSeconds(cachePeriod)).setCacheControl(cacheControl));
        }
    }
}
```

分别添加了 `webjars` 和 `静态目录` 的映射

![](http://markdown.yeek.top/20200225004208.png)



### webjars

在 [webjars](https://www.webjars.org/) 中找到需要的依赖，添加到 `pom.xml` 文件中，之后就可以在 `webjars/**` 中找到

例如 `JQuery` ，在 `pom.xml` 中添加

```xml
        <dependency>
            <groupId>org.webjars</groupId>
            <artifactId>jquery</artifactId>
            <version>3.4.1</version>
        </dependency>
```

访问地址对应就是：http://localhost:8080/webjars/jquery/3.4.1/jquery.js



### 静态目录

只要找不到处理的，就匹配以下文件夹中的文件。可以在 `ResourceProperties.class` 里找到文件夹的列表

```java
public class ResourceProperties {
    private static final String[] CLASSPATH_RESOURCE_LOCATIONS = new String[]{"classpath:/META-INF/resources/", "classpath:/resources/", "classpath:/static/", "classpath:/public/"};
    private String[] staticLocations;
    private boolean addMappings;
    private final ResourceProperties.Chain chain;
    private final ResourceProperties.Cache cache;
```



```
classpath:/META-INF/resources/
classpath:/resources/
classpath:/static/
classpath:/public/
```



**eg:** 在 `/main/resources/resources` 下有 `test.html` 文件，就可以直接在 

[http://localhost:8080/test.html]()

访问 `test.html` 文件



### 欢迎文件(index.html)

同样是在 `WebMvcAutoConfiguration.class` 中，处理欢迎页面是在 `WelcomePageHandlerMapping` 方法中

![](http://markdown.yeek.top/20200225011107.png)

