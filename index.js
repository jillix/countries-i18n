// Dependencies
var Cheerio = require ("cheerio");
var Request = require ("request");
var fs = require ("fs");

var Countries = {en: []};

// Initial fetch
Request ("http://www.foreignword.com/countries/", function (err, response, body) {

    if (err) { throw err; }
    if (response.statusCode !== 200) {
        throw new Error ("Request ended with a non 200 code");
    }

    // Parse body
    var $ = Cheerio.load (body);
    var $enCountries = $("a[target='new']");

    // Store the additional request links
    var links = [];
    for (var i = 0; i < $enCountries.length; ++i) {
        var cCountry = $enCountries.eq (i);
        Countries.en.push (cCountry.text ())
        links.push ("http://www.foreignword.com/countries/" + cCountry.attr ("href"));
    }

    var c = 0;
    for (var i = 0; i < links.length; ++i) {
        (function (idx) {
            Request (links[i], function (err, res, bod) {

                if (err) { throw err; }
                if (response.statusCode !== 200) {
                    throw new Error ("Request ended with a non 200 code");
                }

                var $ = Cheerio.load (bod);
                var $rows = $("tr");

                for (var j = 0; j < $rows.length; ++j) {
                    var $cRow = $rows[j];
                    var lang =  $("td", $cRow).eq(0).text().trim();
                    Countries[lang] = Countries[lang] || [];
                    Countries[lang][idx] = $("td", $cRow).eq(1).text().trim();
                }

                if (++c === links.length) {
                    console.log ("Written in countries.json");
                    fs.writeFileSync ("./countries.json", JSON.stringify (Countries, null, 4));
                }

                console.log (c + " / " + links.length);
            });
        })(i);
    }
});
