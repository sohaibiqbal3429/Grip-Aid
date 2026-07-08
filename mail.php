<?php
$cf_name = $_POST['name'];
$cf_email = $_POST['email'];
$cf_phone = $_POST['phone'];
$cf_subject = $_POST['subject'];
$cf_message = $_POST['message'];

$mail_to = 'info@themeearth.com';
$subject = 'Message from a site visitor '.$cf_name;

$body_message = 'From: '.$cf_name."\n";
$body_message .= 'E-mail: '.$cf_email."\n";
$body_message .= 'Subject: '.$cf_subject."\n";
$body_message .= 'Phone No: '.$cf_phone."\n";
$body_message .= 'Message: '.$cf_message;

$headers = 'From: '.$cf_email."\r\n";
$headers .= 'Reply-To: '.$cf_email."\r\n";

$mail_status = mail($mail_to, $subject, $body_message, $headers);

if ($mail_status) { ?>
	<script language="javascript" type="text/javascript">
		alert('Your Message Has Been Send. We will contact you shortly.');
		window.location = 'index.php';
	</script>
<?php
}
else { ?>
	<script language="javascript" type="text/javascript">
		alert('Message failed. Please, send an email to info@themeearth.com');
	</script>
<?php
}
?>