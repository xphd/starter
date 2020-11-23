function sleep(milliseconds) {
  // console.log("sleep begins");
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
  // console.log("sleep ends");
}
module.exports = sleep;
