const mongoose = require("mongoose");

const clienteSchema = new mongoose.Schema({
  localidad: String,
  codigo_postal: String,
  producto: String,
  tipo_cliente: String,
  user: { type: String, ref: 'User' } // Referencia al modelo User por su nombre como string
});

const clienteModel = mongoose.model("Cliente", clienteSchema);

module.exports = clienteModel;
