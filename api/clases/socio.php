<?PHP 
	
include_once("conexion.php");
include_once("fun_aux_api.php");

class socio {

var $conexion;

function __construct(){
	$this->conexion= new conexion();
}	

	function insertar($socio_Nombre, $socio_Apellidos, $socio_Telefono, $socio_Email, $socio_Email_Facturacion, $socio_Pass, $socio_Foto, 
						$socio_Perfil_Linkedin, $socio_Perfil_Instagram, $socio_Perfil_Facebook, $socio_Alergia, $socio_Actividad, $socio_Descripcion, $socio_Emp_Nombre, $socio_Emp_Telefono, 
						$socio_Emp_Email, $socio_Emp_Logo, $socio_Emp_Perfil_Linkedin, $socio_Emp_Perfil_Instagram, $socio_Emp_Perfil_Facebook, $socio_Emp_Web, $socio_Emp_Descripcion, 
						$socio_Emp_Archivo1, $socio_Emp_Archivo2, $socio_Emp_Archivo3, $socio_Emp_Archivo1_Nombre, $socio_Emp_Archivo2_Nombre, $socio_Emp_Archivo3_Nombre, $socio_SocioReferidoFK, $socio_FormaPago, 
						$socio_ProvinciaFK, $socio_FechaFin_Baja, $socio_NombreFiscal, $socio_CIF, $socio_Direccion, $socio_NumCuenta, $socio_Cuota, 
						$socio_Tipo, $socio_Fecha_FinEventual, $socio_FechaCumpleanyos, $socio_Estado) {		
		$consulta = "INSERT INTO socio(socio_Nombre, socio_Apellidos, socio_Telefono, socio_Email, socio_Email_Facturacion, socio_Pass, socio_Foto, socio_Perfil_Linkedin, socio_Perfil_Instagram, socio_Perfil_Facebook, socio_Alergia, socio_Actividad, 
					socio_Descripcion, socio_Emp_Nombre, socio_Emp_Telefono, socio_Emp_Email, socio_Emp_Logo, socio_Emp_Perfil_Linkedin, socio_Emp_Perfil_Instagram, socio_Emp_Perfil_Facebook, socio_Emp_Web, socio_Emp_Descripcion, 
					socio_Emp_Archivo1, socio_Emp_Archivo2, socio_Emp_Archivo3, socio_Emp_Archivo1_Nombre, socio_Emp_Archivo2_Nombre, socio_Emp_Archivo3_Nombre, socio_SocioReferidoFK, socio_FormaPago, socio_ProvinciaFK, socio_FechaFin_Baja, 
					socio_NombreFiscal, socio_CIF, socio_Direccion, socio_NumCuenta, socio_Cuota, socio_Tipo, socio_Fecha_FinEventual, socio_FechaCumpleanyos, socio_Estado)
			VALUES('$socio_Nombre', '$socio_Apellidos', '$socio_Telefono', '$socio_Email', '$socio_Email_Facturacion', '$socio_Pass', '$socio_Foto', '$socio_Perfil_Linkedin', '$socio_Perfil_Instagram', '$socio_Perfil_Facebook', '$socio_Alergia', '$socio_Actividad', 
					'$socio_Descripcion', '$socio_Emp_Nombre', '$socio_Emp_Telefono', '$socio_Emp_Email', '$socio_Emp_Logo', '$socio_Emp_Perfil_Linkedin', '$socio_Emp_Perfil_Instagram', 
					'$socio_Emp_Perfil_Facebook', '$socio_Emp_Web', '$socio_Emp_Descripcion', '$socio_Emp_Archivo1', '$socio_Emp_Archivo2', '$socio_Emp_Archivo3', '$socio_Emp_Archivo1_Nombre', '$socio_Emp_Archivo2_Nombre', 
					'$socio_Emp_Archivo3_Nombre', '$socio_SocioReferidoFK', '$socio_FormaPago', '$socio_ProvinciaFK', '$socio_FechaFin_Baja', '$socio_NombreFiscal', '$socio_CIF', '$socio_Direccion', '$socio_NumCuenta', 
					'$socio_Cuota', '$socio_Tipo', '$socio_Fecha_FinEventual', '$socio_FechaCumpleanyos', '$socio_Estado')";
		$res = $this->conexion->BD_Consulta($consulta);
		return($res);
	}
	
	
	function eliminar($condicion) {
		$consulta = "DELETE FROM socio $condicion";
		$res = $this->conexion->BD_Consulta($consulta);
		return($res);	
	}
	
	function modificar($socio_Nombre, $socio_Apellidos, $socio_Telefono, $socio_Email, $socio_Email_Facturacion, $socio_Pass, $socio_Foto, 
						$socio_Perfil_Linkedin, $socio_Perfil_Instagram, $socio_Perfil_Facebook, $socio_Alergia, $socio_Actividad, $socio_Descripcion, $socio_Emp_Nombre, $socio_Emp_Telefono, 
						$socio_Emp_Email, $socio_Emp_Logo, $socio_Emp_Perfil_Linkedin, $socio_Emp_Perfil_Instagram, $socio_Emp_Perfil_Facebook, $socio_Emp_Web, $socio_Emp_Descripcion, 
						$socio_Emp_Archivo1, $socio_Emp_Archivo2, $socio_Emp_Archivo3, $socio_Emp_Archivo1_Nombre, $socio_Emp_Archivo2_Nombre, $socio_Emp_Archivo3_Nombre, $socio_SocioReferidoFK, 
						$socio_FormaPago, $socio_ProvinciaFK, $socio_FechaFin_Baja, $socio_NombreFiscal, $socio_CIF, $socio_Direccion, $socio_NumCuenta, $socio_Cuota, 
						$socio_Tipo, $socio_Fecha_FinEventual, $socio_FechaCumpleanyos, $socio_Estado, $socio_CodPK) {
				$consulta = "UPDATE socio SET socio_Nombre='$socio_Nombre', socio_Apellidos='$socio_Apellidos', socio_Telefono='$socio_Telefono', socio_Email='$socio_Email', socio_Email_Facturacion='$socio_Email_Facturacion', socio_Pass='$socio_Pass'
				, socio_Foto='$socio_Foto', socio_Perfil_Linkedin='$socio_Perfil_Linkedin', socio_Perfil_Instagram='$socio_Perfil_Instagram', socio_Perfil_Facebook='$socio_Perfil_Facebook', socio_Alergia='$socio_Alergia', socio_Actividad='$socio_Actividad', socio_Descripcion='$socio_Descripcion'
				, socio_Emp_Nombre='$socio_Emp_Nombre', socio_Emp_Telefono='$socio_Emp_Telefono', socio_Emp_Email='$socio_Emp_Email', socio_Emp_Logo='$socio_Emp_Logo', socio_Emp_Perfil_Linkedin='$socio_Emp_Perfil_Linkedin', 
				socio_Emp_Perfil_Instagram='$socio_Emp_Perfil_Instagram', socio_Emp_Perfil_Facebook='$socio_Emp_Perfil_Facebook', socio_Emp_Web='$socio_Emp_Web', socio_Emp_Descripcion='$socio_Emp_Descripcion'
				, socio_Emp_Archivo1='$socio_Emp_Archivo1', socio_Emp_Archivo2='$socio_Emp_Archivo2', socio_Emp_Archivo3='$socio_Emp_Archivo3', socio_Emp_Archivo1_Nombre='$socio_Emp_Archivo1_Nombre', 
				socio_Emp_Archivo2_Nombre='$socio_Emp_Archivo2_Nombre', socio_Emp_Archivo3_Nombre='$socio_Emp_Archivo3_Nombre', 
				socio_SocioReferidoFK='$socio_SocioReferidoFK', socio_FormaPago='$socio_FormaPago', socio_ProvinciaFK='$socio_ProvinciaFK', socio_FechaFin_Baja='$socio_FechaFin_Baja', socio_NombreFiscal='$socio_NombreFiscal', 
				socio_CIF='$socio_CIF', socio_Direccion='$socio_Direccion', socio_NumCuenta='$socio_NumCuenta', socio_Cuota='$socio_Cuota', socio_Tipo='$socio_Tipo', socio_Fecha_FinEventual='$socio_Fecha_FinEventual', 
				socio_FechaCumpleanyos='$socio_FechaCumpleanyos', socio_Estado='$socio_Estado'				
				WHERE socio_CodPK='$socio_CodPK'";
		$res = $this->conexion->BD_Consulta($consulta);
		return($res);
	}

	function modificar_web($socio_Nombre, $socio_Apellidos, $socio_Telefono, $socio_Email, $socio_Email_Facturacion, $socio_Pass, $socio_Foto, $socio_Perfil_Linkedin, $socio_Perfil_Instagram, 
						$socio_Perfil_Facebook, $socio_Alergia, $socio_Descripcion, $socio_Emp_Nombre, $socio_Emp_Telefono, $socio_Emp_Email, $socio_Emp_Logo, $socio_Emp_Perfil_Linkedin, 
						$socio_Emp_Perfil_Instagram, $socio_Emp_Perfil_Facebook, $socio_Emp_Web, $socio_Emp_Descripcion, $socio_Emp_Archivo1, $socio_Emp_Archivo2, $socio_Emp_Archivo3, 
						$socio_Emp_Archivo1_Nombre, $socio_Emp_Archivo2_Nombre, $socio_Emp_Archivo3_Nombre, $socio_Estado, $socio_CodPK) 
		{

		$consulta = "UPDATE socio SET socio_Nombre='$socio_Nombre', socio_Apellidos='$socio_Apellidos', socio_Telefono='$socio_Telefono', socio_Email='$socio_Email', socio_Email_Facturacion='$socio_Email_Facturacion', socio_Pass='$socio_Pass'
					, socio_Foto='$socio_Foto', socio_Perfil_Linkedin='$socio_Perfil_Linkedin', socio_Perfil_Instagram='$socio_Perfil_Instagram', socio_Perfil_Facebook='$socio_Perfil_Facebook', socio_Alergia='$socio_Alergia', socio_Descripcion='$socio_Descripcion'
					, socio_Emp_Nombre='$socio_Emp_Nombre', socio_Emp_Telefono='$socio_Emp_Telefono', socio_Emp_Email='$socio_Emp_Email', socio_Emp_Logo='$socio_Emp_Logo', socio_Emp_Perfil_Linkedin='$socio_Emp_Perfil_Linkedin', 
					socio_Emp_Perfil_Instagram='$socio_Emp_Perfil_Instagram', socio_Emp_Perfil_Facebook='$socio_Emp_Perfil_Facebook', socio_Emp_Web='$socio_Emp_Web', socio_Emp_Descripcion='$socio_Emp_Descripcion'
					, socio_Emp_Archivo1='$socio_Emp_Archivo1', socio_Emp_Archivo2='$socio_Emp_Archivo2', socio_Emp_Archivo3='$socio_Emp_Archivo3', socio_Emp_Archivo1_Nombre='$socio_Emp_Archivo1_Nombre', 
					socio_Emp_Archivo2_Nombre='$socio_Emp_Archivo2_Nombre', socio_Emp_Archivo3_Nombre='$socio_Emp_Archivo3_Nombre', socio_Estado='$socio_Estado'				
					WHERE socio_CodPK='$socio_CodPK'";
		$res = $this->conexion->BD_Consulta($consulta);
		return($res);
	}

	function modificar_DatosPerso($socio_Login, $socio_Pass, $socio_Nombre, $socio_CIF, $socio_CodPK) {
		$consulta = "UPDATE socio SET socio_Login='$socio_Login', socio_Pass='$socio_Pass', socio_Nombre='$socio_Nombre', socio_CIF='$socio_CIF' WHERE socio_CodPK='$socio_CodPK'";
		$res = $this->conexion->BD_Consulta($consulta);
		return($res);
	}

	function modificar_FechaAlta($socio_FechaAlta, $socio_CodPK) {
		$consulta = "UPDATE socio SET socio_FechaAlta='$socio_FechaAlta' WHERE socio_CodPK='$socio_CodPK'";
		$res = $this->conexion->BD_Consulta($consulta);
		return($res);
	}

	function modificar_Prueba($socio_Nombre, $socio_Apellidos, $socio_Telefono, $socio_Email, $socio_Pass, $socio_Descripcion, $socio_Perfil_Linkedin, $socio_Perfil_Instagram, $socio_Perfil_Facebook, $socio_Foto, $socio_Alergia, $socio_Emp_Nombre, 
							$socio_Emp_Telefono, $socio_Emp_Email, $socio_Emp_Logo, $socio_Emp_Perfil_Linkedin, $socio_Emp_Perfil_Instagram, $socio_Emp_Perfil_Facebook, $socio_Emp_Web, $socio_Emp_Descripcion, $socio_Emp_Archivo1, $socio_Emp_Archivo2, 
							$socio_Emp_Archivo3, $socio_Emp_Archivo1_Nombre, $socio_Emp_Archivo2_Nombre, $socio_Emp_Archivo3_Nombre, $socio_CodPK) {
		$consulta = "UPDATE socio SET socio_Nombre='$socio_Nombre', socio_Apellidos='$socio_Apellidos', socio_Telefono='$socio_Telefono', socio_Email='$socio_Email', socio_Pass='$socio_Pass', 
                    socio_Descripcion='$socio_Descripcion', socio_Perfil_Linkedin='$socio_Perfil_Linkedin', socio_Perfil_Instagram='$socio_Perfil_Instagram', socio_Perfil_Facebook='$socio_Perfil_Facebook', socio_Foto='$socio_Foto',
					socio_Alergia='$socio_Alergia', socio_Emp_Nombre='$socio_Emp_Nombre', socio_Emp_Telefono='$socio_Emp_Telefono', socio_Emp_Email='$socio_Emp_Email', socio_Emp_Logo='$socio_Emp_Logo', socio_Emp_Perfil_Linkedin='$socio_Emp_Perfil_Linkedin',
					socio_Emp_Perfil_Instagram='$socio_Emp_Perfil_Instagram', socio_Emp_Perfil_Facebook='$socio_Emp_Perfil_Facebook', socio_Emp_Web='$socio_Emp_Web', socio_Emp_Descripcion='$socio_Emp_Descripcion', socio_Emp_Archivo1='$socio_Emp_Archivo1', 
					socio_Emp_Archivo2='$socio_Emp_Archivo2', socio_Emp_Archivo3='$socio_Emp_Archivo3', socio_Emp_Archivo1_Nombre='$socio_Emp_Archivo1_Nombre', socio_Emp_Archivo2_Nombre='$socio_Emp_Archivo2_Nombre', socio_Emp_Archivo3_Nombre='$socio_Emp_Archivo3_Nombre' 
                    WHERE socio_CodPK='$socio_CodPK'";
		$res = $this->conexion->BD_Consulta($consulta);
		return($res);
	}

	function modificar_prep($socio_Nombre, $socio_Apellidos, $socio_Telefono, $socio_Email, $socio_Pass, $socio_Descripcion, $socio_Perfil_Linkedin, $socio_Perfil_Instagram, $socio_Perfil_Facebook, $socio_Foto, $socio_Alergia, $socio_Emp_Nombre, 
							$socio_Emp_Telefono, $socio_Emp_Email, $socio_Emp_Logo, $socio_Emp_Perfil_Linkedin, $socio_Emp_Perfil_Instagram, $socio_Emp_Perfil_Facebook, $socio_Emp_Web, $socio_Emp_Descripcion, $socio_Emp_Archivo1, $socio_Emp_Archivo2, 
							$socio_Emp_Archivo3, $socio_Emp_Archivo1_Nombre, $socio_Emp_Archivo2_Nombre, $socio_Emp_Archivo3_Nombre, $socio_CodPK) {

		$consulta = "UPDATE socio SET socio_Nombre=?, socio_Apellidos=?, socio_Telefono=?, socio_Email=?, socio_Pass=?, socio_Descripcion=?, socio_Perfil_Linkedin=?, socio_Perfil_Instagram=?, socio_Perfil_Facebook=?, socio_Foto=?,
					socio_Alergia=?, socio_Emp_Nombre=?, socio_Emp_Telefono=?, socio_Emp_Email=?, socio_Emp_Logo=?, socio_Emp_Perfil_Linkedin=?,socio_Emp_Perfil_Instagram=?, socio_Emp_Perfil_Facebook=?, socio_Emp_Web=?, socio_Emp_Descripcion=?, 
					socio_Emp_Archivo1=?, socio_Emp_Archivo2=?, socio_Emp_Archivo3=?, socio_Emp_Archivo1_Nombre=?, socio_Emp_Archivo2_Nombre=?, socio_Emp_Archivo3_Nombre=? 
					WHERE socio_CodPK=?";

		// Parámetros para la consulta preparada
		$params = array($socio_Nombre, $socio_Apellidos, $socio_Telefono, $socio_Email, $socio_Pass, $socio_Descripcion, $socio_Perfil_Linkedin, $socio_Perfil_Instagram, $socio_Perfil_Facebook, $socio_Foto, $socio_Alergia, $socio_Emp_Nombre, 
						$socio_Emp_Telefono, $socio_Emp_Email, $socio_Emp_Logo, $socio_Emp_Perfil_Linkedin, $socio_Emp_Perfil_Instagram, $socio_Emp_Perfil_Facebook, $socio_Emp_Web, $socio_Emp_Descripcion, $socio_Emp_Archivo1, $socio_Emp_Archivo2, 
						$socio_Emp_Archivo3, $socio_Emp_Archivo1_Nombre, $socio_Emp_Archivo2_Nombre, $socio_Emp_Archivo3_Nombre, $socio_CodPK);
		$tipos = generar_cadena_tipos($params);


		// Ejecutar la consulta preparada
		$res = $this->conexion->BD_PrepararConsulta($consulta, $tipos, ...$params);

		return $res;
	}
    
    function modificar_NumSocio($socio_Numero, $socio_CodPK) {
		$consulta = "UPDATE socio SET socio_Numero='$socio_Numero' WHERE socio_CodPK='$socio_CodPK'";
		$res = $this->conexion->BD_Consulta($consulta);
		return($res);
	}

	function cambiarEstado($pobla_Estado, $pobla_CodPK) {
		$consulta = "UPDATE socio SET pobla_Estado='$pobla_Estado' WHERE pobla_CodPK='$pobla_CodPK'";
		$res = $this->conexion->BD_Consulta($consulta);
		return($res);
	}
		
	
	function modificarFoto($socio_Foto, $socio_CodPK) {
		$consulta = "UPDATE socio SET socio_Foto='$socio_Foto' WHERE socio_CodPK='$socio_CodPK'";
		$res = $this->conexion->BD_Consulta($consulta);
		return($res);
	}

	function modificarArchivo($socio_Foto, $socio_CodPK) {
		$consulta = "UPDATE socio SET socio_Foto='$socio_Foto' WHERE socio_CodPK='$socio_CodPK'";
		$res = $this->conexion->BD_Consulta($consulta);
		return($res);
	}
		
    function modificarArchivo2($socio_Emp_Logo, $socio_CodPK) {
		$consulta = "UPDATE socio SET socio_Emp_Logo='$socio_Emp_Logo' WHERE socio_CodPK='$socio_CodPK'";
		$res = $this->conexion->BD_Consulta($consulta);
		return($res);
	}
		
	function modificarArchivo_Emp1($socio_Emp_Archivo1, $socio_CodPK) {
		$consulta = "UPDATE socio SET socio_Emp_Archivo1='$socio_Emp_Archivo1' WHERE socio_CodPK='$socio_CodPK'";
		$res = $this->conexion->BD_Consulta($consulta);
		return($res);
	}

	function modificarArchivo_Emp2($socio_Emp_Archivo2, $socio_CodPK) {
		$consulta = "UPDATE socio SET socio_Emp_Archivo2='$socio_Emp_Archivo2' WHERE socio_CodPK='$socio_CodPK'";
		$res = $this->conexion->BD_Consulta($consulta);
		return($res);
	}

	function modificarArchivo_Emp3($socio_Emp_Archivo3, $socio_CodPK) {
		$consulta = "UPDATE socio SET socio_Emp_Archivo3='$socio_Emp_Archivo3' WHERE socio_CodPK='$socio_CodPK'";
		$res = $this->conexion->BD_Consulta($consulta);
		return($res);
	}

	function obtener(){
		$consulta  = "SELECT * FROM socio";
		$res = $this->conexion->BD_Consulta($consulta);
		return($res);	
	}
	
	
	function obtenerConFiltro($condicion,$order){
		 if($condicion=="" && $order!="")
				$consulta  = "SELECT * FROM socio $order";				
		 else{
			 if($order=="" && $condicion!="")
					$consulta  = "SELECT * FROM socio $condicion";				
			 else{
				  if($order!="" && $condicion!="")		 
					$consulta  = "SELECT * FROM socio $condicion $order";
					else{
						if($order=="" && $condicion=="")		 
							$consulta  = "SELECT * FROM socio";
						}				
			  }
		}
									  
		$res = $this->conexion->BD_Consulta($consulta);
		return($res);	
	}
	
	
	function obtenerPaginados(){
		$consulta  = "SELECT * FROM socio";
		return($consulta);	
	}
	
	
	function obtenerPaginadosConFiltro($condicion,$order){
		 if($condicion=="" && $order!="")
				$consulta  = "SELECT * FROM socio $order";				
		 else{
			 if($order=="" && $condicion!="")
					$consulta  = "SELECT * FROM socio $condicion";				
			 else{
				  if($order!="" && $condicion!="")		 
					$consulta  = "SELECT * FROM socio $condicion $order";
					else{
						if($order=="" && $condicion=="")		 
							$consulta  = "SELECT * FROM socio";
						}				
			  }
		}
		return($consulta);	
	}
	
	
	function subirArchivo($directorio,$id,$ext){
		$nombreDirectorio = "../../archivos/socio_fotos/";
		$idUnico = rand(0,time());
		$nombreFichero = $idUnico . "-" . $id . "." . $ext;		 
		if($nombreFichero != ''){
		 	move_uploaded_file ($directorio,$nombreDirectorio . $nombreFichero);
		 }	
		return ($nombreFichero);
	}

	function subirArchivo_Web($directorio,$id,$ext){
		$nombreDirectorio = "./archivos/socio_fotos/";
		$idUnico = rand(0,time());
		$nombreFichero = $idUnico . "-" . $id . "." . $ext;		 
		if($nombreFichero != ''){
		 	move_uploaded_file ($directorio,$nombreDirectorio . $nombreFichero);
		 }	
		return ($nombreFichero);
	}
		
	function subirArchivo_React($directorio,$id,$ext){
		$nombreDirectorio = "./archivos/socio_fotos/";
		$idUnico = rand(0,time());
		$nombreFichero = $idUnico . "-" . $id . "." . $ext;		 
		if($nombreFichero != ''){
		 	move_uploaded_file ($directorio,$nombreDirectorio . $nombreFichero);
		 }	
		return ($nombreFichero);
	}
		
	function eliminarArchivo($imagen) {
		if(trim($imagen)!=""){	
			$imagen2 = "../../archivos/socio_fotos/" . $imagen;
			unlink ($imagen2);
		}	
	}

	function eliminarArchivo_Web($imagen) {
		if(trim($imagen)!=""){	
			$imagen2 = "./archivos/socio_fotos/" . $imagen;
			unlink ($imagen2);
		}	
	}

	function eliminarArchivo_React($imagen) {
		if(trim($imagen)!=""){	
			$imagen2 = "./archivos/socio_fotos/" . $imagen;
			unlink ($imagen2);
		}	
	}
}
