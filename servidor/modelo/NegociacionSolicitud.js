const mysql = require('../conexiones/conexionMysql');
class NegociacionSolicitud extends mysql{
    constructor(){
        super();
    }
    listarNegociacionesDelUsuario(idsolicitud){
        const sql =`SELECT DATE_FORMAT(fechainiciopropuestanegociacionsolicitud, "%d-%m-%Y") as fechainiciopropuestanegociacionsolicitud,
                    DATE_FORMAT(fechafinalpropuestanegociacionsolicitud, "%d-%m-%Y") as fechafinalpropuestanegociacionsolicitud,
                    idnegociacionsolicitud,
                    idsolicitud,
                    comentariosolicitantenegociacionsolicitud,
                    comentariorespuestanegociacionsolicitud,
                    fechainiciocorregidanegociacionsolicitud,
                    fechafinalcorregidanegociacionsolicitud
                    FROM negociacionsolicitud WHERE idsolicitud = ? ORDER BY idnegociacionsolicitud DESC`;
        return this.consulta(sql,[idsolicitud]); 
    }
    async insertarNegociacionSolicitante(idsolicitud, comentariosolicitante, fechaInicioPropuesta, fechaFinalPropuesta){
        const sql = `INSERT INTO negociacionsolicitud
                    (idsolicitud, comentariosolicitantenegociacionsolicitud, fechainiciopropuestanegociacionsolicitud, fechafinalpropuestanegociacionsolicitud) 
                    VALUES 
                    (?,?,?,?)` ;
        return await this.consulta(sql,[idsolicitud,comentariosolicitante, fechaInicioPropuesta, fechaFinalPropuesta]);
    }
    async insertarNegociacionAdministrador(idsolicitud, comentarioadministrador, fechaInicioCorregida, fechaFinalCorregida){
        const sql = `INSERT INTO negociacionsolicitud
                    (idsolicitud, comentariorespuestanegociacionsolicitud, fechainiciocorregidanegociacionsolicitud, fechafinalcorregidanegociacionsolicitud) 
                    VALUES 
                    (?,?,?,?)` ;
        return await this.consulta(sql,[idsolicitud,comentarioadministrador, fechaInicioCorregida, fechaFinalCorregida]);
    }
    async responderAdministradorNegociacion(idnegociacionsolicitud, comentariorespuestanegociacionsolicitud, fechafinalcorregidanegociacionsolicitud, fechainiciocorregidanegociacionsolicitud){
        const sql = `UPDATE negociacionsolicitud SET
                        comentariorespuestanegociacionsolicitud=?
                        ,fechainiciocorregidanegociacionsolicitud=?
                        ,fechafinalcorregidanegociacionsolicitud=?
                    WHERE idnegociacionsolicitud = ?`;
        return this.consulta(sql,[comentariorespuestanegociacionsolicitud,fechainiciocorregidanegociacionsolicitud,fechafinalcorregidanegociacionsolicitud,idnegociacionsolicitud]);
    }
}
module.exports =  NegociacionSolicitud;