<?php
	include "database.php";
    session_start();
     if(isset($_SESSION["ID"]))
    {
	     $sql="SELECT * FROM user WHERE ID=".$_SESSION["ID"];
            // echo $sql;
			$res=$db->query($sql);
			if($res->num_rows>0)
			{
				$row=$res->fetch_assoc(); 
				
                $id=$row["ID"];
                
               $sql='UPDATE user SET STATUS = "OFFLINE" WHERE user.ID ='.$id;;
               if($db->query($sql))
                {
                 unset ($_SESSION["AID"]);
	unset ($_SESSION["ID"]);
	session_destroy();
  header('Location:index.php');
	// echo "<script>window.open('index.php','_self')</script>";
                }
        
        }
    }
    unset ($_SESSION["ID"]);
	session_destroy();

	
?>