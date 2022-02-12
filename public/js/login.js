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
