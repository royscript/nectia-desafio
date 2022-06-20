const router = require('express').Router();
const Perfil = require('../modelo/Perfil');
const RouterRespuestas = require('../utils/RouterRerspuestas');

const perfil = new Perfil();//
router.post("/listar",(req, res)=>{
    const { user } = req;
    RouterRespuestas(
                    async ()=> await perfil.listarPerfiles(),
                    res
                    );
});
module.exports = router;