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
            `
            SELECT concat(arrange.abegin_class, ' - ', arrange.aend_class) '上课节次', class.cname '课程名'
            FROM arrange, class
            WHERE
            class.cno = arrange.cno AND
            arrange.aweekday = ${$('#daySelect').val()} AND
            class.cplace = '${$('#choosePlace').val()}' AND
            class.croom = '${$('#chooseRoom').val()}' AND 
            class.cyear = ${curYear} AND
            class.cterm = ${curTerm} AND
            ${$('#weekSelect').val()} BETWEEN class.ctime_begin AND class.ctime_end
            `
        ),
        (responseTxt,statusTxt)=>{
            cmdRes = GetCmdRes(responseTxt,statusTxt);
            CreateResInf($('.restable'), cmdRes);
        });
    })
})