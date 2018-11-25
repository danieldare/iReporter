const edit = document.getElementById("edit");
const displayForm = document.querySelector(".edit-form");
const spinner = document.querySelector(".no-spinner");
edit.addEventListener("click", editRecord);

let loading = true;
function editRecord(e) {
  e.preventDefault();
  //   scroll to the position
  scrollWin();
  // Add spinner class
  if (loading === true) {
    spinner.classList.add("show-spinner");
  }
  loading = false;
  setTimeout(() => {
    if (loading === false) {
      spinner.classList.remove("show-spinner");
      displayForm.classList.add("edit-show-form");
    }
  }, 2000);
}

function scrollWin() {
  window.scrollTo(0, 700);
}
