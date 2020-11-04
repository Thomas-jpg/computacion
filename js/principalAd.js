
$(document).ready(function(){
    listarAlumnos();
}); 
    const Modales= new Modal();
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
                {"defaultContent":"<button class='botonAccion' id='alumno_btnEditar' title='Editar'><span><i class='fas fa-edit'></i></span></button><button class='botonAccion eliminar' id='alumno_btnEliminar' title='Eliminar'><span><i class='fas fa-trash'></i></span></button><button class='botonAccion Kardex' id='alumno_btnKardex' title='Ver Kardex'><span><i class='fas fa-list'></i></span></button><button class='botonAccion estatus' id='alumno_btnEstatus' title='Estatus General'><span><i class='fas fa-folder-open'></i></span></button>"}
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
                    <div class="form_editar">
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
            Modales.mostrarModal('Editar Alumno',html,'50','info','#modalEditar'); 
            Actualizar_Alumno('#modalEditar');       
        });
    }
    function btn_EliminarAlumno(tbody,table){
        $(tbody).on("click","button#alumno_btnEliminar",function(){
            let data=table.row($(this).parents("tr")).data();
            
            Modales.mostrarModal("eliminar",`¿Estas seguro(a) de eliminar al alumno ${data.Nombre} ?`,"25","info","#modalEliminar");
            Eliminar_Alumno(data.Matricula_Alumno,"#modalEliminar");
        });
    }
    function btn_KardexAlumno(tbody,table){
        $(tbody).on("click","button#alumno_btnKardex",function(){
            let data=table.row($(this).parents("tr")).data();
            fetch(`../../controllers/alumnos/controlador_kardexAlumno.php?matricula=${data.Matricula_Alumno}&semestre=1`)
                .then(res => res.json())
                .then(info =>{
                    if(info === '' || info.length === 0){
                        Modales.mostrarModal('error',`El alumno ${data.Nombre} no cuenta con la carga de materias para generar su kardex., intentalo más tarde.`,'25','respuesta','#modalRespuesta');
                    }else{
                        Cargar_Kardex(data,info);
                    }
                })
                .catch(error => console.log(error));
            
        });
    }
    function btn_EstatusAlumno(tbody,table){
        $(tbody).on("click","button#alumno_btnEstatus",function(){
            let data=table.row($(this).parents("tr")).data();
            
        });
    }
    
    function Eliminar_Alumno(matricula,objetivo){
        let elemento=document.querySelector(`${objetivo}`);
        
        elemento.addEventListener('click',(e)=>{
            if(e.target.classList.contains('aceptar')){
                fetch(`../../controllers/alumnos/controlador_eliminarAlumno.php?matricula=${matricula}`)
                .then(res => res.json())
                    .then(data =>{
                        Modales.ocultarModal(objetivo);
                        Modales.mostrarModal('Información',`${data.mensaje}`,'25','respuesta','#modalRespuesta');
                        //recargamos solo la tabla para visualizar los cambios
                        if(data.tipo === "correcto"){
                         $('#tablaPrincipal').DataTable().ajax.reload();   
                        }
                    })
                    .catch(error => console.log(error)); 
                }else if(e.target.classList.contains('close')){
                    Modales.ocultarModal(objetivo);
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
                    Modales.ocultarModal(objetivo);
                    Modales.mostrarModal('Información',`${data.mensaje}`,'25','respuesta','#modalRespuesta');
                    //recargamos solo la tabla para visualizar los cambios
                    if(data.tipo === "correcto"){
                        $('#tablaPrincipal').DataTable().ajax.reload();   
                    }
                })
                .catch(error => console.log(error));    
            }else if(event.target.classList.contains('close')){
                Modales.ocultarModal(objetivo);
            }
        });
    }
    function Cargar_Kardex(data,info){
        const cantidadMaterias= info.data.length;
    
        let html;
                html=`
                <div class="contenedor">
                    <div class="kardex">
                    <h1 class="title">Kardex Curricular</h1>
                        <div class="seccion">
                            <div>
                                <label>Semestre</label>
                                <select name="" id="selectKardex" class="input">`
                                for (let i = 1; i < 11; i++) {
                                    html+=`<option value="${i}">${i}</option>`;
                                }
                            html+=`</select>
                            </div>
                            <div class="group_btn">
                                <button><span><i class="fas fa-print" title="Imprimir Kardex"></i></span></button>
                                <button title="Kardex por Semestre"><span>KS</span></button>
                                <button title="Kardex Modificado"><span>KM</span></button>
                                <button title="Agregar Kardex">K<span><i class="fas fa-plus"></i></span></button>
                            </div>
                        </div>
                        <table>
                            <tr>
                                <td rowspan="4"><img src="../../img/sleepy.png" alt="alumno"></td>
                                <td>NOMBRE</td>
                                <td colspan="5">${data.Nombre}</td>
                                <td colspan="3">PERIODO LECTIVO</td>
                                <td>${info.data[0].Periodo_Lectivo}</td>
                            </tr>
                            <tr>
                                <td rowspan="2">MATRICULA</td>
                                <td rowspan="2">${data.Matricula_Alumno}</td>
                                <td colspan="2" rowspan="2">CURP</td>
                                <td colspan="4" rowspan="2">${data.Curp}</td>
                                <td>CICLO ESCOLAR</td>
                                <td>${info.data[0].Ciclo_Escolar}</td>
                                <tr>
                                    <td>GRADO</td>
                                    <td>${info.data[0].Semestre}</td>
                                </tr>
                            </tr>
                            <tr>
                                <td>CARRERA</td>
                                <td>Computación</td>
                                <td colspan="4">EVALUACIONES</td>
                                <td colspan="3">TOTAL DE MATERIAS</td>
                                <td>${cantidadMaterias}</td>
                            </tr>
                            <tr>
                                <td>CREDITOS</td>
                                <td>CLAV.MAT</td>
                                <td>NOMBRE DE LA MATERIA</td>
                                <td>1°</td>
                                <td>2°</td>
                                <td>3°</td>
                                <td>4°</td>
                                <td>CALIF.</td>
                                <td>FECHA EXAM.</td>
                                <td colspan="2">TIPO EXAM.</td> 
                            </tr>`
            info.data.forEach(element => {
                console.log(element.Matricula_Materia);
                html+=`
                        <tr>
                            <td>${element.Creditos}</td>
                            <td>${element.Matricula_Materia}</td>
                            <td>${element.Nombre}</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td class="text-center">${element.Calificacion}</td>
                            <td>${element.Fecha_Examen}</td>
                            <td colspan="2">${element.Tipo_Examen}</td>
                        `;
                });  
                    html+=`
                                </table>
                            </div>
                        </div>            
                        `;
        // cargamos el resultado al contenedor principal                           
        document.querySelector('.container').innerHTML=html;
        obtener_DatosKardex(data);
    }
    // funcion para obtener los cambios del kardex
    function obtener_DatosKardex(data){
        const select= document.querySelector('#selectKardex');
        select.addEventListener('change',()=>{
            const semestre=select.options[select.selectedIndex].value;
            // realizamos la peticion para obtener la informacion
            fetch(`../../controllers/alumnos/controlador_kardexAlumno.php?matricula=${data.Matricula_Alumno}&semestre=${semestre}`)
                .then(res => res.json())
                .then(info =>{
                    if(info === '' || info.length === 0){
                        Modales.mostrarModal('error',`El alumno ${data.Nombre} no cuenta con la carga de materias para generar su kardex., intentalo más tarde.`,'25','respuesta','#modalRespuesta');
                    }else{
                        Cargar_Kardex(data,info);
                    }
                })
                .catch(error => console.log(error));
        });
    }
    // eventos y funciones para los modales
    modalRespuesta.addEventListener('click',(event)=>{
        if(event.target.classList.contains('close')){
            Modales.ocultarModal('#modalRespuesta');
        }
    });
    //bloquea el boton de retroceso del boton del navegador
    window.location.hash="no-back-button";
    window.location.hash="Again-No-back-button";//esta linea es necesaria para chrome
    window.onhashchange=function(){window.location.hash="no-back-button";}
    
    