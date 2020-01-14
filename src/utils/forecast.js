const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/a627ce65a0457d38d27b7d79403211fe/" +
    encodeURIComponent(latitude) +
    "," +
    encodeURIComponent(longitude) +
    "?units=si";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect darksky services!", undefined);
    } else if (body.error) {
      callback("Unable to find location! Please try another one...", undefined);
    } else {
      const currentWeather = body.currently;
      callback(
        undefined,
        body.daily.data[0].summary +
          ". " +
          ` It is currently ${currentWeather.temperature} degrees out. This high today is ${body.daily.data[0].temperatureHigh} with a low of ${body.daily.data[0].temperatureLow} There is a ${currentWeather.precipProbability}% chance of rain.`
      );
    }
  });
};

module.exports = forecast;
