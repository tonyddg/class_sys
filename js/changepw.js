$(document).ready(function()
{
    LoadBlock();

    let sno = $.cookie('sno');
    console.log(sno);
    if(sno === undefined)
    {
        window.location.href='login.html';
    }

    $("#submitcmd").click(()=>
    {
        if(document.pwForm.newPw.value === document.pwForm.newPwConfirm.value)
        {
            WaitEffect($('.restable'));
            $.get("sql_commander.php?cmd=" + encodeURIComponent(
                `UPDATE student SET spw = '${document.pwForm.newPw.value}' WHERE sno = '${sno}';`
            ),
            (responseTxt,statusTxt)=>{
                cmdRes = GetCmdRes(responseTxt,statusTxt);
                CreateResInf($('.restable'), cmdRes);
            });
        }
        else
        {
            $('.restable').empty();
            $('.restable').append('<p>两次密码不相同</p>')
        }
    })
})