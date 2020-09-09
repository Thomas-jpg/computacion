$(document).ready(function(){
    listarUsuarios();
});

function listarUsuarios(){
    const tablaUsuarios=$('#tablaUsuarios').DataTable({
        "destroy":true,
        "ajax":{
            "method":"POST",
            "url":"../../controllers/usuario/controlador_cargarUsuarios.php"
        },
        "columns":[
            {"data":"Usuario"},
            {"data":"Tipo_usuario"},
            {"defaultContent":"<button class='botonAccion eliminar' id='alumno_btnEliminar' title='Eliminar'><span><i class='fas fa-trash'></i></span></button>"}
        ],
        "order":[[0,"asc"]],
        "language":idioma
    });

    // btn_EditarAlumno("#tablaPrincipal tbody",tablaPrincipal);
    // btn_EliminarAlumno("#tablaPrincipal tbody",tablaPrincipal);
    // btn_KardexAlumno("#tablaPrincipal tbody",tablaPrincipal);
    // btn_EstatusAlumno("#tablaPrincipal tbody",tablaPrincipal);
}