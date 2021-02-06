<?php

//Retrieve form data. 
//GET - user submitted data using AJAX
//POST - in case user does not support javascript, we'll use POST instead
$name = ($_REQUEST['fullName']) ? $_REQUEST['fullName'] : $_POST['fullName'];
$email = ($_REQUEST['emailAddress']) ?$_REQUEST['emailAddress'] : $_POST['emailAddress'];
$project_type = ($_REQUEST['projectType']) ?$_REQUEST['projectType'] : $_POST['projectType'];
$company_name = ($_REQUEST['companyName']) ?$_REQUEST['companyName'] : $_POST['companyName'];
$phone = ($_REQUEST['phoneNumber']) ?$_REQUEST['phoneNumber'] : $_POST['phoneNumber'];
$budget = ($_REQUEST['yourBudget']) ?$_REQUEST['yourBudget'] : $_POST['yourBudget'];
$comment = ($_REQUEST['yourMessage']) ?$_REQUEST['yourMessage'] : $_POST['yourMessage'];


//flag to indicate which method it uses. If POST set it to 1

if ($_POST) $post=1;
$errors = array();
//Simple server side validation for POST data, of course, you should validate the email
if (!$name) $errors[count($errors)] = 'Please enter your name.';
if (!$email) $errors[count($errors)] = 'Please enter your email.'; 
if (!$phone) $errors[count($errors)] = 'Please enter your phone number.'; 
if (!$company_name) $errors[count($errors)] = 'Please enter your company Name.'; 
if (!$project_type) $errors[count($errors)] = 'Please enter your project type.'; 
if (!$budget) $errors[count($errors)] = 'Please enter your budget.'; 
if (!$comment) $errors[count($errors)] = 'Please enter your message.'; 

//if the errors array is empty, send the mail
if (!$errors) {

	//recipient - set to company email
	$to = 'jevicinteserv@gmail.com';	
	//sender - from the form
	$from = $name . ' <' . $email . '>';
	
	//subject and the html message
	$subject ="Project Request -Contact Form [Jevic]: Message from $name";	
	$message = 'Name: ' . $name . '<hr/><br/>
		       Email: ' . $email . '<hr/><br/>		
		       Phone: ' . $phone . '<hr/><br/>		
		       Company Name: ' . $company_name . '<hr/><br/>		
		       Project Type: ' . $project_type . '<hr/><br/>		
		       Budget: ' . $budget . '<hr/><br/>		
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