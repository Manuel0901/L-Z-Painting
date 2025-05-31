<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // Si usas Composer para cargar PHPMailer

// Simula la validación y procesamiento de los datos
$response = array();

// Verifica si se recibió el formulario con los datos
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Recibe los datos del formulario
    $name = isset($_POST['name']) ? $_POST['name'] : '';
    $phone = isset($_POST['phone']) ? $_POST['phone'] : '';
    $email = isset($_POST['email']) ? $_POST['email'] : '';
    $message = isset($_POST['message']) ? $_POST['message'] : '';

    // Aquí puedes hacer más validaciones o procesar los datos
    if (empty($name) || empty($phone) || empty($email) || empty($message)) {
        // Si falta algún campo
        $response['success'] = false;
        $response['message'] = 'Todos los campos son requeridos.';
    } else {
        // Si todo está bien, enviar correo
        $mail = new PHPMailer(true);

        try {
            // Configuración del servidor SMTP de Hostinger
            $mail->isSMTP(); // Usar SMTP
            $mail->Host = 'smtp.hostinger.com'; // Servidor SMTP de Hostinger
            $mail->SMTPAuth = true; // Autenticación SMTP
            $mail->Username = 'Paintingcompany@lzpainting.com'; // Tu correo de Hostinger
            $mail->Password = 'Color25pinturas!'; // Contraseña del correo de Hostinger
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // Cifrado
            $mail->Port = 587; // Puerto SMTP

            // Remitente y destinatarios
            $mail->setFrom('Paintingcompany@lzpainting.com', 'L & Z Painting'); // Tu correo de empresa
            $mail->addAddress('Lzpainting2321@gmail.com', 'Nombre del destinatario'); // Correo al que se enviará

            // Contenido del correo
            $mail->isHTML(true); // Enviar correo como HTML
            $mail->Subject = 'Nuevo mensaje de Contacto';
            $mail->Body    = "Has recibido un nuevo mensaje desde el formulario de contacto:<br><br>".
                             "<b>Nombre:</b> $name<br>".
                             "<b>Teléfono:</b> $phone<br>".
                             "<b>Email:</b> $email<br>".
                             "<b>Mensaje:</b> $message";

            // Enviar el correo
            $mail->send();
            $response['success'] = true;
            $response['message'] = '¡Mensaje enviado con éxito!';
        } catch (Exception $e) {
            $response['success'] = false;
            $response['message'] = "Error al enviar el mensaje: {$mail->ErrorInfo}";
        }
    }
} else {
    $response['success'] = false;
    $response['message'] = 'Método de solicitud no permitido.';
}

// Devuelve la respuesta como JSON
header('Content-Type: application/json');
echo json_encode($response);
?>
