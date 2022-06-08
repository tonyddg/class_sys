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
        `
        SELECT class.cno '课程编号', class.cname '课程名', concat(class.cplace, class.croom) '上课地点', class.ctype '课程类型', teacher.tname '教师名称'
        FROM
        sc JOIN class ON (class.cno = sc.cno), teacher
        WHERE 
        class.cyear = ${curYear} AND
        class.cterm = ${curTerm} AND
        teacher.tno = class.tno AND
        sc.sno = '${sno}'`),
    (responseTxt,statusTxt)=>{
        cmdRes = GetCmdRes(responseTxt,statusTxt);
        CreateResInf($('.restable'), cmdRes);
    });
})