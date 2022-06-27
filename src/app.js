const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// define paths for Express config
const publicDirectory = path.join(__dirname, '../public/');
const viewsDirectory = path.join(__dirname, '../templates/views');
const partialDirectory = path.join(__dirname, '../templates/partials');
// handlebars
app.set('view engine', 'hbs');
app.set('views', viewsDirectory);
hbs.registerPartials(partialDirectory);
// setup static direcoty to serve
app.use(express.static(publicDirectory));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Salomón sada Carmona',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Salomón sada Carmona',
  });
});

app.get('/help', (req, res) => {
  res.render('Help', {
    title: 'Help Menu',
    name: 'Salomón sada Carmona',
  });
});

app.get('/weather', (req, res) => {
  //Check how handle error when you don't have internet, for example.
  const adress = req.query.adress;
  if (!adress) {
    return res.send({
      error: 'you must have to complete an adress.',
    });
  }

  geocode(adress, (error, { latitud, longitud, location } = {}) => {
    if (error) return res.send({ error });

    forecast(latitud, longitud, (forecastError, forecast) => {
      if (forecastError) return res.send({ forecastError });
      res.send({
        location,
        forecast,
        adress,
      });
    });
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    message: '404, page not found',
    name: 'Salomón sada Carmona',
  });
});

app.listen(3000, () => {
  console.log('app running at port 3000.');
});
