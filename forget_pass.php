<?php
	include "database.php";
 
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <?php include "header.php"; ?>
 
</head>

<body>
<div class="fifty"></div>
   
    <div class="container">
    <div class="row">
    <div class="col s1"></div>
    <div class="col s10 lite">
    <h3 class="">Let 2 Love <span class="fa fa-heart" style="color:red;"></span> </h3>
                <div class="text-center">
                    <button class="btn text-center color2">Forget Password</button>
                </div>
                <div class="divider"></div>
                <form action="<?php echo $_SERVER["PHP_SELF"]; ?>" method="post" autocomplete="off" id="sigin">
                    
                    <div class="input-field col s12">
                        <i class="material-icons prefix"><span class="fa fa-envelope"></span></i>
                        <input id="email" type="email" name="email" required class="validate">
                        <label for="email">Email ID</label>
                    </div>
                       <div class="input-field col s12 center-align ">
                        <button class="btn waves-effect waves-light btn-block bold" type="submit" id="submit" name="submit">Get Password 
                            <i class="fa fa-key "></i>
                        </button>
                    </div>
                    </form>
                    <?php
				if(isset($_POST["submit"])) //submit invocation
				{
						
				 $useremail=$_POST["email"];	//getting mail
				 
				$email="estudylib@gmail.com";
                echo '<script>
                var toast_sent_success="Password Sent to your mail address please check inbox or spam folder";
                var toast_sent_fail="Sorry Something Went wrong please try after sometime";
                var toast_sent_invalid="Please Check your details";
                </script>';
					
				$sql="SELECT PASSWORD FROM user WHERE EMAIL='$useremail';";
				$res=$db->query($sql);
				if($res->num_rows>0)
				{
				while($row=$res->fetch_assoc())
					$password=$row['PASSWORD'];
                $enpass=base64_decode($password);
                $ulenpass=base64_decode($enpass);
					$to=$useremail; // Receiver Email ID, Replace with your email ID
			            	$subject='Password Forget Request from Let 2 Love ❤️';
							$message="Mail :".$useremail."\n"."\n"."Your Password is: ".$ulenpass."\n Thank you";
							$headers="From: estudylib@gmail.com";
							$retval = mail ($to,$subject,$message,$headers);
							if($retval == true){
				echo '<script>M.toast({html: toast_sent_success});</script>';
								
							}
							else{
				echo '<script>M.toast({html: toast_sent_fail});</script>';
								
							} 
				}
				
				else
				{
				echo '<script>M.toast({html: toast_sent_invalid});</script>';
				// echo "<p class='text-danger'>Check your full Details which is given by register time...</p>";
				}
				}	
			?>
			
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
        <p>Remember your Password..?<a href="index.php" class="text-blue">Login Here</a></p>
                
            </div>
        </div>
        <div class="col s1"></div>
        </div>
    </div>


</body>

</html>