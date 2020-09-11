// const axios = require("axios");
// import AxiosPlugin from 'vue-axios-cors';

const rp = require("request-promise");

function function1() {
  console.log("this is function1");
  // axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
  let combinedUri =
    "https://www.wikidata.org/w/api.php?action=wbsearchentities&format=json&language=en&type=item&limit=7&search=earth";
  const requestOptions = {
    uri: combinedUri,
    method: "GET",
    json: true,
  };

  rp(requestOptions)
    .then(function(response) {
      let results = response["search"];
      console.log(results);
    })
    .catch(function(err) {
      console.log("wikisearch got an error, err was ", err);
    });
}

module.exports = function1;
