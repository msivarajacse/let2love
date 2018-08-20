<?php
include "database.php";
    session_start();
  if(!isset($_SESSION["ID"]))
{
	 echo "<script>window.open('index.php','_self')</script>";
}
$sql = "SELECT MESSAGE,USERNAME,PROFILE,LOG FROM user JOIN gchats ON user.ID = gchats.UID ORDER BY MID ASC";
$res=$db->query($sql);
		if($res->num_rows>0)
		{
                $i=0;
                echo '<ul class="collection">';
				while($row=$res->fetch_assoc())
				{
                    $i++;	
                  
            echo "
    <li class='collection-item avatar'>
      <img src='{$row["PROFILE"]}' alt='' class='circle'>
      <span class='title'><b>{$row["USERNAME"]}</b></span>
      <p>{$row["MESSAGE"]}</p>
      <a class='secondary-content'><i class=''></i></a>
    </li>";
              
                    
                }
                echo '</ul>';
             if($i>200)
             {
                   $sql ="TRUNCATE TABLE gchats";
                   if($res=$db->query($sql))
                   {
                           echo "<script>
                           var toast_gchat_deleted='Message Full Chats Cleared';
                           M.toast({html: toast_gchat_deleted});
                           </script>";
                   }  
             }
        }
        else{
           echo "<p>Chats are Cleared No chat found</p>";
        }

        echo "<br><br><br>";
?>