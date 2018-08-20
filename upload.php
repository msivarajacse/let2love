<?php
	include "database.php";
    session_start();
  if(!isset($_SESSION["ID"]))
{
  header('Location:index.php');

	//  echo "<script>window.open('index.php','_self')</script>";
}
else{
  $sql='SELECT * FROM user WHERE ID='.$_SESSION["ID"];
  $res=$db->query($sql);
if($res->num_rows>0)
			{
                $row=$res->fetch_assoc();
                $profilepic=$row["PROFILE"];
                $profilename=$row["USERNAME"];
                $profileemail=$row["EMAIL"];
                $profilebio=$row["BIO"];
      }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
<?php include "header.php"; ?>

</head>

<body>
<?php include "top_nav.php"; ?>
<div class="fifty"></div>
<div class="container">
<div class="row">
<div class="col s1"></div>
<div class="col s10 lite">
<form method="post">
 <div class="input-field col s12">
                        <i class="material-icons prefix"><span class="fa fa-badge"></span></i>
                        <input id="ptitle" type="text" required name="ptitle" class="validate" autofocus>
                        <label for="ptitle">Post Title</label>
                    </div>
                    <div class="input-field col s12">
                        <i class="material-icons prefix"><span class="fa fa-badge"></span></i>
                      <textarea id="post" class="materialize-textarea" data-length="120"></textarea>
                        <label for="post">Post</label>
                    </div>
                   <input type="file" name="img">
                      <div name="chips" class="chips chips-autocomplete"></div>


<input type="submit" name="submit">

</form>

</div>
<div class="col s1"></div>
</div>
</div>

<?php
if(isset($_POST["submit"])){
    print_r($_POST);
}
?>



<?php include "bott_nav.php"; ?>

</body>
<script>
  $(document).ready(function() {
    $('textarea#post').characterCounter();

     $('.chips-autocomplete').chips({
    autocompleteOptions: {
      data: {
        'Apple': null,
        'Microsoft': null,
        'Google': null
      },
      limit: Infinity,
      minLength: 1
    }
  });
  });
</script>
</html>