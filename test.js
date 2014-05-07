var mappings = {
    fr: {},
    it: {},
    de: {}
}

var countries = require ("./countries");
var teams = require ("./teams");

for (var i = 0; i < countries.en.length; ++i) {
    var cCountry = countries.en[i].toLowerCase();
    if (teams.indexOf (countries.en[i]) === -1) continue;
    mappings.fr[cCountry] = countries.fr[i];
    mappings.it[cCountry] = countries.it[i];
    mappings.de[cCountry] = countries.de[i];
}

for (var i = 0; i < teams.length; ++i) {
    var cTeam = teams[i];
    if (countries.en.indexOf (cTeam) === -1) {
        console.log ("Missing country: ", cTeam);
    }
}

console.log (JSON.stringify (mappings, null, 4));
