<?
    include_once('./innisfree_header.php');

    $userPw = $_POST['userPw'];

    $sql = "SELECT * FROM innisfree_table
            WHERE userPw='$userPw'";
    
    $res = mysqli_query($conn, $sql);

    if( mysqli_num_rows($res) > 0 ){
        $record = mysqli_fetch_array($res);
        // echo 1;
        echo '{"아이디": "'.$record['userId'].'", "이름": "'.$record['userName'].'", "휴대폰": "'.$record['userHp'].'", "주소": "'.$record['userAddress'].'", "생년월일": "'.$record['userBirth'].'", "비밀번호": "'.$record['userPw'].'","이메일": "'.$record['userEmail'].'" }';
    }
    else {
        echo '';
    }


?>