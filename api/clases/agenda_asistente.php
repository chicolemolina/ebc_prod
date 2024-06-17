<?PHP 
	
include_once("conexion.php");

class agenda_asistente {

var $conexion;

function __construct(){
	$this->conexion= new conexion();
}	


	function insertar($asistente_AgendaFK, $asistente_SocioFK) {		
		$consulta = "INSERT INTO agenda_asistente(asistente_AgendaFK, asistente_SocioFK)
			VALUES('$asistente_AgendaFK', '$asistente_SocioFK')";
		$res = $this->conexion->BD_Consulta($consulta);
		return($res);
	}

	function insertar_prepare($asistente_AgendaFK, $asistente_SocioFK) {		
		$consulta = "INSERT INTO agenda_asistente (asistente_AgendaFK, asistente_SocioFK)
						VALUES (?, ?)";
		$tipos = "ii"; // Define los tipos de los parámetros: s = string, i = integer, d = double

		$res = $this->conexion->BD_PrepararConsulta($consulta, $tipos, $asistente_AgendaFK, $asistente_SocioFK);


		return($res);
	}
	
	function insertar_sustituto($asistente_AgendaFK, $asistente_SocioFK, $asistente_Sustituto, $asistente_Sustituto_Nombre, $asistente_Sustituto_Email, $asistente_Sustituto_Telefono, $asistente_Sustituto_Alergia) {		
		$consulta = "INSERT INTO agenda_asistente(asistente_AgendaFK, asistente_SocioFK, asistente_Sustituto, asistente_Sustituto_Nombre, asistente_Sustituto_Email, asistente_Sustituto_Telefono, asistente_Sustituto_Alergia)
			VALUES('$asistente_AgendaFK', '$asistente_SocioFK', '$asistente_Sustituto', '$asistente_Sustituto_Nombre', '$asistente_Sustituto_Email', '$asistente_Sustituto_Telefono', '$asistente_Sustituto_Alergia')";
		$res = $this->conexion->BD_Consulta($consulta);
		return($res);
	}

	function insertar_sustituto_pre($asistente_AgendaFK, $asistente_SocioFK, $asistente_Sustituto, $asistente_Sustituto_Nombre, $asistente_Sustituto_Email, $asistente_Sustituto_Telefono, $asistente_Sustituto_Alergia) {		
		$consulta = "INSERT INTO agenda_asistente(asistente_AgendaFK, asistente_SocioFK, asistente_Sustituto, asistente_Sustituto_Nombre, asistente_Sustituto_Email, asistente_Sustituto_Telefono, asistente_Sustituto_Alergia)
			VALUES(?, ?, ?, ?, ?, ?, ?)";
		$tipos = "iisssss"; // Define los tipos de los parámetros: s = string, i = integer, d = double

		$res = $this->conexion->BD_PrepararConsulta($consulta, $tipos, $asistente_AgendaFK, $asistente_SocioFK, $asistente_Sustituto, $asistente_Sustituto_Nombre, $asistente_Sustituto_Email, $asistente_Sustituto_Telefono, $asistente_Sustituto_Alergia);
		
		return($res);
	}
	
	function eliminar($condicion) {
		$consulta = "DELETE FROM agenda_asistente $condicion";
		$res = $this->conexion->BD_Consulta($consulta);
		return($res);	
	}
	
	function modificar($asistente_AgendaFK, $asistente_SocioFK, $agenda_CodPK) {
				$consulta = "UPDATE agenda_asistente SET asistente_AgendaFK='$asistente_AgendaFK', asistente_SocioFK='$asistente_SocioFK'		
				WHERE agenda_CodPK='$agenda_CodPK'";
	
		$res = $this->conexion->BD_Consulta($consulta);
		return($res);
	}

	function modificar_sustituto($asistente_Sustituto_Nombre, $asistente_Sustituto_Email, $asistente_Sustituto_Telefono, $asistente_Sustituto_Alergia, $asistente_CodPK) {
		$consulta = "UPDATE agenda_asistente SET asistente_Sustituto_Nombre='$asistente_Sustituto_Nombre', asistente_Sustituto_Email='$asistente_Sustituto_Email', asistente_Sustituto_Telefono='$asistente_Sustituto_Telefono', asistente_Sustituto_Alergia='$asistente_Sustituto_Alergia'		
						WHERE asistente_CodPK='$asistente_CodPK'";

		$res = $this->conexion->BD_Consulta($consulta);
		return($res);
	}

	function modificar_DatosPerso($agenda_Login, $agenda_Pass, $agenda_Nombre, $agenda_CIF, $agenda_CodPK) {
		$consulta = "UPDATE agenda_asistente SET agenda_Login='$agenda_Login', agenda_Pass='$agenda_Pass', agenda_Nombre='$agenda_Nombre', agenda_CIF='$agenda_CIF' WHERE agenda_CodPK='$agenda_CodPK'";
		$res = $this->conexion->BD_Consulta($consulta);
		return($res);
	}
    
    
	function cambiarEstado($pobla_Estado, $pobla_CodPK) {
		$consulta = "UPDATE agenda_asistente SET pobla_Estado='$pobla_Estado' WHERE pobla_CodPK='$pobla_CodPK'";
		$res = $this->conexion->BD_Consulta($consulta);
		return($res);
	}
	
	function modificarFoto($agenda_Foto, $agenda_CodPK) {
		$consulta = "UPDATE agenda_asistente SET agenda_Foto='$agenda_Foto' WHERE agenda_CodPK='$agenda_CodPK'";
		$res = $this->conexion->BD_Consulta($consulta);
		return($res);
	}

	function modificarArchivo($agenda_Imagen, $agenda_CodPK) {
		$consulta = "UPDATE agenda_asistente SET agenda_Imagen='$agenda_Imagen' WHERE agenda_CodPK='$agenda_CodPK'";
		$res = $this->conexion->BD_Consulta($consulta);
		return($res);
	}
		
    function modificarArchivo2($agenda_Emp_Logo, $agenda_CodPK) {
		$consulta = "UPDATE agenda_asistente SET agenda_Emp_Logo='$agenda_Emp_Logo' WHERE agenda_CodPK='$agenda_CodPK'";
		$res = $this->conexion->BD_Consulta($consulta);
		return($res);
	}
		
	function obtener(){
		$consulta  = "SELECT * FROM agenda_asistente";
		$res = $this->conexion->BD_Consulta($consulta);
		return($res);	
	}
	
	
	function obtenerConFiltro($condicion,$order){
		 if($condicion=="" && $order!="")
				$consulta  = "SELECT * FROM agenda_asistente $order";				
		 else{
			 if($order=="" && $condicion!="")
					$consulta  = "SELECT * FROM agenda_asistente $condicion";				
			 else{
				  if($order!="" && $condicion!="")		 
					$consulta  = "SELECT * FROM agenda_asistente $condicion $order";
					else{
						if($order=="" && $condicion=="")		 
							$consulta  = "SELECT * FROM agenda_asistente";
						}				
			  }
		}
									  
		$res = $this->conexion->BD_Consulta($consulta);
		return($res);	
	}
	
	
	function obtenerPaginados(){
		$consulta  = "SELECT * FROM agenda_asistente";
		return($consulta);	
	}
	
	
	function obtenerPaginadosConFiltro($condicion,$order){
		 if($condicion=="" && $order!="")
				$consulta  = "SELECT * FROM agenda_asistente $order";				
		 else{
			 if($order=="" && $condicion!="")
					$consulta  = "SELECT * FROM agenda_asistente $condicion";				
			 else{
				  if($order!="" && $condicion!="")		 
					$consulta  = "SELECT * FROM agenda_asistente $condicion $order";
					else{
						if($order=="" && $condicion=="")		 
							$consulta  = "SELECT * FROM agenda_asistente";
						}				
			  }
		}
		return($consulta);	
	}
	
	
	function subirArchivo($directorio,$id,$ext){
		$nombreDirectorio = "../../archivos/agenda_asistente/";
		$idUnico = rand(0,time());
		$nombreFichero = $idUnico . "-" . $id . "." . $ext;		 
		if($nombreFichero != ''){
		 	move_uploaded_file ($directorio,$nombreDirectorio . $nombreFichero);
		 }	
		return ($nombreFichero);
	}
		
	function eliminarArchivo($imagen) {
		if(trim($imagen)!=""){	
			$imagen2 = "../../archivos/agenda_asistente/" . $imagen;
			unlink ($imagen2);
		}	
	}
}
