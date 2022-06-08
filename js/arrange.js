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
            `SELECT class.cname '课程名',
            concat(arrange.abegin_class, ' - ', arrange.aend_class) '上课节次' ,
            concat(class.cplace, class.croom) '上课地点'
            FROM sc, class, arrange 
            WHERE
            class.cyear = ${curYear} AND
            class.cterm = ${curTerm} AND
            sc.cno = class.cno AND 
            arrange.cno = class.cno AND
            arrange.aweekday = ${$('#daySelect').val()} AND
            sc.sno = '${sno}' AND 
            ${$('#weekSelect').val()} BETWEEN class.ctime_begin AND class.ctime_end
            ORDER BY arrange.aweekday;`
        ),
        (responseTxt,statusTxt)=>{
            cmdRes = GetCmdRes(responseTxt,statusTxt);
            CreateResInf($('.restable'), cmdRes);
        });
    })
})