$(document).ready(function(){
    cargarTablaMaterias();
});
const alumno= document.getElementById('nombreUsuario').innerText;

function cargarTablaMaterias(){
    fetch(`../../controllers/alumnos/controlador_materiasAlumno.php?id=${alumno}`)
    .then(res => res.json())
    .then(data =>{
        llenarTabla(data);
    })
    .catch(error => console.log(error));
}

function llenarTabla(info){
    let html;
    if (info.length > 0) {
        info.forEach(materia => {
            html=`<tr>
                    <td>${materia.Nombre}</td>
                    <td>${materia.Creditos}</td>
                    <td>${materia.Estado_Materia}</td>
                    <td>${materia.Calificacion}</td>
            `;
        });
    }else{
        html=`<p class="alerta-warning">No cuentas con materias agregas</p>`;
    }
    document.querySelector('#materiasAlumno tbody').innerHTML= html;
}