<?php
include "database.php";
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>let2love &hearts;</title>
    <meta name="description" content="">
    <meta name="keywords" content="let,2,love,let2love,letslove,chatting tamil">
    <meta name="author" content="Praveenram Balachandran">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/css/materialize.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" />
    <!-- <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" rel="stylesheet"> -->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Audiowide" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Baumans" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
    <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
    <!-- <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js"></script> -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-beta/js/materialize.min.js"></script>
    <script>
    var toast_exists = '<span>Mail Already Exists..</span><button class="btn-flat toast-action"><span class="fa fa-ban"></span></button>';
    var toast_reg_success = '<span>Ready to love ... 💖</span><button class="btn-flat toast-action  text-green"><span class="fa fa-check-circle"></span></button>';
    var toast_reg_failed = '<span>User Registration Failed Please try after some time</span><button class="btn-flat toast-action text-red"><span class="fa fa-"></span></button>';
    </script>
</head>

<body>
    <br>
    <br>
    <br>
    <div class="container">
    						<?php
	if(isset($_POST["submit"]))
		{
			$username=$_POST["username"];
$password=$_POST["password"];
$email=$_POST["email"];
$dob=$_POST["dob"];
$gender=$_POST["gender"];
$phone=$_POST["phone"];
            $enpass=base64_encode($password);
             $ulenpass=base64_encode($enpass);
		$sql="SELECT * FROM user WHERE EMAIL='$email';";
		$res=$db->query($sql);
		//echo $res->num_rows;
			if($res->num_rows>0)
			 {
                echo '<script>M.toast({html: toast_exists});</script>';
			 }
			else{
				$sql="INSERT INTO user (USERNAME,PASSWORD,EMAIL,DOB,GENDER,PHONE) VALUES('$username','$ulenpass','$email','$dob','$gender','$phone');";
					
				if($db->query($sql))
				{
                echo '<script>M.toast({html: toast_reg_success});
                setTimeout(function(){
window.open("index.php","_self");
  
}, 2000);</script>';
				}
				else
				{
				echo '<script>M.toast({html: toast_reg_failed});</script>';
				}
			}
}
?>
        <div class="row">
            <div class="col s1"></div>
            <div class="col s10  lite ">
                
                <h3 class="">Let 2 Love <span class="fa fa-heart" style="color:red;"></span> </h3>
                <div class="text-center">
                    <button class="btn text-center color2">Create New Free Account</button>
                </div>
                <div class="divider"></div>
                <form action="<?php echo $_SERVER["PHP_SELF"]; ?>" method="post" autocomplete="off" id="registration">
                    <div class="input-field col s12">
                        <i class="material-icons prefix"><span class="fa fa-user"></span></i>
                        <input id="username" type="text" required name="username" class="validate" autofocus>
                        <label for="username">User Name</label>
                    </div>
                    <div class="input-field col s12">
                        <i class="material-icons prefix"><span class="fa fa-lock"></span></i>
                        <input id="password" pattern=".{0}|.{5,30}" type="password" required name="password" class="validate">
                        <label for="password">Password</label>
                    </div>
                    <div class="input-field col s12">
                        <i class="material-icons prefix"><span class="fa fa-envelope"></span></i>
                        <input id="email" type="email" name="email" required class="validate">
                        <label for="email">Email ID</label>
                    </div>
                    <div class="input-field col s12">
                        <i class="material-icons prefix"><span class="fa fa-birthday-cake"></span></i>
                        <input id="dob" type="text" required name="dob" class="validate datepicker">
                        <label for="dob">Date of Birth</label>
                    </div>
                    <div class=" col s12" id="gender">
                        <i class="material-icons prefix"><span class="fa fa-venus-mars"></span></i>
                        <label>
                            <input name="gender"  type="radio" required value="MALE"checked />
                            <span>Male</span>
                        </label><label>
                            <input name="gender" type="radio" required value="FEMALE"/>
                            <span>Female</span>
                        </label>
                    </div>
                    <div class="input-field col s12">
                        <i class="material-icons prefix"><span class="fa fa-phone"></span></i>
                        <input id="phone" name="phone" type="tel" class="validate ">
                        <label for="phone">Phone No. (optional)</label>
                    </div>
                    <div class="input-field col s12 center-align ">
                        <button class="btn waves-effect waves-light btn-block bold" type="submit" id="submit" name="submit">Register 
                            <i class="fa fa-user-plus "></i>
                        </button>
                    </div>
                </form>

            </div>
            <div class="col s1"></div>
        </div>
        <div class="row">
        <div class="col s1"></div>
        <div class="col s10 lite">
        <p>Having Account .? <a href="index.php" class="">Login Here</a></p>
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