const express = require("express");
const clienteService = require("./cliente.service");

const router = express.Router();

// GET /api/cliente
router.get("/api/cliente", async (req, res) => {
  // #swagger.tags = ['Cliente']
  try {
    params = JSON.parse(req.headers['params'])

    let paginated = await clienteService.paginated(params)
    return res.status(200).send(paginated);

  } catch (error) {
    console.log(error)
    return res.status(500).send(error);
  }
});

// GET /api/cliente/:id
router.get("/api/cliente/:id",  async (req, res) => {
  // #swagger.tags = ['Cliente']
  try {
    const clienteId = req.params.id;
    const cliente = await clienteService.findOneById(clienteId);
    return res.status(200).send(cliente);

  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

// POST /api/cliente
router.post("/api/cliente", async (req, res) => {
  // #swagger.tags = ['Cliente']
  try {
    const newCliente = req.body;
    console.log(newCliente);
    const cliente = await clienteService.save(newCliente);
    return res.status(201).send(cliente);

  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

// PUT /api/cliente/:id
router.put("/api/cliente/:id",  async (req, res) => {
  // #swagger.tags = ['Cliente']
  try {
    const clienteId = req.params.id;
    const updatedCliente = req.body;
    const cliente = await clienteService.update(clienteId, updatedCliente);
    return res.status(200).send(cliente);

  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

// DELETE /api/cliente/:id
router.delete("/api/cliente/:id", async (req, res) => {
  // #swagger.tags = ['Cliente']
  try {
    const clienteId = req.params.id;
    await clienteService.remove(clienteId);
    return res.status(200).send("Cliente eliminado correctamente.");

  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

module.exports = router;