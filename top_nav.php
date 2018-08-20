<div class="fixed-top row litetp">
<div class="row">
     <a href="#" data-target="slide-out" class="sidenav-trigger left propic"><img src="<?php echo $profilepic;?>" class="side-pro"></a>
    <a href="#" class=" right text-black  nmode" id="refresh" title="refresh the page"><span class="fa fa-undo"></span></a>
      </div>
 </div>
 <!-- <nav> navbar content here  </nav> -->
  <ul id="slide-out" class="sidenav">
    <li><div class="user-view">
      <div class="background">
        <img src="img/sidecover.jpg">
      </div>
      <a href="profile.php"><img class="circle " src="<?php echo $profilepic;?>"></a>
      <a href="#name"><span class="white-text name" style="text-transform:uppercase;"><?php echo $profilename; ?></span></a>
      <a href="#email"><span class="white-text email"><?php echo $profileemail; ?></span></a>
    </div></li>
 <li><div class="divider"></div></li>
  
    <?php echo "<li class='center'><i class='' style='color:grey;'><b>  $profilebio </b></i></li>"; ?>
  
    <li><div class="divider"></div></li>
 
    <li><div class="divider"></div></li>
    
    <li class=""><a href="profile.php?id=<?php echo $row["ID"]; ?> " class="waves-effect"><i class="material-icons">account_circle</i> Profile</a></li>
  
    <li><div class="divider"></div></li>
    
    <li><a href="logout.php" class="waves-effect"><i class="material-icons">power_settings_new</i> Logout</a></li>
     
    <li><div class="divider"></div></li>


    <li><div class="divider" style="margin-top:90%;"></div></li>

    <li><a href="about.php" class="waves-effect " style=""><i class="material-icons">face</i>about</a></li>
    <li><div class="divider"></div></li>
    
    
</ul>


<script>

$("document").ready(function(){
 $("#refresh").click(function(){
  // location.reload(true);
window.location.href = "";
   });
});

</script>