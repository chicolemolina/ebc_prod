<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include('./clases/conexion.php'); 
include('./clases/fun_aux_api.php'); 



if ($_SERVER['REQUEST_METHOD'] === 'POST') 
{  

	$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

    if (strpos($contentType, 'application/json') !== false) 
	{
        // Procesar datos JSON
        $postData = file_get_contents('php://input');
		// En data almaceno la variable $_POST
        $data = json_decode($postData, true);

    } 
	else if (strpos($contentType, 'multipart/form-data') !== false) 
	{
        // Procesar datos de formulario multipart (FormData) -> para por ejemplo pasar los file
        $data = $_POST;
    } 
	else 
	{
        http_response_code(415); // Unsupported Media Type
        echo json_encode(array('message' => 'Tipo de contenido no soportado'));
        exit();
    }


	if (isset($data['action']))
	{
		$action = $data['action'];

		switch ($action) 
		{
			case strcmp($action, "login") == 0:
				$conexion = new conexion();
		
				$email = $data['email'];
				$password = $data['password'];

				if ($email == "") 
				{
					if (isset($_SESSION["vectorUsuario"]['socio_Email']))
						$email = $_SESSION["vectorUsuario"]['socio_Email'];
				}// fin if ($email == "") 

				if ($password == "") 
				{
					if (isset($_SESSION["vectorUsuario"]['socio_Pass']))
						$password = $_SESSION["vectorUsuario"]['socio_Pass'];
				}// fin if ($password == "") 
		
				$sql = "SELECT socio_CodPK, socio_Nombre, socio_Email, socio_Pass FROM socio WHERE socio_Email = ? AND socio_Pass = ? AND socio_Estado = 'Alta'";

				$params = array($email, $password);
				$tipos = generar_cadena_tipos($params);
				$res = $conexion->BD_Consulta_Preparada($sql, $tipos, ...$params);
				
				$vector = $conexion->BD_GetTupla($res);
			
				$vector_return['success'] = false;
			
				$_SESSION['vectorUsuario'] = NULL;
				if ($vector != NULL)
				{
					// Generar y guardar un token único
					$token = bin2hex(random_bytes(32)); // Genera 32 bytes de datos aleatorios y luego los convierte en una cadena hexadecimal

					$_SESSION['vectorUsuario'] = $vector;
					$_SESSION['token'] = $token;

					 // No agregar socio_Pass a $vector_return['userData']
    				unset($vector['socio_Pass']);
	
					$vector_return['userData'] = $vector;
					$vector_return['token'] = $token;
					$vector_return['success'] = true;
				}//fin while ($vec)
				else {
					$vector_return['errorMessage'] = "Usuario no encontrado en la base de datos";
					$_SESSION['vectorUsuario'] = "";
					$_SESSION['token'] = "";
				}
		
				  
				header('Content-Type: application/json');
				echo json_encode($vector_return);
				break;
	
	
			case strcmp($action, "get-socios") == 0:
				$conexion = new conexion();
	
				verificarToken();
		
				$sqlSocios = "SELECT *
								FROM socio
								WHERE socio_Estado = 'Alta'
								ORDER BY socio_Nombre, socio_Apellidos";
				$resSocios = $conexion->BD_Consulta($sqlSocios);
				$vectorSocios = $conexion->BD_GetTupla($resSocios);
			
				$vector_return['success'] = false;
			
	
				if ($vectorSocios != NULL)
				{
					
					while ($vectorSocios != NULL)
					{
						$vector_return['socioData'][] = $vectorSocios;
	
						$vectorSocios = $conexion->BD_GetTupla($resSocios);
					}//fin while ($vectorSocios != NULL)
	
					$vector_return['success'] = true;
				}//fin while ($vec)
				else {
					$vector_return['errorMessage'] = "Ha ocurrido un error al realizar la petición a la base de datos";
				}
		
					
				header('Content-Type: application/json');
				echo json_encode($vector_return);
				break;


			case strcmp($action, "get-asistentes") == 0:
				$conexion = new conexion();
	
				verificarToken();

				$agenda_CodPK = $data['agenda_CodPK'];
	
				$sqlSocios = "SELECT *
								FROM agenda_asistente
								INNER JOIN socio ON socio_CodPK = asistente_SocioFK
								WHERE socio_Estado = 'Alta'
								AND asistente_AgendaFK = ?";
				$params = array($agenda_CodPK);
				$tipos = generar_cadena_tipos($params);
				$resSocios = $conexion->BD_Consulta_Preparada($sqlSocios, $tipos, ...$params);

				// $resSocios = $conexion->BD_Consulta($sqlSocios);
				$vectorSocios = $conexion->BD_GetTupla($resSocios);
			
				$vector_return['success'] = false;
			
				if ($vectorSocios != NULL)
				{
					
					while ($vectorSocios != NULL)
					{
						$vector_return['socioData'][] = $vectorSocios;
	
						$vectorSocios = $conexion->BD_GetTupla($resSocios);
					}//fin while ($vectorSocios != NULL)
	
					$vector_return['success'] = true;
				}//fin while ($vec)
				else {
					$vector_return['errorMessage'] = "Ha ocurrido un error al realizar la petición a la base de datos";
				}
		
					
				header('Content-Type: application/json');
				echo json_encode($vector_return);
				break;


			case strcmp($action, "get-datosDashboard") == 0:
				$conexion = new conexion();
	
				verificarToken();

				$socio_CodPK = $data['socio_CodPK'];
				if ($_SESSION['vectorUsuario']['socio_CodPK'] == $socio_CodPK)
				{

					$sqlSocio = "SELECT COUNT(*) AS total_socios_inscritos
									FROM socio 
									WHERE socio_Estado = 'Alta'";
					$resSocio = $conexion->BD_Consulta($sqlSocio);
					$vectorSocio = $conexion->BD_GetTupla($resSocio);

					$total_socios_inscritos = 0;
					if ($vectorSocio != NULL)
						$total_socios_inscritos = $vectorSocio['total_socios_inscritos'];


					
					$sqlPartner = "SELECT count(*) total_promociones
									FROM partner
									INNER JOIN socio ON socio_CodPK = partner_SocioFK
									INNER JOIN fm_categoria_partner ON catPart_CodPK = partner_catPartFK
									WHERE partner_Estado = 'Alta'
									AND socio_Estado = 'Alta'";
					$resPartner = $conexion->BD_Consulta($sqlPartner);
					$vectorPartner = $conexion->BD_GetTupla($resPartner);

					$total_promociones = 0;
					if ($vectorPartner != NULL)
						$total_promociones = $vectorPartner['total_promociones'];


					$sqlOfertas = "SELECT COUNT(*) AS total_ofertas
									FROM empleo_oferta 
									WHERE oferta_Estado = 'Alta'";
					$resOfertas = $conexion->BD_Consulta($sqlOfertas);
					$vectorOfertas = $conexion->BD_GetTupla($resOfertas);

					$total_ofertas = 0;
					if ($vectorOfertas != NULL)
						$total_ofertas = $vectorOfertas['total_ofertas'];



					$sqlAgenda = "SELECT COUNT(*) AS total_agenda
									FROM agenda 
									WHERE agenda_Estado = 'Alta'
									AND agenda_Visible = 'Si'
									AND agenda_Fecha >= '" . date("Y-m-d") . "'";
					$resAgenda = $conexion->BD_Consulta($sqlAgenda);
					$vectorAgenda = $conexion->BD_GetTupla($resAgenda);

					$total_agenda = 0;
					if ($vectorAgenda != NULL)
						$total_agenda = $vectorAgenda['total_agenda'];

				
					$vector_return['success'] = true;
		
					$vector_return['total_socios_inscritos'] = $total_socios_inscritos;
					$vector_return['total_promociones'] = $total_promociones;
					$vector_return['total_ofertas'] = $total_ofertas;
					$vector_return['total_agenda'] = $total_agenda;
	
				}// fin if ($_SESSION['vectorUsuario']['socio_CodPK'] == $socio_CodPK)
				else 
					$vector_return['errorMessage'] = "Ha ocurrido un error, usuario no valido";
		
					
				header('Content-Type: application/json');
				echo json_encode($vector_return);
				break;


			

			case strcmp($action, "get-eventos") == 0:
				$conexion = new conexion();
	
				verificarToken();

				$socio_CodPK = $data['socio_CodPK'];
				if ($_SESSION['vectorUsuario']['socio_CodPK'] == $socio_CodPK)
				{
			
					$sqlAgenda = "SELECT *
									FROM agenda 
									LEFT JOIN agenda_asistente ON (asistente_AgendaFK = agenda_CodPK 
									AND asistente_SocioFK = ?)
									WHERE agenda_Estado = 'Alta'
									AND agenda_Fecha >= '" . date("Y-m-d") . "'
									AND agenda_Visible = 'Si'
									ORDER BY  
									CASE 
										WHEN agenda_Fecha >= CURDATE() THEN agenda_Fecha - CURDATE() 
										ELSE CURDATE() - agenda_Fecha 
									END;";

					$params = array($socio_CodPK);
					$tipos = generar_cadena_tipos($params);
					$resAgenda = $conexion->BD_Consulta_Preparada($sqlAgenda, $tipos, ...$params);

					$vectorAgenda = $conexion->BD_GetTupla($resAgenda);
				
					$vector_return['success'] = false;
		
					if ($vectorAgenda != NULL)
					{
						
						while ($vectorAgenda != NULL)
						{
							$vector_return['agendaData'][] = $vectorAgenda;
		
							$vectorAgenda = $conexion->BD_GetTupla($resAgenda);
						}//fin while ($vectorAgenda != NULL)
		
						$vector_return['success'] = true;
					}//fin while ($vec)
					else 
						$vector_return['errorMessage'] = "Ha ocurrido un error al realizar la petición a la base de datos";

				}// fin if ($_SESSION['vectorUsuario']['socio_CodPK'] == $socio_CodPK)
				else 
					$vector_return['errorMessage'] = "Ha ocurrido un error, usuario no valido";
					
				header('Content-Type: application/json');
				echo json_encode($vector_return);
				break;

			case strcmp($action, "get-socio") == 0:
				$conexion = new conexion();
	
				verificarToken();

				$socio_CodPK = $data['socio_CodPK'];

				$sqlSocios = "SELECT *
								FROM socio
								WHERE socio_Estado = 'Alta'
								AND socio_CodPK = ?";

				$params = array($socio_CodPK);
				$tipos = generar_cadena_tipos($params);
				$resSocios = $conexion->BD_Consulta_Preparada($sqlSocios, $tipos, ...$params);

				$vectorSocios = $conexion->BD_GetTupla($resSocios);
			
				$vector_return['success'] = false;
			
	
				if ($vectorSocios != NULL)
				{
					$vector_return['socioData'] = $vectorSocios;
					$vector_return['success'] = true;
				}//fin while ($vec)
				else 
					$vector_return['errorMessage'] = "Ha ocurrido un error al realizar la petición a la base de datos";
		
					
				header('Content-Type: application/json');
				echo json_encode($vector_return);
				break;

			case strcmp($action, "get-invitado") == 0:
				$conexion = new conexion();
	
				verificarToken();

				$socio_CodPK = $data['socio_CodPK'];
				$invitado_CodPK = $data['invitado_CodPK'];

				if ($_SESSION['vectorUsuario']['socio_CodPK'] == $socio_CodPK)
				{
					$sql = "SELECT *
							FROM agenda_invitado
							WHERE invitado_Estado = 'Alta'
							AND invitado_SocioFK = ?
							AND invitado_CodPK = ?";
	
					$params = array($socio_CodPK, $invitado_CodPK);
					$tipos = generar_cadena_tipos($params);
					$res = $conexion->BD_Consulta_Preparada($sql, $tipos, ...$params);
					
					$vector = $conexion->BD_GetTupla($res);

					$vector_return['success'] = false;

					if ($vector != NULL)
					{
						$vector_return['invitadoData'] = $vector;
						$vector_return['success'] = true;
					}//fin while ($vec)
					else 
						$vector_return['errorMessage'] = "Ha ocurrido un error al realizar la petición a la base de datos";

				}// fin if ($_SESSION['vectorUsuario']['socio_CodPK'] == $socio_CodPK)
				else 
					$vector_return['errorMessage'] = "Ha ocurrido un error, usuario no valido";

			
		
					
				header('Content-Type: application/json');
				echo json_encode($vector_return);
				break;

			case strcmp($action, "get-evento") == 0:
				$conexion = new conexion();
	
				verificarToken();

				$agenda_CodPK = $data['agenda_CodPK'];
				$socio_CodPK = $data['socio_CodPK'];
				if ($_SESSION['vectorUsuario']['socio_CodPK'] == $socio_CodPK)
				{

					$sqlAgenda = "SELECT *
									FROM agenda
									LEFT JOIN agenda_asistente ON (asistente_AgendaFK = agenda_CodPK 
									AND asistente_SocioFK = ?)
									WHERE agenda_Estado = 'Alta'
									AND agenda_Visible = 'Si'
									AND agenda_CodPK = ?";

					$params = array($socio_CodPK, $agenda_CodPK);
					$tipos = generar_cadena_tipos($params);
					$resAgenda = $conexion->BD_Consulta_Preparada($sqlAgenda, $tipos, ...$params);

					$vectorAgenda = $conexion->BD_GetTupla($resAgenda);
				
					$vector_return['success'] = false;
				
					if ($vectorAgenda != NULL)
					{
						$vector_return['eventoData'] = $vectorAgenda;
						$vector_return['success'] = true;
					}//fin while ($vec)
					else 
						$vector_return['errorMessage'] = "Ha ocurrido un error al realizar la petición a la base de datos";

				}// fin if ($_SESSION['vectorUsuario']['socio_CodPK'] == $socio_CodPK)
				else 
					$vector_return['errorMessage'] = "Ha ocurrido un error, usuario no valido";
			
					
				header('Content-Type: application/json');
				echo json_encode($vector_return);
				break;

			case strcmp($action, "get-promo") == 0:
				$conexion = new conexion();
	
				verificarToken();

				$partner_CodPK = $data['partner_CodPK'];

				$sqlPartner = "SELECT *
								FROM partner
								WHERE partner_Estado = 'Alta'
								AND partner_CodPK = ?";

				$params = array($partner_CodPK);
				$tipos = generar_cadena_tipos($params);
				$resPartner = $conexion->BD_Consulta_Preparada($sqlPartner, $tipos, ...$params);

				$vectorPartner = $conexion->BD_GetTupla($resPartner);
			
				$vector_return['success'] = false;
			
				if ($vectorPartner != NULL)
				{
					$vector_return['partnerData'] = $vectorPartner;
					$vector_return['success'] = true;
				}//fin while ($vec)
				else 
					$vector_return['errorMessage'] = "Ha ocurrido un error al realizar la petición a la base de datos";
		
					
				header('Content-Type: application/json');
				echo json_encode($vector_return);
				break;

			case 'get-catDocumentacion':
				$conexion = new conexion();
	
				verificarToken();
		
				$sqlCatDoc = "SELECT *
								FROM fm_categoria_documentacion
								WHERE catDoc_Estado = 'Alta'
								ORDER BY catDoc_Nombre";
				$resCatDoc = $conexion->BD_Consulta($sqlCatDoc);
				$vectorCatDoc = $conexion->BD_GetTupla($resCatDoc);
			
				$vector_return['success'] = false;
	
				if ($vectorCatDoc != NULL)
				{
					
					while ($vectorCatDoc != NULL)
					{
						$vector_return['categoriaData'][] = $vectorCatDoc;
	
						$vectorCatDoc = $conexion->BD_GetTupla($resCatDoc);
					}//fin while ($vectorCatDoc != NULL)
	
					$vector_return['success'] = true;
				}//fin while ($vec)
				else {
					$vector_return['errorMessage'] = "Ha ocurrido un error al realizar la petición a la base de datos";
				}
		
					
				header('Content-Type: application/json');
				echo json_encode($vector_return);

				break;
		
			case 'get-Provincias':
				$conexion = new conexion();
	
				verificarToken();
		
				$sql = "SELECT *
								FROM fm_provincia
								WHERE prov_Estado = 'Alta'
								ORDER BY prov_Nombre";
				$res = $conexion->BD_Consulta($sql);
				$vector = $conexion->BD_GetTupla($res);
			
				$vector_return['success'] = false;
	
				if ($vector != NULL)
				{
					
					while ($vector != NULL)
					{
						$vector_return['provinciaData'][] = $vector;
	
						$vector = $conexion->BD_GetTupla($res);
					}//fin while ($vector != NULL)
	
					$vector_return['success'] = true;
				}//fin while ($vec)
				else {
					$vector_return['errorMessage'] = "Ha ocurrido un error al realizar la petición a la base de datos";
				}
		
					
				header('Content-Type: application/json');
				echo json_encode($vector_return);

				break;

			case 'get-catPromocion':
				$conexion = new conexion();
	
				verificarToken();
		
				$sqlCat = "SELECT *
							FROM fm_categoria_partner
							WHERE catPart_Estado = 'Alta'
							ORDER BY catPart_Nombre";
				$resCat = $conexion->BD_Consulta($sqlCat);
				$vectorCat = $conexion->BD_GetTupla($resCat);
			
				$vector_return['success'] = false;
	
				if ($vectorCat != NULL)
				{
					
					while ($vectorCat != NULL)
					{
						$vector_return['categoriaData'][] = $vectorCat;
	
						$vectorCat = $conexion->BD_GetTupla($resCat);
					}//fin while ($vectorCat != NULL)
	
					$vector_return['success'] = true;
				}//fin while ($vec)
				else {
					$vector_return['errorMessage'] = "Ha ocurrido un error al realizar la petición a la base de datos";
				}
		
					
				header('Content-Type: application/json');
				echo json_encode($vector_return);

				break;

			case 'modificar-socio':

				include('./clases/socio.php'); 
				$conexion = new conexion();
				$socio = new socio();
	
				verificarToken();

				$socio_CodPK = $data['socio_CodPK'];
				$formState = $data['formState'];
				$vector_return['success'] = false;
		
				if ($_SESSION['vectorUsuario']['socio_CodPK'] == $socio_CodPK)
				{
					$sqlSocio = "SELECT *
								FROM socio
								WHERE socio_CodPK = ?
								AND socio_Estado = 'Alta'";

					$params = array($socio_CodPK);
					$tipos = generar_cadena_tipos($params);
					$resSocio = $conexion->BD_Consulta_Preparada($sqlSocio, $tipos, ...$params);		

					$vectorSocio = $conexion->BD_GetTupla($resSocio);

					if ($vectorSocio != NULL)
					{
						$sqlSocioRep = "SELECT *
										FROM socio
										WHERE socio_Email = ?
										AND socio_CodPK != ? 
										AND socio_Estado = 'Alta'";

						$params = array($formState['socio_Email'], $socio_CodPK);
						$tipos = generar_cadena_tipos($params);
						$resSocioRep = $conexion->BD_Consulta_Preparada($sqlSocioRep, $tipos, ...$params);	
										
						$vectorSocioRep = $conexion->BD_GetTupla($resSocioRep);

						if ($vectorSocioRep == NULL)
						{
							if (isset($_FILES['socio_Foto']['name']) && trim($_FILES['socio_Foto']['name']) != "") {
								$socio->eliminarArchivo_React($vectorSocio['socio_Foto']);
								$socio_Foto = $socio->subirArchivo_React($_FILES['socio_Foto']['tmp_name'], $socio_CodPK, pathinfo($_FILES['socio_Foto']['name'], PATHINFO_EXTENSION));
							}
							else 
								$socio_Foto = $vectorSocio['socio_Foto'];
	
	
							if (isset($_FILES['socio_Emp_Logo']['name']) && trim($_FILES['socio_Emp_Logo']['name']) != "") {
								$socio->eliminarArchivo_React($vectorSocio['socio_Emp_Logo']);
								$socio_Emp_Logo = $socio->subirArchivo_React($_FILES['socio_Emp_Logo']['tmp_name'], $socio_CodPK, pathinfo($_FILES['socio_Emp_Logo']['name'], PATHINFO_EXTENSION));
							}
							else 
								$socio_Emp_Logo = $vectorSocio['socio_Emp_Logo'];
	
							if (isset($_FILES['socio_Emp_Archivo1']['name']) && trim($_FILES['socio_Emp_Archivo1']['name']) != "") {
								$socio->eliminarArchivo_React($vectorSocio['socio_Emp_Archivo1']);
								$socio_Emp_Archivo1 = $socio->subirArchivo_React($_FILES['socio_Emp_Archivo1']['tmp_name'], $socio_CodPK, pathinfo($_FILES['socio_Emp_Archivo1']['name'], PATHINFO_EXTENSION));
							}
							else 
								$socio_Emp_Archivo1 = $vectorSocio['socio_Emp_Archivo1'];
	
							if (isset($_FILES['socio_Emp_Archivo2']['name']) && trim($_FILES['socio_Emp_Archivo2']['name']) != "") {
								$socio->eliminarArchivo_React($vectorSocio['socio_Emp_Archivo2']);
								$socio_Emp_Archivo2 = $socio->subirArchivo_React($_FILES['socio_Emp_Archivo2']['tmp_name'], $socio_CodPK, pathinfo($_FILES['socio_Emp_Archivo2']['name'], PATHINFO_EXTENSION));
							}
							else 
								$socio_Emp_Archivo2 = $vectorSocio['socio_Emp_Archivo2'];
	
							if (isset($_FILES['socio_Emp_Archivo3']['name']) && trim($_FILES['socio_Emp_Archivo3']['name']) != "") {
								$socio->eliminarArchivo_React($vectorSocio['socio_Emp_Archivo3']);
								$socio_Emp_Archivo3 = $socio->subirArchivo_React($_FILES['socio_Emp_Archivo3']['tmp_name'], $socio_CodPK, pathinfo($_FILES['socio_Emp_Archivo3']['name'], PATHINFO_EXTENSION));
							}
							else 
								$socio_Emp_Archivo3 = $vectorSocio['socio_Emp_Archivo3'];
	
							$res = $socio->modificar_prep($formState['socio_Nombre'], $formState['socio_Apellidos'], $formState['socio_Telefono'], $formState['socio_Email'], $formState['socio_Pass'], $formState['socio_Descripcion'], 
															$formState['socio_Perfil_Linkedin'], $formState['socio_Perfil_Instagram'], $formState['socio_Perfil_Facebook'], $socio_Foto, $formState['socio_Alergia'], $formState['socio_Emp_Nombre'], 
															$formState['socio_Emp_Telefono'], $formState['socio_Emp_Email'], $socio_Emp_Logo, $formState['socio_Emp_Perfil_Linkedin'], $formState['socio_Emp_Perfil_Instagram'], $formState['socio_Emp_Perfil_Facebook'], 
															$formState['socio_Emp_Web'], $formState['socio_Emp_Descripcion'], $socio_Emp_Archivo1, $socio_Emp_Archivo2, $socio_Emp_Archivo3, $formState['socio_Emp_Archivo1_Nombre'], $formState['socio_Emp_Archivo2_Nombre'], 
															$formState['socio_Emp_Archivo3_Nombre'], $socio_CodPK);
							if ($res == true) 
							{
								$vector_return['success'] = true;
								$vector_return['archivos'] = ["socio_Foto" => $socio_Foto, "socio_Emp_Logo" => $socio_Emp_Logo,"socio_Emp_Archivo1" => $socio_Emp_Archivo1,"socio_Emp_Archivo2" => $socio_Emp_Archivo2,"socio_Emp_Archivo3" => $socio_Emp_Archivo3];
							}
							else 
								$vector_return['errorMessage'] = "Ha ocurrido un error, al modificar";
	
						}//fin if ($vectorSocioRep == NULL)
						else 
							$vector_return['errorMessage'] = "Ha ocurrido un error, email repetido";
					
					}//fin if ($vectorSocio != NULL)
					else 
						$vector_return['errorMessage'] = "Ha ocurrido un error, socio no encontrado";
					
				}//fin if ($_SESSION['vectorUsuario']['socio_CodPK'] == $socio_CodPK)
				else 
					$vector_return['errorMessage'] = "Ha ocurrido un error al modificar, usuario no valido";
				

				header('Content-Type: application/json');
				echo json_encode($vector_return);
				break;

			
			case 'insertar-invitado':

				include('./clases/agenda_invitado.php'); 
				$conexion = new conexion();
				$agenda_invitado = new agenda_invitado();
	
				verificarToken();

				$socio_CodPK = $data['socio_CodPK'];
				$agenda_CodPK = $data['agenda_CodPK'];
				$formState = $data['formState'];
				$vector_return['success'] = false;
		
				if ($_SESSION['vectorUsuario']['socio_CodPK'] == $socio_CodPK)
				{
					$sqlSocio = "SELECT *
								FROM socio
								WHERE socio_CodPK = ?
								AND socio_Estado = 'Alta'";

					$params = array($socio_CodPK);
					$tipos = generar_cadena_tipos($params);
					$resSocio = $conexion->BD_Consulta_Preparada($sqlSocio, $tipos, ...$params);	

					$vectorSocio = $conexion->BD_GetTupla($resSocio);

					if ($vectorSocio != NULL)
					{
						if (strcmp($formState['invitado_PerteneceEmpresa'], "No") == 0)
						{
							$invitado_Empresa = $formState['invitado_Empresa'];
							$invitado_Actividad = $formState['invitado_Actividad'];
							$invitado_ProvinciaFK = $formState['invitado_ProvinciaFK'];
						}//fin if (strcmp($invitado_PerteneceEmpresa, "No") == 0)
						else 
						{
							$invitado_Empresa = $vectorSocio['socio_Emp_Nombre'];
							$invitado_Actividad = $vectorSocio['socio_Actividad'];
							$invitado_ProvinciaFK = $vectorSocio['socio_ProvinciaFK'];

						}//fin else de if (strcmp($invitado_PerteneceEmpresa, "No") == 0)
					
						$res = $agenda_invitado->insertar_prepare("Socio", $agenda_CodPK, $socio_CodPK, $formState['invitado_Nombre'], $formState['invitado_PerteneceEmpresa'], $invitado_Empresa, 
														$invitado_Actividad, $formState['invitado_Email'], $formState['invitado_Telefono'], $formState['invitado_Alergia'], $invitado_ProvinciaFK, "No");

						if ($res == true) 
							$vector_return['success'] = true;
						else 
							$vector_return['errorMessage'] = "Ha ocurrido un error, al insertar";
					
					}//fin if ($vectorSocio != NULL)
					else 
						$vector_return['errorMessage'] = "Ha ocurrido un error, socio no encontrado";
					
				}//fin if ($_SESSION['vectorUsuario']['socio_CodPK'] == $socio_CodPK)
				else 
					$vector_return['errorMessage'] = "Ha ocurrido un error al modificar, usuario no valido";
				

				header('Content-Type: application/json');
				echo json_encode($vector_return);
				break;

			case 'modificar-invitado':

				include('./clases/agenda_invitado.php'); 
				$conexion = new conexion();
				$agenda_invitado = new agenda_invitado();
	
				verificarToken();

				$socio_CodPK = $data['socio_CodPK'];
				$agenda_CodPK = $data['agenda_CodPK'];
				$invitado_CodPK = $data['invitado_CodPK'];
				$formState = $data['formState'];
				$vector_return['success'] = false;
		
				if ($_SESSION['vectorUsuario']['socio_CodPK'] == $socio_CodPK)
				{
					$sqlSocio = "SELECT *
								FROM socio
								WHERE socio_CodPK = ?
								AND socio_Estado = 'Alta'";

					$params = array($socio_CodPK);
					$tipos = generar_cadena_tipos($params);
					$resSocio = $conexion->BD_Consulta_Preparada($sqlSocio, $tipos, ...$params);	

					$vectorSocio = $conexion->BD_GetTupla($resSocio);

					if ($vectorSocio != NULL)
					{
						if (strcmp($formState['invitado_PerteneceEmpresa'], "No") == 0)
						{
							$invitado_Empresa = $formState['invitado_Empresa'];
							$invitado_Actividad = $formState['invitado_Actividad'];
							$invitado_ProvinciaFK = $formState['invitado_ProvinciaFK'];
						}//fin if (strcmp($invitado_PerteneceEmpresa, "No") == 0)
						else 
						{
							
							$invitado_Empresa = $vectorSocio['socio_Emp_Nombre'];
							$invitado_Actividad = $vectorSocio['socio_Actividad'];
							$invitado_ProvinciaFK = $vectorSocio['socio_ProvinciaFK'];
						}//fin else de if (strcmp($invitado_PerteneceEmpresa, "No") == 0)


						$sqlInv = "SELECT * FROM agenda_invitado 
									WHERE invitado_Estado = 'Alta'
									AND invitado_CodPK = ? 
									AND invitado_SocioFK = ?";                                  

						$params = array($invitado_CodPK, $socio_CodPK);
						$tipos = generar_cadena_tipos($params);
						$resInv = $conexion->BD_Consulta_Preparada($sqlInv, $tipos, ...$params);	

						$tuplaInv = $conexion->BD_GetTupla($resInv);

						if ($tuplaInv != NULL)
						{
							$res = $agenda_invitado->modificar_ZonaSocio_prep($formState['invitado_Nombre'], $formState['invitado_PerteneceEmpresa'], $invitado_Empresa, $invitado_Actividad, $formState['invitado_Email'], $formState['invitado_Telefono'], $formState['invitado_Alergia'], $invitado_ProvinciaFK, $invitado_CodPK);

							if ($res == true) 
								$vector_return['success'] = true;
							else 
								$vector_return['errorMessage'] = "Ha ocurrido un error, al modificar";
						}//fin if ($tuplaInv != NULL)
						else 
							$vector_return['errorMessage'] = "Ha ocurrido un error, invitado no disponible";
						
					
					}//fin if ($vectorSocio != NULL)
					else 
						$vector_return['errorMessage'] = "Ha ocurrido un error, socio no encontrado";
					
				}//fin if ($_SESSION['vectorUsuario']['socio_CodPK'] == $socio_CodPK)
				else 
					$vector_return['errorMessage'] = "Ha ocurrido un error al modificar, usuario no valido";
				

				header('Content-Type: application/json');
				echo json_encode($vector_return);
				break;

			case 'marcar-leido':

				include('./clases/notificacion.php'); 
				$conexion = new conexion();
				$notificacion = new notificacion();
	
				verificarToken();

				$socio_CodPK = $data['socio_CodPK'];
				$notificacion_CodPK = $data['notificacion_CodPK'];
				$nuevoEstado = $data['nuevoEstado'];

				$vector_return['success'] = false;
				if ($_SESSION['vectorUsuario']['socio_CodPK'] == $socio_CodPK)
				{
					$sqlNotificacion = "SELECT *
										FROM notificacion
										INNER JOIN socio ON socio_CodPK = notificacion_ReceptorFK
										WHERE socio_CodPK = ?
										AND notificacion_CodPK = ?
										AND socio_Estado = 'Alta'
										AND notificacion_Estado = 'Alta'";

					$params = array($socio_CodPK, $notificacion_CodPK);
					$tipos = generar_cadena_tipos($params);
					$resNotificacion = $conexion->BD_Consulta_Preparada($sqlNotificacion, $tipos, ...$params);	

					$vectorNotificacion = $conexion->BD_GetTupla($resNotificacion);

					if ($vectorNotificacion != NULL)
					{
						$res = $notificacion->modificarLeido($nuevoEstado, $notificacion_CodPK);

						if ($res == true) 
							$vector_return['success'] = true;
						else 
							$vector_return['errorMessage'] = "Ha ocurrido un error, al modificar";

					}//fin if ($vectorNotificacion != NULL)
					else 
						$vector_return['errorMessage'] = "Ha ocurrido un error, notificación no encontrada";
					
				}//fin if ($_SESSION['vectorUsuario']['socio_CodPK'] == $socio_CodPK)
				else 
					$vector_return['errorMessage'] = "Ha ocurrido un error al modificar, usuario no valido";
				

				header('Content-Type: application/json');
				echo json_encode($vector_return);
				break;

			case 'marcar-mostrar':

				include('./clases/notificacion.php'); 
				$conexion = new conexion();
				$notificacion = new notificacion();
	
				verificarToken();

				$socio_CodPK = $data['socio_CodPK'];
				$notificacion_CodPK = $data['notificacion_CodPK'];
				$notificacion_Mostrar = $data['notificacion_Mostrar'];

				$vector_return['success'] = false;
				if ($_SESSION['vectorUsuario']['socio_CodPK'] == $socio_CodPK)
				{
					$sqlNotificacion = "SELECT *
										FROM notificacion
										INNER JOIN socio ON socio_CodPK = notificacion_ReceptorFK
										WHERE socio_CodPK = ?
										AND notificacion_CodPK = ?
										AND socio_Estado = 'Alta'
										AND notificacion_Estado = 'Alta'";

					$params = array($socio_CodPK, $notificacion_CodPK);
					$tipos = generar_cadena_tipos($params);
					$resNotificacion = $conexion->BD_Consulta_Preparada($sqlNotificacion, $tipos, ...$params);	

					$vectorNotificacion = $conexion->BD_GetTupla($resNotificacion);

					if ($vectorNotificacion != NULL)
					{
						$res = $notificacion->modificarMostrar($notificacion_Mostrar, $notificacion_CodPK);

						if ($res == true) 
							$vector_return['success'] = true;
						else 
							$vector_return['errorMessage'] = "Ha ocurrido un error, al modificar";

					}//fin if ($vectorNotificacion != NULL)
					else 
						$vector_return['errorMessage'] = "Ha ocurrido un error, notificación no encontrada";
					
				}//fin if ($_SESSION['vectorUsuario']['socio_CodPK'] == $socio_CodPK)
				else 
					$vector_return['errorMessage'] = "Ha ocurrido un error al modificar, usuario no valido";
				

				header('Content-Type: application/json');
				echo json_encode($vector_return);
				break;

			case 'baja-invitado':

				include('./clases/agenda_invitado.php'); 
				$conexion = new conexion();
				$agenda_invitado = new agenda_invitado();
	
				verificarToken();

				$socio_CodPK = $data['socio_CodPK'];
				$invitado_CodPK = $data['invitado_CodPK'];

				$vector_return['success'] = false;
				if ($_SESSION['vectorUsuario']['socio_CodPK'] == $socio_CodPK)
				{
					$sql = "SELECT *
							FROM agenda_invitado
							INNER JOIN socio ON socio_CodPK = invitado_SocioFK
							WHERE socio_CodPK = ?
							AND invitado_CodPK = ?
							AND socio_Estado = 'Alta'
							AND invitado_Estado = 'Alta'";

					$params = array($socio_CodPK, $invitado_CodPK);
					$tipos = generar_cadena_tipos($params);
					$res = $conexion->BD_Consulta_Preparada($sql, $tipos, ...$params);	

					$vector = $conexion->BD_GetTupla($res);

					if ($vector != NULL)
					{
						$res = $agenda_invitado->cambiarEstado("Baja", $invitado_CodPK);

						if ($res == true) 
							$vector_return['success'] = true;
						else 
							$vector_return['errorMessage'] = "Ha ocurrido un error, al dar de baja el invitado";

					}//fin if ($vector != NULL)
					else 
						$vector_return['errorMessage'] = "Ha ocurrido un error, invitado no encontrada";
					
				}//fin if ($_SESSION['vectorUsuario']['socio_CodPK'] == $socio_CodPK)
				else 
					$vector_return['errorMessage'] = "Ha ocurrido un error al modificar, usuario no valido";
				

				header('Content-Type: application/json');
				echo json_encode($vector_return);
				break;

			case 'inscribir-evento':

				include('./clases/agenda_asistente.php'); 
				$conexion = new conexion();
				$agenda_asistente = new agenda_asistente();
	
				verificarToken();

				$socio_CodPK = $data['socio_CodPK'];
				$agenda_CodPK = $data['agenda_CodPK'];

				$vector_return['success'] = false;
				if ($_SESSION['vectorUsuario']['socio_CodPK'] == $socio_CodPK)
				{
					$sqlInscrito = "SELECT *
									FROM agenda_asistente 
									INNER JOIN agenda ON agenda_CodPK = asistente_AgendaFK
									WHERE asistente_AgendaFK= ? 
									AND asistente_SocioFK = ? 
									AND agenda_FechaMax_Inscripcion >= CURDATE()";

					$params = array($agenda_CodPK, $socio_CodPK);
					$tipos = generar_cadena_tipos($params);
					$resInscrito = $conexion->BD_Consulta_Preparada($sqlInscrito, $tipos, ...$params);	

					$vectorInscrito = $conexion->BD_GetTupla($resInscrito);

					if ($vectorInscrito == NULL)
					{
						$res = $agenda_asistente->insertar_prepare($agenda_CodPK, $socio_CodPK);

						if ($res == true) 
							$vector_return['success'] = true;
						else 
							$vector_return['errorMessage'] = "Ha ocurrido un error, al insertar";

					}//fin if ($vectorInscrito != NULL)
					else 
						$vector_return['errorMessage'] = "Ha ocurrido un error, inscripción no realizada";
					
				}//fin if ($_SESSION['vectorUsuario']['socio_CodPK'] == $socio_CodPK)
				else 
					$vector_return['errorMessage'] = "Ha ocurrido un error, inscripción no realizada";
				

				header('Content-Type: application/json');
				echo json_encode($vector_return);
				break;


			case 'insertar-sustituto':

				include('./clases/agenda_asistente.php'); 
				$conexion = new conexion();
				$agenda_asistente = new agenda_asistente();
	
				verificarToken();

				$socio_CodPK = $data['socio_CodPK'];
				$agenda_CodPK = $data['agenda_CodPK'];
				$formState = $data['formState'];

				$vector_return['success'] = false;
				if ($_SESSION['vectorUsuario']['socio_CodPK'] == $socio_CodPK)
				{

					$sqlInscrito = "SELECT *
									FROM agenda_asistente 
									INNER JOIN agenda ON agenda_CodPK = asistente_AgendaFK
									WHERE asistente_AgendaFK = ? 
									AND asistente_SocioFK = ? 
									AND agenda_FechaMax_Inscripcion >= CURDATE()";

					$params = array($agenda_CodPK, $socio_CodPK);
					$tipos = generar_cadena_tipos($params);
					$resInscrito = $conexion->BD_Consulta_Preparada($sqlInscrito, $tipos, ...$params);	

					$vectorInscrito = $conexion->BD_GetTupla($resInscrito);
				
					if ($vectorInscrito == NULL)
					{
						$res = $agenda_asistente->insertar_sustituto_pre($agenda_CodPK, $socio_CodPK, "Si", $formState['asistente_Sustituto_Nombre'], $formState['asistente_Sustituto_Email'], $formState['asistente_Sustituto_Telefono'], $formState['asistente_Sustituto_Alergia']);

						if ($res == true) 
							$vector_return['success'] = true;
						else 
							$vector_return['errorMessage'] = "Ha ocurrido un error, al insertar";

					}//fin if ($vectorInscrito != NULL)
					else 
						$vector_return['errorMessage'] = "Ha ocurrido un error, inscripción no realizada";
					
				}//fin if ($_SESSION['vectorUsuario']['socio_CodPK'] == $socio_CodPK)
				else 
					$vector_return['errorMessage'] = "Ha ocurrido un error, inscripción no realizada";
				

				header('Content-Type: application/json');
				echo json_encode($vector_return);
				break;

			case 'anularIns-evento':

				include('./clases/agenda_asistente.php'); 
				$conexion = new conexion();
				$agenda_asistente = new agenda_asistente();
	
				verificarToken();

				$socio_CodPK = $data['socio_CodPK'];
				$agenda_CodPK = $data['agenda_CodPK'];

				$vector_return['success'] = false;
				if ($_SESSION['vectorUsuario']['socio_CodPK'] == $socio_CodPK)
				{

					$sqlInvitados = "SELECT *
									FROM agenda_invitado 
									WHERE invitado_SocioFK = ? 
									AND invitado_AgendaFK = ? 
									AND invitado_Pagado = 'No'
									AND invitado_Estado = 'Alta'";

					$params = array($socio_CodPK, $agenda_CodPK);
					$tipos = generar_cadena_tipos($params);
					$resInvitados = $conexion->BD_Consulta_Preparada($sqlInvitados, $tipos, ...$params);	
						
					$vectorInvitados = $conexion->BD_GetTupla($resInvitados);

					if ($vectorInvitados == NULL)
					{
						$sqlInscrito = "SELECT *
										FROM agenda_asistente 
										INNER JOIN agenda ON agenda_CodPK = asistente_AgendaFK
										WHERE asistente_AgendaFK = ? 
										AND asistente_SocioFK = ? 
										AND agenda_Fecha > CURDATE()
										AND agenda_FechaMax_Cancelacion >= CURDATE()";

						$params = array($agenda_CodPK, $socio_CodPK);
						$tipos = generar_cadena_tipos($params);
						$resInscrito = $conexion->BD_Consulta_Preparada($sqlInscrito, $tipos, ...$params);	

						$vectorInscrito = $conexion->BD_GetTupla($resInscrito);

						if ($vectorInscrito != NULL)
						{
							$res = $agenda_asistente->eliminar(" WHERE asistente_CodPK = " . $vectorInscrito['asistente_CodPK']);

							if ($res == true) 
								$vector_return['success'] = true;
							else 
								$vector_return['errorMessage'] = "Ha ocurrido un error, al anular la inscripción";

						}//fin if ($vectorInscrito != NULL)
						else 
							$vector_return['errorMessage'] = "Ha ocurrido un error, no puede anular su inscripción el evento ya se ha realizado, o ha superado la fecha máxima de cancelación";

					}//fin if ($vectorInvitados == NULL)
					else
						$vector_return['errorMessage'] = "Ha ocurrido un error, para poder anular la inscripción debes eliminar primero tus invitados";

				
				}//fin if ($_SESSION['vectorUsuario']['socio_CodPK'] == $socio_CodPK)
				else 
					$vector_return['errorMessage'] = "Ha ocurrido un error, usuario no valido";
				

				header('Content-Type: application/json');
				echo json_encode($vector_return, JSON_NUMERIC_CHECK);
				break;


			case 'logoutUser':
				unset($_SESSION['vectorUsuario']);
				unset($_SESSION['token']);

                session_destroy();
				break;
	
		}
	}//fin if (isset($data['action']))
	else 
	{
		http_response_code(405);
		echo json_encode(array('message' => 'Acción no especificada'));
	}
} 
else 
{
    http_response_code(405);
    echo json_encode(array('message' => 'Método no permitido'));
}

?>