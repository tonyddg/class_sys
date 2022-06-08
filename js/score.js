$(document).ready(function()
{
    LoadBlock();

    let sno = $.cookie('sno');
    if(sno === undefined)
    {
        window.location.href='login.html';
    }

    $("#submitcmd").click(()=>
    {
        WaitEffect($('.restable'));
        $.get("sql_commander.php?cmd=" + encodeURIComponent(
            `SELECT class.cname '课程名', class.cpoint '学分', sc.score '成绩'
            FROM sc, class
            WHERE
            class.cyear = ${document.timeForm.yearSelect.value} AND
            class.cterm = ${document.timeForm.termSelect.value} AND
            sc.cno = class.cno AND 
            sc.sno = '${sno}';`
        ),
        (responseTxt,statusTxt)=>{
            cmdRes = GetCmdRes(responseTxt,statusTxt);
            CreateResInf($('.restable'), cmdRes);
        });
    })
})