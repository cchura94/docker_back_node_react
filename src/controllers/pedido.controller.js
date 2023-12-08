import { Op } from "sequelize";
import models from "./../models";

export default {
  listar: async (req, res) => {
    try {
      const q = req.query.q;
      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit);

      const offset = (page - 1) * limit;

      const pedidos = await models.Pedido.findAndCountAll({
        include: [models.Cliente, models.Producto],
        offset: offset,
        limit: limit,
      });

      return res.status(200).json(pedidos);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  guardar: async (req, res) => {
    /*
    {
        clienteId: 10,
        productos: [
            {productoId: 3, cantidad: 1},
            {productoId: 7, cantidad: 3}
        ]
    }
    */
   try {
    const {clienteId, productos} = req.body;

    const fecha = new Date();

    // nuewvo pedido
    const pedido = await models.Pedido.create({fecha: fecha, estado: 1, clienteId: clienteId});

    // asignar productos al pedido
    productos.forEach(async obj => {

      const producto = await models.Producto.findOne({where: {id: obj.productoId} })
      console.log(producto);
      pedido.addProducto(producto, {through: {cantidad: obj.cantidad}})

    });

    // respuesta
    return res.status(201).json({message: "Pedido Registrado", pedido: pedido})

   } catch (error) {
    return res.status(500).json({message: "Error al registrar el pedido", error: error});    
   }
  },

  buscarCliente: async (req, res) => {
    const q = req.query.q;

    const cliente = await models.Cliente.findAll({
      where: {
        ci_nit: {
          [Op.like]: `%${q}%`,
        },
      }
    });

    return res.status(200).json({cliente: cliente});
  },

  pedidoNuevoCliente: async (req, res) => {
    const {nombre_completo, ci_nit, telefono} = req.body;

    // nuewvo pedido
    const cliente = await models.Cliente.create({nombre_completo, ci_nit, telefono});

    // respuesta
    return res.status(201).json({message: "Pedido Registrado", cliente: cliente})
  }
}