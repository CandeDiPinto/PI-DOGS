const express = require("express");
const router = express.Router();
const { Dog, Temperament } = require("../../db.js");
const {
  getAllDogs,
  getDogsDb,
  getDogsApi,
} = require("../controllers/dogController.js");

router.get("/", async (req, res) => {
    const name = req.query.name;
    try{
    const todosLosPerros = await getAllDogs();
    if (name) {
      let dogName = await todosLosPerros.filter((e) =>
        e.name.toLowerCase().includes(name.toLowerCase())
      );
      dogName.length
        ? res.status(200).send(dogName)
        : res.status(404).send("No se encontro un perrito con ese nombre");
    } else {
      res.status(200).send(todosLosPerros);}
    }
    catch(error){res.status(400).send ("No manda nada")} 
  });

  router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const perrosId = await getAllDogs();
    if (id) {
      let dogId = await perrosId.filter((e) => e.id == id); // con == compara solamente si son parecidos
      dogId.length
        ? res.status(200).send(dogId)
        : res.status(404).send("No se encontró perrito con ese id");
    }
  });

  router.post("/", async (req, res) => {
    let {
      name,
      height_min,
      height_max,
      weight_min,
      weight_max,
      life_span,
      image,
      temperament,
    } = req.body;
    try {
      let newDog = await Dog.create({
        name,
        height_min,
        height_max,
        weight_min,
        weight_max,
        life_span,
        image,
      });
      temperament.split(", ").map(async (el) => {
        const findTemp = await Temperament.findOne({
          where: { name: el },
        });
        const f = await newDog.addTemperament(findTemp);
        console.log(f);
      });
      res.status(200).send(newDog);
    } catch {
      res.status(400).send("errorcito");
    }
  });

module.exports = router;