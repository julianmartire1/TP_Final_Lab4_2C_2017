<?php
class usuario
{
	 public static function esValido($usuario, $clave) {
	  
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT * FROM `cliente` WHERE usuario='$usuario' and clave='$clave'");
		$consulta->execute();	
		return $consulta->fetchObject('cd');		
      
	}
	
	public static function verificarPerfil($usuario)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT tipo FROM `cliente` WHERE usuario='$usuario'");
		$consulta->execute();	
		$array= $consulta->fetchall(PDO::FETCH_ASSOC);
		return $array[0]["tipo"];
	}

	public static function registrarCliente($usuario,$clave,$tipo)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into cliente (usuario,clave,tipo) values ('$usuario','$clave','$tipo')");
		$consulta->execute();
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	}
    public static function TraerTodos() {
      
	    $uno= new stdClass();
	    $uno->nombre="jose";
	    $uno->apellido="perez";
	    $dos= new stdClass();
	    $dos->nombre="maria";
	    $dos->apellido="sosa";
	    $tres= new stdClass();
	    $tres->nombre="pablo";
	    $tres->apellido="agua";

	    $retorno=array($uno,$dos,$tres);

     	return $retorno;
      
    }

}
?>