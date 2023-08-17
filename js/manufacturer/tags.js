document.addEventListener("DOMContentLoaded", function () {

  const select = document.querySelector(".brand__tags-select");
  const selectHeader = document.querySelector(".brand__tags-header");
  const selectOptions = document.querySelector(".brand__tags-options");
  const tagsContent = document.querySelector(".brand__tags-content");
  const optionSelected = document.querySelector(".brand__tags-selected");

  select.addEventListener("click", function () {
    if (selectOptions.classList.contains("open")) {
      selectOptions.classList.remove("open");
    } else {
      selectOptions.classList.add("open");
    }
  })


  const options = document.querySelectorAll(".brand__tags-option");
  options.forEach(function (option, index) {

    const optionId = `option-${index + 1}`;
    option.setAttribute("data-option-id", optionId);

    option.addEventListener("click", function () {
      const selectedValue = option.textContent;
      const selectedOptionId = option.getAttribute("data-option-id");

      optionSelected.textContent = selectedValue;

      const existingTag = tagsContent.querySelector(`[data-tag-id="${selectedOptionId}"]`);

      if (existingTag) {
        tagsContent.removeChild(existingTag);
        option.classList.remove("active");
      } else {
        const tag = document.createElement('div');
        tag.classList.add('brand__tags-item');
        tag.setAttribute("data-tag-id", selectedOptionId);
        tag.innerHTML = `<span>${selectedValue}</span>`;
        option.classList.add("active");
        tagsContent.appendChild(tag);
      }

      selectOptions.classList.remove("open");

      const tagsExist = tagsContent.querySelector('.brand__tags-item');
      optionSelected.textContent = tagsExist ? selectedValue : 'Выберите значение';

      console.log('brand__tags-option: ' + selectedValue);
    });
  });


  document.addEventListener("click", function (event) {
    if (!event.target.closest(".brand__tags-select")) {
      selectOptions.classList.remove("open");
    }
  });

});
