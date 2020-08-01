$(document).ready(function(){
    listarAlumnos();
});
    const modalRespuesta=document.querySelector('#modalRespuesta');
    const idioma={
        "sProcessing": "Procesando...",
        "sLengthMenu": "Mostrar _MENU_  registros",
        "sZeroRecords": "No se encontraron resultados",
        "sEmptyTable": "Ningún dato disponible en esta tabla",
        "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "sInfoEmpty": "Mostrando registro del 0 al 0 de un total de 0 registros",
            "sInfoFIltered": "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix": "",
            "sSearch": "Buscar:",
            "sUrl": "",
            "sInfoThousands": ",",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast": "Ultimo",
                "sNext": "Siguiente",
                "sPrevious": "Anterior"
            },
        "oAria":{
            "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
            "sSortDescending": ": Activar para ordenar la columna de manera descendente"
        }
    };
    
    function listarAlumnos(){
        const tablaPrincipal=$('#tablaPrincipal').DataTable({
            "destroy":true,
            "ajax":{
                "method":"POST",
                "url":"../../controllers/alumnos/controlador_infoAlumnos.php"
            },
            "columns":[
                {"data":"Matricula_Alumno"},
                {"data":"Nombre"},
                {"data":"Apellido_P"},
                {"data":"Apellido_M"},
                {"data":"Anio_Ingreso"},
                {"data":"Semestre_Actual"},
                {"defaultContent":"<button class='botonAccion' id='alumno_btnEditar' title='Editar'><span><i class='fas fa-edit'></i></span></button><button class='botonAccion eliminar' id='alumno_btnEliminar' title='Eliminar'><span><i class='fas fa-trash'></i></span></button><button class='botonAccion kardex' id='alumno_btnKardex' title='Ver Kardex'><span><i class='fas fa-list'></i></span></button><button class='botonAccion estatus' id='alumno_btnEstatus' title='Estatus General'><span><i class='fas fa-folder-open'></i></span></button>"}
            ],
            "order":[[2,"asc"]],
            "language":idioma
        });
        tablaPrincipal
        btn_EditarAlumno("#tablaPrincipal tbody",tablaPrincipal);
        btn_EliminarAlumno("#tablaPrincipal tbody",tablaPrincipal);
        btn_KardexAlumno("#tablaPrincipal tbody",tablaPrincipal);
        btn_EstatusAlumno("#tablaPrincipal tbody",tablaPrincipal);
    }
    
    // accion para botones
    function btn_EditarAlumno(tbody,table){
        $(tbody).on("click","button#alumno_btnEditar",function(){
            let data=table.row($(this).parents("tr")).data();
            console.log(data);
            let html=`
                    <div class="form_editarAlumno">
                        <div>
                            <label class="form_Label">Matricula</label>
                            <div class="input">
                                <span class="form_icon"><i class="fas fa-user"></i></span>
                                <input type="text" value="${data.Matricula_Alumno}" id="matricula_Alumno" name="matricula_Alumno" required>
                            </div>   
                        </div>
                        <div>
                            <label class="form_Label">Nombre</label>
                            <div class="input">
                                <span class="form_icon"><i class="fas fa-signature"></i></span>
                                <input type="text" value="${data.Nombre}" id="nombre_Alumno" name="nombre_Alumno" required>
                            </div>
                        </div>
                        <div>
                            <label class="form_Label">Apellido Paterno</label>
                            <div class="input">
                                <span class="form_icon"><i class="fas fa-signature"></i></span>
                                <input type="text" value="${data.Apellido_P}" id="apellidoP_Alumno" name="apellidoP_Alumno" required>
                            </div>
                        </div>
                        <div>
                            <label class="form_Label">Apellido Materno</label>
                            <div class="input">
                                <span class="form_icon"><i class="fas fa-signature"></i></span>
                                <input type="text" value="${data.Apellido_M}" id="apellidoM_Alumno" name="apellidoM_Alumno" required>
                            </div>
                        </div>
                        <div class="grid-item_span">
                            <label class="form_Label">CURP</label>
                            <div class="input">
                                <span class="form_icon"><i class="fas fa-address-book"></i></span>
                                <input type="text" value="${data.Curp}" id="curp_Alumno" name="curp_Alumno" required>
                            </div>
                        </div>
                        <div>
                            <label class="form_Label">Semestre Actual</label>
                            <div class="input">
                                <span class="form_icon"><i class="fas fa-address-book"></i></span>
                                <select name="semestreAct_Alumno" id="semestreAct_Alumno">
                                    <option value="${data.Semestre_Actual}">${data.Semestre_Actual}</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                 </select>
                            </div>
                        </div>
                    </div>
                    `;
            mostrarModal('Editar Alumno',html,'50','info','#modalEditar'); 
            Actualizar_Alumno('#modalEditar');       
        });
    }
    function btn_EliminarAlumno(tbody,table){
        $(tbody).on("click","button#alumno_btnEliminar",function(){
            let data=table.row($(this).parents("tr")).data();
            
            mostrarModal("eliminar",`¿Estas seguro(a) de eliminar al alumno ${data.Nombre} ?`,"25","info","#modalEliminar");
            Eliminar_Alumno(data.Matricula_Alumno,"#modalEliminar");
        });
    }
    function btn_KardexAlumno(tbody,table){
        
    }
    function btn_EstatusAlumno(tbody,table){
        
    }
    
    function Eliminar_Alumno(matricula,objetivo){
        let elemento=document.querySelector(`${objetivo}`);
        
        elemento.addEventListener('click',(e)=>{
            if(e.target.classList.contains('aceptar')){
                fetch(`../../controllers/alumnos/controlador_eliminarAlumno.php?matricula=${matricula}`)
                .then(res => res.json())
                    .then(data =>{
                        ocultarModal(objetivo);
                        mostrarModal('Información',`${data.mensaje}`,'25','respuesta','#modalRespuesta');
                        //recargamos solo la tabla para visualizar los cambios
                        if(data.tipo === "correcto"){
                         $('#tablaPrincipal').DataTable().ajax.reload();   
                        }
                    })
                    .catch(error => console.log(error)); 
                }else if(e.target.classList.contains('close')){
                    ocultarModal(objetivo);
                }
        });
    }

    function Actualizar_Alumno(objetivo){
        let elemento=document.querySelector(`${objetivo}`);
        elemento.addEventListener('click',(event)=>{

            if(event.target.classList.contains('aceptar')){
                //obtenemos el valor de las variables
                let matricula,nombre,apellidoP,apellidoM,curp,semestreA,formEditar;
                matricula=document.querySelector('#matricula_Alumno').value;
                nombre=document.querySelector('#nombre_Alumno').value;
                apellidoP=document.querySelector('#apellidoP_Alumno').value;
                apellidoM=document.querySelector('#apellidoM_Alumno').value;
                curp=document.querySelector('#curp_Alumno').value;
                semestreA=document.querySelector('#semestreAct_Alumno').value;
                //creamos un objeto tipo form para manipular todas las variables
                formEditar= new FormData();
                formEditar.append('matricula_Alumno',matricula);
                formEditar.append('nombre_Alumno',nombre);
                formEditar.append('apellidoP_Alumno',apellidoP);
                formEditar.append('apellidoM_Alumno',apellidoM);
                formEditar.append('curp_Alumno',curp);
                formEditar.append('semestreAct_Alumno',semestreA);
                //generamos la petición al servidor
                fetch('../../controllers/alumnos/controlador_actualizarAlumno.php',{
                    method:'POST',
                    body:formEditar
                })
                .then(res => res.json())
                .then(data =>{
                    ocultarModal(objetivo);
                    mostrarModal('Información',`${data.mensaje}`,'25','respuesta','#modalRespuesta');
                    //recargamos solo la tabla para visualizar los cambios
                    if(data.tipo === "correcto"){
                        $('#tablaPrincipal').DataTable().ajax.reload();   
                    }
                })
                .catch(error => console.log(error));    
            }else if(event.target.classList.contains('close')){
                ocultarModal(objetivo);
            }
        });
    }
    // eventos y funciones para los modales
    modalRespuesta.addEventListener('click',(event)=>{
        if(event.target.classList.contains('close')){
            ocultarModal('#modalRespuesta');
        }
    });
    
    function mostrarModal(titulo,mensaje,tamanio,tipo,modal){
        let html;
        if(tipo === "info"){
            html=`<div class="modal-content w-${tamanio}">
                    <div class="modal-header">
                        <span class="close" id="close">&times;</span>
                        <h4>${titulo}</h4>
                        </div>
                    <div class="modal-body">
                        ${mensaje}
                    </div>
                    <div class="modal-footer">
                        <button class="close cancel">Cancelar</button>
                        <button class="aceptar">Aceptar</button>
                    </div>
                </div>`;
        }else{
            html=`<div class="modal-content w-${tamanio}">
                    <div class="modal-header">
                        <span class="close" id="close">&times;</span>
                        <h3>${titulo}</h3>
                    </div>
                    <div class="modal-body">
                        <p>${mensaje}</p>
                    </div>
                </div>`;
        }
        ShowModal=document.querySelector(`${modal}`);
        ShowModal.innerHTML=html;
        ShowModal.style.display='block';
    }

    function ocultarModal(modal){
          let ocultar=document.querySelector(`${modal}`);
          
          ocultar.style.display='none';
    }