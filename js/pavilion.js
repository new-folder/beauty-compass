const pavilionInput = document.querySelector(".pavilion__input");
const pavilionInputIcon = document.querySelector(".pavilion__input--icon");
console.log(pavilionInputIcon);

function showPavilionInputIcon() {
  if (pavilionInput.value || pavilionInput === document.activeElement) {
    pavilionInputIcon.style.display = "none";
  } else {
    pavilionInputIcon.style.display = "block";
  }
}

window.addEventListener("load", showPavilionInputIcon);
pavilionInput.addEventListener("input", showPavilionInputIcon);
pavilionInput.addEventListener("focus", showPavilionInputIcon);
pavilionInput.addEventListener("blur", showPavilionInputIcon);
window.addEventListener("resize", showPavilionInputIcon);
