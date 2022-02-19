const ratingsFormHandler = async (value) => {
  // Stop the browser from submitting the form so we can do so with JavaScript

  // selects all buttons, buttons have assigned value
  var rating = value;

  // each of these if/else ifs should determine which page we're on and fetch accordingly.
  if (window.location.pathname === "/mood") {
    const response = await fetch("/api/mood", {
      method: "POST",
      body: JSON.stringify({ rating }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/navi");
    } else {
      alert("Failed");
    }
  } else if (window.location.pathname === "/physical") {
    const response = await fetch("/api/health", {
      method: "POST",
      body: JSON.stringify({ rating }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/navi");
    } else {
      alert("Failed");
    }
  } else if (window.location.pathname === "/sleep") {
    const response = await fetch("/api/sleep", {
      method: "POST",
      body: JSON.stringify({ rating }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/navi");
    } else {
      alert("Failed");
    }
  }
  console.log(window.location.pathname);
  console.log(response);
};
//Event listener on buttons to call the ratings handler function above.
// var el = document.querySelectorAll("label");
// for (var i = 0; i < el.length; i++) {
//   el[i].addEventListener("click", function () {
//     console.log(this.value);
//     ratingsFormHandler(this.value);
//   });
// }
function clickHandler() {
  var buttons = document.querySelectorAll("label");
  for (var i in Object.keys(buttons)) {
    buttons[i].onclick = function () {
      var value = this.id;
      console.log(value);
      ratingsFormHandler(value);
    };
  }
}
clickHandler();
