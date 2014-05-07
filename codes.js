// Dependencies
var Cheerio = require ("cheerio");
var Request = require ("request");
var fs = require ("fs");

var teams = require ("./teams");
var codes = {};

var $ = Cheerio.load (fs.readFileSync ("./wiki-country-codes").toString());
var $rows = $("tr", ".wikitable.sortable.jquery-tablesorter");

for (var i = 1; i < $rows.length; ++i) {
    codes[$("a", $rows.eq(i)).html()] = $("tt", $rows.eq(i)).html()
}

var teamCodes = {};
for (var i = 0; i < teams.length; ++i) {
    if (!codes[teams[i]]) {
        console.warn ("Missing country code for: " + teams[i]);
        continue;
    }
    teamCodes[teams[i].toLowerCase()] = codes[teams[i]].toLowerCase();
}

console.log (JSON.stringify (teamCodes, null, 4));
