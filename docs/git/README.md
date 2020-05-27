## push -u

`-u` 指定上游分支，在 `push` 或 `pull` 时加入这个参数，如下

```
$ git push -u origin master 
```

之后的 `push`都可以不带参数，默认指向 `origin` 的 `master` 分支



参考：

> [What does git push -u mean?](https://stackoverflow.com/questions/5561295/what-does-git-push-u-mean)
>
> [What exactly does the “u” do? “git push -u origin master” vs “git push origin master”](https://stackoverflow.com/questions/5697750/what-exactly-does-the-u-do-git-push-u-origin-master-vs-git-push-origin-ma)
>
> 深入原理 - [Git push与pull的默认行为](https://segmentfault.com/a/1190000002783245)





## tag

[详细文档](https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E6%89%93%E6%A0%87%E7%AD%BE)

### 查看

**查看所有 tag**

```
git tag
```

**查看匹配的 tag**

```
git tag -l "v1.8.5*"
```

查看 tag 的信息

```
git show v1.0.0
```



### 打标签

**轻量**

给最近一次提交打上标签

```
git tag
```

**历史**

给 9fecbd02 提交打标签

```
git tag v1.2 9fecbd02
```



### 远程

**推送**

推送到远程仓库

```
git push origin v1.5
```

推送所有标签

```
git push origin --tags
```



### 删除

删除 tagname 标签

```
git tag -d <tagname>
```

删除远程的标签

```
git push <remote> :refs/tags/<tagname>
```

或者更直观的

```console
git push origin --delete <tagname>
```

