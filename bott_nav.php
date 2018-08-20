<nav class="fixed-bottom">
    <div class=" lite row center">
      
      <div class="col s2"><a href="post_upload_page.php" class="bott-nav"><i class="material-icons">cloud_upload</i></a></div>
      <div class="col s2"><a href="group.php" class="bott-nav"><i class="material-icons">supervisor_account</i></a></div>
      <div class="col s4"><a href="user_home.php" class="bott-nav"><span class="fa fa-heartbeat home-red"></span></a></div>
      <div class="col s2"><a href="contacts.php" class="bott-nav" ><span id="pchatcheck"></span><i class="material-icons">filter_vintage</i></a></div>
      <div class="col s2"><a href='whatsapp://send?text=The Amazing app for meme lovers! Get a Application from the link below https://goo.gl/w5WYy5  Thank You.' data-action='share/whatsapp/share' class="bott-nav" ><i class="fa fa-whatsapp"></i></div>
      </div>
  </nav>

  <script>
    setInterval(function(){
      $("#pchatcheck").load('pchatcheck.php');
    }, 20000);
</script>