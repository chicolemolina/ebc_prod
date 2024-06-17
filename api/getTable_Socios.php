<?PHP
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header('Content-Type: application/json');

include('./clases/conexion.php'); 

$conexion = new conexion();

$postData = file_get_contents('php://input');
// En data almaceno la variable $postData
$postData = json_decode($postData, true);


// Obtener la página actual
$page = isset($postData['page']) ? $postData['page'] : 1;
$perPage = isset($postData['perPage']) ? $postData['perPage'] : 10;
$sortField = isset($postData['sortField']) ? $postData['sortField'] : 'socio_CodPK'; // Campo de ordenamiento predeterminado
$sortOrder = isset($postData['sortOrder']) ? $postData['sortOrder'] : 'asc'; // Orden predeterminado
$searchText = isset($postData['searchText']) ? $postData['searchText'] : ''; // Orden predeterminado

// Calcular el offset
$offset = ($page - 1) * $perPage;


$sql = "SELECT socio_CodPK, socio_Nombre, socio_Email 
        FROM socio
        WHERE 1 = 1";
    
if ($searchText != "")
    $sql .= " AND (socio_CodPK LIKE '%" . $searchText . "%' OR socio_Nombre LIKE '%" . $searchText . "%' OR socio_Email LIKE '%" . $searchText . "%')";
        
$sql .= " ORDER BY $sortField $sortOrder 
            LIMIT $offset, $perPage";
$res = $conexion->BD_Consulta($sql);
$vector = $conexion->BD_GetTupla($res);

$data = array();
while ($vector != NULL)
{
    $aux_array = [];
    foreach ($vector as $key => $value) {
        if (!is_numeric($key))
            $aux_array[$key] = $value;
    }

    $data[] = $aux_array;

    $vector = $conexion->BD_GetTupla($res);
}//fin while ($vector != NULL)

// Obtener el número total de registros
$sqlCount = "SELECT COUNT(*) as total FROM socio";
$resCount = $conexion->BD_Consulta($sqlCount);
$countResult = $conexion->BD_GetTupla($resCount);

$totalRecords = isset($countResult['total']) ? $countResult['total'] : 0;


$draw = isset($postData['draw']) ? intval($postData['draw']) : 0;
$json_data = array(
    "draw" => $draw,
    "recordsTotal" => $totalRecords, // Total de registros antes de la filtración
    "recordsFiltered" => count($data), // Total de registros después de la filtración
    "data" => $data // Datos para DataTables
);


header('Content-Type: application/json');
echo json_encode($json_data);


