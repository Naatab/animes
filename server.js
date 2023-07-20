const fs = require('fs');
const express = require('express');
const app = express();

app.use(express.json());

// Leer el archivo anime.json
const data = fs.readFileSync('anime.json', 'utf8');
let animeData = JSON.parse(data);

// Convertir el objeto animeData en un array de objetos
const animeArray = Object.values(animeData);

// Ruta para listar todos los animes
app.get('/animes', (req, res) => {
  res.send(animeArray);
});

// Ruta para leer datos de un anime por su id
app.get('/animes/:id', (req, res) => {
  const animeId = req.params.id;
  const anime = animeArray.find((anime) => anime.id === animeId);

  if (anime) {
    res.send(anime);
  } else {
    res.status(404).send('Anime not found');
  }
});

// Ruta para leer datos de un anime por su nombre
app.get('/animesByName/:name', (req, res) => {
  const animeName = req.params.name;
  const anime = animeArray.find((anime) => anime.name === animeName);

  if (anime) {
    res.send(anime);
  } else {
    res.status(404).send('Anime not found');
  }
});

// Ruta para crear un nuevo anime
app.post('/animes', (req, res) => {
  const newAnime = req.body;
  animeData.push(newAnime);
  fs.writeFileSync('anime.json', JSON.stringify(animeData));
  res.send('Anime creado con éxito');
});

// Ruta para actualizar un anime por su id
app.put('/animes/:id', (req, res) => {
  const animeId = req.params.id;
  const updatedAnime = req.body;
  const index = animeData.findIndex((anime) => anime.id === animeId);

  if (index !== -1) {
    animeData[index] = { ...animeData[index], ...updatedAnime };
    fs.writeFileSync('anime.json', JSON.stringify(animeData));
    res.send('Anime actualizado con éxito');
  } else {
    res.status(404).send('Anime not found');
  }
});

// Ruta para eliminar un anime por su id
app.delete('/animes/:id', (req, res) => {
  const animeId = req.params.id;
  animeData = animeData.filter((anime) => anime.id !== animeId);
  fs.writeFileSync('anime.json', JSON.stringify(animeData));
  res.send('Anime eliminado con éxito');
});

module.exports = { app };
