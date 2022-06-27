const request = require('request');

const geocode = (adress, callback) => {
  const url =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    encodeURIComponent(adress) +
    '.json?access_token=pk.eyJ1Ijoic2Fsb21vbnNhZGEiLCJhIjoiY2wyczl6eGtuMGY2bzNicXNwcjE4cXdldiJ9.58TKm-tEtplN_jv-ZpXOLw&limit=1';

  request({ url, json: true }, (error, { body }) => {
    const data = body.features[0];
    if (error) callback('unable to connect to location services.', undefined);
    else if (!data) {
      return callback(
        'unable to find location, try another search.',
        undefined
      );
    } else {
      callback(undefined, {
        latitud: data.center[1],
        longitud: data.center[0],
        location: data.place_name,
      });
    }
  });
};

module.exports = geocode;
