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
        SELECT class.cname '课程名', 
        concat(class.ctest_place, class.ctest_room) '考试地点',
        class.ctest_time '考试时间', class.cpoint '学分'
        FROM class, sc WHERE
        class.cyear = ${curYear} AND
        class.cterm = ${curTerm} AND
        sc.cno = class.cno AND
        sc.sno = '${sno}' AND
        sc.score IS NULL;`),
    (responseTxt,statusTxt)=>{
        cmdRes = GetCmdRes(responseTxt,statusTxt);
        CreateResInf($('.restable'), cmdRes);
    });
})