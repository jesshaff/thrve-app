// ----------- Style Scripts --------------
const placeholders = document.querySelectorAll(
    ".styled-input__placeholder-text"
  ),
  inputs = document.querySelectorAll(".styled-input__input");

placeholders.forEach(function (el, i) {
  let value = el.innerText,
    html = "";
  for (let w of value) {
    if (!value) value = "&nbsp;";
    html += `<span class="letter">${w}</span>`;
  }
  el.innerHTML = html;
});

inputs.forEach(function (el) {
  let parent = el.parentNode;
  el.addEventListener(
    "focus",
    function () {
      parent.classList.add("filled");
      placeholderAnimationIn(parent, true);
    },
    false
  );

  el.addEventListener(
    "blur",
    function () {
      if (el.value.length) return;
      parent.classList.remove("filled");
      placeholderAnimationIn(parent, false);
    },
    false
  );
});

function placeholderAnimationIn(parent, action) {
  let act = action ? "add" : "remove";
  let letters = parent.querySelectorAll(".letter");
  letters = [].slice.call(letters, 0);
  if (!action) letters = letters.reverse();
  letters.forEach(function (el, i) {
    setTimeout(function () {
      let contains = parent.classList.contains("filled");
      if ((action && !contains) || (!action && contains)) return;
      el.classList[act]("active");
    }, 50 * i);
  });
}

setTimeout(function () {
  document.body.classList.add("on-start");
}, 100);

setTimeout(function () {
  document.body.classList.add("document-loaded");
}, 1800);

// ----------- Login event handlers --------------

const loginFormHandler = async (event) => {
  // Stop the browser from submitting the form so we can do so with JavaScript
  event.preventDefault();

  // Gather the data from the form elements on the page
  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (email && password) {
    // Send the e-mail and password to the server
    const response = await fetch("/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/navi");
    } else {
      alert("Failed");
    }
  }
};
var el = document.getElementById("submit");
if (el) {
  el.addEventListener("click", loginFormHandler);
}
