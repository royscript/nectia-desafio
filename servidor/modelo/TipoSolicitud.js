const mysql = require('../conexiones/conexionMysql');
class TipoSolicitud extends mysql{
    constructor(){
        super();
    }

    listarTodas(){
        return this.consulta("SELECT * FROM tiposolicitud");
    }

    buscarSolicitudConElMismoNombre(nombretiposolicitud){
        return this.consulta("SELECT * FROM tiposolicitud WHERE nombretiposolicitud LIKE ? ",nombretiposolicitud);
    }

    async listarConFiltro(pagSiguiente, cantPorPag, search){
        var where = ''; 
        var parametrosBuscar = [];
        if(search){
            parametrosBuscar = ['%'+search+'%','%'+search+'%',search];
            where = ` WHERE nombretiposolicitud LIKE ? `;
            pagSiguiente = 1;//Cuando se realiza una busqueda comienza con la pagina 1
        }
        let resp = {
            datos : await this.consulta("SELECT * FROM tiposolicitud "+where+" ORDER BY idtiposolicitud DESC "+this.paginador(pagSiguiente, cantPorPag),parametrosBuscar),
            cantidad : await this.consulta("SELECT count(idtiposolicitud) as cantidad FROM tiposolicitud "+where+" ORDER BY idtiposolicitud DESC ",parametrosBuscar)
        }
        return resp;
    }
    insertar(nombretiposolicitud){
        const sql = "INSERT INTO tiposolicitud (nombretiposolicitud) "
                                            +"VALUES (?)";
        return this.consulta(sql,[nombretiposolicitud]);
    }
    editar(nombretiposolicitud,idtiposolicitud){
        const sql = "UPDATE tiposolicitud "
                                +"SET "
                                +"nombretiposolicitud= ?"
                    +" WHERE idtiposolicitud  = ? ";
        return this.consulta(sql,[nombretiposolicitud,idtiposolicitud ]);
    }
    async eliminar(idtiposolicitud ){
        const sql = "DELETE FROM `tiposolicitud` WHERE `idtiposolicitud` = ? ";
        //console.log(sql, idProducto);
        var resp = await this.consulta(sql,[idtiposolicitud ]);
        return resp;
    }
}
module.exports =  TipoSolicitud;