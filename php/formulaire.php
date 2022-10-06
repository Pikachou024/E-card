<?php
include'../vendor/autoload.php';
include './sendMail.php';

$error =null;


$emailExpediteur=strip_tags(trim($_POST['email']));
$emailDestinataire = strip_tags(trim($_POST['emailDestinataire']));
if(empty($emailDestinataire || $emailExpediteur)){
    $error ='Veuillez remplir le champ ';
}
$message = strip_tags(trim($_POST['message']));
$img=strip_tags(trim($_POST['img']));
$copy = false;

if(isset($_POST['checkbox'])){
    $copy = true;
}

if($error == null){
    sendMail($emailExpediteur,$emailDestinataire,$message,$img,$copy);
}

$confirmation = "Votre email a été envoyé";
echo json_encode(['confirmation'=>$confirmation,'error'=> $error]);







