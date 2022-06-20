const mysql = require('../conexiones/conexionMysql');
class Usuarios extends mysql{
    constructor(){
        super();
    }

    listar(){
        return this.consulta("SELECT * FROM usuario");
    }

    async buscarPorRut(rutusuario){
        return await this.consulta("SELECT * FROM usuario WHERE rutusuario LIKE ? ",[rutusuario]);
    }

    login(rutusuario,contrasena){
        const sql = "SELECT * FROM usuario where md5(rutusuario) like (?) and md5(contrasenausuario) like (?) ";
        return this.consulta(sql,[rutusuario,contrasena]);
    }

    buscarPorId(idusuario){
        const sql = "SELECT * FROM usuario where idusuario = (?) ";
        return this.consulta(sql,[idusuario]);
    }

    async listarConFiltro(pagSiguiente, cantPorPag, search){
        var where = ''; 
        var parametrosBuscar = [];
        if(search){
            parametrosBuscar = ['%'+search+'%','%'+search+'%',search];
            where = ` WHERE nombreusuario LIKE ? OR apellidousuario LIKE ? OR rutusuario LIKE ? `;
            pagSiguiente = 1;//Cuando se realiza una busqueda comienza con la pagina 1
        }
        let resp = {
            datos : await this.consulta("SELECT * FROM usuario "+where+" ORDER BY idusuario DESC "+this.paginador(pagSiguiente, cantPorPag),parametrosBuscar),
            cantidad : await this.consulta("SELECT count(idusuario) as cantidad FROM usuario "+where+" ORDER BY idusuario DESC ",parametrosBuscar)
        }
        return resp;
    }
    insertar(nombreusuario,apellidousuario,emailusuario,rutusuario,contrasenausuario,idperfilusuario){
        const sql = "INSERT INTO usuario (nombreusuario, apellidousuario,"
                                            +"emailusuario, rutusuario,"
                                            +"contrasenausuario,idperfilusuario) "
                                            +"VALUES (?,?,?,?,?,?)";
        return this.consulta(sql,[nombreusuario,apellidousuario,emailusuario,rutusuario,contrasenausuario,idperfilusuario]);
    }
    editar(nombreusuario,apellidousuario,emailusuario,rutusuario,contrasenausuario,idusuario,idperfilusuario){
        const sql = "UPDATE usuario "
                                +"SET "
                                +"nombreusuario= ? "
                                +",apellidousuario= ? "
                                +",emailusuario= ? "
                                +",rutusuario= ? "
                                +",contrasenausuario= ? "
                                +",idperfilusuario= ?"
                    +" WHERE idusuario = ? ";
        return this.consulta(sql,[nombreusuario,apellidousuario,emailusuario,rutusuario,contrasenausuario,idperfilusuario,idusuario]);
    }
    async eliminar(idusuario){
        const sql = "DELETE FROM `usuario` WHERE `idusuario` = ? ";
        //console.log(sql, idProducto);
        var resp = await this.consulta(sql,[idusuario]);
        return resp;
    }
}
module.exports =  Usuarios;