class Modal{
    mostrarModal(titulo,mensaje,tamanio,tipo,modal){
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
                        <button class="aceptar" id="aceptar">Aceptar</button>
                    </div>
                </div>`;
        }else{
            html=`<div class="modal-content w-${tamanio}">
                    <div class="modal-header">
                        <span class="close" id="close">&times;</span>
                        <h3>${titulo}</h3>
                    </div>
                    <div class="modal-body">
                        ${mensaje}
                    </div>
                </div>`;
        }
        const ShowModal=document.querySelector(`${modal}`);
        ShowModal.innerHTML=html;
        ShowModal.style.display='block';
    }

    ocultarModal(modal){
          let ocultar=document.querySelector(`${modal}`);
        //   console.log(ocultar);
        //   let contenido= ocultar.firstChild;
        //   console.log(contenido);
        //   ocultar.removeChild(contenido);
          ocultar.style.display='none';
    }
    
}