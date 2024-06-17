<?PHP 
	
include_once("conexion.php");

class agenda {

var $conexion;

function __construct(){
	$this->conexion= new conexion();
}	


	function insertar($agenda_Titulo, $agenda_Fecha, $agenda_Lugar, $agenda_URL_Galeria, $agenda_FechaMax_Inscripcion, $agenda_FechaMax_Cancelacion, $agenda_Hora, $agenda_Imagen, $agenda_Descripcion, $agenda_Coste_Catering, $agenda_Precio_Socio, $agenda_Precio_Invitado, $agenda_ProvinciaFK, $agenda_Visible, $agenda_Informe, $agenda_Precio_Visible, $agenda_Estado) {		
		$consulta = "INSERT INTO agenda(agenda_Titulo, agenda_Fecha, agenda_Lugar, agenda_URL_Galeria, agenda_FechaMax_Inscripcion, agenda_FechaMax_Cancelacion, agenda_Hora, agenda_Imagen, agenda_Descripcion, agenda_Coste_Catering, agenda_Precio_Socio, agenda_Precio_Invitado, agenda_ProvinciaFK, agenda_Visible, agenda_Informe, agenda_Precio_Visible, agenda_Estado)
			VALUES('$agenda_Titulo', '$agenda_Fecha', '$agenda_Lugar', '$agenda_URL_Galeria', '$agenda_FechaMax_Inscripcion', '$agenda_FechaMax_Cancelacion', '$agenda_Hora', '$agenda_Imagen', '$agenda_Descripcion', '$agenda_Coste_Catering', '$agenda_Precio_Socio', '$agenda_Precio_Invitado', '$agenda_ProvinciaFK', '$agenda_Visible', '$agenda_Informe', '$agenda_Precio_Visible', '$agenda_Estado')";
		$res = $this->conexion->BD_Consulta($consulta);
		return($res);
	}
	
	
	function eliminar($condicion) {
		$consulta = "DELETE FROM agenda $condicion";
		$res = $this->conexion->BD_Consulta($consulta);
		return($res);	
	}
	
	function modificar($agenda_Titulo, $agenda_Fecha, $agenda_Lugar, $agenda_URL_Galeria, $agenda_FechaMax_Inscripcion, $agenda_FechaMax_Cancelacion, $agenda_Hora, $agenda_Imagen, $agenda_Descripcion, $agenda_Coste_Catering, $agenda_Precio_Socio, $agenda_Precio_Invitado, $agenda_ProvinciaFK, $agenda_Visible, $agenda_Informe, $agenda_Precio_Visible, $agenda_Estado, $agenda_CodPK) {
				$consulta = "UPDATE agenda SET agenda_Titulo='$agenda_Titulo', agenda_Fecha='$agenda_Fecha', agenda_Lugar='$agenda_Lugar', agenda_URL_Galeria='$agenda_URL_Galeria', agenda_FechaMax_Inscripcion='$agenda_FechaMax_Inscripcion', agenda_FechaMax_Cancelacion='$agenda_FechaMax_Cancelacion', 
							agenda_Hora='$agenda_Hora', agenda_Imagen='$agenda_Imagen', agenda_Descripcion='$agenda_Descripcion', agenda_Coste_Catering='$agenda_Coste_Catering', agenda_Precio_Socio='$agenda_Precio_Socio', agenda_Precio_Invitado='$agenda_Precio_Invitado', agenda_ProvinciaFK='$agenda_ProvinciaFK', agenda_Visible='$agenda_Visible', agenda_Informe='$agenda_Informe', agenda_Precio_Visible='$agenda_Precio_Visible', agenda_Estado='$agenda_Estado'		
							WHERE agenda_CodPK='$agenda_CodPK'";
		$res = $this->conexion->BD_Consulta($consulta);
		return($res);
	}

	function modificar_DatosPerso($agenda_Login, $agenda_Pass, $agenda_Nombre, $agenda_CIF, $agenda_CodPK) {
		$consulta = "UPDATE agenda SET agenda_Login='$agenda_Login', agenda_Pass='$agenda_Pass', agenda_Nombre='$agenda_Nombre', agenda_CIF='$agenda_CIF' WHERE agenda_CodPK='$agenda_CodPK'";
		$res = $this->conexion->BD_Consulta($consulta);
		return($res);
	}
    
    
	function cambiarEstado($pobla_Estado, $pobla_CodPK) {
		$consulta = "UPDATE agenda SET pobla_Estado='$pobla_Estado' WHERE pobla_CodPK='$pobla_CodPK'";
		$res = $this->conexion->BD_Consulta($consulta);
		return($res);
	}
		
	
	function modificarFoto($agenda_Foto, $agenda_CodPK) {
		$consulta = "UPDATE agenda SET agenda_Foto='$agenda_Foto' WHERE agenda_CodPK='$agenda_CodPK'";
		$res = $this->conexion->BD_Consulta($consulta);
		return($res);
	}

	function modificarArchivo($agenda_Imagen, $agenda_CodPK) {
		$consulta = "UPDATE agenda SET agenda_Imagen='$agenda_Imagen' WHERE agenda_CodPK='$agenda_CodPK'";
		$res = $this->conexion->BD_Consulta($consulta);
		return($res);
	}
		
    function modificarArchivo2($agenda_Emp_Logo, $agenda_CodPK) {
		$consulta = "UPDATE agenda SET agenda_Emp_Logo='$agenda_Emp_Logo' WHERE agenda_CodPK='$agenda_CodPK'";
		$res = $this->conexion->BD_Consulta($consulta);
		return($res);
	}
		
	function obtener(){
		$consulta  = "SELECT * FROM agenda";
		$res = $this->conexion->BD_Consulta($consulta);
		return($res);	
	}
	
	
	function obtenerConFiltro($condicion,$order){
		 if($condicion=="" && $order!="")
				$consulta  = "SELECT * FROM agenda $order";				
		 else{
			 if($order=="" && $condicion!="")
					$consulta  = "SELECT * FROM agenda $condicion";				
			 else{
				  if($order!="" && $condicion!="")		 
					$consulta  = "SELECT * FROM agenda $condicion $order";
					else{
						if($order=="" && $condicion=="")		 
							$consulta  = "SELECT * FROM agenda";
						}				
			  }
		}
									  
		$res = $this->conexion->BD_Consulta($consulta);
		return($res);	
	}
	
	
	function obtenerPaginados(){
		$consulta  = "SELECT * FROM agenda";
		return($consulta);	
	}
	
	
	function obtenerPaginadosConFiltro($condicion,$order){
		 if($condicion=="" && $order!="")
				$consulta  = "SELECT * FROM agenda $order";				
		 else{
			 if($order=="" && $condicion!="")
					$consulta  = "SELECT * FROM agenda $condicion";				
			 else{
				  if($order!="" && $condicion!="")		 
					$consulta  = "SELECT * FROM agenda $condicion $order";
					else{
						if($order=="" && $condicion=="")		 
							$consulta  = "SELECT * FROM agenda";
						}				
			  }
		}
		return($consulta);	
	}
	
	
	function subirArchivo($directorio,$id,$ext){
		$nombreDirectorio = "../../archivos/agenda/";
		$idUnico = rand(0,time());
		$nombreFichero = $idUnico . "-" . $id . "." . $ext;		 
		if($nombreFichero != ''){
		 	move_uploaded_file ($directorio,$nombreDirectorio . $nombreFichero);
		 }	
		return ($nombreFichero);
	}
		
	function eliminarArchivo($imagen) {
		if(trim($imagen)!=""){	
			$imagen2 = "../../archivos/agenda/" . $imagen;
			unlink ($imagen2);
		}	
	}
}
