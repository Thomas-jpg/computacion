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
        const ShowModal=document.querySelector(`${modal}`);
        ShowModal.innerHTML=html;
        ShowModal.style.display='block';
    }

    ocultarModal(modal){
          let ocultar=document.querySelector(`${modal}`);
          
          ocultar.style.display='none';
    }
}