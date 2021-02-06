//////CONTACT FORM VALIDATION
//$(document).ready(function () {
	
	//if submit button is clicked

	//$('form#form1, form#form2').on('submit',function(e){
		function contactUs(fobj){
			//e.preventDefault();

		//Get the data from all the fields
		var name = fobj.fullName; //$('input[name=fullName]');
		var email = fobj.yourEmail; //$('input[name=yourEmail]');
		var regx = /^([a-z0-9_\-\.])+\@([a-z0-9_\-\.])+\.([a-z]{2,4})$/i;
		var comment = fobj.yourMessage; //$('textarea[name=yourMessage]');
		var returnError = false;
		
		//Simple validation to make sure user entered something
		//Add your own error checking here with JS, but also do some error checking with PHP.
		//If error found, add hightlight class to the text field
		if (name.value=='') {
			name.classList.add('error');
			returnError = true;
		} else name.classList.remove('error');
		
		if (email.value=='') {
			email.classList.add('error');
			returnError = true;
		} else email.classList.remove('error');		
		
		if(!regx.test(email.value)){
          email.classList.add('error');
          returnError = true;
		} else email.classList.remove('error');
		
		
		if (comment.value=='') {
			comment.classList.add('error');
			returnError = true;
		} else comment.classList.remove('error');
		
		// Highlight all error fields, then quit.
		if(returnError == true){
			
			return false;	
		}

		//Submit the form data
		let submit = submitForm($(fobj),'php/contact.php','Thank you! We have received your message.','Submitting...');

		submit.then( data => {
			if( data == 'ok' || data == 1 ){
				//clear form fields
				fobj.reset();
				}
		});
		
		//Cancel the default behaviour of the form on submit
		return false;
	}
	//});
  
	
//});	

function submitProject(fobj){
	/* Note: you can do some frontend validation here before submiting the data just as in the contactUs function above */


	//Submit the form data
	let submit = submitForm($(fobj),'php/home-contact.php','Thank you for reaching out to us. We\'ll get in touch soon.','Submitting...');

	submit.then( data => {
		if( data == 'ok' || data == 1 ){
			//clear form fields
			fobj.reset();
			}
	});
	
	//Cancel the default behaviour of the form on submit
	return false;
}