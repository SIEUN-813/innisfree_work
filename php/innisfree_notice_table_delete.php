<?
    include_once('./innisfree_header.php');

    $idx = $_POST['idx'];
    
    // 공지사항 게시글 테이블 삭제
    $sql = "DELETE FROM innisfree_notice_table          
            WHERE   idx='$idx'";
    $result = mysqli_query($conn, $sql);
    
    if($result==true){
        echo 1;
    }
    else{
        echo 0;
    }

?>