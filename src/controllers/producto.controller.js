import { Op } from "sequelize";
import models from "./../models";

export default {
  listar: async (req, res) => {
    try {
      const q = req.query.q;
      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit);

      const offset = (page - 1) * limit;

      const productos = await models.Producto.findAndCountAll({
        where: {
          nombre: {
            [Op.like]: `%${q}%`,
          },
        },
        include: [models.Categoria],
        offset: offset,
        limit: limit,
      });

      return res.status(200).json(productos);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  guardar: async (req, res) => {
    try {
      const datos = req.body;
      const producto = await models.Producto.create(datos);
      if (producto.id) {
        return res.status(201).json({ message: "Producto Registrado" });
      }
    } catch (error) {
      return res.status(422).json({ message: error.message });
    }
  },
  mostrar: (req, res) => {},
  modificar: async (req, res) => {
    try {
      const id = req.params.id;
      const datos = req.body;

      const producto = await models.Producto.findByPk(id);
      if (producto) {
        await models.Producto.update(datos, {
          where: {
            id: producto.id,
          },
        });

        if (producto.id) {
          return res.status(201).json({ message: "Producto Actualizado" });
        }
      }
    } catch (error) {
      return res.status(422).json({ message: error.message });
    }
  },
  eliminar: (req, res) => {},
  actualizarImagen: async (req, res) => {
    const id = req.params.id;

    let datos = {};

    if (req.file) {
      datos.imagen = "imagenes/" + req.file.filename;
    }

    await models.Producto.update(datos, { where: { id } });

    return res.status(200).json({ message: "Imagen Actualizada" });
  },
};
