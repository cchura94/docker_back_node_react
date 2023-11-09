import models from "./../models"

export default {
    listar: async (req, res) => {
        try {
            const categorias = await models.Categoria.findAll({
              attributes: ["id", "nombre", "detalle"],
            });
      
            return res.status(200).json(categorias);
          } catch (error) {
            return res.status(500).json(error);
          }
    },
    guardar: async (req, res) => {
        try {
            let datos = req.body;
      
            const categoria = await models.Categoria.create(datos);
      
            if (categoria.id) {
              return res.status(201).json({ message: "Categoria Registrada" });
            }
            return res.status(422).json({error: true, message: "Error al registrar la categoria"});
          } catch (error) {
            return res.status(422).json(error.message);
          }
    },
    mostrar: async (req, res) => {
        const id = req.params.id;
        const categoria = await models.Categoria.findByPk(id);
        if (categoria === null) {
          return res.status(404).json({ message: "Categortia no existe" });
        }
        return res.status(200).json(categoria);
    },
    modificar: async (req, res) => {
        const id = req.params.id;
        const datos = req.body;
    
        const categoria = await models.Categoria.findByPk(id);
        if (categoria) {
          await models.Categoria.update(datos, {
            where: {
              id: categoria.id,
            },
          });
          return res.status(200).json({ mensaje: "categoria Modificado" });
        }
    
        return res.status(404).json({ message: "Categoria no existe" });
    },
    eliminar: (req, res) => {

    }
}