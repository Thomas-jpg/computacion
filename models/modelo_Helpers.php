<?php 
    class Modelo_Helpers{
        private $conexion;
        function __construct(){
            require_once 'conexion/conexion.php';
            $this->conexion = new Conexion();
            $this->conexion->conectar();
        }
        //funcion para obtener materias en general
        function Materias(){
            $arreglo=array();
            $sql="SELECT Matricula_Materia, Nombre FROM materias";
            $consulta=$this->conexion->conexion->query($sql);
            if ($consulta) {
                while($materias = mysqli_fetch_assoc($consulta)){
                    $arreglo[]=$materias;
                }
                $this->conexion->cerrar();
            }
            return $arreglo;
        }
        //funcion para obtener solo las aulas disponibles
        function AulasDisp(){
            $aulas= array();
            $sql="SELECT Id_Aula, Nombre_Aula FROM aulas WHERE Disponible = 1";
            $consulta= $this->conexion->conexion->query($sql);
            if($consulta){
                while($aula = mysqli_fetch_assoc($consulta)){
                    $aulas[]=$aula;
                }
                $this->conexion->cerrar();
            }
            return $aulas;
        }
        //funcion para verificar si el alumno existe o ya esta en el grupo
        function VerificarAlumno($matricula, $grupo){
            $alumno=false;
            $dentro=false;
            $dataAlumno= array();
            $sql="SELECT Matricula_Alumno FROM alumno WHERE Matricula_Alumno = '$matricula'";
            $consulta=$this->conexion->conexion->query($sql);
            if ($consulta->num_rows > 0) {
                $alumno = true;
                $sql2="SELECT Matricula_Alumno,Id_grupo FROM grupo_alumno WHERE Matricula_Alumno=$matricula AND Id_grupo = '$grupo'";
                $consulta2=$this->conexion->conexion->query($sql2);

                if($consulta2->num_rows > 0 ){
                    $dentro=true;
                }
            }
            $this->conexion->cerrar();
            $dataAlumno=array('alumno' =>$alumno, 'dentro'=>$dentro);

            return $dataAlumno;
        }
        //funcion para encriptar las contraseñas
        function HashPassword($password) 
        {
            $hash = password_hash($password, PASSWORD_DEFAULT);
            return $hash;
        }
        //verificamos si el usuario ya esta registrado
        function VerificarUsuario($usuario){
            $existe= false;
            $dataUsuario= array();
            $sql="SELECT Usuario FROM usuarios WHERE Usuario='$usuario'";
            $consulta=$this->conexion->conexion->query($sql);
            if($consulta->num_rows > 0){
                $existe= true;
            }
            $this->conexion->cerrar();
            $dataUsuario=array('user' =>$existe);

            return $dataUsuario;
        }
        //obtenemos la ruta de imagen de usuario correspondiente
        function ObtenerRutaImg($id){
            $dataRuta=array();

            $sql="SELECT Foto FROM usuarios WHERE Id_usuario='$id'";
            $consulta=$this->conexion->conexion->query($sql);
            if($consulta){
                while($ruta = mysqli_fetch_assoc($consulta)){
                    $dataRuta[]=$ruta;
                }
                $this->conexion->cerrar();
            }
            return $dataRuta;
        }
        //verificamos que la contraseña anterior sea valida
        function VerificarContra($id,$pass){
            $valido= false;
            $sql="SELECT Password FROM usuarios WHERE Id_usuario = '$id'";
            $consulta=$this->conexion->conexion->query($sql);
            if ($consulta) {
            while($consulta_vu=mysqli_fetch_assoc($consulta)){
                if(password_verify($pass,$consulta_vu["Password"])){
                    $valido= true;
                }
            }
            $this->conexion->cerrar();
            }
            return $valido;
        }
        //actualizamos la contraseña del usuario
        function ActualizarPass($id,$pass){
            $dataPass=array();
            $sql="UPDATE usuarios SET Password='$pass' WHERE Id_usuario = '$id'";
            $consulta=$this->conexion->conexion->query($sql);
            if($consulta){
                $dataPass=array('tipo'=>'correcto','mensaje'=>'La contraseña se actualizó correctamente.');
            }else{
                $dataPass=array('tipo'=>'error','mensaje'=>'Ocurrió un error, intentalo de nuevo, o más tarde.');
            }
            $this->conexion->cerrar();

            return $dataPass;
        }
        //obtenemos los datos de las materias del alumno loggeado
        function DatosMaterias($matricula){
            $dataMateria=array();
            $sql="SELECT Matricula_Materia,Estado_Materia FROM materia_alumno WHERE Matricula_Alumno='$matricula'";
            $consulta=$this->conexion->conexion->query($sql);
            if ($consulta) {
                while($consulta_mat=mysqli_fetch_assoc($consulta)){
                    $dataMateria[]=$consulta_mat;
                }
                $this->conexion->cerrar();
            }
            return $dataMateria;
        }
        //verificamos que la materia seleccionada este seriada o no
        function MateriaRequisitos($materia,$usuario){
            $dataSeriada=array();
            $sql="SELECT Requisito_Obligatorio FROM requisito_materias WHERE Materia='$materia'";
            $consulta=$this->conexion->conexion->query($sql);
            if($consulta->num_rows > 0){
                $req=mysqli_fetch_assoc($consulta);
                $requisito=$req['Requisito_Obligatorio'];
                $sql2="SELECT Matricula_Materia FROM materia_alumno WHERE Matricula_Alumno='$usuario' AND Matricula_Materia='$requisito' AND Estado_Materia='APROBADO'";
                $consulta2=$this->conexion->conexion->query($sql2);
                if($consulta2->num_rows > 0){
                    $dataSeriada=array('seriada'=>false);
                }else{
                    $dataSeriada=array('seriada'=>true);
                }
            }else{
                $dataSeriada=array('seriada'=>false);
            }
            $this->conexion->cerrar();

            return $dataSeriada;
        }
        //verificamos si debe materias y si estan disponibles para agregar, de lo contrario que siga con su carga
        function ValidarReprobadas($materia,$usuario,$cargaLS){
            $dataReprobada=array();
            $sql="SELECT Matricula_Materia FROM materia_alumno WHERE Matricula_Alumno='$usuario' AND Estado_Materia='REPROBADO'";
            $consulta=$this->conexion->conexion->query($sql);
            if($consulta->num_rows > 0){
                while($consulta_mat=mysqli_fetch_assoc($consulta)){
                    foreach ($cargaLS as $matReprobada) {
                        //validamos si la o las materias que debemos estan dentro del localstorage y de ser asi que nos permita seguir agregando
                        if($consulta_mat['Matricula_Materia'] == $matReprobada['matricula']){
                            $dataReprobada=array('reprobada'=> false);
                        }
                        //si la materia que seleccionamos es la una de las reprobadas que nos permita agregar 
                        if ($consulta_mat['Matricula_Materia']==$materia) {
                            $dataReprobada=array('reprobada'=> false);
                        }else{
                            //buscamos si hay grupos disponibles de la materia que se debe
                            $sql2="SELECT Matricula_Materia FROM grupos WHERE Matricula_Materia='$consulta_mat[Matricula_Materia]'";
                            $consulta2=$this->conexion->conexion->query($sql2);
                            if($consulta2->num_rows > 0){
                                $dataReprobada=array('reprobada'=> true);
                            }else{
                                $dataReprobada=array('reprobada'=> false);
                            }
                        }
                    }
                    
                } 
            }else{
                $dataReprobada=array('reprobada'=> false);
            }
            $this->conexion->cerrar();
            return $dataReprobada;
        }
        //retornamos los grupos disponibles de acuerdo a la materia seleccionada
        function GpoDisponiblesMapa($materia){
            $dataGpos=array();
            $sql="SELECT materias.Nombre, materias.Creditos, grupos.Id_grupo, grupos.Aula, grupos.Capacidad, docente.Nombre_Docente, docente.Apellido_P, docente.Apellido_M FROM materias,grupos, docente WHERE grupos.Id_Docente=docente.Id_Docente AND grupos.Matricula_Materia='$materia' AND materias.Matricula_Materia= '$materia'";
            $consulta=$this->conexion->conexion->query($sql);
            if($consulta){
                while($consulta_gpos=mysqli_fetch_assoc($consulta)){
                    $dataGpos[]=$consulta_gpos;
                }
                $this->conexion->cerrar();
            }
            return $dataGpos;
        }
        //retornamos los datos de un grupo en especifico
        function InfoGrupo($idgrupo){
            $dataGrupo=array();
            $sql="SELECT m.Nombre,m.Matricula_Materia FROM materias m, grupos g WHERE m.Matricula_Materia=g.Matricula_Materia AND g.Id_grupo='$idgrupo'";
            $consulta=$this->conexion->conexion->query($sql);
            if($consulta){
                $grupo=mysqli_fetch_assoc($consulta);
                $dataGrupo[]=$grupo;
            }
            $this->conexion->cerrar();
            return $dataGrupo;
        }
    }

?>