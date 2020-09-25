$(document).ready(function(){
    listarUsuarios();
});
//variables
const nuevoUsuario= document.querySelector("#nuevoUsuario");

//eventos 
nuevoUsuario.addEventListener('click',btnAgregarUsuario);
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
            {"defaultContent":"<button class='botonAccion eliminar' id='usuario_btnEliminar' title='Eliminar'><span><i class='fas fa-trash'></i></span></button>"}
        ],
        "order":[[0,"asc"]],
        "language":idioma
    });

    // btn_EditarAlumno("#tablaPrincipal tbody",tablaPrincipal);
    btn_EliminarUsuario("#tablaUsuarios tbody",tablaUsuarios);
    // btn_KardexAlumno("#tablaPrincipal tbody",tablaPrincipal);
    // btn_EstatusAlumno("#tablaPrincipal tbody",tablaPrincipal);
}
    //mostramos el modal para agregar nuevos usuarios
    async function btnAgregarUsuario(){
        let html=`
            <div class="form_editar">
              <div>
                <label class="form_Label">Tipo Usuario</label>
                <div class="input">
                    <span class="form_icon"><i class="fas fa-user"></i></span>
                    <select name="tipousuario" id="tipoUsuario">
                        <option value="0">--Selecciona--</option>
                        <option value="1">Administrador</option>
                        <option value="2">Alumno(a)</option>
                        <option value="3">Secretario(a)</option>
                        <option value="4">Docente</option>
                    </select>
                </div>
              </div>
              <div id="opcionUsuario">
              </div>
              <div id="alerta"></div>    
            </div>
        `;
        Modales.mostrarModal('Nuevo Usuario',html,'50','info','#modalAgregarUsuario');
        //cargamos la informacion de los docentes
        let docentes= await fetch('../../controllers/docentes/controlador_cargarDocentes.php');

        let dataDocentes= await docentes.json();

        const resultado={
            docentes: dataDocentes
        }
        cargarSelect(resultado,"#modalAgregarUsuario");

    }
    //tomamos la opcion del usuario y mostramos 
    function cargarSelect(datos,objetivo){
        const opcionUsuario= document.querySelector("#opcionUsuario");
        document.querySelector('#tipoUsuario').addEventListener('change',(event)=>{
            let html=`
            <label class="form_Label">Usuario</label>
            <div class="input">
                <span class="form_icon"><i class="fas fa-user"></i></span>
               
            `;
            switch (event.target.value) {
                case '1':
                    html+=`<input type="text" value="" id="valorUsr" placeholder="Nombre Usuario">
                    </div>`;
                    
                    break;
                case '2':
                    html+=`
                        <input type="text" value="" id="valorUsr" placeholder="Matricula Alumno">
                        </div>
                    `;
                    
                    break;
                case '3':
                    html+=`<input type="text" value="" id="valorUsr" placeholder="Nombre Usuario">
                    </div>`;
                    
                    break;
                case '4':
                        html+=`
                        <select name="usuario" id="valorUsr">`;
                        datos.docentes.data.forEach(element =>{
                            html+=`<option value="${element.Id_Docente}">${element.Nombre_Docente} ${element.Apellido_P}, Usuario(${element.Id_Docente})</option>`
                        });
                        html+=`
                        </select>
                        </div>
                        `;
                        
                    break;       
            }
            html+=`
                <div>
                    <label class="form_Label">Contraseña</label>
                    <div class="input">
                        <span class="form_icon"><i class="fas fa-unlock"></i></span>
                        <input type="text" value="" id="passUsr" placeholder="Contraseña">
                    </div>
                </div>
            `;
            

            opcionUsuario.innerHTML=html;
            guardarUsuario(objetivo);
        });           
    }
//funcion para almacenar al usuario nuevo
    function guardarUsuario(objetivo){
        const modal= document.querySelector(`${objetivo}`);
        
                    
        modal.addEventListener('click',e =>{
            e.preventDefault();
            e.stopImmediatePropagation();
            if(e.target.classList.contains('aceptar')){
                const valor = document.querySelector('#tipoUsuario').value;
                 if(valor === '1') {
                        const usrAd= document.querySelector("#valorUsr").value;
                        const passAd=document.querySelector("#passUsr").value;
                        validarUsuario(valor,usrAd,passAd,objetivo);
                       
                    }else if(valor === '2'){
                        
                        const usrAlu= document.querySelector("#valorUsr").value;
                        const passAlu=document.querySelector("#passUsr").value;
                        validarUsuario(valor,usrAlu,passAlu,objetivo);

                        
                    }else if(valor === '3'){
                        const usrSec= document.querySelector("#valorUsr").value;
                        const passSec= document.querySelector("#passUsr").value;
                        validarUsuario(valor,usrSec,passSec,objetivo);
                       
                    }else if(valor === '4'){
                        const usrDoc=document.querySelector("#valorUsr").value;
                        const passDoc= document.querySelector("#passUsr").value;
                        validarUsuario(valor,usrDoc,passDoc,objetivo);
    
                        
                    }
                    
            }else if(e.target.classList.contains('close')){
                Modales.ocultarModal(objetivo);
            }
        });
        
    }

    //boton para desplegar el modal para eliminar usuario
    function btn_EliminarUsuario(tbody,table){
        $(tbody).on("click","button#usuario_btnEliminar",function(){
            let data = table.row($(this).parents("tr")).data();
            Modales.mostrarModal("Eliminar Usuario",`¿Estas seguro(a) de eliminar al usuario <b>${data.Usuario}</b> ?`,"25","info","#modalEliminar");
            //funcion a la escuela 
            Eliminar_Usuario(data.Id_usuario,"#modalEliminar");
        });
    }
    //Eliminando al usuario
    function Eliminar_Usuario(id,objetivo){
        const modal= document.querySelector(`${objetivo}`);

        modal.addEventListener('click',(e)=>{
            e.preventDefault();
            
            if(e.target.classList.contains('aceptar')){
                fetch(`../../controllers/usuario/controlador_eliminarUsuario.php?id=${id}`)
                .then(res => res.json())
                .then(data => {
                    Modales.ocultarModal(objetivo);
                    Modales.mostrarModal('Información',`${data.mensaje}`, '25','respuesta','#modalRespuesta');

                    if(data.tipo === "correcto"){
                        $('#tablaUsuarios').DataTable().ajax.reload();
                    }
                })
                .catch(error => console.log(error));
            }else if(e.target.classList.contains('close')){
                Modales.ocultarModal(objetivo);
            }
        });
    }

    //validando el registro de nuevos usuarios
    async function validarUsuario(tipo,usuario,pass,objetivo){
        //validamos que ningun campo se vaya vacio
        if(usuario === '' || pass === ''){
            html=`<p class="alerta-danger">Todos los campos son obligatorios</p>`;
            document.querySelector("#alerta").innerHTML=html;
            return;
        }
        //validamos si el usuario ya existe 
        const user= await fetch(`../../controllers/general/controlador_existeUsuario.php?user=${usuario}`);
        const existe =await user.json();
        console.log(existe);
        if(existe.user){
            html=`<p class="alerta-danger">El usuario: ${usuario} ya existe, intente con otra cuenta.</p>`;
            document.querySelector("#alerta").innerHTML=html;
            return;
        }
        //validar cuando el ingreso sea de un alumno y ya este previamente registrado
        if(tipo === '2'){
            const alumno= await fetch(`../../controllers/general/controlador_verificarAlumno.php?id=${usuario}&gpo=0`);
            const registrado= await alumno.json();
            if(!registrado.alumno){
                html=`<p class="alerta-danger">El alumno con la matricula ${usuario} no existe.</p>`;
                document.querySelector("#alerta").innerHTML=html;
                return;
            }
        }
        const dataUsuario ={
            "usuario":usuario,
            "pass":pass,
            "tipo":tipo
        }
        //registramos al nuevo usuario
        registrarUsuario(dataUsuario,objetivo);
    }

    function registrarUsuario(data,objetivo){
        console.log(data);
        let formAd= new FormData();
        formAd.append('usuario',data.usuario);
        formAd.append('pass',data.pass);
        formAd.append('tipo',data.tipo);
        fetch('../../controllers/usuario/controlador_registrarUsuario.php',{
            method:'POST',
            body:formAd
        }).then(res =>res.json())
        .then(data =>{
            Modales.ocultarModal(objetivo);
            Modales.mostrarModal('Información',`${data.mensaje}`, '25','respuesta','#modalRespuesta');

            if(data.tipo === "correcto"){
                $('#tablaUsuarios').DataTable().ajax.reload();
            }
        }).catch(error => console.log(error)); 
    }