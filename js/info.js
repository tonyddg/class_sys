$(document).ready(function()
{
    LoadBlock();
    
    let sno = $.cookie('sno');
    if(sno === undefined)
    {
        window.location.href='login.html';
    }

    WaitEffect($('.restable'));
    $.get("sql_commander.php?cmd=" + encodeURIComponent(
        `SELECT sno '学号', sname '姓名', sage '年龄', sgrade '年级', smail '邮箱', stel '电话', ssex '性别', spw '密码'
        FROM student, department 
        WHERE 
        sno = '${sno}'
        AND
        department.dno = student.dno`),
    (responseTxt,statusTxt)=>{
        cmdRes = GetCmdRes(responseTxt,statusTxt);
        CreateResInf($('.restable'), cmdRes);
    });
})