<?php
	include "database.php";
session_start();
if(!isset($_SESSION["ID"]))
{
  header('Location:index.php');

	//  echo "<script>window.open('index.php','_self')</script>";
}
else{
    $id=$_SESSION["ID"];
    $sql="SELECT * FROM user WHERE ID=".$id;;
    $res=$db->query($sql);
			if($res->num_rows>0)
			{
                $row=$res->fetch_assoc(); 
                 $profilepic=$row["PROFILE"];
                $profilename=$row["USERNAME"];
                $profileemail=$row["EMAIL"];
                $profilebio=$row["BIO"];
                $id=$row["ID"];
                
            }
        }
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <?php include "header.php"; ?>
<script src="js/postupload.js"></script>
</head>

<body>
    <?php include "top_nav.php"; ?>
    <div class="fifty"></div>
<div class="row">
   <p><b> Post your Memories</b></p>
    <div class="col s12">
      <ul class="tabs">
        <li class="tab col s6"><a class="active" href="#textonly">Post a Status</a></li>
        <li class="tab col s6"><a   href="#textimg">Upload a Picture</a></li>
      </ul>
    </div>
<br>
<br>
<br>
<br>
<br>

    <div id="textonly" class="col s12 center">
    <div class="row">
        <div class="col s1"></div>
           <div class="col s10" id="">
                <form>
                <input type="hidden" value="<?php echo $id ?>" id="textuid" >
                <div id="froala-editor">
                  <p id="froalatext"></p>
                </div>
                <center>
                <button class="btn" id="check" style="width:90%;"> <span class="fa fa-check"></span></button>
                </center>
                </form>
           
           </div>
        <div class="col s1"></div>
       </div>   
    </div>
<p id="val"><span id='impasdf'></p>
    
   <div id="textimg" class="col s12 center">
        <div class="row">
            <div class="col s1"></div>
            <div class="col s10">
                    <form id="upload_form" enctype="multipart/form-data" method="post">
                
                <textarea id="imgtext"></textarea>

                <span class="deep-purple btn" id="label_span"><label for="file1" class="center"><span class="fa fa-cloud-upload"></span><span id="labe_span" style="text-transform:none;"> Select Picture</span> </label></span>
                        <br>
                        <input type="file" name="file1" id="file1" style="visibility:hidden !important;"><br>
                        <input type="button" value="Upload File"  id="imgcheck" class="btn"><br><br><br>
                        <center><div class="progress " style="width:70%; " >
                        <div class=" determinate " id="pgbar" style=""></div>
                        </div>
                     </center>
                         <progress id="progressBar" value="0" max="100" style="width: 70%; visibility:hidden;" ></progress><br>
                        <p id="status"></p>
                        <p id="loaded_n_total"></p>
                <center>
               
                </center>
                </form>
            </div>
            <div class="col s1"></div>
        </div>
    </div>
  </div>	
        
        
    
<br><br><br>
 
 <?php 
include "bott_nav.php";
?>



</body>

<script>
$("document").ready(function(){
    var toast_post_failed="Post Upload Failed Please Try after some time dont use single ' ";
    var toast_type_something="Please type something and try again ";
    var toast_post_success="Post Uploaded Successfully ";
    $("#check").click(function(){
        var t=$("#froalatext").html();
        var u=$("#textuid").val();
 
       if(t!="<br>"){
        $.post("post_text.php",{uid:u,msg:t},function(data){
            
            if(data=="success"){
                 M.toast({ html: toast_post_success });
                
               window.open('user_home.php','_self');
            }
            else{
                 M.toast({ html: toast_post_failed });
            }
            });
       }
       else{
             M.toast({ html: toast_type_something });
       }
    });
});
$("#imgcheck").click(function(){

    var text = $("#imgtext").val();
    if(text!="<br>"){
    var php='$_SESSION["CAPTION"]=';
    var ntxt=php+text;
    $("#value").val(text);
    document.cookie = "CAPTION="+text;
    // alert(<?php echo $_COOKIE["CAPTION"];?>);
    uploadPost();
//  setTimeout(function() {
//            
//         }, 1000);
    }
    else{
        M.toast({ html: toast_type_something });
    }
});
</script>

</html>