$(document).ready(function(){

    $("#submitcmd").click(()=>
    {
        WaitEffect($('.restable'));
        $.get("sql_commander.php?cmd=" + encodeURIComponent(
            `SELECT sno FROM student WHERE sno='${$('#snoInput').val()}' AND spw='${$('#spwInput').val()}'`
        ),
        (responseTxt,statusTxt)=>{
            cmdRes = GetCmdRes(responseTxt,statusTxt);
            CreateResInf($('.restable'), cmdRes);

            if(cmdRes.GetByField('sno')[0] === $('#snoInput').val())
            {
                $('#homepage').removeAttr('disabled');

                //危险的操作
                $.cookie('sno', $('#snoInput').val());
            }
        });
    })

    $("#homepage").click(()=>
    {
        window.location.href = 'index.html';
    })
})