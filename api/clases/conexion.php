<?PHP
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

date_default_timezone_set('Europe/Madrid');


class conexion {

var $nombre_empresa_panel_control="PRUEBA";


var $email_from="envio@nubeado.com";//tambien email de envio
var $email_host="mail.nubeado.com";
var $email_pass="823174AlalaKK8";



// var $url_sitio="http://01-servidor/prueba/";
var $bd_nombre_global="ebc_extranet";
var $bd_usuario_global="mysql";
var $bd_password_global="";
var $bd_ubicacion_global="localhost";



//Constructor
function __construct(){	
	$bd_nombre=$this->bd_nombre_global;
	$bd_usuario=$this->bd_usuario_global;
	$bd_password=$this->bd_password_global;
	$bd_ubicacion=$this->bd_ubicacion_global;
	
	if(!isset($GLOBALS['BD_link_conecct']) || !$GLOBALS['BD_link_conecct'])
	{		
		$bd=mysqli_connect($bd_ubicacion, $bd_usuario, $bd_password, $bd_nombre);
		//hacer aparecer ñ
		$bd->query("SET NAMES 'utf8'");
		$bd->set_charset("utf8");
		if ($bd)
			$GLOBALS['BD_link_conecct']=$bd;			
	}//fin del if(!isset($GLOBALS['BD_link_conecct']) || !$GLOBALS['BD_link_conecct'])	
}


// Devuelve 1 si se ha cerrado la base de datos o NULL si hay error
function BD_Cerrar()
{
	if(isset($GLOBALS['BD_link_conecct']) && mysqli_close($GLOBALS['BD_link_conecct']))
		return (1);
	else
		return (NULL);
}

// Ejecuta una consulta en la base de datos. Devuelve NULL si hay error.
function BD_Consulta($consulta)
{
	$resultado=FALSE;
	$i=0;
	
	while(!$resultado AND $i<3 AND isset($GLOBALS['BD_link_conecct']))
	{
		$resultado=mysqli_query($GLOBALS['BD_link_conecct'], $consulta);
		$i++;
	}

	if($resultado)
		return ($resultado);
	else
		return (NULL);
}

  // Método para ejecutar consultas preparadas
  public function BD_Consulta_Preparada($consulta, $parametro_tipos, ...$parametros) {
	// $consulta_con_valores = vsprintf(str_replace('?', "'%s'", $consulta), $parametros);
	// print($consulta_con_valores);

	$resultado = false;
	$stmt = $GLOBALS['BD_link_conecct']->prepare($consulta);
	
	// Verificar si la preparación fue exitosa
	if ($stmt !== false) {
		// Vincular los parámetros
		if (!empty($parametros)) {
			$stmt->bind_param($parametro_tipos, ...$parametros);
		}
		
		// Ejecutar la consulta
		$stmt->execute();
		
		// Obtener el resultado
		$resultado = $stmt->get_result();
		
		// Cerrar la sentencia
		$stmt->close();
	}
	
	return $resultado;
}

// Devuelve el numero de filas de una consulta
function BD_NumeroFilas($consulta)
{
	$filas=mysqli_num_rows($consulta);

	return $filas;
}
	
// Devuelve un array con una tupla del resultado usando el nombre de campo como indice
// Devuelve NULL si no quedan m�s filas
function BD_GetTupla($resultado)
{
	$tupla = array();
	$tupla = mysqli_fetch_array($resultado, MYSQLI_ASSOC);
	
	return $tupla;
	
}

 // Método para ejecutar consultas preparadas
 function BD_PrepararConsulta($consulta, $tipos, ...$params) {

	// $consulta_con_valores = vsprintf(str_replace('?', "'%s'", $consulta), $params);
    
	$stmt = $GLOBALS['BD_link_conecct']->prepare($consulta);
	if ($stmt === false) {
		return null;
	}

	// Vincular parámetros
	$stmt->bind_param($tipos, ...$params);

	// Ejecutar la consulta
    if (!$stmt->execute()) {
        echo "Error en la ejecución de la consulta: " . $stmt->error;
        return false;
    }

    $stmt->close();
    return true;


	// Obtener el resultado
	// $resultado = $stmt->get_result();

	// echo "<pre>";
	// print_r($stmt->get_result());
	// echo "</pre>";

	// $stmt->close();

	// return $resultado;
}

	
// Libera el resultado de una consulta
function BD_BorraResultado($resultado)
{
	mysqli_free_result($resultado);
}
}
?>
