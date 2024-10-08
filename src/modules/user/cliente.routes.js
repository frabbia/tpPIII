const express = require('express');
const router = express.Router();
const clienteService = require('./cliente.service');

// GET /api/cliente
// router.get("/api/cliente", async (req, res) => {
//   // #swagger.tags = ['Cliente']
//   try {
//     // Obtener los parámetros desde la query string
//     const params = req.query; // Usar query params en lugar de headers

//     // Llama a tu servicio para obtener los datos paginados
//     let paginated = await clienteService.paginated(params);

//     // Enviar la respuesta en formato JSON
//     return res.status(200).json(paginated); // Asegúrate de enviar como JSON

//   } catch (error) {
//     console.log(error);
//     // Devuelve un mensaje de error estructurado
//     return res.status(500).json({ message: "Error interno del servidor", error });
//   }
// });


router.get("/api/cliente", async (req, res) => {
  // #swagger.tags = ['Cliente']
  try {
    const { page = 1, perPage = 10 } = req.query; // Obtener parámetros de la consulta
    const options = {
      page: parseInt(page), // Convertir a número
      limit: parseInt(perPage), // Convertir a número
    };

    // Suponiendo que estás utilizando un servicio para paginar las tareas
    let paginated = await clienteService.paginated(options);
    return res.status(200).send(paginated);

  } catch (error) {
    console.log(error);
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
