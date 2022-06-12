const mysql = require('../conexiones/conexionMysql');
class Usuarios extends mysql{
    constructor(){
        super();
        this.usuariosOnline = [];
    }

    listar(){
        return this.consulta("SELECT * FROM usuario");
    }

    async buscarPorRut(rutUsuario){
        return await this.consulta("SELECT * FROM usuario WHERE rutUsuario LIKE ? ",[rutUsuario]);
    }

    login(rutUsuario,contrasena){
        const sql = "SELECT * FROM usuario where rutUsuario like (?) and contrasenaUsuario like (?) ";
        return this.consulta(sql,[rutUsuario,contrasena]);
    }

    async listarConFiltro(pagSiguiente, cantPorPag, search){
        var where = ''; 
        var parametrosBuscar = [];
        if(search){
            parametrosBuscar = ['%'+search+'%','%'+search+'%',search];
            where = ` WHERE nombreUsuario LIKE ? OR apellidoUsuario LIKE ? OR rutUsuario LIKE ? `;
            pagSiguiente = 1;//Cuando se realiza una busqueda comienza con la pagina 1
        }
        let resp = {
            datos : await this.consulta("SELECT * FROM usuario "+where+" "+this.paginador(pagSiguiente, cantPorPag),parametrosBuscar),
            cantidad : await this.consulta("SELECT count(idUsuario) as cantidad FROM usuario "+where+" ",parametrosBuscar)
        }
        return resp;
    }
    insertar(nombreUsuario,apellidoUsuario,emailUsuario,rutUsuario,contrasenaUsuario){
        const sql = "INSERT INTO usuario (nombreUsuario, apellidoUsuario,"
                                            +"emailUsuario, rutUsuario,"
                                            +"contrasenaUsuario) "
                                            +"VALUES (?,?,?,?,?,?,?,?)";
        return this.consulta(sql,[nombreUsuario,apellidoUsuario,emailUsuario,rutUsuario,contrasenaUsuario]);
    }
    editar(nombreUsuario,apellidoUsuario,emailUsuario,rutUsuario,contrasenaUsuario,idUsuario){
        const sql = "UPDATE usuario "
                                +"SET "
                                +"nombreUsuario= ? "
                                +",apellidoUsuario= ? "
                                +",emailUsuario= ? "
                                +",rutUsuario= ? "
                                +",contrasenaUsuario= ? "
                    +" WHERE idUsuario = ? ";
        return this.consulta(sql,[nombreUsuario,apellidoUsuario,emailUsuario,rutUsuario,contrasenaUsuario,idUsuario]);
    }
    async eliminar(idUsuario){
        const sql = "DELETE FROM `usuario` WHERE `idUsuario` = ? ";
        //console.log(sql, idProducto);
        var resp = await this.consulta(sql,[idUsuario]);
        return resp;
    }
}
module.exports =  Usuarios;