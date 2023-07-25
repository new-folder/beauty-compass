// accordion

const addInfoTrigger = document.querySelector('.add-info__trigger');
const addInfoContent = document.querySelector('.add-info__content');
const addInfoArrow = document.querySelector('.add-info__trigger img');
let isOpen = false;

addInfoTrigger.addEventListener('click', function() {
  if (!isOpen) {
    addInfoContent.style.maxHeight = (addInfoContent.scrollHeight + 20) + 'px';
    isOpen = true;
    addInfoArrow.style.transform = 'rotate(180deg)';
    addInfoContent.style.margin = '30px 0 20px 0';
  } else {
    addInfoContent.style.maxHeight = '0';
    isOpen = false;
    addInfoArrow.style.transform = 'rotate(0)';
    addInfoContent.style.paddingTop = '0px';
    addInfoContent.style.margin =  '0';
  }
});


// creating brands

const addInfoSchemes = document.querySelector('.add-info__schemes');

const addInfoSchemeLeft = document.querySelector('.add-info__schemes .left .left-inner');
const addInfoSchemeRight = document.querySelector('.add-info__schemes .right .right-inner');
const brands = [];

const createBrand = () => {
  const leftItem = document.createElement('a');
  leftItem.href = '';
  leftItem.classList.add('left-inner__item');
  if (brands.length === 0) {
    const firstBrandImg = document.createElement('img')
    firstBrandImg.src = '../img/1-level.svg';
    leftItem.appendChild(firstBrandImg);
  }
  if (brands.length > 0) {
    const brandImg = document.createElement('img');
    brandImg.src = '../img/1-level2.svg';
    leftItem.appendChild(brandImg);
  }
  const brandTitle = document.createElement('p');
  brandTitle.textContent = 'Бренд 1';
  leftItem.appendChild(brandTitle);
}

// const addBrand = () => {
//   createBrand()
// }






