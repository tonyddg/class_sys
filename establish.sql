
#删除表格
#DROP TABLE advicer;
#DROP TABLE arrange;
#DROP TABLE class;
#DROP TABLE department;
#DROP TABLE sc;
#DROP TABLE student;
#DROP TABLE teacher;

#院系表：
CREATE TABLE department ( dname VARCHAR(40), dno CHAR(7), dhead VARCHAR(20), PRIMARY KEY(dno) );
#教师表：
CREATE TABLE teacher
(
   tno CHAR(7),
   tname VARCHAR(40),
   tage INT,
   tsex CHAR(1),
   tplace VARCHAR(20),
   ttel VARCHAR(30),
   temail VARCHAR(60),
   dno CHAR(7),
   PRIMARY KEY(tno),
   FOREIGN KEY(dno) REFERENCES department(dno)
);
#课程表：
#添加列任课老师 删除sc (一门课只有一个教师)
#课程的学年与学期
#
CREATE TABLE class(cno CHAR(7)PRIMARY KEY,cname VARCHAR(40)NOT NULL,ctype VARCHAR(20),ctime_begin INT,ctime_end INT,cplace VARCHAR(30),ctest_time CHAR(24),ctest_place CHAR(30),cpoint FLOAT,croom VARCHAR(30) ,ctest_room CHAR(30), cmaxs INT, tno CHAR(7), cyear INT, cterm SMALLINT, FOREIGN KEY (tno) REFERENCES teacher(tno));
#学生表：
CREATE TABLE student(
sno char(7) PRIMARY KEY,
sname varchar(10),
ssex char(1) CHECK (ssex IN ('F','M')),
 sage int ,
 sgrade int,
 stel varchar(30),
 smail varchar(30),
 dno char(7),
 spw varchar(30),
 FOREIGN KEY(dno) REFERENCES department(dno));
#辅导员表：
CREATE TABLE advicer ( ano CHAR(7) PRIMARY KEY, aname VARCHAR(20), asex CHAR(1) CHECK (asex IN ('F','M')), atel VARCHAR(15), aemail VARCHAR(30), dno CHAR(7), FOREIGN KEY(dno) REFERENCES department(dno));
#课程安排：
#abegin_class 开始节次
#aend_class 结束节次
#aweekday 上课星期
CREATE TABLE arrange(cno CHAR(7),abegin_class INT,aweekday INT,aend_class INT,FOREIGN KEY(cno)REFERENCES class(cno));
#学生课程表 
#添加primarykey：
#添加课程状况 0 未考试 1 不及格 2 及格
CREATE TABLE sc
(sno char(7),
cno char(7),
score float,
FOREIGN KEY(sno) REFERENCES student(sno),
FOREIGN KEY(cno) REFERENCES class(cno),
PRIMARY KEY(cno, sno));

#索引
/*
CREATE UNIQUE INDEX si ON student(sno);
CREATE UNIQUE INDEX ai ON advicer(ano);
CREATE UNIQUE INDEX di ON department(dno);
CREATE UNIQUE INDEX ci ON class(cno);
CREATE UNIQUE INDEX ti ON teacher(tno);
CREATE UNIQUE INDEX ai ON arrange(ano);
CREATE UNIQUE INDEX sci ON sc(sno, cno);
*/

/* 可选用的测试数据
#院系数据
INSERT INTO department(dno, dname, dhead) VALUES
('D100001', '机械', '高主任'), 
('D100002', '计算机', '吴主任'), 
('D100003', '材料', '陈主任'), 
('D100004', '外语', '杨主任'), 
('D100005', '物理', '王主任');

#教师数据
INSERT into teacher(tno, tname, tage, tplace, tsex, ttel, temail, dno) 
values('T100001','刘一',38,'教授','M',13367413615,'13367413615@qq.com','D100001'),
                           ('T100002','张三',40,'教授','M','13267413615','13267413615@qq.com','D100001'),
                           ('T100003','李四',50,'讲师','M','18873322096','18873322096@qq.com','D100002'),
                           ('T100004','二妞',29,'讲师','F','15679652096','15679652096@qq.com','D100003'),
                           ('T100005','张子萱',28,'教授','F','15573323618','15573323618@qq.com','D100004'),
                           ('T100006','王强',19,'讲师','M','12122222221','12122222221@qq.com','D100005'),
                           ('T100007','王五',60,'副教授','M','12345678912','12345678912@qq.com','D100001'),
                           ('T100008','江梅',48,'讲师','F','01234567891','01234567891@qq.com','D100003'),
                           ('T100009','刘柳',38,'教授','F','23456789234','2345678923@qq.com','D100002'),
                           ('T100010','刘帅',23,'讲师','M','34567893456','3456789345@qq.com','D100004');

#课程数据 添加选课上限：
INSERT INTO class(cno, cname, ctype, ctime_begin, ctime_end, cplace, croom, ctest_time, ctest_place, ctest_room, cpoint, cmaxs, tno, cterm, cyear) VALUES
('C100001', '线性代数', '数学', 3, 17, '东九楼', 'A102', '六月四日', '东九楼', 'D203', 2.5, 150, 'T100010', 0, 2022),
('C100002', '美术鉴赏', '美术', 4, 12, '东十二楼', '405', '五月十一日', '东九楼', 'D502', 1.5, 50, 'T100009', 0, 2022),
('C100003', '微积分', '数学', 3, 19, '东九楼', 'B401', '七月一日', '东九楼', 'C101', 5.5, 150, 'T100008', 0, 2022),
('C100004', '大学物理', '科学', 2, 18, '东九楼', 'C301', '六月八日', '东九楼', 'B502', 3.5, 100, 'T100007', 0, 2022),
('C100005', '物理实验', '科学', 5, 15, '科技楼', '102', '五月二十一日', '东九楼', 'A203', 1, 120, 'T100006', 0, 2022),
('C100006', '数据库', '计算机', 8, 19, '实训中心', '302', '六月九日', '实训中心', '203', 1.5, 27, 'T100005', 0, 2022),
('C100007', '电影鉴赏', '美术', 4, 12, '东十二楼', '205', '五月十八日', '东十二楼', '202', 0.5, 80, 'T100004', 0, 2022),
('C100008', '概率论', '数学', 6, 18, '东九楼', 'B202', '七月六日', '东十二楼', '101', 2.5, 50, 'T100003', 0, 2022),
('C100009', '进阶物理', '科学', 2, 18, '东九楼', 'D101', '六月九日', '东九楼', 'C301', 0.5, 10, 'T100002', 0, 2022),
('C100010', 'C++', '科学', 3, 17, '实训中心', '301', '五月二十三日', '实训中心', '201', 2.5, 200, 'T100001', 0, 2022);

INSERT INTO class(cno, cname, ctype, ctime_begin, ctime_end, cplace, croom, ctest_time, ctest_place, ctest_room, cpoint, cmaxs, tno, cterm, cyear) VALUES
('C100011', '线性代数', '数学', 3, 17, '东九楼', 'A102', '六月四日', '东九楼', 'D203', 2.5, 150, 'T100010', 1, 2021),
('C100012', '美术鉴赏', '美术', 4, 12, '东十二楼', '405', '五月十一日', '东九楼', 'D502', 1.5, 50, 'T100009', 1, 2021),
('C100013', '微积分', '数学', 3, 19, '东九楼', 'B401', '七月一日', '东九楼', 'C101', 5.5, 150, 'T100008', 1, 2021),
('C100014', '大学物理', '科学', 2, 18, '东九楼', 'C301', '六月八日', '东九楼', 'B502', 3.5, 100, 'T100007', 1, 2021),
('C100015', '物理实验', '科学', 5, 15, '科技楼', '102', '五月二十一日', '东九楼', 'A203', 1, 120, 'T100006', 1, 2021);

#学生数据
INSERT 
INTO student
VALUES('S000001','张三','M','18','1','12143451231','asfsdaf@ad.com','D100001', '1abc'),
('S000002','李四','F','19','3','11244512312','dASFSADaf@ad.com','D100003', '2abc'),
('S000003','王五八','F','17','1','11122512312','AasdShhgf@ccas.com','D100005', '3abc'),
('S000004','马武','M','18','2','16545512312','aAasdShjlkjlf@as.com','D100002', '4abc'),
('S000005','马文','F','19','3','46548712312','asdjlkjlf@as.com','D100004', '5abc'),
('S000006','司马里欧','F','21','4','46456542318','a45645jlf@as.com','D100005', '6abc'),
('S000007','顶真只','M','20','2','44534346458','ASD54A6Sf@as.com','D100001', '7abc'),
('S000008','笑川','M','22','4','54343783543','4534534353@ass.com','D100002', '8abc'),
('S000009','王忠负','F','19','2','6431231233','ASDGDSS4353@ass.com','D100004', '9abc'),
('S000010','欧阳备查','F','20','3','456456456','453123123453@ass.com','D100003', '10abc');

#辅导员数据
INSERT INTO advicer(ano, aname, asex, atel, aemail, dno) VALUES
('A100001', '王其', 'F', '12345678901', '123@qq.com', 'D100001'),
('A100002', '张其', 'M', '24345678951', '345@outlook.com', 'D100002'),
('A100003', '李风', 'F', '35446435345', '645@163.com', 'D100003'),
('A100004', '马云', 'M', '32523533455', '376@qq.com', 'D100004'),
('A100005', '成一', 'F', '67454634475', '145@138.com', 'D100005'),
('A100006', '包而', 'M', '23543547574', '467@qq.com', 'D100003');

#安排表数据
INSERT INTO arrange(cno, abegin_class, aend_class, aweekday) VALUES 
('C100003', 1, 2, 1),
('C100003', 3, 4, 3),
('C100003', 5, 6, 5),
('C100002', 9, 10, 3),
('C100001', 3, 4, 2),
('C100001', 5, 6, 4),
('C100004', 1, 2, 2),
('C100004', 7, 8, 5),
('C100005', 1, 4, 6),
('C100006', 7, 8, 4),
('C100006', 5, 6, 1),
('C100007', 11, 12, 1),
('C100008', 3, 4, 1),
('C100008', 7, 8, 5),
('C100009', 1, 8, 7),
('C100010', 1, 8, 1),
('C100010', 5, 6, 3);

#学生选课表数据
INSERT INTO sc (sno, cno, score) VALUES
('S000001', 'C100002', NULL),
('S000001', 'C100003', NULL),
('S000002', 'C100003', NULL),
('S000001', 'C100005', NULL),
('S000002', 'C100005', NULL),
('S000001', 'C100006', NULL),
('S000002', 'C100006', NULL),
('S000001', 'C100007', NULL),
('S000002', 'C100007', NULL),
('S000002', 'C100008', NULL),
('S000001', 'C100009', NULL),
('S000002', 'C100011', 82.1),
('S000002', 'C100012', 62),
('S000002', 'C100013', 20),
('S000002', 'C100014', 99),
('S000002', 'C100015', 72);*/