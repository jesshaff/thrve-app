//physical handler
const physicalHandler = function () {
  location.href = "/physical";
};

document
  .getElementById("physicalEl")
  .addEventListener("click", physicalHandler);

// sleep handler

const sleepHandler = function () {
  location.href = "/sleep";
};

document.getElementById("sleepEl").addEventListener("click", sleepHandler);

// mood handler

const moodHandler = function () {
  location.href = "/mood";
};

document.getElementById("mentalEl").addEventListener("click", moodHandler);
