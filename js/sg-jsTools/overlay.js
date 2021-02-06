/****Create function to display specified form ***/
var activeForm;
function showElem(frm){
    /*check if there is an active form*/
    if(activeForm !=""){
        //hide the active form and display the current form specified in the click event
        $(activeForm).hide();
    }
    
    $('.overlay-container').fadeIn();
    //Display the form after 3 miliseconds
    setTimeout(function(){
    $(frm).fadeIn();
    },300);
    //Initialize the activeForm to the currently displayed form.
    activeForm = frm;
    
}

/*****Create function to hide forms****/
function hideElem(){
    var overlayContainer = $(".overlay-container");
    $(activeForm).fadeOut();
    setTimeout(function(){
    overlayContainer.fadeOut();
    },300);
}