// 当前学年
const curYear = 2022;
// 当前学期
const curTerm = 0;

const SideNav = `
<nav class="navbar-light bg-light justify-content-center">

<!-- Toggler/collapsibe Button -->
<button style="width: 100%;" class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
    <span class="navbar-toggler-icon"></span>
</button>

<!-- Navbar links -->
<div class="collapse navbar-collapse" id="collapsibleNavbar">
    <ul class="navbar-nav">
    <li class="nav-item">
        <a class="nav-link" href="index.html">返回主页</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" href="info.html">个人信息</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" href="class.html">我的课程</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" href="arrange.html">我的课表</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" href="exam.html">考试安排</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" href="score.html">成绩查询</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" href="choose.html">选课中心</a>
    </li>
    <li class="nav-item">
    <a class="nav-link" href="used.html">教室情况</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" href="changepw.html">修改密码</a>
    </li>                        
    <li class="nav-item">
        <a class="nav-link" href="login.html" id="logOut">退出登录</a>
    </li>
    </ul>
</div>
</nav>
`

function LoadBlock()
{
    $('#sideNav').append(SideNav);
}