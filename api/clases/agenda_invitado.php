<?PHP 
	
include_once("conexion.php");
include_once("fun_aux_api.php");

class agenda_invitado {

var $conexion;

function __construct(){
	$this->conexion= new conexion();
}	


	function insertar($invitado_Tipo, $invitado_AgendaFK, $invitado_SocioFK, $invitado_Nombre, $invitado_PerteneceEmpresa, $invitado_Empresa, $invitado_Actividad, $invitado_Email, $invitado_Telefono, $invitado_Alergia, $invitado_ProvinciaFK, $invitado_Pagado) {		
		$consulta = "INSERT INTO agenda_invitado(invitado_Tipo, invitado_AgendaFK, invitado_SocioFK, invitado_Nombre, invitado_PerteneceEmpresa, invitado_Empresa, invitado_Actividad, invitado_Email, invitado_Telefono, invitado_Alergia, invitado_ProvinciaFK, invitado_Pagado)
			VALUES('$invitado_Tipo', '$invitado_AgendaFK', '$invitado_SocioFK', '$invitado_Nombre', '$invitado_PerteneceEmpresa', '$invitado_Empresa', '$invitado_Actividad', '$invitado_Email', '$invitado_Telefono', '$invitado_Alergia', '$invitado_ProvinciaFK', '$invitado_Pagado')";
		$res = $this->conexion->BD_Consulta($consulta);
		return($res);
	}

	function insertar_prepare($invitado_Tipo, $invitado_AgendaFK, $invitado_SocioFK, $invitado_Nombre, $invitado_PerteneceEmpresa, $invitado_Empresa, $invitado_Actividad, $invitado_Email, $invitado_Telefono, $invitado_Alergia, $invitado_ProvinciaFK, $invitado_Pagado) {
		$consulta = "INSERT INTO agenda_invitado (invitado_Tipo, invitado_AgendaFK, invitado_SocioFK, invitado_Nombre, invitado_PerteneceEmpresa, invitado_Empresa, invitado_Actividad, invitado_Email, invitado_Telefono, invitado_Alergia, invitado_ProvinciaFK, invitado_Pagado)
					 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
		$tipos = "siisssssssis"; // Define los tipos de los parámetros: s = string, i = integer
	
		$res = $this->conexion->BD_PrepararConsulta($consulta, $tipos, $invitado_Tipo, $invitado_AgendaFK, $invitado_SocioFK, $invitado_Nombre, $invitado_PerteneceEmpresa, $invitado_Empresa, $invitado_Actividad, $invitado_Email, $invitado_Telefono, $invitado_Alergia, $invitado_ProvinciaFK, $invitado_Pagado);
	
		return $res;
	}
	
	
	function eliminar($condicion) {
		$consulta = "DELETE FROM agenda_invitado $condicion";
		$res = $this->conexion->BD_Consulta($consulta);
		return($res);	
	}
	
	function modificar($invitado_Tipo, $invitado_AgendaFK, $invitado_SocioFK, $invitado_Nombre, $invitado_PerteneceEmpresa, $invitado_Empresa, $invitado_Actividad, $invitado_Email, $invitado_Telefono, $invitado_Alergia, $invitado_ProvinciaFK, $invitado_Pagado, $invitado_CodPK) {
				$consulta = "UPDATE agenda_invitado SET invitado_Tipo='$invitado_Tipo', invitado_AgendaFK='$invitado_AgendaFK', invitado_SocioFK='$invitado_SocioFK', invitado_Nombre='$invitado_Nombre', invitado_PerteneceEmpresa='$invitado_PerteneceEmpresa', invitado_Empresa='$invitado_Empresa', 
							invitado_Actividad='$invitado_Actividad', invitado_Email='$invitado_Email', invitado_Telefono='$invitado_Telefono', invitado_Alergia='$invitado_Alergia', invitado_ProvinciaFK='$invitado_ProvinciaFK', invitado_Pagado='$invitado_Pagado'		
				WHERE invitado_CodPK='$invitado_CodPK'";
		$res = $this->conexion->BD_Consulta($consulta);
		return($res);
	}

	function modificar_ZonaSocio($invitado_Nombre, $invitado_PerteneceEmpresa, $invitado_Empresa, $invitado_Actividad, $invitado_Email, $invitado_Telefono, $invitado_Alergia, $invitado_ProvinciaFK, $invitado_CodPK) {
		$consulta = "UPDATE agenda_invitado SET invitado_Nombre='$invitado_Nombre', invitado_PerteneceEmpresa='$invitado_PerteneceEmpresa', invitado_Empresa='$invitado_Empresa', invitado_Actividad='$invitado_Actividad', invitado_Email='$invitado_Email', invitado_Telefono='$invitado_Telefono', invitado_Alergia='$invitado_Alergia', invitado_ProvinciaFK='$invitado_ProvinciaFK'	
					WHERE invitado_CodPK='$invitado_CodPK'";

		$res = $this->conexion->BD_Consulta($consulta);
		return($res);
	}

	function modificar_ZonaSocio_prep($invitado_Nombre, $invitado_PerteneceEmpresa, $invitado_Empresa, $invitado_Actividad, $invitado_Email, $invitado_Telefono, $invitado_Alergia, $invitado_ProvinciaFK, $invitado_CodPK) {

		$consulta = "UPDATE agenda_invitado SET invitado_Nombre=?, invitado_PerteneceEmpresa=?, invitado_Empresa=?, invitado_Actividad=?, invitado_Email=?, invitado_Telefono=?, invitado_Alergia=?, invitado_ProvinciaFK=?	
						WHERE invitado_CodPK=?";

		// Parámetros para la consulta preparada
		$params = array($invitado_Nombre, $invitado_PerteneceEmpresa, $invitado_Empresa, $invitado_Actividad, $invitado_Email, $invitado_Telefono, $invitado_Alergia, $invitado_ProvinciaFK, $invitado_CodPK);
		$tipos = generar_cadena_tipos($params);


		// Ejecutar la consulta preparada
		$res = $this->conexion->BD_PrepararConsulta($consulta, $tipos, ...$params);

		return $res;
	}

	function modificar_DatosPerso($agenda_Login, $agenda_Pass, $agenda_Nombre, $agenda_CIF, $agenda_CodPK) {
		$consulta = "UPDATE agenda_invitado SET agenda_Login='$agenda_Login', agenda_Pass='$agenda_Pass', agenda_Nombre='$agenda_Nombre', agenda_CIF='$agenda_CIF' WHERE agenda_CodPK='$agenda_CodPK'";
		$res = $this->conexion->BD_Consulta($consulta);
		return($res);
	}
    
    
	function cambiarEstado($invitado_Estado, $invitado_CodPK) {
		$consulta = "UPDATE agenda_invitado SET invitado_Estado='$invitado_Estado' WHERE invitado_CodPK='$invitado_CodPK'";
		$res = $this->conexion->BD_Consulta($consulta);
		return($res);
	}
		
	
	function modificarFoto($agenda_Foto, $agenda_CodPK) {
		$consulta = "UPDATE agenda_invitado SET agenda_Foto='$agenda_Foto' WHERE agenda_CodPK='$agenda_CodPK'";
		$res = $this->conexion->BD_Consulta($consulta);
		return($res);
	}

	function modificarArchivo($agenda_Imagen, $agenda_CodPK) {
		$consulta = "UPDATE agenda_invitado SET agenda_Imagen='$agenda_Imagen' WHERE agenda_CodPK='$agenda_CodPK'";
		$res = $this->conexion->BD_Consulta($consulta);
		return($res);
	}
		
    function modificarArchivo2($agenda_Emp_Logo, $agenda_CodPK) {
		$consulta = "UPDATE agenda_invitado SET agenda_Emp_Logo='$agenda_Emp_Logo' WHERE agenda_CodPK='$agenda_CodPK'";
		$res = $this->conexion->BD_Consulta($consulta);
		return($res);
	}
		
	function obtener(){
		$consulta  = "SELECT * FROM agenda_invitado";
		$res = $this->conexion->BD_Consulta($consulta);
		return($res);	
	}
	
	
	function obtenerConFiltro($condicion,$order){
		 if($condicion=="" && $order!="")
				$consulta  = "SELECT * FROM agenda_invitado $order";				
		 else{
			 if($order=="" && $condicion!="")
					$consulta  = "SELECT * FROM agenda_invitado $condicion";				
			 else{
				  if($order!="" && $condicion!="")		 
					$consulta  = "SELECT * FROM agenda_invitado $condicion $order";
					else{
						if($order=="" && $condicion=="")		 
							$consulta  = "SELECT * FROM agenda_invitado";
						}				
			  }
		}
									  
		$res = $this->conexion->BD_Consulta($consulta);
		return($res);	
	}
	
	
	function obtenerPaginados(){
		$consulta  = "SELECT * FROM agenda_invitado";
		return($consulta);	
	}
	
	
	function obtenerPaginadosConFiltro($condicion,$order){
		 if($condicion=="" && $order!="")
				$consulta  = "SELECT * FROM agenda_invitado $order";				
		 else{
			 if($order=="" && $condicion!="")
					$consulta  = "SELECT * FROM agenda_invitado $condicion";				
			 else{
				  if($order!="" && $condicion!="")		 
					$consulta  = "SELECT * FROM agenda_invitado $condicion $order";
					else{
						if($order=="" && $condicion=="")		 
							$consulta  = "SELECT * FROM agenda_invitado";
						}				
			  }
		}
		return($consulta);	
	}
	
	
	function subirArchivo($directorio,$id,$ext){
		$nombreDirectorio = "../../archivos/agenda_invitado/";
		$idUnico = rand(0,time());
		$nombreFichero = $idUnico . "-" . $id . "." . $ext;		 
		if($nombreFichero != ''){
		 	move_uploaded_file ($directorio,$nombreDirectorio . $nombreFichero);
		 }	
		return ($nombreFichero);
	}
		
	function eliminarArchivo($imagen) {
		if(trim($imagen)!=""){	
			$imagen2 = "../../archivos/agenda_invitado/" . $imagen;
			unlink ($imagen2);
		}	
	}
}
