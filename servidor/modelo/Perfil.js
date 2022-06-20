const mysql = require('../conexiones/conexionMysql');
class Perfil extends mysql{
    constructor(){
        super();
    }

    perfilDelUsuario(idusuario){
        const sql = `SELECT  PER_USU.*, PERM_USU.*, P.*
                    FROM usuario U
                    INNER JOIN perfilusuario PER_USU 
                    ON(PER_USU.idperfilusuario=U.idperfilusuario)
                    INNER JOIN permisosdelusuario PERM_USU
                    ON(PERM_USU.idperfilusuario=U.idperfilusuario)
                    INNER JOIN permiso P
                    ON(PERM_USU.idpermiso=P.idpermiso)
                    where U.idusuario = (?)` ;
        return this.consulta(sql,[idusuario]);
    }

    listarPerfiles(){
        const sql = `SELECT * FROM perfilusuario` ;
        return this.consulta(sql);
    }
}
module.exports =  Perfil;