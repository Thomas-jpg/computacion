<script src="../../js/mapaCurricular.js"></script>
<div class="contenedor">
                <div class="mapa-top">
                    <h1 class="title">Mapa Curricular</h1>
                    <div class="status-materias">
                        <span><i class="fas fa-square"></i> Aprobada | </span>
                        <span><i class="fas fa-square"></i> Reprobada | </span>
                        <span><i class="fas fa-square"></i> Cursando | </span>
                        <span><i class="fas fa-square"></i> Recursando</span>
                    </div>
                </div>
                <div class="tabla carga-Materias" id="cargaMaterias">
                    <table id="listaGpos">
                        <thead>
                            <tr>
                                <th>Gpo</th>
                                <th>Materia</th>
                                <th>Docente</th>
                                <th>Aula</th>
                                <th>Creditos</th>
                                <th></th>
                            </tr>
                        </thead>    
                        <tbody>
                        </tbody>
                    </table>
                    <div class="aceptar-carga">
                        <span><i class="fas fa-exclamation-triangle"></i></span>
                        <p>"Una vez aceptada la carga no habrá cambios, elige correctamente"</p>
                        <button class="btn-cargaCurricular" id="btn-cargaCurricular">Generar Carga</button>
                    </div>
                </div>
                <table class="mpCurricular">
                    <tr>
                        <th class="fases"><label>Fases</label></th>
                        <th colspan="2" class="fases"><label>Básica</label></th>
                        <th colspan="4" class="fases"><label>Diciplinaria y Profesionalizante</label></th>
                        <th colspan="2" class="fases"><label>Terminal</label></th>
                    </tr>
                    <tr>
                        <th class="areas"><label>Áreas de Formación</label></th>
                        <td colspan="1">Primera carga académica</td>
                        <td colspan="1"></td>
                        <td colspan="1"></td>
                        <td colspan="1"></td>
                        <td colspan="1"></td>
                        <td colspan="1"></td>
                        <td colspan="1"></td>
                        <td colspan="1"></td>
                    </tr>
                    <tr>
                        <th rowspan="2" class="areas-humano"><label>Interacción
                                Humano-Computadora</label></th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td class="label7 materia" data-id="PII-M"><label>Procesamiento
                                    de Imágenes</label></td>
                        <td class="label7 materia" data-id="GRI-M"><label>Graficación</label>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td class="label7 materia" data-id="IAI-M"><label>Inteligencia Artificial</label></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th rowspan="2" class="areas-mate"><label>Matemáticas y Ciencias Básicas</label></th>
                        <td class="label6 materia" data-id="MAM-1M"><label>Matemáticas
                                    I</label></td>
                        <td class="label6 materia" data-id="MAM-2M"><label>Matemáticas
                                    II</label></td>
                        <td class="label6 materia" data-id="MAM-3M"><label>Matemáticas
                                    III</label></td>
                        <td></td>
                        <td></td>
                        <td class="label6 materia" data-id="TAM-M"><label>Teoría
                                    Autómatas y Lenguajes Formales</label></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td class="label6 materia" data-id="EDM-M"><label>Estructuras Discretas</label></td>
                        <td class="label6 materia" data-id="ALM-M"><label>Álgebra
                                    Lineal</label></td>
                        <td class="label6 materia" data-id="MDM-M"><label>Matemáticas
                                    Discretas</label></td>
                        <td class="label6 materia" data-id="PEM-M"><label>Probabilidad
                                    y Estadistica</label></td>
                        <td class="label6 materia" data-id="AAM-M"><label>Análisis
                                    de Algoritmos</label></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th rowspan="2" class="areas-prog"><label>Programación e Ingeniería de
                                Software</label></th>
                        <td class="label5 materia" data-id="ICP-M"><label>Introducción
                                    a la Computación</label></td>
                        <td class="label5 materia" data-id="FPP-M"><label>Fundamentos
                                    de Programación</label></td>
                        <td class="label5 materia" data-id="EDP-M"><label>Estructura
                                    de Datos</label></td>
                        <td></td>
                        <td class="label5 materia" data-id="PWP-M"><label>Programación
                                    Web</label></td>
                        <td class="label5 materia" data-id="ISP-M"><label>Ingeniería
                                    de Software</label></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td class="label5 materia" data-id="PRP-1M"><label>Programación
                                    I</label></td>
                        <td class="label5 materia" data-id="PRP-2M"><label>Programación
                                    II</label></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th rowspan="2" class="areas-trat"><label>Tratamiento de la Información
                                y Software de Base</label></th>
                        <td></td>
                        <td></td>
                        <td class="label4 materia" data-id="FBT-M"><label>Fundamentos
                                    de Base de Datos</label></td>
                        <td class="label4 materia" data-id="BAT-M"><label>Base
                                    de Datos</label></td>
                        <td></td>
                        <td></td>
                        <td class="label4 materia" data-id="BDT-M"><label>Base
                                    de Datos Distribuidas</label></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td class="label4 materia" data-id="SOT-M"><label>Sistemas
                                    Operativos</label></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td class="label4 materia" data-id="COT-M"><label>Compiladores</label>
                        </td>
                    </tr>
                    <tr>
                        <th rowspan="2" class="areas-arq"><label>Arquitectura y Redes de
                                Computadoras</label></th>
                        <td class="label3 materia" data-id="CEA-M"><label>Circuitos
                                    Eléctricos y Electrónicos</label></td>
                        <td></td>
                        <td class="label3 materia" data-id="EDA-M"><label>Electrónica
                                    Digital</label></td>
                        <td class="label3 materia" data-id="ACA-M"><label>Arquitectura
                                    de Computadoras</label></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td class="label3 materia" data-id="RCA-M"><label>Redes
                                    de Computadoras</label></td>
                        <td class="label3 materia" data-id="SDA-M"><label>Sistemas
                                    Distribuidos</label></td>
                        <td></td>
                        <td class="label3 materia" data-id="SIA-M"><label>Seguridad Informática</label>
                        </td>
                    </tr>
                    <tr>
                        <th rowspan="2" class="areas-ent"><label>Entorno Social</label></th>
                        <td class="label2 materia" data-id="COE-M"><label>Comunicación
                                    Oral y Escrita</label></td>
                        <td class="label2 materia" data-id="DSE-M"><label>Desarrolo
                                    Sustentable</label></td>
                        <td></td>
                        <td></td>
                        <td class="label2 materia" data-id="DHE-M"><label>Derechos
                                    Humanos y Ética Profesional</label></td>
                        <td class="label2 materia" data-id="MIE-M"><label>Metodología
                                    de la Investigación</label></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td class="label2 materia" data-id="IBE-M"><label>Inglés
                                    Básico</label></td>
                        <td class="label2 materia" data-id="IEE-M"><label>Inglés
                                    Elemental</label></td>
                        <td class="label2 materia" data-id="IPE-M"><label>Inglés
                                    Preintermedio</label></td>
                        <td class="label2 materia" data-id="IIE-M"><label>Inglés
                                    Intermedio</label></td>
                        <td class="label2 materia" data-id="IAE-M"><label>Inglés
                                    Avanzado</label></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <th rowspan="2"></th>
                        <td ></td>
                        <td ></td>
                        <td ></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td class="label8 materia" data-id="OPT-1"><label>Optativa
                                    I</label></td>
                        <td class="label8 materia" data-id="OPT-3"><label>Optativa
                                    III</label></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td class="label8 materia" data-id="OPT-2"><label>Optativa
                                    II</label></td>
                        <td class="label8 materia" data-id="OPT-4"><label>Optativa
                                    IV</label></td>
                    </tr>
                </table>
                <div id="modalMostrarGrupos" class="modal"></div>
            </div>