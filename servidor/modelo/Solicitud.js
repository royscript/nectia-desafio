const mysql = require('../conexiones/conexionMysql');
const NegociacionSolicitud = require('./NegociacionSolicitud');
const negociacion = new NegociacionSolicitud(); 
class Solicitud extends mysql{
    constructor(){
        super();
        //Claves Foraneas
        //idUsuario = fk_administrador
        //usu_idusuario = fk_solicitante
    }

    listar(){
        return this.consulta("SELECT * FROM solicitud");
    }

    buscarSolicitudDelUsuario(idsolicitud){
        return this.consulta("SELECT * FROM solicitud WHERE idsolicitud LIKE ? ",idsolicitud);
    }

    async buscarSolicitudesDelUsuario(pagSiguiente, cantPorPag, search, usu_idusuario, estadoSolicitudSeleccionada, fechaInicio, fechaFinal){
        var where = ' WHERE S.usu_idusuario = ? '; 
        var parametrosBuscar = [usu_idusuario];
        if(search){
            parametrosBuscar = ['%'+search+'%',usu_idusuario];
            where = ` WHERE idtiposolicitud LIKE ? AND usu_idusuario = ? `;
            pagSiguiente = 1;//Cuando se realiza una busqueda comienza con la pagina 1
        }
        if(estadoSolicitudSeleccionada!="" && estadoSolicitudSeleccionada!=null){
            parametrosBuscar = [...parametrosBuscar,parseInt(estadoSolicitudSeleccionada)]
            where += ` AND S.idestadosolicitud = ? `;
        }
        if(fechaInicio!="" && fechaInicio!=null){
            parametrosBuscar = [...parametrosBuscar,fechaInicio ]
            where += ` AND DATE_FORMAT(S.fechainiciosolicitud, "%d-%m-%Y") LIKE DATE_FORMAT(?, "%d-%m-%Y") `;
        }
        if(fechaFinal!="" && fechaFinal!=null){
            parametrosBuscar = [...parametrosBuscar,fechaFinal ]
            where += ` AND DATE_FORMAT(S.fechafinalsolicitud, "%d-%m-%Y") LIKE DATE_FORMAT(?, "%d-%m-%Y") `;
        }
        const select = `SELECT  S.*, CONCAT(ADMIN.nombreusuario," ",ADMIN.apellidousuario) AS nombresAdministrador, 
                            CONCAT(CLIENTE.nombreusuario," ",CLIENTE.apellidousuario) AS nombresCliente,
                            TS.nombretiposolicitud AS nombretiposolicitud,
                            ES.nombreestadosolicitud AS nombreestadosolicitud,
                            DATE_FORMAT(S.fechainiciosolicitud, "%d-%m-%Y") fechaInicio,
                            DATE_FORMAT(S.fechafinalsolicitud, "%d-%m-%Y") fechaFin `;
        const sql = ` 
                    FROM solicitud S
                    LEFT JOIN usuario ADMIN
                    ON(ADMIN.idusuario=S.idusuario)
                    INNER JOIN usuario CLIENTE
                    ON(CLIENTE.idusuario=S.usu_idusuario)
                    INNER JOIN tiposolicitud TS
                    ON(TS.idtiposolicitud=S.idtiposolicitud)
                    INNER JOIN estadosolicitud ES
                    ON(ES.idestadosolicitud=S.idestadosolicitud)
                    `;
        let resp = {
            datos : await this.consulta(select+sql+where+" ORDER BY idsolicitud DESC "+this.paginador(pagSiguiente, cantPorPag),parametrosBuscar),
            cantidad : await this.consulta("SELECT count(idsolicitud) as cantidad "+sql+" "+where+" ORDER BY idsolicitud DESC ",parametrosBuscar)
        }
        return resp;
    }

    async buscarSolicitudesDelAdministrador(pagSiguiente, cantPorPag, estadoSolicitudSeleccionada, fechaInicio, fechaFinal){
        var where = ' WHERE 1 = 1 '; 
        var parametrosBuscar = [];
        
        if(estadoSolicitudSeleccionada!="" && estadoSolicitudSeleccionada!=null){
            parametrosBuscar = [...parametrosBuscar,parseInt(estadoSolicitudSeleccionada)]
            where += ` AND S.idestadosolicitud = ? `;
        }
        if(fechaInicio!="" && fechaInicio!=null){
            parametrosBuscar = [...parametrosBuscar,fechaInicio ]
            where += ` AND DATE_FORMAT(S.fechainiciosolicitud, "%d-%m-%Y") LIKE DATE_FORMAT(?, "%d-%m-%Y") `;
        }
        if(fechaFinal!="" && fechaFinal!=null){
            parametrosBuscar = [...parametrosBuscar,fechaFinal ]
            where += ` AND DATE_FORMAT(S.fechafinalsolicitud, "%d-%m-%Y") LIKE DATE_FORMAT(?, "%d-%m-%Y") `;
        }
        const select = `SELECT  S.*, CONCAT(ADMIN.nombreusuario," ",ADMIN.apellidousuario) AS nombresAdministrador, 
                            CONCAT(CLIENTE.nombreusuario," ",CLIENTE.apellidousuario) AS nombresCliente,
                            TS.nombretiposolicitud AS nombretiposolicitud,
                            ES.nombreestadosolicitud AS nombreestadosolicitud,
                            DATE_FORMAT(S.fechainiciosolicitud, "%d-%m-%Y") fechaInicio,
                            DATE_FORMAT(S.fechafinalsolicitud, "%d-%m-%Y") fechaFin `;
        const sql = ` 
                    FROM solicitud S
                    LEFT JOIN usuario ADMIN
                    ON(ADMIN.idusuario=S.idusuario)
                    INNER JOIN usuario CLIENTE
                    ON(CLIENTE.idusuario=S.usu_idusuario)
                    INNER JOIN tiposolicitud TS
                    ON(TS.idtiposolicitud=S.idtiposolicitud)
                    INNER JOIN estadosolicitud ES
                    ON(ES.idestadosolicitud=S.idestadosolicitud)
                    `;
        let resp = {
            datos : await this.consulta(select+sql+where+" ORDER BY idsolicitud DESC "+this.paginador(pagSiguiente, cantPorPag),parametrosBuscar),
            cantidad : await this.consulta("SELECT count(idsolicitud) as cantidad "+sql+" "+where+" ORDER BY idsolicitud DESC ",parametrosBuscar)
        }
        return resp;
    }

    async listarConFiltro(pagSiguiente, cantPorPag, search){
        var where = ''; 
        var parametrosBuscar = [];
        if(search){
            parametrosBuscar = ['%'+search+'%','%'+search+'%',search];
            where = ` WHERE idtiposolicitud LIKE ? `;
            pagSiguiente = 1;//Cuando se realiza una busqueda comienza con la pagina 1
        }
        let resp = {
            datos : await this.consulta("SELECT * FROM solicitud "+where+" ORDER BY idsolicitud DESC "+this.paginador(pagSiguiente, cantPorPag),parametrosBuscar),
            cantidad : await this.consulta("SELECT count(idsolicitud) as cantidad FROM solicitud "+where+" ORDER BY idsolicitud DESC ",parametrosBuscar)
        }
        return resp;
    }
    async insertar(idtiposolicitud, idusuario, comentariosolicitantenegociacionsolicitud, fechainiciopropuesta, fechafinalpropuesta){
        const sql = "INSERT INTO solicitud (idtiposolicitud,idusuario,usu_idusuario,idestadosolicitud,fechasolicitud,fecharespuesta,fechainiciosolicitud,fechafinalsolicitud) "
                                            +"VALUES (?,NULL,?,3,NOW(),NULL,NOW(),NULL)";
        const resp = await this.consulta(sql,[idtiposolicitud, idusuario]);
        const idSolicitud = resp.insertId;
        negociacion.insertarNegociacionSolicitante(idSolicitud,comentariosolicitantenegociacionsolicitud, fechainiciopropuesta, fechafinalpropuesta);
    }
    async editar(idsolicitud,idusuario,idnegociacionsolicitud, idestadosolicitud, comentariorespuestanegociacionsolicitud, fechafinalcorregidanegociacionsolicitud, fechainiciocorregidanegociacionsolicitud){
        const sql = "UPDATE solicitud "
                                +"SET "
                                +"idusuario= ?"
                                +",idestadosolicitud= ?"
                                +",fecharespuesta = NOW()"
                                +",fechafinalsolicitud = NOW()"
                    +" WHERE idsolicitud  = ? ";
        await this.consulta(sql,[idusuario, idestadosolicitud, idsolicitud]);
        negociacion.responderAdministradorNegociacion(idnegociacionsolicitud, comentariorespuestanegociacionsolicitud, fechafinalcorregidanegociacionsolicitud, fechainiciocorregidanegociacionsolicitud);
    }
    async eliminar(idsolicitud ){
        const sql = "DELETE FROM `solicitud` WHERE `idsolicitud` = ? ";
        //console.log(sql, idProducto);
        var resp = await this.consulta(sql,[idsolicitud ]);
        return resp;
    }
}
module.exports =  Solicitud;