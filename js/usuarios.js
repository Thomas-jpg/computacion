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
            {"data":function(row,type,val,meta){
                switch (row.Tipo_usuario) {
                    case '1':
                        return row.Tipo_usuario_filter = 'Administrador';
                        break;
                    case '2':
                        return row.Tipo_usuario_filter = 'Alumno';
                        break;
                    case '3':
                        return row.Tipo_usuario_filter = 'Administrativo';
                        break;
                    case '4':
                        return row.Tipo_usuario_filter = 'Docente';            
                        break;

                    default:
                        break;
                }
            }},
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