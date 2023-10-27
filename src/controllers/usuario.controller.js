import models from "./../models/index";

import bcrypt from 'bcrypt'

module.exports = {
  async funListar(req, res) {
    try {
      const usuarios = await models.User.findAll({
        attributes: ["id", "username", "email"],
      });

      return res.status(200).json(usuarios);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  async funGuardar(req, res) {
    try {
      let datos = req.body;
      datos.password = await bcrypt.hash(datos.password, 12);

      const user = await models.User.create(datos);

      if (user.id) {
        return res.status(201).json({ message: "Usuario Registrado" });
      }
      return res.status(200).json(datos);
    } catch (error) {
      return res.status(422).json(error.message);
    }
  },
  async funMostrar(req, res) {
    const id = req.params.id;
    const user = await models.User.findByPk(id);
    if (user === null) {
      return res.status(404).json({ message: "Usuario no existe" });
    }
    return res.status(200).json(user);
  },
  async funModificar(req, res) {
    const id = req.params.id;
    const datos = req.body;

    const user = await models.User.findByPk(id);
    if (user) {
      await models.User.update(datos, {
        where: {
          id: user.id,
        },
      });
      return res.status(200).json({ mensaje: "usuario Modificado" });
    }

    return res.status(404).json({ message: "Usuario no existe" });
  },
  funEliminar(req, res) {
    res.json({ mensaje: "Eliminado usuario" });
  },
};
