const redFlagItems= document.getElementById("sub-option");
const redFlagAction = document.getElementById('redFlagAction');
redFlagAction.addEventListener('click',toggleRedFlagItems);
function toggleRedFlagItems(e){
e.preventDefault();
    redFlagItems.classList.toggle('display-none');
}