<script type="text/javascript" src="../../js/grupos.js"></script> 
<div class="contenedor">
    <h1 class="title">Grupos Disponibles</h1>
    <div class="addbtn">
        <button title="Agregar Grupos" id="addGrupo"><span><i class="fas fa-plus"></i></span>
            &nbsp;&nbsp;&nbsp;Agregar Grupos
        </button>
    </div>
    <div class="mostrarAlumno" id="Alumnos">
        <button id="cerrarAlumno" class="cerrarAlumno"><span><i class="fas fa-times"></i></span></button>
        <h3></h3>
       <table id="tablaAlumnoGrupo">
           <thead>
               <tr>
                   <th>Matricula</th>
                   <th>Nombre</th>
                   <th>Eliminar</th>
               </tr>
           </thead>
           <tbody>

           </tbody> 
       </table>
       <button class="addAlumno" id="addAlumno" title="Agregar Alumno"><span><i class="fas fa-plus"></i></span></button>
    </div>
    <div class="tabla">
        <table id="tablaGrupos">
            <thead>
                <tr>
                    <th>Clave</th>
                    <th>Materia</th>
                    <th>Docente</th>
                    <th>Aula</th>
                    <th>Capacidad</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>

            </tbody>
        </table>
    </div>
    <div id="modalAgregarAlumnoGrupo" class="modal"></div>
</div>