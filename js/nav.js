//  seccion de variables
 //seleccionamos todos los elementos dropdown que tengan como primer hijo un a
 const dropdown= document.querySelectorAll('.dropdown > a');
 const spanMenu=document.querySelector('#spanMenu');
 const sidebar=document.querySelector('.sidebar');
 const selectores=document.querySelectorAll('.mostrarContenedor');
 const inicio=document.querySelector('#inicio');
 const btnCerrar=document.querySelector('#cerrarMenu');
 //recorremos todos los elementos
 for(let i=0;i < dropdown.length; i++){
     //detectamos el click de entre los demas elementos
     dropdown[i].addEventListener('click',() => {
         /*al dar click, seleccionamos todos los submenus
         para ocultarlos, en caso de que ya este mostrado alguno */    
         const submenus=document.querySelectorAll('.submenu');
         for(let j=0; j <submenus.length; j++){
             submenus[j].style.display='none';
     }
     //seleccionamos al elemento hermano mas cercano
     const submenu=dropdown[i].nextElementSibling;
     //seleccionamos al elemento padre al cual dimos click
     const link=dropdown[i].parentElement;
     /*checamos si el elemento padre contiene la clase active, de ser asi la removemos 
     en caso contrario le agregamos la clase active al elemento padre y mostramos el 
     elemento hermano, que en este caso seria el submenu  */
     if(link.classList.contains('active')){
         document.querySelector('.dropdown').classList.remove('active');
         link.classList.remove('active')
        }else{
            document.querySelector('.dropdown').classList.remove('active'); 
            submenu.style.display='block';
            link.classList.add('active');
        }
    });
}
//activamos el evento cada que la pantalla cambien de tamaño
window.addEventListener('resize',function(){
    //si el ancho interno es mayor a 768 que muestre el menu
    if(window.innerWidth > 1340){
        //validamos que el menu este desplegado o no
        sidebar.style.transform="translateX(0px)";
    }
})

//  evento para recargar la pagina
inicio.addEventListener('click',()=>{
   window.location.reload();
});
// evento para desplegar menu
spanMenu.addEventListener('click',function(){
     console.log('click');
         sidebar.style.transform="translateX(0px)";
 });
// evento para ocultar el menu 
 btnCerrar.addEventListener('click',()=>{
     sidebar.style.transform="translateX(-260px)";
 });
//eventos para mostras los contenedores  
 for(let i = 0; i < selectores.length; i++){
     selectores[i].addEventListener('click',function(event){
         const ruta=event.target.getAttribute('data-id');
         switch (ruta) {
             case '1':
                 mostrarVistas('.container','vista_verGrupos.php');
                 break;
         
             default:
                 break;
         }
     });
 }
 function mostrarVistas(contenedor,contenido){
     console.log(contenido);
     fetch(`${contenido}`)
     .then(res => res.text())
     .then(data =>{
         if(data === ''){
             document.querySelector(`${contenedor}`).innerHTML='No se pudo obtener la informacion';
         }else{
             document.querySelector(`${contenedor}`).innerHTML=data;
         }
     })
     .catch(error => console.log('el error es'+error));
 }