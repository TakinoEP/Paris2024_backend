const { Cocorico } = require("../models");

const getAllCocorico = async (req, res) => {
  try {
    const [results] = await Cocorico.findManyCocorico();
    res.status(200).json(results);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getOneCocoricoById = async (req, res) => {
  const id = req.params.id ? req.params.id : req.id;
  const statusCode = req.method === "POST" ? 201 : 200;

  try {
    const [result] = await Cocorico.findOnePersonnageById(id);
    if (result.lengh === 0) {
      res.status(404).send(`Cocorico avec l'id ${id} non trouvé`);
    } else {
      res.status(statusCode).json(result[0]);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const validateDataCreateCocorico = async (req, res, next) => {
  const { name } = req.body;
  if (await Cocorico.cocoricoAlreadyExists(name)) {
    res.status(401).send(`Le cocorico "${name}" existe déjà`);
  } else {
    next();
  }
};

const updateOneCocoricoById = async (req, resp, next) => {
  const { id } = req.params;
  const { firstname, description, disciplines, assets_id } = req.body;

  if (!firstname && !description && !royaume && !assets_id) {
    resp.status(400).send("veuillez repmlir les champs obligatoires svp");
  } else {
    const newCocorico = {};

    if (firstname) {
      newCocorico.firstname = firstname;
    }
    if (description) {
      newCocorico.description = description;
    }
    if (royaume) {
      newCocorico.disciplines = disciplines;
    }
    if (assets_id) {
      newCocorico.assets_id = assets_id;
    }

    try {
      await Cocorico.updateOnePersonnage(newCocorico, id);
      next();
    } catch (err) {
      resp.status(500).send(err.message);
    }
  }
};

const createOneMoreCocorico = async (req, res, next) => {
  const { name, description, disciplines, assets_id } = req.body;
  const disciplineToCreate = { name, description, disciplines };

  if (assets_id) {
    disciplineToCreate.assets_id = assets_id;
  }

  if (!name) {
    res.status(400).send("veuillez repmlir les champs obligatoires svp");
  } else {
    try {
      const [result] = await Disciplines.createOnePersonnage(disciplineToCreate);
      req.id = result.insertId;
      next();
    } catch (err) {
      // console.log(err.message);
      res.status(500).send(err.message);
    }
  }
};

const deleteOneCocorico = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await Personnages.deleteOneCocoricoById(id);
    if (result.affectedRows === 0) {
      res.status(404).send(`Personnage ${id} non trouvé`);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    // console.log("delete", err.message);
    res.status(500).send(`erreur lors de la suppression du personnage : ${err.message}`);
  }
};

module.exports = {
  getAllCocorico,
  getOneCocoricoById,
  validateDataCreateCocorico,
  updateOneCocoricoById,
  createOneMoreCocorico,
  deleteOneCocorico,
};
