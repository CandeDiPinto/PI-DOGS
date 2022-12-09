const { Router } = require("express"); 
const router = Router(); 
const { Temperament } = require("../../db"); 
const { getDogsApi } = require("../controllers/dogController.js"); 

//__________RUTAS_____________//

// GET /temperaments:

//traerlos y guardarlos en mi base de Datos

const getTemperaments = async () => {
  //traigo el array de la api [ {}, {}, {}]

  const dogsApiT = await getDogsApi();
  //crear nuevoArray vacio[]
  let nuevoArray = [];
  //recorrer el array con un map y
  //por cada elemento -> nuevoArray.push(elemento.temperament) -> [string1, string2]
  let nuevoArrayPush = await dogsApiT.map((e) => {
    nuevoArray.push(e.temperament);
    //por cada string hacer un e.split(' ')  -> [s,p,t,r,i,n,g]
  });
  //creo un array para guardar los temperamentos dividiendo la cadena con el .Split
  //le aplicamos el split y luego guardamos en el array cada elemento
  let arrayTemps = [];
  nuevoArray.forEach((element) => {
    if (element) {
      let elementoSplit = element.split(", ");
      for (let i = 0; i < elementoSplit.length; i++) {
        arrayTemps.push(elementoSplit[i]);
      }
    }

  });

  //elimino los duplicados mediante un Set
  const setTemps = new Set(arrayTemps);
  const setResult = [...setTemps];
  return setResult;
};

//_______________RUTA_______________________________

router.get("/", async (req, res) => {
  const temp = await Temperament.findAll()
if (!temp.length) {
  const dogsTemperaments = await getTemperaments();
  //tengo que esperar a que se resuelvan todas las promesas

  await Promise.all(
    dogsTemperaments.map(async (e) => {
      await Temperament.create({ name: e });
    })
  );
  const tempsCreated = await Temperament.findAll();
  return res.send(tempsCreated);
}
return res.send(temp)
  //else return res.status(404).send("nada");
});

module.exports = router;