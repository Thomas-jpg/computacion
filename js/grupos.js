$(document).ready(function(){
    listarGrupos();
}); 
    
    function listarGrupos(){
        const tablaGrupos=$('#tablaGrupos').DataTable({
            "destroy":true,
            "ajax":{
                "method":"POST",
                "url":"../../controllers/grupos/controlador_cargarGrupos.php"
            },
            "columns":[
                {"data":"Id_grupo"},
                {"data":"Nombre"},
                {"render":function(data,type,row){
                    return row.Nombre_Docente+' '+row.Apellido_P+' '+row.Apellido_M;
                }},
                {"data":"Aula"},
                {"data":"Capacidad"},
                {"defaultContent":"<button class='botonAccion' id='grupo_btnEditar' title='Editar'><span><i class='fas fa-edit'></i></span></button><button class='botonAccion eliminar' id='grupo_btnEliminar' title='Eliminar'><span><i class='fas fa-trash'></i></span></button><button class='botonAccion Kardex' id='grupo_btnVer' title='Ver Alumnos'><span><i class='fas fa-list'></i></span></button><button class='botonAccion estatus' id='grupo_btnAgregar' title='Agregar Alumno'><span><i class='fas fa-folder-open'></i></span></button>"}
            ],
            "order":[[2,"asc"]],
            "language":idioma
        });

        // btn_EditarGrupo("#tablaGrupos tbody",tablaGrupos);
        // btn_EliminarGrupo("#tablaGrupos tbody",tablaGrupos);
        // btn_verAlumnos("#tablaGrupos tbody",tablaGrupos);
        // btn_agregarAlunmos("#tablaGrupos tbody",tablaGrupos);
    }