<?PHP 
	
include_once("conexion.php");

class notificacion {

var $conexion;

function __construct(){
	$this->conexion= new conexion();
}	

	function insertar($notificacion_Asunto, $notificacion_Texto, $notificacion_RemitenteFK, $notificacion_SocioFK, $notificacion_ReceptorFK, $notificacion_Fecha, $notificacion_Leido, $notificacion_Estado) {		
		$consulta = "INSERT INTO notificacion(notificacion_Asunto, notificacion_Texto, notificacion_RemitenteFK, notificacion_SocioFK, notificacion_ReceptorFK, notificacion_Fecha, notificacion_Leido, notificacion_Estado)
			VALUES('$notificacion_Asunto', '$notificacion_Texto', '$notificacion_RemitenteFK', '$notificacion_SocioFK', '$notificacion_ReceptorFK', '$notificacion_Fecha', '$notificacion_Leido', '$notificacion_Estado')";
		$res = $this->conexion->BD_Consulta($consulta);
		return($res);
	}
	
	
	function eliminar($condicion) {
		$consulta = "DELETE FROM notificacion $condicion";
		$res = $this->conexion->BD_Consulta($consulta);
		return($res);	
	}


	function modificar($notificacion_Asunto, $notificacion_Texto, $notificacion_RemitenteFK, $notificacion_SocioFK, $notificacion_ReceptorFK, $notificacion_Fecha, $notificacion_Leido, $notificacion_Estado, $notificacion_CodPK) {
		$consulta = "UPDATE notificacion SET notificacion_Asunto='$notificacion_Asunto', notificacion_Texto='$notificacion_Texto', notificacion_RemitenteFK='$notificacion_RemitenteFK', notificacion_SocioFK='$notificacion_SocioFK', notificacion_ReceptorFK='$notificacion_ReceptorFK', notificacion_Fecha='$notificacion_Fecha', notificacion_Leido='$notificacion_Leido', 
					notificacion_Estado='$notificacion_Estado'
				    WHERE notificacion_CodPK='$notificacion_CodPK'";
		$res = $this->conexion->BD_Consulta($consulta);
		return($res);
	}

    
    
	function modificarLeido($notificacion_Leido, $notificacion_CodPK) {
		$consulta = "UPDATE notificacion SET notificacion_Leido='$notificacion_Leido' WHERE notificacion_CodPK='$notificacion_CodPK'";
		$res = $this->conexion->BD_Consulta($consulta);
		return($res);
	}

	function modificarMostrar($notificacion_Mostrar, $notificacion_CodPK) {
		$consulta = "UPDATE notificacion SET notificacion_Mostrar='$notificacion_Mostrar' WHERE notificacion_CodPK='$notificacion_CodPK'";
		$res = $this->conexion->BD_Consulta($consulta);
		return($res);
	}
		
	
	function modificarEstado($notificacion_Estado, $notificacion_CodPK) {
		$consulta = "UPDATE notificacion SET notificacion_Estado='$notificacion_Estado' WHERE notificacion_CodPK='$notificacion_CodPK'";
		$res = $this->conexion->BD_Consulta($consulta);
		return($res);
	}
		
	function obtener(){
		$consulta  = "SELECT * FROM usuario";
		$res = $this->conexion->BD_Consulta($consulta);
		return($res);	
	}
	
	
	function obtenerConFiltro($condicion,$order){
		 if($condicion=="" && $order!="")
				$consulta  = "SELECT * FROM usuario $order";				
		 else{
			 if($order=="" && $condicion!="")
					$consulta  = "SELECT * FROM usuario $condicion";				
			 else{
				  if($order!="" && $condicion!="")		 
					$consulta  = "SELECT * FROM usuario $condicion $order";
					else{
						if($order=="" && $condicion=="")		 
							$consulta  = "SELECT * FROM usuario";
						}				
			  }
		}
									  
		$res = $this->conexion->BD_Consulta($consulta);
		return($res);	
	}
	
	
	function obtenerPaginados(){
		$consulta  = "SELECT * FROM usuario";
		return($consulta);	
	}
	
	
	function obtenerPaginadosConFiltro($condicion,$order){
		 if($condicion=="" && $order!="")
				$consulta  = "SELECT * FROM usuario $order";				
		 else{
			 if($order=="" && $condicion!="")
					$consulta  = "SELECT * FROM usuario $condicion";				
			 else{
				  if($order!="" && $condicion!="")		 
					$consulta  = "SELECT * FROM usuario $condicion $order";
					else{
						if($order=="" && $condicion=="")		 
							$consulta  = "SELECT * FROM usuario";
						}				
			  }
		}
		return($consulta);	
	}
	
	
	function subirImagen($directorio,$id,$ext){
		$nombreDirectorio = "../../imagen/usuario/";
		$idUnico = rand(0,time());
		$nombreFichero = $idUnico . "-" . $id . "." . $ext;		 
		if($nombreFichero != ''){
		 	move_uploaded_file ($directorio,$nombreDirectorio . $nombreFichero);
		 }	
		return ($nombreFichero);
	}
		
	function eliminarImagen($imagen) {
		if(trim($imagen)!=""){	
			$imagen2 = "../../imagen/usuario/" . $imagen;
			unlink ($imagen2);
		}	
	}
}
