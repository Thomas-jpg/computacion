<script type="text/javascript" src="../../js/perfil.js"></script> 
<div class="contenedor">
    <div class="vistaPerfil">
        <div class="areaPerfil">
            <h1 class="title">Perfil</h1>
            <div class="logoPerfil">
                <img src="../../img/logoPerfil.png" alt="Perfil Usuario" id="imagenUsuario">
                <span class="cambiarImg" id="cambiarImg"><i class="fas fa-images"></i></span>
            </div>
            <div class="informacionPerfil" id="informacionPerfil">
                <i></i>
                <p></p>
            </div>
            <form action="" id="formImagen" enctype="multipart/form-data" class="ocultar">
                <input type="file" placeholder="elige una imagen" name="imagen">
                <button type="submit">cargar</button>
            </form>
            <div class="cambiarPassPerfil">
                <button id="cambiarPassPerfil" type="button">Cambiar Contraseña</button>
            </div>
        </div>
    </div>
    <div id="modalCambiarContrasena" class="modal"></div>
</div>