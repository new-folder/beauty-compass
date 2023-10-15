document.addEventListener("DOMContentLoaded", function () {
  const filterBtn = document.querySelector(".filter__mobile-btn");
  const filters = document.querySelector(".filter");

  filterBtn.addEventListener("click", function () {
    if (filters.classList.contains("filter--active")) {
      filters.classList.remove("filter--active");
    } else {
      filters.classList.add("filter--active");
    }
  });

  const searchInput = document.getElementById("search-input");
  const searchResults = document.getElementById("search-results");

  searchInput.addEventListener("focus", function () {
    searchResults.classList.add("select-block__toggle--active");
  });

  searchInput.addEventListener("focusout", function () {
    searchResults.classList.remove("select-block__toggle--active");
  });
});
