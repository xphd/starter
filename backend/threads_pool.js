// const { StaticPool } = require("node-worker-threads-pool");

// const staticPool = new StaticPool({
//   size: 4,
//   task: (n) => n + 1,
// });

// staticPool.exec(1).then((result) => {
//   console.log("result from thread pool:", result); // result will be 2.
//   while (1) {}
// });

// staticPool.exec(10).then((result) => {
//   console.log("result from thread pool:", result); // result will be 2.
// });

const { DynamicPool } = require("node-worker-threads-pool");

const dynamicPool = new DynamicPool(2);

// function myFunc1(x) {
//   console.log("before while");
//   while (1) {}
//   console.log("after while");
//   return x;
// }

dynamicPool.exec({
  task: function (id) {
    console.log("this is:", id);
    console.log("before while");

    console.log("after while");
  },
  param: 0,
});
//   .then((result) => {
//     console.log(result); // result will be 3.
//   });

// dynamicPool.exec({
//   task: function (id) {
//     console.log("this is:", id);
//     console.log("before while");
//     while (1) {}
//     console.log("after while");
//   },
//   param: 1,
// });
//   .then((result) => {
//     console.log(result); // result will be 3.
//   });

// dynamicPool.exec({
//   task: function (id) {
//     console.log("this is:", id);
//     console.log("before while");
//     while (1) {}
//     console.log("after while");
//   },
//   param: 2,
// });
//   .then((result) => {
//     console.log(result); // result will be 3.
//   });

// dynamicPool.exec({
//   task: function (id) {
//     console.log("this is:", id);
//     console.log("before while");
//     while (1) {}
//     console.log("after while");
//   },
//   param: 3,
// });
//   .then((result) => {
//     console.log(result); // result will be 3.
//   });
