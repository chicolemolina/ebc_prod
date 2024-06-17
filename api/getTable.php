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
$sortField = isset($postData['sortField']) ? $postData['sortField'] : ''; // Campo de ordenamiento predeterminado
$sortOrder = isset($postData['sortOrder']) ? $postData['sortOrder'] : 'asc'; // Orden predeterminado
$searchText = isset($postData['searchText']) ? $postData['searchText'] : ''; // Orden predeterminado

$fields = $postData['fields'];
$tableName = $postData['tableName'];
$tableInner = $postData['tableInner'];
$filtro = $postData['filtro'];

// Calcular el offset
$offset = ($page - 1) * $perPage;

$tableInner = mysqli_real_escape_string($GLOBALS['BD_link_conecct'], $tableInner);
$tableName = mysqli_real_escape_string($GLOBALS['BD_link_conecct'], $tableName);

$sql = "SELECT " . implode(", ", $fields) . " 
        FROM $tableName 
        $tableInner
        WHERE 1 = 1";


if (!empty($filtro)) {
    $filters = array();
    foreach ($filtro as $campo) {
        $filterField = mysqli_real_escape_string($GLOBALS['BD_link_conecct'], $campo['field']);
        $comparison = mysqli_real_escape_string($GLOBALS['BD_link_conecct'], $campo['comparison']);
        $filterValue = mysqli_real_escape_string($GLOBALS['BD_link_conecct'], $campo['value']);
        $filters[] = "$filterField $comparison '$filterValue'";
    }
    $sql .= " AND (" . implode(" AND ", $filters) . ")";
}

//PARA EL FILTRO SUPERIOR A LA TABLA
if ($searchText != "") 
{
    $searchText = mysqli_real_escape_string($GLOBALS['BD_link_conecct'], $searchText);

    $conditions = array();
    foreach ($fields as $field) {
        $conditions[] = "$field LIKE '%" . $searchText . "%'";
    }
    $sql .= " AND (" . implode(" OR ", $conditions) . ")";
}

if ($sortField != "")
    $sql .= " ORDER BY $sortField $sortOrder ";


$sqlCount = $sql; // Guardamos la consulta sin el límite para el conteo total
$sqlAux = $sql; // me guardo sin el limite para que si estoy buscando en una pgina donde no está ese resultado, busque en la primera por si ahí si está

$sql .= " LIMIT $offset, $perPage";
$res = $conexion->BD_Consulta($sql);
$vector = $conexion->BD_GetTupla($res);

// hago esta comprobación por si busco en searchtext estando en la segunda página, y el resultado está en otra página "resetee" las paginas
if ($vector == NULL)
{
    $offset = 0;
    $perPage = $perPage;

    $sqlAux .= " LIMIT $offset, $perPage";

    $res = $conexion->BD_Consulta($sqlAux);
    $vector = $conexion->BD_GetTupla($res);
}//fin if ($vector == NULL)

$data = array();
while ($vector != NULL)
{
    // $aux_array = [];
    // foreach ($vector as $key => $value) 
    // {
    //     if (!is_numeric($key))
    //         $aux_array[$key] = $value;
    // }

    $data[] = $vector;

    $vector = $conexion->BD_GetTupla($res);
}//fin while ($vector != NULL)

// Obtener el número total de registros
$sqlCount = "SELECT COUNT(*) as total FROM ($sqlCount) as count_query";
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

// JSON_NUMERIC_CHECK hace que json_encode() revise los valores en el array u objeto proporcionado y, si encuentra una cadena que parece representar un número (por ejemplo, "123"), 
// la convertirá en un número en el JSON resultante. Esto significa que las cadenas numéricas en PHP se convierten a números en el JSON.
header('Content-Type: application/json');
echo json_encode($json_data, JSON_NUMERIC_CHECK);


