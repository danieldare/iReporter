const tooglebar = document.getElementById("tooglebar");
const navUl = document.querySelector(".nav-items");
tooglebar.addEventListener("click", runEvent);

function runEvent() {
  navUl.classList.toggle("show-items");
}
