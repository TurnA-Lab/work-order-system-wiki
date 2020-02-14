# JUST WO's Wiki

![license](https://img.shields.io/github/license/JUST-NC/work-order-system-wiki)
![author Skye](https://img.shields.io/badge/author-Skye-8F77B5.svg)
![build status](https://travis-ci.com/JUST-NC/work-order-system-wiki.svg?branch=master)

> 全称大概是「江苏科技大学教学建设和业绩分管理系统的说明文档」。

## 介绍

这里是源码，不能直接食用。由于最后需要部署在内网，所以将 Docsify 用到的文件都放置在本地，同时进行了一些魔改。

最终的文档用于 JUST WO 系统，分为「使用说明」、「源码解释」、「 Wiki 文档」三个部分。

站点使用 [Docsify](https://github.com/docsifyjs/docsify) 制作，Markdown 撰写，并应用古典的 [gulp](https://github.com/gulpjs/gulp) 进行构建。

## 本地食用

```bash
$ npm install -g docsify-cli   # 全局安装 docsify-cli
# 如果你已经装好了，就不用上面的步骤啦。
$ git clone https://github.com/JUST-NC/work-order-system-wiki.git
$ cd work-order-system-wiki
$ npm install
$ npm run build   # 也可以使用命令 gulp build
$ docsify serve public   # 站点默认被发布到 public 文件夹下
```

## 开源协议

[JUST WO's Wiki](https://github.com/JUST-NC/work-order-system-wiki) 使用 [MIT](https://github.com/JUST-NC/work-order-system-wiki/blob/master/LICENSE) 协议进行开源。
