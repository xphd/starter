function myFunc2(threadId) {
  // console.log("this is:", id);

  // while (1) {}
  function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }
  console.log("before while socket", threadId);
  sleep(8000);
  console.log("after while socket", threadId);
}

module.exports = myFunc2;
