$(document).ready(function(){
    $("#submitcmd").click(()=>
    {
        WaitEffect($('.restable'));
        $.get("sql_commander.php?cmd=" + encodeURIComponent(
            `SELECT * FROM ${$('#selectForm').val()}`),
        (responseTxt,statusTxt)=>{
            cmdRes = GetCmdRes(responseTxt,statusTxt);
            CreateResInf($('.restable'), cmdRes);
        });
    })
})

function GetQueryString()
{
    return `SELECT * FROM ${$('#selectForm').val()}`;
}