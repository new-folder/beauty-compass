document.addEventListener("DOMContentLoaded", function () {



  const select = document.querySelector(".brand__tags-select");
  const selectHeader = document.querySelector(".brand__tags-header");
  const selectOptions = document.querySelector(".brand__tags-options");
  const tagsContent = document.querySelector(".brand__tags-content");

  select.addEventListener("click", function () {
    if (selectOptions.classList.contains("open")) {
      selectOptions.classList.remove("open");
    } else {
      selectOptions.classList.add("open");
    }
  })

  const options = document.querySelectorAll(".brand__tags-option");
  options.forEach(function (option) {
    option.addEventListener("click", function () {
      const selectedValue = option.textContent;
      document.querySelector(".brand__tags-selected").textContent = selectedValue;

      const tag = document.createElement('div')
      tag.classList.add('brand__tags-item');
      // tag.textContent = selectedValue;
      tag.innerHTML = `<span>${selectedValue}</span>`;
      tagsContent.appendChild(tag);


      console.log('brand__tags-option: ' + selectedValue);
    });
  });

  document.addEventListener("click", function (event) {
    if (!event.target.closest(".brand__tags-select")) {
      selectOptions.classList.remove("open");
    }
  });



});




// document.addEventListener("DOMContentLoaded", function () {
//   const brandSelect = document.querySelector(".brand__tags-select");
//   const brandHeader = document.querySelector(".brand__tags-header");
//   const brandOptions = document.querySelector(".brand__tags-options");
//
//   brandSelect.addEventListener("click", function () {
//     brandOptions.classList.toggle("open");
//   });
//
//   const options = document.querySelectorAll(".option");
//   options.forEach(function (option) {
//     option.addEventListener("click", function () {
//       const selectedValue = option.textContent;
//       document.querySelector(".brand__tags-selected").textContent = selectedValue;
//       brandOptions.classList.remove("open");
//     });
//   });
//
//   document.addEventListener("click", function (event) {
//     if (!event.target.closest(".custom-select")) {
//       brandOptions.classList.remove("open");
//     }
//   });
// });
//
//
// document.addEventListener("DOMContentLoaded", function () {
//   const select = document.querySelector(".brand__tags-select");
//   const selectHeader = document.querySelector(".brand__tags-selected");
//   const selectOptions = document.querySelector(".brand__tags-options");
//
//   select.addEventListener("click", function () {
//     selectOptions.classList.toggle("open");
//     console.log('123')
//   });
//
//   const options = document.querySelectorAll(".brand__tags-option");
//   options.forEach(function (option) {
//     option.addEventListener("click", function () {
//       const selectedValue = option.textContent;
//       document.querySelector(".brand__tags-selected").textContent = selectedValue;
//       selectOptions.classList.remove("open");
//     });
//   });
//
//   document.addEventListener("click", function (event) {
//     if (!event.target.closest(".custom-select")) {
//       selectOptions.classList.remove("open");
//     }
//   });
// });
