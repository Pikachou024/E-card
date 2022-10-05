<?php
use Symfony\Component\Mime\Email;
use Symfony\Component\Mailer\Mailer;
use Symfony\Component\Mailer\Transport;

const MAILER_DSN = 'smtp://f0bb83f2a6b9e5:59a6675b21c71d@smtp.mailtrap.io:2525?encryption=tls&auth_mode=login';

function sendMail(string $emailExpediteur,string $emailDestinataire,string $message, $img, $copy){
    $transport = Transport::fromDsn(MAILER_DSN);
    $mailer = new Mailer($transport);
    $email = (new Email())
//        ->from('expediteur@example.test')
//        ->to('destinataire@here.test')
        ->from($emailExpediteur)
        ->to($emailDestinataire)
//        ->cc(null)
        ->priority(Email::PRIORITY_HIGHEST)
        ->subject('Dessin E-card')
        ->text($message)
        ->html('<img src='.$img.'></br><strong>'.$message.'</strong> ');
    if($copy){
        $email->addTo($emailExpediteur);
    }

    $mailer->send($email);
}



