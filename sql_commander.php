<?php
    require_once "pass_inf.php";
    $sqlCon = new mysqli($hn, $un, $pw, $db);
    if($sqlCon->connect_error)
    {
        echo "<p>SQL Connect Failed</p><br>";   
        die("Fatal Error");
    }

    $queryRes[0] = $_GET['cmd'];
    $sqlRes = $sqlCon->query($_GET['cmd']);
    
    if($sqlRes === false)
    {
        $queryRes[1] = '#error';

        $queryRes[2] = $sqlCon->error;
    }
    //query不查询数据时返回true
    else if($sqlRes === true)
    {
        $queryRes[1] = '#opsuccess';
    }
    else if($sqlRes->num_rows == 0)
    {
        $queryRes[1] = '#empty';
    }
    else
    {
        $queryRes[1] = '#success';

        $fieldInf = $sqlRes->fetch_fields();
        for($i = 0; $i < count($fieldInf); $i++)
        {
            $queryRes[2][] = $fieldInf[$i]->name;
        }

        for($i = 3; $i <= $sqlRes->num_rows + 2; $i++)
        {
            $queryRes[$i] = $sqlRes->fetch_row();
        }
    }

    echo json_encode($queryRes);