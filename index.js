import express from 'express';
import bodyParser from 'body-parser';
import Database from './lib/db';

// Setup the server
const PORT = 3000;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setup the database
const db = new Database();
db.addCollection('cats', [
  { name: 'Fluffy', color: 'White', age: 3 },
  { name: 'Aslan', color: 'Gold', age: 11 },
  { name: 'Kitty', color: 'Grey', age: 1 },
]);

db.addCollection('dogs', [
  { name: 'Pluto', color: 'Beiege', age: 7 },
  { name: 'Rex', color: 'Gold', age: 4 },
  { name: 'Kex', color: 'Grey', age: 2 },
]);

db.addCollection('pokemons', [
  { name: 'Pikachu', color: 'Beiege', age: 7 },
  { name: 'Squirtle', color: 'Gold', age: 4 },
  { name: 'Slowpoke', color: 'Grey', age: 2 },
]);

// Setup the routes for cats

app.post('/animal/:animalType', (req, res) => {
  const { animalType } = req.params;
  if (!req.body.name) {
    console.log(req.body);
    return res.status(400).send({
      success: false,
      message: 'Name is required for animal',
    });
  }
  const newAnimalType = req.body;
  const newId = db[`${animalType}s`].push(newAnimalType);
  return res.status(201).send({
    success: true,
    message: `${animalType} added successfully`,
    id: newId,
  });
});

app.get('/animal/:animalType', (req, res) => {
  const { animalType } = req.params;
  return res.status(200).send({
    success: true,
    data: db[animalType].all(),
  });
});

app.get('/animal/:animalType/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const animalType = db.animalType.find({ id });
  if (animalType) {
    return res.status(200).send({
      success: true,
      data: animalType,
    });
  }
  return res.status(404).send({
    success: false,
    message: `${animalType} animal not found`,
  });
});

app.get('/animal/:animalType/:key/:value', (req, res) => {
  const { key, value } = req.params;
  const animalType = db.animalType.find({ [key]: value });
  if (animalType) {
    return res.status(200).send({
      success: true,
      data: animalType,
    });
  }
  return res.status(404).send({
    success: false,
    message: `${animalType} animal not found`,
  });
});
// // Setup the routes for dogs
// app.post('/dog', (req, res) => {
//   if (!req.body.name) {
//     console.log(req.body);
//     return res.status(400).send({
//       success: false,
//       message: 'Name is required for dog',
//     });
//   }
//   const newDog = req.body;
//   const newId = db.dogs.push(newDog);
//   return res.status(201).send({
//     success: true,
//     message: 'Dog added successfully',
//     id: newId,
//   });
// });

// app.get('/dogs', (req, res) => {
//   return res.status(200).send({
//     success: true,
//     data: db.dogs.all(),
//   });
// });

// app.get('/dog/:id', (req, res) => {
//   const id = parseInt(req.params.id, 10);
//   const dog = db.dogs.find({ id });
//   if (dog) {
//     return res.status(200).send({
//       success: true,
//       data: dog,
//     });
//   }
//   return res.status(404).send({
//     success: false,
//     message: 'Dog not found',
//   });
// });

// app.get('/dogSearch/:key/:value', (req, res) => {
//   const { key, value } = req.params;
//   const dog = db.dogs.find({ [key]: value });
//   if (dog) {
//     return res.status(200).send({
//       success: true,
//       data: dog,
//     });
//   }
//   return res.status(404).send({
//     success: false,
//     message: 'Dog not found',
//   });
// });
// // Setup the routes for pokemons
// app.post('/pokemon', (req, res) => {
//   if (!req.body.name) {
//     console.log(req.body);
//     return res.status(400).send({
//       success: false,
//       message: 'Name is required for pokemon',
//     });
//   }
//   const newPokemon = req.body;
//   const newId = db.pokemons.push(newPokemon);
//   return res.status(201).send({
//     success: true,
//     message: 'Pokemon added successfully',
//     id: newId,
//   });
// });

// app.get('/pokemons', (req, res) => {
//   return res.status(200).send({
//     success: true,
//     data: db.pokemons.all(),
//   });
// });

// app.get('/pokemon/:id', (req, res) => {
//   const id = parseInt(req.params.id, 10);
//   const pokemon = db.pokemons.find({ id });
//   if (pokemon) {
//     return res.status(200).send({
//       success: true,
//       data: pokemon,
//     });
//   }
//   return res.status(404).send({
//     success: false,
//     message: 'Pokemon not found',
//   });
// });

// app.get('/pokemonSearch/:key/:value', (req, res) => {
//   const { key, value } = req.params;
//   const pokemon = db.pokemons.find({ [key]: value });
//   if (pokemon) {
//     return res.status(200).send({
//       success: true,
//       data: pokemon,
//     });
//   }
//   return res.status(404).send({
//     success: false,
//     message: 'Pokemons not found',
//   });
// });


// Start server
app.listen(PORT, () => {
  console.log(`The server is listening on port ${PORT}`);
});
