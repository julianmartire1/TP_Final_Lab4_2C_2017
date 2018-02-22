<?php


class Reservas
{
    public static function Reservar($cliente,$fecha,$local,$con,$mesas)
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT INTO `reservas`(`cliente`, `fecha`, `local`) values ('$cliente','$fecha','$local')");
        $consulta->execute();
        $idReserva=$objetoAccesoDato->RetornarUltimoIdInsertado();
        if($con==true)
            return Reservas::AgregarInvitados($mesas,$idReserva);
        return true;
    }

    public static function AgregarInvitados($mesa,$idReserva)
    {
        $mesa1=$mesa["mesa1"];
        $mesa2=$mesa["mesa2"];
        $mesa3=$mesa["mesa3"];
        $mesa4=$mesa["mesa4"];
        $mesa5=$mesa["mesa5"];
        $mesa6=$mesa["mesa6"];
        $mesa7=$mesa["mesa7"];
        $mesa8=$mesa["mesa8"];
        $mesa9=$mesa["mesa9"];
        $mesa10=$mesa["mesa10"];

        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
        $insert="INSERT INTO `invitados`(`idReserva`, `nombre`, `mesa`) values";
        
            for ($i=0; $i < count($mesa1); $i++) { 
                $invitado=$mesa1[$i]["invitado"];
                $insert=$insert."($idReserva,'$invitado','1')";
                if($i<count($mesa1)-1 || count($mesa2)>0 || count($mesa3)>0 || count($mesa4)>0 || count($mesa5)>0 || count($mesa6)>0 || count($mesa7)>0 || count($mesa8)>0 || count($mesa9)>0 || count($mesa10)>0)
                    $insert=$insert.",";
            }             
        
            for ($j=0; $j < count($mesa2); $j++) { 
                $invitado=$mesa2[$j]["invitado"];
                $insert=$insert."($idReserva,'$invitado','2')";
                if($j<count($mesa2)-1 || count($mesa3)>0 || count($mesa4)>0 || count($mesa5)>0 || count($mesa6)>0 || count($mesa7)>0 || count($mesa8)>0 || count($mesa9)>0 || count($mesa10)>0)
                    $insert=$insert.",";
            } 
        
            for ($a=0; $a < count($mesa3); $a++) { 
                $invitado=$mesa3[$a]["invitado"];
                $insert=$insert."($idReserva,'$invitado','3')";
                if($a<count($mesa3)-1 || count($mesa4)>0 || count($mesa5)>0 || count($mesa6)>0 || count($mesa7)>0 || count($mesa8)>0 || count($mesa9)>0 || count($mesa10)>0)
                    $insert=$insert.",";
            } 
        
            for ($b=0; $b < count($mesa4); $b++) { 
                $invitado=$mesa4[$b]["invitado"];
                $insert=$insert."($idReserva,'$invitado','4')";
                if($b<count($mesa4)-1 || count($mesa5)>0 || count($mesa6)>0 || count($mesa7)>0 || count($mesa8)>0 || count($mesa9)>0 || count($mesa10)>0)
                    $insert=$insert.",";
            } 
        
            for ($v=0; $v < count($mesa5); $v++) { 
                $invitado=$mesa5[$v]["invitado"];
                $insert=$insert."($idReserva,'$invitado','5')";
                if($v<count($mesa5)-1 || count($mesa6)>0 || count($mesa7)>0 || count($mesa8)>0 || count($mesa9)>0 || count($mesa10)>0)
                    $insert=$insert.",";
            } 
        
            for ($c=0; $c < count($mesa6); $c++) { 
                $invitado=$mesa6[$c]["invitado"];
                $insert=$insert."($idReserva,'$invitado','6')";
                if($c<count($mesa6)-1 || count($mesa7)>0 || count($mesa8)>0 || count($mesa9)>0 || count($mesa10)>0)
                    $insert=$insert.",";
            } 
        
            for ($k=0; $k < count($mesa7); $k++) { 
                $invitado=$mesa7[$k]["invitado"];
                $insert=$insert."($idReserva,'$invitado','7')";
                if($k<count($mesa7)-1 || count($mesa8)>0 || count($mesa9)>0 || count($mesa10)>0)
                    $insert=$insert.",";
            } 
        
            for ($q=0; $q < count($mesa8); $q++) { 
                $invitado=$mesa8[$q]["invitado"];
                $insert=$insert."($idReserva,'$invitado','8')";
                if($q<count($mesa8)-1 || count($mesa9)>0 || count($mesa10)>0)
                    $insert=$insert.",";
            } 
        
            for ($l=0; $l < count($mesa9); $l++) { 
                $invitado=$mesa9[$l]["invitado"];
                $insert=$insert."($idReserva,'$invitado','9')";
                if($l<count($mesa9)-1 || count($mesa10)>0)
                    $insert=$insert.",";
            } 
        
            for ($h=0; $h < count($mesa10); $h++) { 
                $invitado=$mesa10[$h]["invitado"];
                $insert=$insert."($idReserva,'$invitado','10')";
                if($h<count($mesa10)-1)
                    $insert=$insert.",";
            }
        
 //return $insert;
        $consulta =$objetoAccesoDato->RetornarConsulta($insert);
        $consulta->execute();
    }

    public static function TraerReservasCliente($cliente,$fecha)
    {
        //SELECT R.*, I.* FROM reservas as R , cliente as C , invitados as I WHERE C.usuario=R.cliente 
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        //$consulta =$objetoAccesoDato->RetornarConsulta("SELECT R.*, I.* FROM reservas as R , cliente as C , invitados as I WHERE C.usuario='$cliente' and R.idReserva=I.idReserva");
        //$consulta = $objetoAccesoDato->RetornarConsulta("SELECT R.fecha,R.local, I.nombre,I.mesa,I.idInvitado FROM reservas as R , cliente as C , invitados as I WHERE R.idReserva='$fecha' and R.cliente='$cliente' and R.idReserva=I.idReserva");
        $consulta = $objetoAccesoDato->RetornarConsulta("SELECT R.fecha,R.local, I.nombre,I.mesa,I.idInvitado FROM reservas as R , cliente as C , invitados as I WHERE R.cliente='$cliente' and R.idReserva=I.idReserva and R.idReserva='$fecha' and R.cliente=C.usuario");
        $consulta->execute();
        return $consulta->fetchall(PDO::FETCH_ASSOC);
    }

    public static function TraerReservasEncargado($idReserva)
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 

        $consulta = $objetoAccesoDato->RetornarConsulta("SELECT R.fecha,R.local, I.nombre,I.mesa,I.idInvitado FROM reservas as R, invitados as I WHERE R.idReserva=I.idReserva and R.idReserva='$idReserva'");
        $consulta->execute();
        return $consulta->fetchall(PDO::FETCH_ASSOC);
    }

    public static function TraerFechasReservasCliente($cliente)
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta = $objetoAccesoDato->RetornarConsulta("SELECT * FROM `reservas` WHERE cliente='$cliente'");
        $consulta->execute();
        return $consulta->fetchall(PDO::FETCH_ASSOC);
    }

    public static function TraerFechasReservas()
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta = $objetoAccesoDato->RetornarConsulta("SELECT * FROM `reservas` WHERE 1");
        $consulta->execute();
        return $consulta->fetchall(PDO::FETCH_ASSOC);
    }

    public static function EliminarInvitado($idInvitado)
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta = $objetoAccesoDato->RetornarConsulta("DELETE FROM `invitados` WHERE idInvitado='$idInvitado'");
        return $consulta->execute();
    }

    public static function AgregarUnInvitado($invitado,$mesa,$idReserva)
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta = $objetoAccesoDato->RetornarConsulta("INSERT INTO `invitados`(`idReserva`, `nombre`, `mesa`) values($idReserva,'$invitado','$mesa')");
        $consulta->execute();
        return $objetoAccesoDato->RetornarUltimoIdInsertado();
    }

    public static function VerificarDisponibilidadReserva($fecha,$local)
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta = $objetoAccesoDato->RetornarConsulta("SELECT * FROM `reservas` WHERE `fecha`='$fecha' and `local`='$local'");
        $consulta->execute();
        return $consulta->fetchall(PDO::FETCH_ASSOC);
    }

    public static function ModificarInvitado($id,$invitado,$mesa)
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta = $objetoAccesoDato->RetornarConsulta("UPDATE `invitados` SET `nombre`='$invitado',`mesa`=$mesa WHERE `idInvitado`=$id");
        return $consulta->execute();
    }

    public static function EliminarReserva($idReserva)
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta = $objetoAccesoDato->RetornarConsulta("DELETE FROM `reservas` WHERE `idReserva`=$idReserva");
        return $consulta->execute();
        
    }

    public static function VerificarSiHayInvitadosEnLaReserva($idReserva)
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta = $objetoAccesoDato->RetornarConsulta("SELECT * FROM `invitados` WHERE `idReserva`=$idReserva");
        return $consulta->fetchall(PDO::FETCH_ASSOC);
    }

    public static function EliminarInvitadosDeLaReserva($idReserva)
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta = $objetoAccesoDato->RetornarConsulta("DELETE FROM `invitados` WHERE `idReserva`=$idReserva");
        return $consulta->execute();
    }

    public static function TraerLocal($numero)
    {
        $objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta = $objetoAccesoDato->RetornarConsulta("SELECT `local` FROM `reservas` WHERE `idReserva`=$numero");
        $consulta->execute();
        return $consulta->fetchall(PDO::FETCH_ASSOC);
    }
}



?>