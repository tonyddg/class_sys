## 基本信息
* 题目：选课系统学生端交互界面
* 作者：机械2102丁德桂
## 测试说明
* 测试地址：http://110.42.200.61/class_sys
* 测试账号：S000002
* 测试密码：2abc
## 部署环境
* 系统：ubuntu0.18.04.1
* 服务器软件 Apache/2.4.29 (Ubuntu)
* 数据库系统 Mysql 5.7.36
* PHP 版本： 7.2.24-0ubuntu0.18.04.11
* PHP 扩展： mysqli  mbstring jsonp
## 部署说明
0. 确保部署环境正确
1. 在服务端mysql中建立相应的数据库
2. 运行 establish.sql 中的mysql命令
3. 修改pass_inf.php 为对应的信息
4. 将文件部署到网页文件夹
5. 启动apache服务，确保http，mysql相应端口开放