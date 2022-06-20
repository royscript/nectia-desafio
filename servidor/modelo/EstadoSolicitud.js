const mysql = require('../conexiones/conexionMysql');
class EstadoSolicitud extends mysql{
    constructor(){
        super();
    }

    listar(){
        return this.consulta("SELECT * FROM estadosolicitud");
    }
}
module.exports =  EstadoSolicitud;