$(document).ready(function()
{
    let sno = $.cookie('sno');
    if(sno === undefined)
    {
        window.location.href='login.html';
    }
    else
    {
        $("#header").text(`欢迎 ${$.cookie('sno')}`);
    }

    $('#logOut').click(()=>
    {
        $.removeCookie('sno')
    })
})