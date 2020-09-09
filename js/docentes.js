$(document).ready(function(){
    listarDocentes();
});

function listarDocentes(){
    const tablaDocentes=$('#tablaDocentes').DataTable({
        "destroy":true,
        "ajax":{
            "method":"POST",
            "url":"../../controllers/docentes/controlador_cargarDocentes.php"
        },
        "columns":[
            {"data":"Nombre_Docente"},
            {"data":"Apellido_P"},
            {"data":"Apellido_M"},
            {"defaultContent":"<button class='botonAccion' id='alumno_btnEditar' title='Editar'><span><i class='fas fa-edit'></i></span></button><button class='botonAccion eliminar' id='alumno_btnEliminar' title='Eliminar'><span><i class='fas fa-trash'></i></span></button>"}
        ],
        "order":[[1,"asc"]],
        "language":idioma
    });

    // btn_EditarAlumno("#tablaPrincipal tbody",tablaPrincipal);
    // btn_EliminarAlumno("#tablaPrincipal tbody",tablaPrincipal);
    // btn_KardexAlumno("#tablaPrincipal tbody",tablaPrincipal);
    // btn_EstatusAlumno("#tablaPrincipal tbody",tablaPrincipal);
}