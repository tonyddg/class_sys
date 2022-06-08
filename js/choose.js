let sno = undefined;

$(document).ready(function()
{
    LoadBlock();

    sno = $.cookie('sno');
    if(sno === undefined)
    {
        window.location.href='login.html';
    }

    RefreshClassTable();

    $("#submitcmd").click(()=>
    {
        WaitEffect($('.restable_choose'));
        $.get("sql_commander.php?cmd=" + encodeURIComponent(
            `INSERT INTO sc(sno, cno, score) VALUES('${sno}', '${$('#choosecno').val()}', NULL)`),
        (responseTxt,statusTxt)=>{
            cmdRes = GetCmdRes(responseTxt,statusTxt);
            CreateResInf($('.restable_choose'), cmdRes);
            RefreshClassTable();
        });
    })
})

function RefreshClassTable()
{
    WaitEffect($('.restable_class'));
    $.get("sql_commander.php?cmd=" + encodeURIComponent(`
    SELECT 
        class.cno '课程编号', class.cname '课程名',
        concat(class.cplace, class.croom) '上课地点',
        class.ctype '课程类型', teacher.tname '教师名称',
        class.cmaxs '人数上限', COUNT(sc.sno) '已选人数' 
        FROM
        sc RIGHT OUTER JOIN class ON (class.cno = sc.cno), teacher
        WHERE 
        class.cyear = ${curYear} AND
        class.cterm = ${curTerm} AND
        teacher.tno = class.tno
        AND
        class.cno NOT IN
        (
            SELECT cno FROM sc WHERE sno = '${sno}'
        )
        GROUP BY
        class.cno
        HAVING
        COUNT(sc.sno) <= class.cmaxs`),
    (responseTxt,statusTxt)=>{
        cmdRes = GetCmdRes(responseTxt,statusTxt);
        CreateResInf($('.restable_class'), cmdRes);
    });
}