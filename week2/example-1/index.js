// Exercice 1. We want to do the following
// - Create a folder for your application
// - Initialise the folder using npm `init`
// - Install a module (moment) using `npm install moment`
// - require the moment package and use it to display the date using the following format: 23/06/2019 13:32. You will need to look at the momentjs documentation for the format: https://momentjs.com/docs/
// Bonus: add the day of the week and set the locale in moment to display the day of the week in French

// We require the moment module
const moment = require('moment');

// This will display the date in the format 23/06/2019 13:32
console.log('Date:', moment().format('DD/MM/YYYY HH:mm'));

// We can use `moment.locale` to change the language of the translations. Here, we set it to "fr" which corresponds to French.
moment.locale('fr');

// We add the "dddd" format which displays the day of the week
console.log('Date:', moment().format('dddd DD/MM/YYYY HH:mm'));
