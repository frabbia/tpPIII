const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clienteSchema = new mongoose.Schema({
  firtname: String,
  lastname: String,
  email: String,
  domicilio:String,
  celular:String,
  documento:String,
  rol:String,
  area:String,
});

const clienteModel = mongoose.model("Cliente", clienteSchema);

module.exports = clienteModel;
