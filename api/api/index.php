<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept, Origin, Authorization");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Credentials: true");

require '../composer/vendor/autoload.php';
require_once '/clases/AccesoDatos.php';
require_once '/clases/cdApi.php';
require_once '/clases/AutentificadorJWT.php';
require_once '/clases/MWparaCORS.php';
require_once '/clases/MWparaAutentificar.php';
require_once '/clases/usuario.php';
require_once '/clases/Reservas.php';
require_once '/clases/encuestas.php';

$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;
$config['determineRouteBeforeAppMiddleware'] = true;

$app = new \Slim\App(["settings" => $config]);

/*LLAMADA A METODOS DE INSTANCIA DE UNA CLASE*/

$app->post('/registrar/', function (Request $request, Response $response) {    
  
  $token="";
  /**POSTMAN*/
   $ArrayDeParametros = $request->getParsedBody();
  //$ArrayDeParametros = $request->getParsedBody()['datosLogin'];
  $usuario = $ArrayDeParametros['usuario'];
  $clave = $ArrayDeParametros['clave'];
  $tipo = $ArrayDeParametros['tipo'];
  /*
  $newResponse = $response->withJson( $usuario . $clave  ,200);
  return $newResponse;*/
  // var_dump($ArrayDeParametros );
  if( $usuario &&  $clave )
  {
      if( usuario::esValido($usuario,$clave))
      {

        $retorno=array('error' => "el usuario existe", "bandera" => false );
        $newResponse = $response->withJson( $retorno ,200); 
      }
      else
      {
        $perfil=usuario::registrarCliente($usuario,$clave,$tipo);
        $datos=array('usuario' => $usuario,'clave' => $clave, 'bandera' => true);
        //$token= AutentificadorJWT::CrearToken($datos);
        $retorno=array('datos' => $datos);
        $newResponse = $response->withJson( $retorno ,200); 
      }
  }else
  {
        $retorno=array('error' => "Faltan los datos del usuario y su clave" );
        $newResponse = $response->withJson( $retorno  ,200); 

  }
  return $newResponse;

});
$app->post('/ingreso/', function (Request $request, Response $response) {    
    
  $token="";
  /**POSTMAN*/
   $ArrayDeParametros = $request->getParsedBody();
  //$ArrayDeParametros = $request->getParsedBody()['datosLogin'];
  $usuario = $ArrayDeParametros['usuario'];
  $clave = $ArrayDeParametros['clave'];

  /*$newResponse = $response->withJson( $usuario . $clave  ,200);
  return $newResponse;*/
 // var_dump($ArrayDeParametros );
  if( $usuario &&  $clave )
  {
      if( usuario::esValido($usuario,$clave))
      {
        $perfil=usuario::verificarPerfil($usuario);
        $datos=array('usuario' => $usuario,'clave' => $clave,"tipo" => $perfil);
        $token= AutentificadorJWT::CrearToken($datos);
        $retorno=array('datos' => $datos, 'token' => $token, "bandera" => true);
        $newResponse = $response->withJson( $retorno ,200); 
      }
      else
      {
        $retorno=array('error' => "no es usuario valido" );
        $newResponse = $response->withJson( $retorno ,200); 
      }
  }else
  {
        $retorno=array('error' => "Faltan los datos del usuario y su clave" );
        $newResponse = $response->withJson( $retorno  ,200); 

  }
 
	/*
  $newResponse
            ->withHeader('Access-Control-Allow-Origin', 'http://localhost:4200')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods',  'POST');
  */
  return $newResponse;

});
$app->get('/ingreso/', function (Request $request, Response $response,$arg) {    
    
  $token="";

  $datos=$request->getParam();
  if(isset( $arg['usuario']) && isset( $arg['clave']) )
  {
      $usuario=$ArrayDeParametros['usuario'];
      $clave= $ArrayDeParametros['clave'];

      if(usuario::esValido($usuario,$clave))
      {
        $datos=array('usuario'=>$usuario,'clave'=>$clave);
        $token= AutentificadorJWT::CrearToken($datos);
        $retorno=array('datos'=> $datos, 'token'=>$token );
        $newResponse = $response->withJson( $retorno ,200); 
      }
      else
      {
        $retorno=array('error'=> "no es usuario valido" );
        $newResponse = $response->withJson( $retorno ,409); 
      }
  }else
  {
        $retorno=array('error'=> "Faltan los datos del usuario y su clave" );
        $newResponse = $response->withJson( $datos  ,411); 
  }
 
  return $newResponse;
   });

  $app->get('/traerPayload/', function (Request $request, Response $response,$arg) {    
    
    $arrayConToken = $request->getHeader('Authorization');
    //$arrayConToken = $args['miTokenUTNFRA'];
    $token="";
    for ($i=0; $i < strlen($arrayConToken[0]); $i++) { 
      if($i>6)
        $token=$token . $arrayConToken[0][$i];
    }

    $array=AutentificadorJWT::ObtenerPayLoad($token);
    $newResponse = $response->withJson( $array ,200); 
  
    return $newResponse;
});
$app->get('/tomarToken/', function (Request $request, Response $response,$arg) {    
    
	

    $arrayConToken = $request->getHeader('Authorization');
    //$arrayConToken = $args['miTokenUTNFRA'];
    $token="";
    for ($i=0; $i < strlen($arrayConToken[0]); $i++) { 
      if($i>6)
        $token=$token . $arrayConToken[0][$i];
    }
    //$token=$arrayConToken[0];
   /*
    $newResponse = $response->withJson($token,200);
    return $newResponse;*/
    
    try {

      AutentificadorJWT::VerificarToken($token);
      $array= array("token"=>$token,"valido"=>true);
      $newResponse = $response->withJson($array);  
      /*$respuesta=usuario::Traertodos();   */ 
      //$newResponse = $response->withJson($respuesta); 

    } catch (Exception $e) {

      $textoError="error ".$e->getMessage();
      $error = array('tipo' => 'acceso','descripcion' => $textoError,"valido"=>false);
      $newResponse = $response->withJson( $error , 200); 

    }
    
    return $newResponse;


});
$app->post('/reservar/', function (Request $request, Response $response) {    
    
  $token="";
  /**POSTMAN*/
  $ArrayDeParametros = $request->getParsedBody();

  $cliente=$ArrayDeParametros["reserva"]["cliente"];
  $fecha=$ArrayDeParametros["reserva"]["fecha"];
  $local=$ArrayDeParametros["reserva"]["local"];
  $mesas=$ArrayDeParametros["reserva"]["mesas"];
  $con=$ArrayDeParametros["reserva"]["con"];
  /*
  $array=array("RESTULADO"=>$ArrayDeParametros['reserva']);
  $newResponse = $response->withJson( $array  ,200);
  return $newResponse;*/
  /*
  $array=array("RESULTADO"=>$mesas);
  $newResponse = $response->withJson( $array  ,200);
  return $newResponse;*/

  $verificarReserva=Reservas::VerificarDisponibilidadReserva($fecha,$local);
  
  
  if($verificarReserva != null)
  {
    $array=array("RESULTADO"=>"El local ya esta reservado en esa fecha");
    $newResponse = $response->withJson( $array  ,200);
    return $newResponse;
  }
  else 
  {
    $array=array("RESULTADO"=>"SIP");
    $newResponse = $response->withJson( $array  ,200);
  }
  

  //return $newResponse;

  /*
  $cliente=$ArrayDeParametros["cliente"];
  $fecha=$ArrayDeParametros["fecha"];
  $local=$ArrayDeParametros["local"];*/

  if( isset($cliente) )
  {
      $perfil=true;
      if($perfil == true)
      {        
        if($mesas != null || $mesas !="")
        {         
          
          $perfil=Reservas::Reservar($cliente,$fecha,$local,$con,$mesas);/*
          $newResponse = $response->withJson( $perfil  ,200);*/
          $array=array("sql"=>$perfil,"RESULTADO"=>"RESERVADO CON invitados");
          $newResponse = $response->withJson( $array  ,200);
        }
        else
        {
          $perfil=Reservas::Reservar($cliente,$fecha,$local,$con,$mesas);
          $array=array("RESULTADO"=>"RESERVADO SIN invitados");
          $newResponse = $response->withJson( $array  ,200);
        }
      }
      else
      {
        $array=array("RESULTADO"=>"No se pudo Reservar");
        $newResponse = $response->withJson( $array  ,200);
      }
  }
  else
  {
    $retorno=array('error' => "Faltan los datos de la reserva" );
    $newResponse = $response->withJson( $retorno  ,200); 
  }
  return $newResponse;

});
$app->post('/reservaCliente/', function (Request $request, Response $response) {    

  $ArrayDeParametros = $request->getParsedBody();

  $cliente=$ArrayDeParametros["cliente"];
  $fecha=$ArrayDeParametros["fecha"];/*
  $retorno=array('error' => $cliente );
  $newResponse = $response->withJson( $retorno  ,200);
  return $newResponse;*/
  if( isset($cliente) )
  {
      $band=Reservas::TraerReservasCliente($cliente,$fecha);
      if($band != null || $band != "")
      {
        $retorno=array('Reserva' => $band );
        $newResponse = $response->withJson( $retorno  ,200); 
      }
      else
      {
        $retorno=array('Reserva' => "false" );
        $newResponse = $response->withJson( $retorno  ,200); 
      }
  }
  else
  {
    $retorno=array('error' => "Falta el dato del cliente" );
    $newResponse = $response->withJson( $retorno  ,200); 
  }
  return $newResponse;

});
$app->post('/reservaEncargado/', function (Request $request, Response $response) {    

  $ArrayDeParametros = $request->getParsedBody();

  $idReserva=$ArrayDeParametros["fecha"];/*
  $retorno=array('error' => $cliente );
  $newResponse = $response->withJson( $retorno  ,200);
  return $newResponse;*/
  $band=Reservas::TraerReservasEncargado($idReserva);
  if($band != null || $band != "")
  {
    $retorno=array('Reserva' => $band );
    $newResponse = $response->withJson( $retorno  ,200); 
  }
  else
  {
    $retorno=array('Reserva' => "false" );
    $newResponse = $response->withJson( $retorno  ,200); 
  }
  return $newResponse;

});
$app->post('/fechaReservaCliente/', function (Request $request, Response $response) {    

  $ArrayDeParametros = $request->getParsedBody();

  $cliente=$ArrayDeParametros["cliente"];/*
  $retorno=array('error' => $cliente );
  $newResponse = $response->withJson( $retorno  ,200);
  return $newResponse;*/
  if( isset($cliente) )
  {
      $band=Reservas::TraerFechasReservasCliente($cliente);
      if($band != null || $band != "")
      {
        $retorno=array('FECHA' => $band );
        $newResponse = $response->withJson( $retorno  ,200); 
      }
      else
      {
        $retorno=array('FECHA' => "false" );
        $newResponse = $response->withJson( $retorno  ,200); 
      }
  }
  else
  {
    $retorno=array('error' => "Falta el dato del cliente" );
    $newResponse = $response->withJson( $retorno  ,200); 
  }
  return $newResponse;

});
$app->post('/eliminarInvitado/', function (Request $request, Response $response) {    

  $ArrayDeParametros = $request->getParsedBody();

  $invitado=$ArrayDeParametros["invitado"];/*
  $retorno=array('error' => $cliente );
  $newResponse = $response->withJson( $retorno  ,200);
  return $newResponse;*/
  if( isset($invitado) )
  {
      $band=Reservas::EliminarInvitado($invitado);
      if($band != true )
      {
        $retorno=array('Eliminado' => $band );
        $newResponse = $response->withJson( $retorno  ,200); 
      }
      else
      {
        $retorno=array('Eliminado' => $band );
        $newResponse = $response->withJson( $retorno  ,200); 
      }
  }
  else
  {
    $retorno=array('error' => "Falta el id del invitado" );
    $newResponse = $response->withJson( $retorno  ,200); 
  }
  return $newResponse;

});
$app->post('/modificarInvitado/', function (Request $request, Response $response) {    

  $ArrayDeParametros = $request->getParsedBody();

  $id=$ArrayDeParametros["id"];
  $invitado=$ArrayDeParametros["invitado"];
  $mesa=$ArrayDeParametros["mesa"];
  /*
  $retorno=array('error' => $ArrayDeParametros );
  $newResponse = $response->withJson( $retorno  ,200);
  return $newResponse;*/

  if( isset($id) )
  {
      $band=Reservas::ModificarInvitado($id,$invitado,$mesa);
      if($band != true )
      {
        $retorno=array('Modificado' => $band );
        $newResponse = $response->withJson( $retorno  ,200); 
      }
      else
      {
        $retorno=array('Modificado' => $band );
        $newResponse = $response->withJson( $retorno  ,200); 
      }
  }
  else
  {
    $retorno=array('error' => "Falta el id del invitado" );
    $newResponse = $response->withJson( $retorno  ,200); 
  }
  return $newResponse;

});
$app->post('/agregarInvitado/', function (Request $request, Response $response) {    

  $ArrayDeParametros = $request->getParsedBody();

  $invitado=$ArrayDeParametros["invitado"];
  $mesa=$ArrayDeParametros["mesa"];
  $idReserva=$ArrayDeParametros["idReserva"];/*
  $retorno=array('error' => $cliente );
  $newResponse = $response->withJson( $retorno  ,200);
  return $newResponse;*/
  if(  isset($invitado) && isset($mesa) && isset($idReserva) )
  {
      $band=Reservas::AgregarUnInvitado($invitado,$mesa,$idReserva);
      if($band > 0 )
      {
        $retorno=array('Agregado' => "true" );
        $newResponse = $response->withJson( $retorno  ,200); 
      }
      else
      {
        $retorno=array('Agregado' => "false" );
        $newResponse = $response->withJson( $retorno  ,200); 
      }
  }
  else
  {
    $retorno=array('error' => "Falta datos del invitado" );
    $newResponse = $response->withJson( $retorno  ,200); 
  }
  return $newResponse;

});
$app->delete('/eliminarReserva/', function (Request $request, Response $response) {
  $ArrayDeParametros = $request->getParsedBody();

  $idReserva=$ArrayDeParametros["idReserva"];
  /*$retorno=array('ID' => $idReserva);
  $newResponse = $response->withJson( $retorno  ,200);
  return $newResponse;*/

  if( isset($idReserva) )
  {
      $band=Reservas::EliminarReserva($idReserva);
      if($band)
      {/*
        $verificar=VerificarSiHayInvitadosEnLaReserva($idReserva);
        if($verificar !=null || $verificar !="")
        {
          Reservas::EliminarInvitadosDeLaReserva($idReserva);
        }*/
        $retorno=array('Eliminada' => "true" );
        $newResponse = $response->withJson( $retorno  ,200); 
      }
      else
      {
        $retorno=array('Eliminada' => "false" );
        $newResponse = $response->withJson( $retorno  ,200); 
      }
  }
  else
  {
    $retorno=array('error' => "Falta datos de la reserva" );
    $newResponse = $response->withJson( $retorno  ,200); 
  }
  return $newResponse;

});
$app->post('/tipoUsuario/', function (Request $request, Response $response) {    

  $ArrayDeParametros = $request->getParsedBody();

  $usuario=$ArrayDeParametros["usuario"];/*
  $retorno=array('error' => $cliente );
  $newResponse = $response->withJson( $retorno  ,200);
  return $newResponse;*/
  if(  isset($usuario) )
  {
      $band=usuario::TipoDeUsuario($usuario);
      if($band > 0 )
      {
        $retorno=array('Agregado' => "true" );
        $newResponse = $response->withJson( $retorno  ,200); 
      }
      else
      {
        $retorno=array('Agregado' => "false" );
        $newResponse = $response->withJson( $retorno  ,200); 
      }
  }
  else
  {
    $retorno=array('error' => "Falta datos del invitado" );
    $newResponse = $response->withJson( $retorno  ,200); 
  }
  return $newResponse;

});
$app->post('/guardarEncuesta/', function (Request $request, Response $response) {    

  $ArrayDeParametros = $request->getParsedBody();

  $numero=$ArrayDeParametros["numero"];
  /*
  $retorno=array('error' => $numero );
  $newResponse = $response->withJson( $retorno  ,200);
  return $newResponse;*/

  $verificar=Encuestas::verificarEncuesta($numero);
  /*
  $newResponse = $response->withJson( $verificar  ,200);
  return $newResponse;
  */
  if($verificar=="invalido")
  {
    $retorno=array('Agregado' => "Numero invalido" );
    $newResponse = $response->withJson( $retorno  ,200);
    return $newResponse;
  }
  else
  {
    if($verificar=="realizada")
    {
      $retorno=array('Agregado' => "Encuesta de satisfacción realizada a este evento" );
      $newResponse = $response->withJson( $retorno  ,200);
      return $newResponse;
    }
  }

  /*
  $retorno=array('error' => $ArrayDeParametros );
  $newResponse = $response->withJson( $retorno  ,200);
  return $newResponse;*/

  if(  isset($ArrayDeParametros) )
  {
      $band=Encuestas::guardarEncuesta($ArrayDeParametros);
      if($band == true )
      {
        $retorno=array('Agregado' => "true" );
        $newResponse = $response->withJson( $retorno  ,200); 
      }
      else
      {
        $retorno=array('Agregado' => "false" );
        $newResponse = $response->withJson( $retorno  ,200); 
      }
  }
  else
  {
    $retorno=array('error' => "Falta datos del invitado" );
    $newResponse = $response->withJson( $retorno  ,200); 
  }
  return $newResponse;

});
$app->get('/leerEncuestas/', function (Request $request, Response $response,$arg) {    
    
  $band=Encuestas::leerEncuestas();
      if($band != null || $band != "")
      {
        $retorno=array('FECHA' => $band );
        $newResponse = $response->withJson( $retorno  ,200); 
      }
      else
      {
        $retorno=array('FECHA' => "false" );
        $newResponse = $response->withJson( $retorno  ,200); 
      }
 
  return $newResponse;
});
$app->get('/traerTodasLasReservas/', function (Request $request, Response $response,$arg) {    
    
  $band=Reservas::TraerFechasReservas();
      if($band != null || $band != "")
      {
        $retorno=array('FECHA' => $band );
        $newResponse = $response->withJson( $retorno  ,200); 
      }
      else
      {
        $retorno=array('FECHA' => "false" );
        $newResponse = $response->withJson( $retorno  ,200); 
      }
 
  return $newResponse;
});
$app->post('/numeroFiesta/', function (Request $request, Response $response) {    

  $ArrayDeParametros = $request->getParsedBody();

  $numero=$ArrayDeParametros["numero"];
  /*
  $retorno=array('error' => $numero );
  $newResponse = $response->withJson( $retorno  ,200);
  return $newResponse;*/

  if(  isset($numero) )
  {
      $band=Reservas::TraerLocal($numero);
      if($band !="" || $band != null)
      {
        $retorno=array('Local' => $band );
        $newResponse = $response->withJson( $retorno  ,200); 
      }
      else
      {
        $retorno=array('Local' => "Numero invalido" );
        $newResponse = $response->withJson( $retorno  ,200); 
      }
  }
  else
  {
    $retorno=array('error' => "Falta dato" );
    $newResponse = $response->withJson( $retorno  ,200); 
  }
  return $newResponse;

});




















/*
$app->add(function ($req, $res, $next) {
    $response = $next($req, $res);
    return $response
            ->withHeader('Access-Control-Allow-Origin', 'http://localhost:4200')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});*/
$app->run();