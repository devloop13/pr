<script type="text/javascript">
 function myFunction(){
var x = document.getElementsByClassName("passphrase");
 for( var i = 0; i <2; i ++){
   if(x[i].type === "password"){
   x[i].type = "text";
} else{
   x[i].type = "password";
}
}
 }

</script>
