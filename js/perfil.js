$(document).ready(function(){
    CargarUsuario()
});
//variables
const cambiarimg= document.querySelector("#cambiarImg");
const cambiarpass= document.querySelector("#cambiarPassPerfil");
const formImg= document.querySelector("#formImagen");
let userioid='';
const ImagenUsuario= document.querySelector("#imagenUsuario");
//eventos
cambiarimg.addEventListener('click',()=>{
    if(formImg.classList.contains("ocultar")){
        formImg.classList.remove("ocultar");
        formImg.classList.add("mostrar");
    }else{
        formImg.classList.add("ocultar");
    }
});
cambiarpass.addEventListener('click',()=>{
    const id = document.querySelector("#informacionPerfil > i").innerText;
    btn_CambiarPass(id);
});
formImg.addEventListener('submit',Guardar_Imagen);
function CargarUsuario(){
    fetch('../../controllers/general/controlador_datosUsuario.php')
        .then(res => res.json())
        .then(data =>{
            
            document.querySelector('#informacionPerfil > i').innerHTML=`${data.id}`;
            document.querySelector('#informacionPerfil > p').innerHTML=data.user;
            CargarImgUsuario(data.id);
            userioid=data.id;
        })
        .catch(error => console.log(error));
}
async function CargarImgUsuario(id){
    const carga = await fetch(`../../controllers/general/controlador_obtenerRuta.php?id=${id}`);
    const ruta= await carga.json();
    if(ruta[0].Foto === null){
        ImagenUsuario.setAttribute("src","../../img/logoPerfil.png");
    }else{
        ImagenUsuario.setAttribute("src",`../../perfilUsuarios/${ruta[0].Foto}`);
    }

}
function Guardar_Imagen(event){
    event.preventDefault();
    
    let formImagen= new FormData(formImg);

    for(let valor of formImagen.values()){
        if(valor === ''){
            Modales.mostrarModal('Información',`<p class="alerta-danger">Campo obligatorio, elige una imagen.</p>`, '25','respuesta','#modalRespuesta')
            
            return;
        }
    }
    formImagen.append('id',userioid);
    //subimos la imagen al servidor
    fetch('../../controllers/usuario/controlador_subirImagen.php',{
        method:'POST',
        body:formImagen
    })
    .then(res => res.json())
    .then(data =>{
        
        Modales.mostrarModal('Información',`${data.mensaje}`, '25','respuesta','#modalRespuesta');
    
        if(data.tipo === "correcto"){
            CargarImgUsuario(userioid);
            formImg.reset();
            formImg.classList.remove("mostrar");
            formImg.classList.add("ocultar");
        }
    })
    .catch(error => console.log(error));
}

function btn_CambiarPass(id){
    let html=`
            <div class="form_editar">
              <div>
                <label class="form_Label">Contraseña Anterior</label>
                <div class="input">
                    <span class="form_icon"><i class="fas fa-user"></i></span>
                    <input type="password" id="passAnterior" placeholder="Contraseña Anterior" >
                </div>
              </div>
              <div>
                <label class="form_Label">Contraseña Nueva</label>
                <div class="input">
                    <span class="form_icon"><i class="fas fa-user"></i></span>
                    <input type="password" id="passNueva" placeholder="Contraseña Nueva" >
                </div>
              </div>
              <div>
                <label class="form_Label">Confirmar Contraseña</label>
                <div class="input">
                    <span class="form_icon"><i class="fas fa-user"></i></span>
                    <input type="password" id="passConfirmar" placeholder="Confirmar Contraseña" >
                </div>
              </div>
              <div id="alerta"></div>    
            </div>
        `;
        Modales.mostrarModal('Cambiar Contraseña',html,'50','info','#modalCambiarContrasena');

        CambiarPass(id, '#modalCambiarContrasena');
}

function CambiarPass(id, objetivo){
    const modal= document.querySelector(`${objetivo}`);
    let formCambiarPass = new FormData();
    modal.addEventListener('click',e =>{
        e.preventDefault();
        e.stopImmediatePropagation();
        if(e.target.classList.contains('aceptar')){
            const passAnterior= document.querySelector("#passAnterior").value;
            const passNueva= document.querySelector("#passNueva").value;
            const passConfirmar= document.querySelector("#passConfirmar").value;
            //validamos que ningun campo vaya vacio
            if(passAnterior === '' || passNueva === '' || passConfirmar === ''){
                document.querySelector("#alerta").innerHTML=`<p class="alerta-danger">Todos los campos son obligatorios</p>`;

                return;
            }
            //validamos que las contraseña nueva sea mayor a 4 caracteres
            if(passNueva.trim().length < 4){
                document.querySelector("#alerta").innerHTML=`<p class="alerta-danger">La contraseña debe tener almenos cuatro caracteres</p>`;

                return;
            }
            formCambiarPass.append('id',id);
            formCambiarPass.append('pass',passAnterior);   
            //validamos que la contraseña anterior sea la correcta
            fetch(`../../controllers/general/controlador_verificarContra.php`,{
                method:'POST',
                body:formCambiarPass
            })
            .then(res => res.json())
            .then(data =>{
                console.log(data);
                if(data.valido){
                    const correcto = ValidarPass(passNueva,passConfirmar);
                    if(correcto){
                        formCambiarPass.append('nuevaPass',passNueva);
                        ActualizarPass(formCambiarPass);
                    }else{
                        document.querySelector("#alerta").innerHTML=`<p class="alerta-danger">Las contraseñas no coinciden.</p>`;

                        return;
                    }
                }else{
                    document.querySelector("#alerta").innerHTML=`<p class="alerta-danger">La contraseña anterior no coincide</p>`;
                    return; 
                }
            })
            .catch(error => console.log(error));
        }else if(e.target.classList.contains('close')){
                Modales.ocultarModal(objetivo);
            }
        });        
}

function ValidarPass(pass1, pass2){
    if(pass1.trim() === pass2.trim()){
        return true;  
    }else{
        return false;
    }
}

async function ActualizarPass(passform){
    const actualizar = await fetch('../../controllers/general/controlador_actualizarPass.php',{
        method:'POST',
        body:passform
    });
    const resultado = await actualizar.json();
    Modales.ocultarModal("#modalCambiarContrasena");
    Modales.mostrarModal('Información',`${resultado.mensaje}`, '25','respuesta','#modalRespuesta');
}