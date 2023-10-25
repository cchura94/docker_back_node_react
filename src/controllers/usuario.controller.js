

module.exports = {
    funListar(req, res){
        res.json({mensaje: "Lista de usuarios"});
    },
    funGuardar(req, res){
        res.json({mensaje: "Guardando usuario"});
    },
    funMostrar(req, res){
        res.json({mensaje: "mostrar usuario"});
    },
    funModificar(req, res){
        res.json({mensaje: "Modificando usuario"});
    },
    funEliminar(req, res){
        res.json({mensaje: "Eliminado usuario"});
    },
}
