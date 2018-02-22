<?php
require_once "Reservas.php";
class Encuestas
{
    public static function guardarEncuesta($encuesta)
    {
        $evento=$encuesta["evento"];
        $estacionamiento=$encuesta["estacionamiento"];
        $programa=$encuesta["programa"];
        $diversion=$encuesta["diversion"];
        $alimentos=$encuesta["alimentos"];
        $numeroReserva=$encuesta["numero"];
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT INTO `encuestas`(`evento`, `estacionamiento`, `programa`, `diversion`, `alimentos`,`idReserva`) VALUES
         ('$evento','$estacionamiento','$programa','$diversion','$alimentos','$numeroReserva')");
        return $consulta->execute();
    }
    public static function leerEncuestas()
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("SELECT `evento`, `estacionamiento`, `programa`, `diversion`, `alimentos`, `idReserva` FROM `encuestas` WHERE 1");
		$consulta->execute();	
		return $consulta->fetchall(PDO::FETCH_ASSOC);
    }

    public static function verificarEncuesta($numero)
    {
        $array=Reservas::TraerLocal($numero);
        //return $array;
        if($array==null || $array=="")
            return "invalido";
        
        $array2=Encuestas::leerEncuestas();
        foreach ($array2 as $item ) {
            if($item["idReserva"] == $numero)
                return "realizada";                
        }

        return "true";
    }
}


?>