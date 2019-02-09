function changeImage(id)
{
  var x = document.getElementById(id);
  var v = x.getAttribute("src");
  if(v == "../IMAGES/pompe_off.png"){
  	v = "../IMAGES/pompe_on.png";
  	x.className = "rotating";
  }else{
  	v = "../IMAGES/pompe_off.png";
  	x.className = "rotating_null";
  }
  x.setAttribute("src", v);	
}