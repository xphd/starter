function myFunc1(threadId) {
  // console.log("this is:", id);

  // while (1) {}
  function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }
  console.log(">>>>>> before while ", threadId);
  sleep(8000);
  console.log("<<<<<< after while", threadId);
}

module.exports = myFunc1;
