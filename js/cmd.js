$(document).ready(function(){

    $("#submitcmd").click(()=>
    {
        WaitEffect($('.restable'));
        $.get("sql_commander.php?cmd=" + encodeURIComponent(
            $('#inputcmd').val()),
        (responseTxt,statusTxt)=>{
            cmdRes = GetCmdRes(responseTxt,statusTxt);
            CreateResInf($('.restable'), cmdRes);
        });
    })
})