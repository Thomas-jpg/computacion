<?php
    class Modelo_Alumno{
        private $conexion;
        function __construct(){
            require_once 'conexion/conexion.php';
            $this->conexion = new Conexion();
            $this->conexion->conectar();
        }
        function InfoAlumnos(){
            $dataAlumnos=array();
            // realizamos la peticion de todos los alumnos disponibles
            $sql="SELECT Matricula_Alumno, Nombre, Apellido_P,Apellido_M, Anio_Ingreso,Semestre_Actual,Curp FROM alumno";
            $consulta=$this->conexion->conexion->query($sql);
            if ($consulta) {
                while($data = mysqli_fetch_assoc($consulta)){
                    $dataAlumnos["data"][]=$data;
                }
                $this->conexion->cerrar();
            }
            return $dataAlumnos;
        }
        function EliminarAlumno($matricula){
            $dataEliminado=array();
            //eliminamos al alumno mediante su matricula o clave unica
            $sql="DELETE FROM alumno WHERE Matricula_Alumno='$matricula'";
            $consulta=$this->conexion->conexion->query($sql);
            if($consulta){
                $dataEliminado=array('tipo'=>'correcto','mensaje'=>'Alumno Eliminado Correctamente.');
            }else{
                $dataEliminado=array('tipo'=>'error','mensaje'=>'Ocurrió un error, intentelo de nuevo más tarde.');
            }
            return $dataEliminado;
        }
        function ActualizarAlumno($matricula,$nombre,$apellidoP,$apellidoM,$curp,$semestreA){
            $dataActualizado=array();
            $sql="UPDATE alumno SET Matricula_Alumno='$matricula', Nombre='$nombre', Apellido_P='$apellidoP', Apellido_M='$apellidoM',Curp='$curp',Semestre_Actual='$semestreA' WHERE Matricula_Alumno='$matricula'";
            $consulta=$this->conexion->conexion->query($sql);
            if($consulta){
                $dataActualizado=array('tipo'=>'correcto','mensaje'=>'El alumno '.$nombre.' se actualizó correctamente.');
            }else{
                $dataActualizado=array('tipo'=>'error','mensaje'=>'Ocurrió un error, intentelo de nuevo más tarde.');
            }
            return $dataActualizado;
        }
        function KardexAlumno($matricula,$semestre){
            $dataKardex=array();
            // solicitamos las datos necesarios para rellenar el kardex
            $sql="SELECT k.Matricula_Materia, k.Fecha_Examen, k.Tipo_Examen, k.Calificacion,k.Periodo_Lectivo,k.Ciclo_Escolar,k.Semestre, m.Nombre, m.Creditos, m.Matricula_Materia FROM kardex_alumno k, materias m WHERE k.Matricula_Materia=m.Matricula_Materia AND k.Matricula_Alumno='$matricula' AND k.Semestre='$semestre'";
            $consulta=$this->conexion->conexion->query($sql);
            if($consulta){
                while($data = mysqli_fetch_assoc($consulta)){
                    $dataKardex['data'][]=$data;
                }
                $this->conexion->cerrar();
            }
            return $dataKardex;
        }

        function RegistrarAlumno($matricula,$nombre,$apellidoP,$apellidoM,$curp,$anio_ingreso,$semestreR,$semestreA,$ciclo_escolar){
            $dataAlumno=array();
            $sql="INSERT INTO alumno(Matricula_Alumno,Nombre,Apellido_P, Apellido_M, Curp, Licenciatura,Anio_Ingreso,Semestre_Real,Semestre_Actual,Ciclo_Escolar,Estatus_Carga) VALUES($matricula,'$nombre','$apellidoP','$apellidoM','$curp','COMPUTACIÓN',$anio_ingreso,$semestreR,$semestreA,'$ciclo_escolar',0)";
            $consulta=$this->conexion->conexion->query($sql);
            if ($consulta) {
                $mensaje='Alumno '.$nombre.' agregado correctamente.';
                $dataAlumno=array('tipo'=>'correcto','mensaje'=>$mensaje);
            }else{
                $dataAlumno=array('tipo'=>'error', 'mensaje'=> 'Ocurrió un error, intenlo de nuevo más tarde.');
            }
            $this->conexion->cerrar();

            return $dataAlumno;
        }

        function GuardarCargaCurricular($matricula_alumno,$grupos){
            $cargaAlumno=array();
            $reprobadas=array();
            $sql="SELECT Matricula_Materia FROM materia_alumno WHERE Estado_Materia='REPROBADO' AND Matricula_Alumno='$matricula_alumno'";
            $consulta=$this->conexion->conexion->query($sql);
            if($consulta){
                while($data = mysqli_fetch_assoc($consulta)){
                    $reprobadas[]=$data;
                }
                $this->conexion->cerrar();
            }
            //validamos que el alumno tenga materias reprobadas e insertamos las materias al alumno correspondiente
            $tamRep=count($reprobadas);
            if($tamRep > 0){
                //si debe materias, actualizamos las encontradas y las demas se ingresan normalmente
                foreach($grupos as $grupo){
                    foreach($reprobadas as $matReprobada){
                        if ($grupo['matricula'] == $matReprobada['Matricula_Materia']) {
                            $recurso=$matReprobada['Matricula_Materia'];
                            $sql2="UPDATE materia_alumno SET Estado_Materia='RECURSANDO' WHERE Matricula_Materia='$recurso' AND Matricula_Alumno='$matricula_alumno'";
                            $actualizarEstado=$this->conexion->conexion->query($sql2);
                        }else{
                            $materia=$grupo['matricula'];
                           $sql3="INSERT INTO materia_alumno(Matricula_Alumno,Matricula_Materia,Estado_Materia,Calificacion) VALUES ('$matricula_alumno','$materia','CURSANDO','0')";
                           $insertarMateria=$this->conexion->conexion->query($sql3); 
                        }
                    }  
                }
            //si no hay reprobadas, si ingresan todas las seleccionadas
            }else{
                foreach($grupos as $grupo){
                    $materia=$grupo['matricula'];
                    $sql3="INSERT INTO materia_alumno(Matricula_Alumno,Matricula_Materia,Estado_Materia,Calificacion) VALUES ('$matricula_alumno','$materia','CURSANDO','0')";
                    $insertarMateria=$this->conexion->conexion->query($sql3);
                }
            }
            //ingresamos todos los grupos a su alumno correspondiente 
            foreach($grupos as $grupo){
                $idgrupo=$grupo['idgpo'];
                    $idmateria=$grupo['matricula'];
                    $sql4="INSERT INTO grupo_alumno(Id_grupo,Matricula_Alumno) VALUES ('$idgrupo','$idmateria')";
                    $agregarGpoAlumno=$this->conexion->conexion->query($sql4);
                    if ($agregarGpoAlumno) {
                        $sql5="UPDATE grupos SET Capacidad=Capacidad-1 WHERE Id_grupo='$idgrupo'";
                        $actualizarCapacidad=$this->conexion->conexion->query($sql5);
                        $sql6="UPDATE alumno SET Estatus_Carga=1";
                        $actualizarEstadoCarga=$this->conexion->conexion->query($sql6); 
                        $cargaAlumno=array('tipo'=>'correcto','mensaje'=>'Los grupos se agregaron correctamente a tu carga curricular');
                    }else{
                        $cargaAlumno=array('tipo'=>'error','mensaje'=>'Ocurrió un error, intentelo más tarde.');
                    } 
            }
            $this->conexion->cerrar();
            return $cargaAlumno;
        }

        function DatosAlumno($matricula){
            $dataAlumno=array();
            $sql="SELECT Nombre FROM alumno WHERE Matricula_Alumno='$matricula' LIMIT 1";
            $consulta=$this->conexion->conexion->query($sql);
            if($consulta){
                $dataAlumno[]=mysqli_fetch_assoc($consulta);
            }
            $this->conexion->cerrar();

            return $dataAlumno;
        }

        function MateriasAlumno($matricula){
            $dataAlumnoMaterias=array();
            $sql="SELECT m.Matricula_Materia, m.Nombre, m.Creditos, ma.Estado_Materia,ma.Calificacion FROM materias m, materia_alumno ma WHERE m.Matricula_Materia = ma.Matricula_Materia AND ma.Matricula_Alumno='$matricula'";
            $consulta=$this->conexion->conexion->query($sql);
            if($consulta){
                while($data = mysqli_fetch_assoc($consulta)){
                    $dataAlumnoMaterias[]=$data;
                }
                $this->conexion->cerrar();
            }
            return $dataAlumnoMaterias;
        }
    }


?>