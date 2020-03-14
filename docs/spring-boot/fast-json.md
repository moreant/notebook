# FastJson

fastjson是阿里巴巴的开源JSON解析库，它可以解析JSON格式的字符串，支持将Java Bean序列化为JSON字符串，也可以从JSON字符串反序列化到JavaBean。

- 速度快

- 使用广泛

- 使用简单

- 功能完备



## 替换 Spring Boot 的 jackson（可选）

在 `pom.xml` 文件的 `spring-boot-starter-web` 依赖中排除掉 `jackson`

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
    <exclusions>
        <exclusion>
            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-databind</artifactId>
        </exclusion>
    </exclusions>
</dependency>
```



## 添加依赖

可以在[官方仓库](https://github.com/alibaba/fastjson)中找到最新的版本

```xml
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>fastjson</artifactId>
    <version>1.2.61</version>
</dependency>
```



## 配置 FastJson

新建一个 `Configuration` 类

```java
@Configuration
public class FastJsonConfiguration implements WebMvcConfigurer {

    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        // 1.构建了一个HttpMessageConverter FastJson 消息转换器
        FastJsonHttpMessageConverter fastConverter = new FastJsonHttpMessageConverter();
        // 2.定义一个配置，设置编码方式，和格式化的形式
        FastJsonConfig fastJsonConfig = new FastJsonConfig();
        // 3.设置成了 PrettyFormat 格式
        fastJsonConfig.setSerializerFeatures(SerializerFeature.PrettyFormat);
        // 4.设置解析类型类型
        List<MediaType> supportedMediaTypes = new ArrayList<>();
        supportedMediaTypes.add(MediaType.APPLICATION_JSON);
        // 暂时不需要解析这么多
        // supportedMediaTypes.add(MediaType.APPLICATION_ATOM_XML);
        // supportedMediaTypes.add(MediaType.APPLICATION_FORM_URLENCODED);
        // supportedMediaTypes.add(MediaType.APPLICATION_OCTET_STREAM);
        // supportedMediaTypes.add(MediaType.APPLICATION_PDF);
        // supportedMediaTypes.add(MediaType.APPLICATION_RSS_XML);
        // supportedMediaTypes.add(MediaType.APPLICATION_XHTML_XML);
        // supportedMediaTypes.add(MediaType.APPLICATION_XML);
        // supportedMediaTypes.add(MediaType.IMAGE_GIF);
        // supportedMediaTypes.add(MediaType.IMAGE_JPEG);
        // supportedMediaTypes.add(MediaType.IMAGE_PNG);
        // supportedMediaTypes.add(MediaType.TEXT_EVENT_STREAM);
        // supportedMediaTypes.add(MediaType.TEXT_HTML);
        // supportedMediaTypes.add(MediaType.TEXT_MARKDOWN);
        // supportedMediaTypes.add(MediaType.TEXT_PLAIN);
        // supportedMediaTypes.add(MediaType.TEXT_XML);
        fastConverter.setSupportedMediaTypes(supportedMediaTypes);

        //5.将 fastJsonConfig 加到消息转换器中
        fastConverter.setFastJsonConfig(fastJsonConfig);
        assert converters != null;
        converters.add(fastConverter);
    }
}
```



## 使用

需要解析 `json` 字符串的时候只需要这样就可以转化成对象了

```java
JSON.parseObject(jsonString, User.class);
```

User.class 是这样的

```
@Data
public class User {
    private UUID uuid;
    private Integer giteeId;
    private Integer studentId;
    private String name;
    private String role;
    private String createTime;
}
```

