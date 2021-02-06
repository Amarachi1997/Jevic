


//for the carousel


$('.carousel.carousel-slider').carousel({
  fullWidth: true,
  indicators: false
});


// move next carousel
$('.moveNextCarousel').click(function(e){
  e.preventDefault();
  e.stopPropagation();
  $('.carousel').carousel('next');
});

// move prev carousel
$('.movePrevCarousel').click(function(e){
  e.preventDefault();
  e.stopPropagation();
  $('.carousel').carousel('prev');
});









function openNav() {
  document.getElementById("myNav").style.display = "block";
  
}

function closeNav() {
  document.getElementById("myNav").style.display = "none";
}

/*Update: I commented out the options arg because i cant see where you initialized it and it is causing error in the javascript */

//pop up js Initialization
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems /*, options */);
});

// Or with jQuery

$(document).ready(function(){
  $('.modal').modal();
});



document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.slider');
  var instances = M.Slider.init(elems /*, options */);
});

// Or with jQuery

$(document).ready(function(){
  $('.slider').slider();
});


document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.scrollspy');
  var instances = M.ScrollSpy.init(elems /*, options */);
});

// Or with jQuery

$(document).ready(function(){
  $('.scrollspy').scrollSpy();
});

