<?php

//Retrieve form data. 
//GET - user submitted data using AJAX
//POST - in case user does not support javascript, we'll use POST instead
$name = ($_REQUEST['fullName']) ? $_REQUEST['fullName'] : $_POST['fullName'];
$email = ($_REQUEST['yourEmail']) ?$_REQUEST['yourEmail'] : $_POST['yourEmail'];
$comment = ($_REQUEST['yourMessage']) ?$_REQUEST['yourMessage'] : $_POST['yourMessage'];


//flag to indicate which method it uses. If POST set it to 1

if ($_POST) $post=1;
$errors = '';
//Simple server side validation for POST data, of course, you should validate the email
if (!$name) $errors[count($errors)] = 'Please enter your name.';
if (!$email) $errors[count($errors)] = 'Please enter your email.'; 
if (!$comment) $errors[count($errors)] = 'Please enter your message.'; 

//if the errors array is empty, send the mail
if (!$errors) {

	//recipient - set to company email
	$to = 'jevicinteserv@gmail.com';	
	//sender - from the form
	$from = $name . ' <' . $email . '>';
	
	//subject and the html message
	$subject ="Web Contact Form [Jevic]: Message from $name";	
	$message = 'Name: ' . $name . '<hr/><br/>
		       Email: ' . $email . '<hr/><br/>		
		       Message: ' . nl2br($comment) . '<br/>';

	//send the mail
	$result = sendmail($to, $subject, $message, $from);
	
	//if POST was used, display the message straight away
	if ($_POST) {
		if ($result) echo 'ok';
		else echo 'Sorry, unexpected error. Please try again later';
		
	//else if GET was used, return the boolean value so that 
	//ajax script can react accordingly
	//1 means success, 0 means failed
	} else {
		echo $result;	
	}

//if the errors array has values
} else {
	//display the errors message
	for ($i=0; $i<count($errors); $i++) echo $errors[$i] . "\n";
	//echo '<a href="index.html#contact">Back</a>';
	exit;
}


//Simple mail function with HTML header
function sendmail($to, $subject, $message, $from) {
	$headers = "MIME-Version: 1.0" . "\r\n";
	$headers .= "Content-type:text/html;charset=utf-8" . "\r\n";
	$headers .= 'From: ' . $from . "\r\n";
	
	$result = mail($to,$subject,$message,$headers);
	
	return ($result)? 1 : 0;
}

?>