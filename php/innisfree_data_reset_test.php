<?
    include_once('./innisfree_header.php');
    // http://gksmf519.dothome.co.kr/innisfree/innisfree_data_reset_test.php
    // REST API 아이디, 비밀번호
    $userId = 'gamja';
    $userEmail = '이메일 바껴라';
    $userHp = '010456456';
    $userAddress = '요맨~';

    // 비밀번호 수정
    $sql = "UPDATE innisfree_table 
            SET userEmail = '$userEmail',userHp = '$userHp',userAddress = '$userAddress'
            WHERE userId='$userId'";
    $res = mysqli_query($conn, $sql);
    
    if( $res == true ){
        echo 1;
    }
    else {
        echo 0;
    }
?>