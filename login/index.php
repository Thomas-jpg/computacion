<?php 
    session_start();
    if(isset($_SESSION['S_IDUSUARIO_C'])){
        header('Location: ../views/');
    }

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="../img/favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="../css/normalize.css">
    <link rel="stylesheet" href="css/login.css">
    <link rel="stylesheet" href="../css/modal.css">
    <title>Escuela de Ciencias</title>
</head>
<body>
    <header>
        <div class="ciencias">
            <img src="../img/logo_ciencias.png" alt="Escuela de Ciencias"><h1>Escuela de Ciencias</h1>
        </div>
    </header>
    <div class="container">
        <div class="login-container">
            <div class="logo">
                <img src="../img/user3.png" alt="Escuela de Ciencias" width="100px" height="100px">
                <div class="form">
                    <form action="#" method="POST" id="ingresar">
                        <h3>INICIAR SESIÓN</h3>
                        <input type="text" id="usuLogin" placeholder="Usuario" name="user" value="">
                        <input type="password" id="usuPass" placeholder="Contraseña" name="pass" value="">
                        <button type="submit" class="loginBtn">INGRESAR</button>
                    </form>
                    <hr>
                    <i>¿No tienes cuenta? <a href="#" id="registro">Registrarse</a></i>
                </div>
                <div class="registro">
                    <h3>REGISTRO USUARIO</h3>
                    <input type="text" placeholder="Matricula" required>
                    <input type="password" placeholder="Contraseña" required>
                    <input type="password" placeholder="Confirmar Contraseña" required>
                    <button class="loginBtn" type="submit" id="registrar">REGISTRAR</button><br>
                    <a href="#" id="iniciarSesion"><i>Iniciar Sesión</i></a>
                </div>
            </div>
        </div>
    </div>
    <div id="modalLogin" class="modal">
       
    </div>
    <script src="js/login.js"></script>
</body>
</html>