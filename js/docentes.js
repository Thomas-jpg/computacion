$(document).ready(function(){
    listarDocentes();
});
//evento para agregar docentes
document.querySelector('#agregarDocente').addEventListener('click',btn_agregarDocente);

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
            {"defaultContent":"<button class='botonAccion' id='docente_btnEditar' title='Editar'><span><i class='fas fa-edit'></i></span></button><button class='botonAccion eliminar' id='docente_btnEliminar' title='Eliminar'><span><i class='fas fa-trash'></i></span></button>"}
        ],
        "order":[[1,"asc"]],
        "language":idioma
    });

    btn_EditarDocente("#tablaDocentes tbody",tablaDocentes);
    btn_EliminarDocentes("#tablaDocentes tbody",tablaDocentes);
}
//funcion para agregar docente
function btn_agregarDocente(){
    let html=`
        <div class="form_editar">
            <div>
                <label class="form_Label">Nombre</label>
                <div class="input">
                    <span class="form_icon"><i class="fas fa-user"></i></span>
                    <input type="text" name="docente" id="nombreDocente" value="" placeholder="Nombre">
                </div>
            </div>
            <div>
                <label class="form_Label">Apellido Paterno</label>
                <div class="input">
                    <span class="form_icon"><i class="fas fa-user"></i></span>
                    <input type="text" name="apellidoP" id="apellidoPDocente" value="" placeholder="Apellido Paterno">
                </div>
            </div>
            <div>
                <label class="form_Label">Apellido Materno</label>
                <div class="input">
                    <span class="form_icon"><i class="fas fa-user"></i></span>
                    <input type="text" name="apellidoMdocente" id="apellidoMDocente" value="" placeholder="Apellido Materno">
                </div>
            </div>
        </div>
    `;
    Modales.mostrarModal('Nuevo Docente',html,'50','info','#modalAgregarDocente');
    Agregar_NuevoDocente('#modalAgregarDocente');
}
//guardar registro del nuevo docente
function Agregar_NuevoDocente(objetivo){
    let formRegistroDocente;
    let alerta= document.createElement('p');
    alerta.className="alerta-danger";
    elemento= document.querySelector(`${objetivo}`);
    
    elemento.addEventListener('click',e =>{
        e.preventDefault();
        e.stopImmediatePropagation();
        if(e.target.classList.contains('aceptar')){
            const nombre=document.querySelector('#nombreDocente').value;
            const apellidoP=document.querySelector('#apellidoPDocente').value;
            const apellidoM=document.querySelector('#apellidoMDocente').value;

            //validamos que ningun campo este vacio
            if(nombre === '' || apellidoP === '' || apellidoM === ''){
                alerta.textContent='Todos los campos son obligatorios';
                document.querySelector(`${objetivo} .modal-body`).appendChild(alerta);
                return;
            }
            //añadimos las variables al objeto formData
            formRegistroDocente = new FormData();
            formRegistroDocente.append('nombre',nombre);
            formRegistroDocente.append('apellidoP',apellidoP);
            formRegistroDocente.append('apellidoM',apellidoM);
            //hacemos la peticion al servidor
            fetch('../../controllers/docentes/controlador_registrarDocente.php',{
                method:'POST',
                body:formRegistroDocente
            })
            .then(res => res.json())
            .then(data =>{
                Modales.ocultarModal(objetivo);
                Modales.mostrarModal('Información',`${data.mensaje}`,'25','respuesta','#modalRespuesta');
                //recargamos solo la tabla para visualizar los cambios
                if(data.tipo === "correcto"){
                    $('#tablaDocentes').DataTable().ajax.reload();
                }
            })
            .catch(error => console.log(error));
        }else if(e.target.classList.contains('close')){
            Modales.ocultarModal(objetivo);
        }
    });
}
//funcion para eliminar docentes 
function btn_EliminarDocentes(tbody,table){
    $(tbody).on('click',"button#docente_btnEliminar",function(){
        let data= table.row($(this).parents("tr")).data();
        //mostramos el modal de advertencia
        Modales.mostrarModal('Eliminar Docente',`¿Estas seguro(a) de eliminar el docente <b>${data.Nombre_Docente}</b> ?`,'25','info','#modalEliminar');
        //funcion a la escucha si acepta la eliminacion
        Eliminar_Docente(data.Id_Docente,'#modalEliminar');

    });
}
//eliminar docente por id
function Eliminar_Docente(idDocente,objetivo){
    let elemento = document.querySelector(`${objetivo}`);

    elemento.addEventListener('click',(e) =>{
        e.preventDefault();
        e.stopImmediatePropagation();
        if(e.target.classList.contains('aceptar')){

            fetch(`../../controllers/docentes/controlador_eliminarDocente.php?id=${idDocente}`)
            .then(res => res.json())
            .then(data => {
                Modales.ocultarModal(objetivo);
                Modales.mostrarModal('Información',`${data.mensaje}`,'25','respuesta','#modalRespuesta');
                //recargamos solo la tabla para visualizar los cambios
                if(data.tipo === "correcto"){
                    $('#tablaDocentes').DataTable().ajax.reload();
                }
            })
            .catch(error => console.log(error));
        }else if(e.target.classList.contains('close')){
            Modales.ocultarModal(objetivo);
        }
    });
}
//funcion para mostrar el modal de editar docente
function btn_EditarDocente(tbody, table){
    $(tbody).on('click',"button#docente_btnEditar",function(){
        let data= table.row($(this).parents("tr")).data();
        let html=`
            <div class="form_editar">
                <div>
                    <label class="form_Label">Nombre</label>
                    <div class="input">
                        <span class="form_icon"><i class="fas fa-user"></i></span>
                        <input type="text" value="${data.Nombre_Docente}" id="nombreD" name="nombre">
                    </div>   
                </div>
                <div>
                    <label class="form_Label">Apellido Paterno</label>
                    <div class="input">
                        <span class="form_icon"><i class="fas fa-user"></i></span>
                        <input type="text" value="${data.Apellido_P}" id="apellidoPD" name="apellidoPaterno">
                    </div>   
                </div>
                <div>
                    <label class="form_Label">Apellido Materno</label>
                    <div class="input">
                        <span class="form_icon"><i class="fas fa-user"></i></span>
                        <input type="text" value="${data.Apellido_M}" id="apellidoMD" name="apellidoMaterno">
                    </div>   
                </div>
            </div>
        `;
        Modales.mostrarModal('Editar Docente',html,'50','info','#modalEditar');
        Actualizar_Docente('#modalEditar',data.Id_Docente);
    });
}
//funcion a para actualizar la informacion del docente
function Actualizar_Docente(objetivo,idDocente){
    let elemento= document.querySelector(`${objetivo}`);
    elemento.addEventListener('click',e =>{
        e.preventDefault();
        e.stopImmediatePropagation();
        if(e.target.classList.contains('aceptar')){
            //obtenemos el valor de las variables
            let nombre, apellidoP, apellidoM, formEditarDocente;
            nombre= document.querySelector('#nombreD').value;
            apellidoP= document.querySelector('#apellidoPD').value;
            apellidoM= document.querySelector('#apellidoMD').value;
            //creamos un objeto formData
            formEditarDocente = new FormData();
            formEditarDocente.append('idDocente',idDocente);
            formEditarDocente.append('nombre',nombre);
            formEditarDocente.append('apellidoP',apellidoP);
            formEditarDocente.append('apellidoM',apellidoM);
            //generamos la peticio al servidor
            fetch('../../controllers/docentes/controlador_actualizarDocente.php',{
                method:'POST',
                body:formEditarDocente
            })
            .then(res => res.json())
            .then(data =>{
                Modales.ocultarModal(objetivo);
                Modales.mostrarModal('Información',`${data.mensaje}`,'25','respuesta','#modalRespuesta');
                //recargamos la tabla
                if(data.tipo === "correcto"){
                    $('#tablaDocentes').DataTable().ajax.reload();
                }
            })
            .catch(error => console.log(error));
        }else if(e.target.classList.contains('close')){
            Modales.ocultarModal(objetivo);
        }
    });
}