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

