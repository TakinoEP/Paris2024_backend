const { Disciplines } = require("../models");

const getAllDisciplines = async (req, resp) => {
  try {
    const [results] = await Disciplines.findManyWithAssets();
    const events = [];
    // on parcours results pour les réorganiser
    results.forEach((discipline) => {
      // si aucun royaume parcouru(1ere boucle) ou si l'id de l'royaume précédent est != du royaume parcouru (c'est pas le meme royaume)
      if (discipline.length === 0 || discipline.id !== discipline[discipline.length - 1].id) {
        // on recrée un objet avec les propriétés qu'on veut récupérer
        const disciplineWithAssets = {
          id: discipline.id,
          discipline_name: discipline.discipline_name,
          description: discipline.description,
          assets: [{ source: discipline.source, type: discipline.asset_type }],
        };
        // on envoie ce nouvel objet dans notre tableau à chaque boucle
        disciplines.push(disciplineWithAssets);
      } else {
        // si le royaume a déjà été parcouru on ajoute l'asset à la propriété asset précédente (le cas ou le royaume a plusieurs assets)
        disciplines[disciplines.length - 1].assets.push({ source: discipline.source, type: discipline.asset_type });
      }
    });
    resp.json(disciplines);
  } catch (err) {
    resp.status(500).send(err.message);
  }
};

const getDisciplineByName = async (req, resp) => {
  const { discipline_name } = req.params;
  try {
    const [results] = await Disciplines.findDisciplineByName(discipline_name);
    const disciplines = [];
    // on parcours results pour les réorganiser
    results.forEach((discipline) => {
      // si aucun royaume parcouru(1ere boucle) ou si l'id du royaume précédent est != du royaume parcouru (c'est pas le meme royaume)
      if (disciplines.length === 0 || discipline.id !== disciplines[disciplines.length - 1].id) {
        // on recrée un objet avec les propriétés qu'on veut récupérer
        const disciplineWithAssets = {
          id: discipline.id,
          discipline_name: discipline.discipline_name,
          description: discipline.description,
          assets: [{ source: discipline.source, type: discipline.asset_type }],
        };
        // on envoie ce nouvel objet dans notre tableau à chaque boucle
        disciplines.push(disciplineWithAssets);
      } else {
        // si le royaume a déjà été parcouru on ajoute l'asset à la propriété asset précédente (le cas ou le royaume a plusieurs assets)
        disciplines[disciplines.length - 1].assets.push({ source: discipline.source, type: discipline.asset_type });
      }
    });
    resp.json(disciplines);
  } catch (err) {
    resp.status(500).send(err.message);
  }
};

const getOneDisciplineById = async (req, resp) => {
  const id = req.params.id ? req.params.id : req.disciplines_id;
  const statusCode = req.method === "POST" ? 201 : 200;

  let disciplinesResult;

  try {
    [disciplinesResult] = await Disciplines.findOneDisciplineById(id);
    console.log(disciplinesResult);
  } catch (err) {
    resp.status(500).send(err.message);
  }
  try {
    [disciplinesResult] = await Disciplines.findAssetsByDisciplineId(id);
    console.log(assetsResult);
  } catch (err) {
    resp.status(500).send(err.message);
  }
  if (disciplinesResult.length === 0) {
    resp.status(404).send(`Discipline avec l'id ${id} non trouvé`);
  } else if (assetsResult.length === 0) {
    resp.status(statusCode).json(disciplinesResult[0]);
  } else {
    royaumesResult[0].assets = assetsResult;
    resp.status(statusCode).json(disciplinesResult[0]);
  }
};

const getAssetsByDisciplineId = async (req, resp) => {
  const { id } = req.params;
  try {
    const [results] = await Disciplines.findImagesByDisciplineId(id);
    resp.json(results);
  } catch (err) {
    resp.status(500).send(err.message);
  }
};

const createOneDiscipline = async (req, res, next) => {
  const { discipline_name, description } = req.body;
  console.log(req.body);
  if (discipline_name) {
    try {
      const [result] = await Disciplines.createOne({ discipline_name, description });
      req.disciplines_id = result.insertId;
      console.log(req.disciplines_id);
      next();
    } catch (err) {
      console.log(err.message);
      res.status(500).send(err.message);
    }
  } else {
    res.status(500).send("Le nom de la dicipline est manquante");
  }
};

const deleteOneDiscipline = async (req, res) => {
  const disciplines_id = req.params.id;
  try {
    const [result] = await Disciplines.deleteOneById(disciplines_id);
    if (result.affectedRows === 0) {
      res.status(404).send(`Discipline avec la discipline_id ${disciplines_id} non trouvé`);
    } else {
      res.status(200).send(`Discipline ${disciplines_id} supprimé`);
    }
  } catch (err) {
    res.status(500).send(`Erreur lors de la suppression de la discipline`);
  }
};

const updateOneDisciplineById = async (req, resp, next) => {
  const { id } = req.params;
  const { discipline_name, description } = req.body;
  const newDiscipline = {};
  if (royaume_name) {
    newDiscipline.discipline_name = discipline_name;
  }
  if (description) {
    newDiscipline.description = description;
  }
  try {
    await Disciplines.updateOne(newDiscipline, parseInt(id, 10));
    next();
  } catch (err) {
    resp.status(500).send(err.message);
  }
};

module.exports = {
  getAllDisciplines,
  getOneDisciplineById,
  createOneDiscipline,
  deleteOneDiscipline,
  updateOneDisciplineById,
  getAssetsByDisciplineId,
  getDisciplineByName,
};
