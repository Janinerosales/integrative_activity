<?php
header('Content-Type: application/json');

class Clinics
{
    public $conn;

    public function __construct()
    {
        $this->conn = new mysqli('localhost', 'root', '', 'clinics');
    }

    public function create()
    {
        if($_SERVER['REQUEST_METHOD'] != 'POST'){
            return json_encode([
                "code" => 201,
                "message" => $_SERVER['REQUEST_METHOD']. " Method is not allowed, Only POST Method is allowed",
            ]);
        }

$data = json_decode(file_get_contents("php://input"), true);
$name = $data['name'];
$address = $data['address'];
$phone = $data['phone'];
$gender = $data['gender'];
$birthdate = $data['birthdate'];


$conn = new mysqli('localhost','root', '','clinics');

$isInserted = $conn->query("INSERT INTO patients (name, address, phone, gender, birthdate)
  values('$name', '$address', '$phone', '$gender', '$birthdate')");

  if ($isInserted) {

    $id = $conn->insert_id;
    $row = $conn->query("SELECT * FROM patients where id = $id");
    $response = $row->fetch_assoc();


    echo json_encode($response);

    }
    else{
      echo json_encode([
        'message'=> 'Failed to Insert data',
        'code'=> '422',

      ]);
    }
  }
}
$create = new Clinics();

echo $create->create($_POST);
?>


?>