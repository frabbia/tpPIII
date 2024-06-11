const clienteModel = require("../../models/cliente");
const pager = require("../../utils/pager");

async function createIfNotExists(decoded, response) {
  let cliente = await findOne(decoded.email);
  if (!cliente) {
    cliente = { firtname: decoded.given_name, lastname: decoded.family_name, email: decoded.email };
    await save(cliente);
  }
  return cliente;
}

async function findOneById(_id) {
  return await clienteModel.findById(_id).populate('user').exec(); // Populamos el usuario asociado
}

async function findOne(email) {
  return await clienteModel.findOne({ email: email }).exec();
}

async function save(cliente) {
  let _cliente = new clienteModel(cliente);
  return await _cliente.save();
}

async function paginated(params) {
  let perPage = params.perPage ? params.perPage : 10,
    page = Math.max(0, params.page);
  let filter = params.filter ? params.filter : {};
  let sort = params.sort ? params.sort : {};

  try {
    let count = await clienteModel.countDocuments(filter);
    let data = await clienteModel.find(filter)
      .limit(perPage)
      .skip(perPage * page)
      .sort(sort)
      .populate('user') // Poblar el usuario asociado
      .exec();

    return pager.createPager(page, data, count, perPage);
  } catch (err) {
    console.error(err);
    throw err;
  }
}

async function update(id, updatedCliente) {
  return await clienteModel.findByIdAndUpdate(id, updatedCliente, { new: true }).exec();
}

async function remove(id) {
  return await clienteModel.findOneAndDelete({ _id: id }).exec();
}

module.exports = { createIfNotExists, findOneById, findOne, save, paginated, update, remove };
