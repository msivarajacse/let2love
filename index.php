<?php
	include "database.php";
    session_start();
    if(isset($_SESSION["ID"]))
    {
  header('Location:index.php');
        
	//  echo "<script>window.open('pro_check.php','_self')</script>";
        
    }
?>

<!DOCTYPE html>
<html lang="en">

<head>
   <?php include "header.php"; ?>
</head>

<body>
   <div class="fifty"></div>
   
    <div class="container">
    						<?php
	if(isset($_POST["submit"]))
		{
            $email=$_POST["email"];
        $password=$_POST["password"];
		$enpass=base64_encode($password);
             $ulenpass=base64_encode($enpass);	
            $sql="SELECT * FROM user WHERE EMAIL='$email' AND PASSWORD='$ulenpass'";
            // echo $sql;
			$res=$db->query($sql);
			if($res->num_rows>0)
			{
				$row=$res->fetch_assoc(); 
				$_SESSION["ID"]=$row["ID"];
                $_SESSION["USERNAME"]=$row["USERNAME"];
                $id=$row["ID"];
                
               $sql='UPDATE user SET STATUS = "ONLINE" WHERE user.ID ='.$id;;
               if($db->query($sql))
                {
                 echo "<script>window.open('pro_check.php','_self')</script>";
                }

                else{

                    echo '<script>M.toast({html: toast_login_failed});</script>';

                }
                    
               
			}
			else
			{
                echo '<script>M.toast({html: toast_login_invalid});</script>';
			
			}
		}
?>
        <div class="row">
            <div class="col s1"></div>
            <div class="col s10  lite ">
                
                <h3 class="">Let 2 Love <span class="fa fa-heart" style="color:red;"></span> </h3>
                <div class="text-center">
                    <button class="btn text-center color2">Log in</button>
                </div>
                <div class="divider"></div>
                <form action="<?php echo $_SERVER["PHP_SELF"]; ?>" method="post" autocomplete="off" id="sigin">
                    
                    <div class="input-field col s12">
                        <i class="material-icons prefix"><span class="fa fa-envelope"></span></i>
                        <input id="email" type="email" name="email" required class="validate">
                        <label for="email">Email ID</label>
                    </div>
                    <div class="input-field col s12">
                        <i class="material-icons prefix"><span class="fa fa-lock"></span></i>
                        <input id="password" pattern=".{0}|.{5,30}" type="password" required name="password" class="validate">
                        <label for="password">Password</label>
                    </div>
                    
                    <div class="input-field col s12 center-align ">
                        <button class="btn waves-effect waves-light btn-block bold" type="submit" id="submit" name="submit">Login 
                            <i class="fa fa-sign-in "></i>
                        </button>
                    </div>
                </form>

            </div>
            <div class="col s1"></div>
        </div>
        <div class="row">
        <div class="col s1"></div>
        <div class="col s10 lite">
            <div class="col s5">
        <p>Don't Have the Account .? <a href="reg.php" class="text-blue"> Register Here</a></p>
                
            </div>
            <div class="col s5 ">
        <p>Stuck with Login..?<a href="forget_pass.php" class="text-blue">Forget Password</a></p>
                
            </div>
        </div>
        <div class="col s1"></div>
        </div>
    </div>


</body>
<script>
    $(document).ready(function() {
        $('.datepicker').datepicker();
    
    });
</script>

</html>