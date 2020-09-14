<script type="text/javascript" src="../../js/registroAlumno.js"></script> 
<div class="contenedor">
    <h1 class="title">Registro de Alumnos</h1>
    <div class="addbtn">
        <button title="Cargar Excel" id="addExcel"><span><i class="fas fa-plus"></i></span>
            &nbsp;&nbsp;&nbsp;Cargar Excel
        </button>
    </div>
    <div class="registroAlumno" id="registroAlumnos">
        <form action="" id="formRegistroAlumno" class="form_editar">
            <div>
                <label class="form_Label">Matricula</label>
                <div class="input">
                    <span class="form_icon"><i class="fas fa-user"></i></span>
                    <input type="text" name="matricula" value="" placeholder="Matricula">
                </div>
            </div>
            <div>
                <label class="form_Label">Nombre</label>
                <div class="input">
                    <span class="form_icon"><i class="fas fa-signature"></i></span>
                    <input type="text" name="nombre" value="" placeholder="Nombre(s)" required>
                </div>
            </div>
            <div>
                <label class="form_Label">Apellido Paterno</label>
                <div class="input">
                    <span class="form_icon"><i class="fas fa-signature"></i></span>
                    <input type="text" name="apellido_p" value="" placeholder="Apellido Paterno" required>
                </div>
            </div>
            <div>
                <label class="form_Label">Apellido Materno</label>
                <div class="input">
                    <span class="form_icon"><i class="fas fa-signature"></i></span>
                    <input type="text" name="apellido_m" value="" placeholder="Apellido Materno" required>
                </div>
            </div>
            <div>
                <label class="form_Label">CURP</label>
                <div class="input">
                    <span class="form_icon"><i class="fas fa-signature"></i></span>
                    <input type="text" name="curp" value="" placeholder="CURP" required>
                </div>
            </div>
            <div>
                <label class="form_Label">Año Ingreso</label>
                <div class="input">
                    <span class="form_icon"><i class="fas fa-signature"></i></span>
                    <select name="anio_ingreso" id="anio_ingreso" required>
                        <option value="2015">2015</option>
                        <option value="2016">2016</option>
                        <option value="2017">2017</option>
                        <option value="2018">2018</option>
                        <option value="2019">2019</option>
                        <option value="2020">2020</option>
					</select>
                </div>
            </div>
            <div>
                <label class="form_Label">Semestre Real</label>
                <div class="input">
                    <span class="form_icon"><i class="fas fa-signature"></i></span>
                    <select name="semestre_real" id="semestre_real" required>
                        <option value="1">Primer Semestre</option>
                        <option value="2">Segundo Semestre</option>
                        <option value="3">Tercer Semestre</option>
                        <option value="4">Cuarto Semestre</option>
                        <option value="5">Quinto Semestre</option>
                        <option value="6">Sexto Semestre</option>
                        <option value="7">Septimo Semestre</option>
                        <option value="8">Octavo Semestre</option>
                        <option value="9">Noveno Semestre</option>
                        <option value="10">Decimo Semestre</option>
                    </select>
                </div>
            </div>
            <div>
                <label class="form_Label">Semestre Actual</label>
                <div class="input">
                    <span class="form_icon"><i class="fas fa-signature"></i></span>
                    <select name="semestre_actual" id="semestre_actual" required>
                        <option value="1">Primer Semestre</option>
                        <option value="2">Segundo Semestre</option>
                        <option value="3">Tercer Semestre</option>
                        <option value="4">Cuarto Semestre</option>
                        <option value="5">Quinto Semestre</option>
                        <option value="6">Sexto Semestre</option>
                        <option value="7">Septimo Semestre</option>
                        <option value="8">Octavo Semestre</option>
                        <option value="9">Noveno Semestre</option>
                        <option value="10">Decimo Semestre</option>
                    </select>
                </div>
            </div>
            <div class="grid-item_span">
                <label class="form_Label">Ciclo Escolar</label>
                <div class="input">
                    <span class="form_icon"><i class="fas fa-signature"></i></span>
                    <select name="ciclo_escolar1" id="ciclo_escolar1" required>
                        <option value="2015">2015</option>
                        <option value="2016">2016</option>
                        <option value="2017">2017</option>
                        <option value="2018">2018</option>
                        <option value="2019">2019</option>
                        <option value="2020">2020</option>
                    </select>
                    <select name="ciclo_escolar2" id="ciclo_escolar2" required>
                        <option value="2015">2015</option>
                        <option value="2016">2016</option>
                        <option value="2017">2017</option>
                        <option value="2018">2018</option>
                        <option value="2019">2019</option>
                        <option value="2020">2020</option>
                    </select>
                </div>
            </div>
            <div class="form_submit">
                <button type="submit" class="" title="Agregar Registro">Agregar Registro</button>
            </div>
        </form>
    </div>
</div>