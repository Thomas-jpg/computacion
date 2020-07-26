//variables
const registro= document.querySelector('#registro');
const sesion=document.querySelector('#iniciarSesion');
const ingresar=document.querySelector('#ingresar');
const registrar=document.querySelector('#registrar');
const expresion=/^[A-Za-z0-9_-]{4,30}$/;
const modal=document.querySelector('#modalLogin');
const span=document.querySelector('#close');
//eventos
    registro.addEventListener('click',girarRegistro);
    sesion.addEventListener('click',girarSesion);
    ingresar.addEventListener('submit',validarSesion);
    window.addEventListener('click',function(event){
        if(event.target == modal){
            modal.style.display='none';
        }
    });
    modal.addEventListener('click',ocultarModal);
 //funciones   
function girarSesion(){
    document.querySelector('.login-container .registro').style.transform='rotateY(180deg)';
    document.querySelector('.login-container .form').style.transform='rotateY(360deg)';
}
function girarRegistro(){
    document.querySelector('.login-container .form').style.transform='rotateY(180deg)';
    document.querySelector('.login-container .registro').style.transform='rotateY(360deg)';
}
//validar inicio de sesion
function validarSesion(event){
    event.preventDefault();
    const usu=document.querySelector('#usuLogin').value;
    const pass=document.querySelector('#usuPass').value;
    if(usu === "" || pass === ""){
        mostrarModal('Error','Todos los campos son obligatorios.');
    }else if(pass.length < 4){
        mostrarModal('Error','La contraseña debe de contener minimo cuatro caracteres.');
    }else if(usu.length > 30 || pass.length > 30 ){
        mostrarModal('Error','El usuario ó contraseña no deben superar los treinta caracteres.');
    }else if(!expresion.test(usu) || !expresion.test(pass)){
        mostrarModal('Error','No se permiten caracteres especiales.');
    }else{
        formSesion = new FormData(ingresar);
        fetch('../controllers/usuario/controlador_verificarUsuario.php',
            {method:'POST',
            body:formSesion})
        .then(res => res.json())
        .then(data =>{
            if(data.length <= 0){
                mostrarModal('Error','El usuario ó contraseña no coinciden');
            }else{
                crearSesion(data);
            }
        })
        .catch(error =>console.log(error));
    }
    
    /*for(let valor of formSesion.values()){
        console.log(valor);
    }*/
    

}
function crearSesion(userData){
    const data=new FormData();
    console.log(userData[0].Id_usuario + userData[0].Usuario);
    data.append('idUsuario',userData[0].Id_usuario);
    data.append('nombreUsuario',userData[0].Usuario);
    data.append('tipoUsuario',userData[0].Tipo_usuario);
    fetch('../controllers/usuario/controlador_crearSesion.php',
        {
            method:'POST',
            body:data
        })
    .then(res => {
        if(res.ok){
            res.text().then(data =>{
                window.location.reload();
            })
        }else{
            console.log('La sesion no pudo ser creada');
        }
    })
    .catch(error => console.log(error));
}
function mostrarModal(titulo,mensaje){
    let html=`<div class="modal-content">
                <div class="modal-header">
                    <span class="close" id="close">&times;</span>
                    <h2>${titulo}</h2>
                </div>
                <div class="modal-body">
                    <p>${mensaje}</p>
                </div>
            </div>`;
    modal.innerHTML=html;

    modal.style.display='block';
}

function ocultarModal(event){
    event.preventDefault();
    if(event.target.classList.contains('close')){
        modal.style.display='none';
    }
}