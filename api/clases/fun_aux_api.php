<?PHP 

function verificarToken() {
	// Verificar si se ha enviado el token en el encabezado
	$token = 0;
	if (isset($_SERVER['HTTP_AUTHORIZATION']))
		$token = $_SERVER['HTTP_AUTHORIZATION'];

	if (empty($token)) {
		http_response_code(401); // Unauthorized
		echo json_encode(array('errorMessage' => 'Token de autorización no proporcionado'));
		exit();
	}

	// Validar el token (aquí deberías implementar tu lógica para validar el token)
	$valid_token = validarToken($token); // Implementa esta función según cómo manejes los tokens

	if (!$valid_token) {
		http_response_code(401); // Unauthorized
		echo json_encode(array('errorMessage' => 'Token de autorización no válido'));
		exit();
	}

}

function validarToken($token) {
    $token_guardado = $_SESSION['token'];

    // Verificar si el token enviado incluye el prefijo "Bearer"
    if (strpos($token, 'Bearer ') === 0) {
        // Si el token incluye el prefijo, eliminarlo antes de compararlo
        $token = substr($token, 8);
        $token = substr($token, 0, -1);
    }

    return $token === $token_guardado;
}


function generar_cadena_tipos($params) {
    // Tipos de datos de los parámetros (s = string, i = integer)
    $tipos = "";

    foreach ($params as $valor) {
        switch (gettype($valor)) {
            case "boolean":
                $tipos .= "i"; // boolean se convierte a integer (0 o 1)
                break;
            case "integer":
                $tipos .= "i";
                break;
            case "double":
                $tipos .= "d";
                break;
            case "string":
                $tipos .= "s";
                break;
            case "array":
            case "object":
                $tipos .= "b"; // blob/binario (puede ser ajustado según el caso)
                break;
            case "NULL":
                $tipos .= "s"; // considerando NULL como cadena vacía
                break;
            default:
                // Otros tipos, se asume cadena
                $tipos .= "s";
                break;
        }
    }

    return $tipos;
}




?>