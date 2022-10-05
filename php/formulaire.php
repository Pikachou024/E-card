<?php
include'../vendor/autoload.php';
include './sendMail.php';



//if(!empty($_POST)){

$emailExpediteur=strip_tags(trim($_POST['email']));
$emailDestinataire = strip_tags(trim($_POST['emailDestinataire']));
$message = strip_tags(trim($_POST['message']));
$img=strip_tags(trim($_POST['img']));
$copy = false;

if(isset($_POST['checkbox'])){
    $copy = true;
}

sendMail($emailExpediteur,$emailDestinataire,$message,$img,$copy);

$confirmation = "Votre email a été envoyé";
echo json_encode(['confirmation'=>$confirmation,'img'=>$img,'emailExpediteur'=>$emailExpediteur,'emailDestinateur'=>$emailDestinataire,'message'=>$message]);







