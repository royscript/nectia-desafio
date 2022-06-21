const router = require('express').Router();
const NegociacionSolicitud = require('../modelo/NegociacionSolicitud');
const RouterRespuestas = require('../utils/RouterRerspuestas');
const negociacion = new NegociacionSolicitud();

router.post("/listar-negociaciones-del-usuario",(req, res)=>{
    const { body } = req;
    const { idsolicitud }= body;
    RouterRespuestas(
                    async ()=> await negociacion.listarNegociacionesDelUsuario(idsolicitud),
                    res
                    );
});

module.exports = router;