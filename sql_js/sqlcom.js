//根据sql_commander.php返回的数据生成表格

function CreateResTable(cmdRes)
{
    let resHTML = '<table class="table"><tr>';

    for(let i = 0; i <cmdRes.fieldList.length; i++)
    {
        resHTML+= "<th>" + cmdRes.fieldList[i] +"</th>"
    }
    resHTML+= "</tr>";

    for(let i = 0; i < cmdRes.dataList.length; i++)
    {
        resHTML+= "<tr>";
        for(let j = 0; j <cmdRes.dataList[i].length; j++)
        {
            resHTML+= "<td>" + cmdRes.dataList[i][j] +"</td>"
        }
        resHTML+= "</tr>";
    }
    resHTML+= "</table>";

    return resHTML;
}

//根据sql_commander.php返回的数据生成HTML信息
//jqsResContainer jquery选择器 指定存放结果的HTML元素
//cmdRes sql_commander.php返回的数据
function CreateResInf(jqsResContainer, cmdRes)
{
    jqsResContainer.empty();
    jqsResContainer.append('<p>执行查询<\p>')
    jqsResContainer.append(`<code><pre>${cmdRes.queryLine}<\pre><\code><hr>`)

    if(cmdRes.resSign === '#error')
    {
        jqsResContainer.append('<p>查询错误<\p>')
        jqsResContainer.append(`<p>${cmdRes.Error}<\p>`)
    }
    else if(cmdRes.resSign === '#empty')
    {
        jqsResContainer.append('<p>无返回数据<\p>')
    }
    else if(cmdRes.resSign === '#confail')
    {
        jqsResContainer.append('<p>数据库连接失败<\p>')
    }
    else if(cmdRes.resSign === '#jserror')
    {
        jqsResContainer.append('<p>结果解析失败<\p>')
        jqsResContainer.append(`<p>${cmdRes.Error}<\p>`)
    }
    else if(cmdRes.resSign === '#success')
    {
        jqsResContainer.append('<p>查询结果<\p>')
        jqsResContainer.append(CreateResTable(cmdRes));
    }
    else if(cmdRes.resSign === '#opsuccess')
    {
        jqsResContainer.append('<p>操作成功<\p>')
    }
}

//等待效果 基于bootstrap
function WaitEffect(jqsResContainer)
{
    jqsResContainer.empty();
    jqsResContainer.append('<div class="spinner-grow text-info"></div>')
}

function GetCmdRes (responseTxt,statusTxt)
{
    if(statusTxt == "success")
    {
        console.log(responseTxt);
        cmdRes = new sqlRes(responseTxt);
    }
    else
    {
        cmdRes = new sqlRes("null,'#confail'");
    }

    return cmdRes;
}

//返回格式 json
//查询成功时返回
//[0] 请求的命令
//[1] '#success'
//[2] 字段名
//[3] 第0行数据
//[n] 第n - 2行数据

//错误时返回
//[0] 请求的命令
//[1] '#error'
//[2] 错误信息

//无数据时返回
//[0] 请求的命令
//[1] '#empty'

//超时时返回
//[0] null
//[1] '#confail'

//js解析错误时返回
//[0] null
//[1] '#jserror'

//非查询操作成功返回
//[0] 请求的命令
//[1] '#opsuccess'
class sqlRes
{
    constructor(resTxt)
    {
        let resArr = [];
        try
        {
            resArr = JSON.parse(resTxt);
        }
        catch(err)
        {
            resArr = [null, '#jserror', err];
        }

        this.resSign = resArr[1];
        this.queryLine = resArr[0];

        if(this.resSign === '#error')
        {
            this.Error = resArr[2];
        }
        if(this.resSign === '#jserror')
        {
            this.Error = resArr[2];
        }
        else if(this.resSign === '#confail')
        {
            this.Error = 'sql Connect Fail';
        }
        else if(this.resSign === '#success')
        {
            this.fieldList = resArr[2];
            this.dataList = resArr.slice(3);
        }
    }

    GetByField(field)
    {
        if(this.resSign !== '#success')
        {
            return false;
        }

        let ind = this.fieldList.indexOf(field);
        if(ind === -1)return false;
        else
        {
            let res = [];
            this.dataList.forEach(element => {
                res.push(element[ind]);
            });
            return res;
        }
    }

    dataList = [];
    fieldList = [];
    resSign = '';
    queryLine = '';
    Error = '';
}