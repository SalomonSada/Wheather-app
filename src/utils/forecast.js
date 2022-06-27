const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url =
    'http://api.weatherstack.com/current?access_key=23f64b516e67c23ac189fc5ecbba6799&query=' +
    latitude +
    ',' +
    longitude;

  request({ url, json: true }, (error, { body }) => {
    if (error) callback('unable to connect to weather services', undefined);
    else if (body.error) {
      callback(body.error.info, undefined);
    } else {
      const { temperature, feelslike, weather_descriptions, weather_icons } =
        body.current;
      callback(undefined, {
        temperature,
        feelslike,
        weather_descriptions,
        weather_icons,
      });
    }
  });
};

module.exports = forecast;
