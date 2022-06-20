const router = require('express').Router();
const EstadoSolicitud = require('../modelo/EstadoSolicitud');
const RouterRespuestas = require('../utils/RouterRerspuestas');
const estadoSolicitud = new EstadoSolicitud();

router.post("/listar",(req, res)=>{
    RouterRespuestas(
                    async ()=> await estadoSolicitud.listar(),
                    res
                    );
});
module.exports = router;