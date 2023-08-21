
window.addEventListener("load", checkScreenWidth);
window.addEventListener("resize", checkScreenWidth);
const elementsWithDataQuestion = document.querySelectorAll("[data-question]");
const productsImageCloud = document.querySelector('.profile__products-image_cloud')

function checkScreenWidth() {
  if (window.innerWidth >= 1400) {
    productsImageCloud.textContent = `Установите порядок показа превью, перемещая иконки  Фото до 10 МБ. Формат JPG, JPEG, BMP, GIF (размеры, соотношение сторон, максимальный вес итд)`
  } else {
    productsImageCloud.textContent = `Установите порядок показа превью, перемещая иконки`
  }
}
elementsWithDataQuestion.forEach(element => {
  const dataAttributeValue = element.getAttribute("data-question");
  // const cloudClass = `${dataAttributeValue}_cloud`;
  const parentElement = element.parentElement;
  const cloud = parentElement.querySelector('.question__cloud')

  element.addEventListener("mouseenter", () => {
    if (cloud) {
      cloud.classList.add('open');
    }
  });

  element.addEventListener("mouseleave", () => {
    if (cloud) {
      cloud.classList.remove('open');
    }
  });

});

