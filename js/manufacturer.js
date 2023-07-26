// accordion
const addInfoTrigger = document.querySelector('.add-info__trigger');
const addInfoContent = document.querySelector('.add-info__content');
const addInfoArrow = document.querySelector('.add-info__trigger img');
const questionSign = document.querySelector('.question-sign')
let isOpen = false;

addInfoTrigger.addEventListener('click', function() {
  if (!isOpen) {
    addInfoContent.style.maxHeight = (addInfoContent.scrollHeight + 20) + 'px';
    isOpen = true;
    addInfoArrow.style.transform = 'rotate(180deg)';
    addInfoContent.style.margin = '1.5rem 0 1rem 0';
  } else {
    addInfoContent.style.maxHeight = '0';
    isOpen = false;
    addInfoArrow.style.transform = 'rotate(0)';
    addInfoContent.style.paddingTop = '0px';
    addInfoContent.style.margin =  '0';
  }
});

// tooltip
tippy('.left__question', {
  content: '<div class="cloud">Пример текста</div>',
  theme: 'light',
  placement: 'top-start',
  arrow: false,
  allowHTML: true,
});

tippy('.right__question', {
  content: '<div class="cloud">Вы можете задать порядок отображения средств перемещая их иконки</div>',
  theme: 'light',
  placement: 'top-start',
  arrow: false,
  allowHTML: true,
});

// creating brands
const addInfoSchemes = document.querySelector('.add-info__schemes');
const addInfoSchemeLeft = document.querySelector('.add-info__schemes .left .left-inner');
const addInfoSchemeRight = document.querySelector('.add-info__schemes .right .right-inner');

const manufacturersList = []
const brands = [];


const addSeries = () => {
  const series = document.createElement('div');
  series.classList.add('left-inner__2lvl');
  series.innerHTML = `
  <div class="title--h5 d-flex align-items-end ps-2">
    <img src="../img/2-level.svg" alt="img">
    <span class="ps-2">Серия 1</span>
  </div>
  `
}

const addItem = () => {
  event.preventDefault();
  const item = document.createElement('div');
  item.classList.add('left-inner__item');

  if (addInfoSchemeLeft.childElementCount === 0) {
    item.innerHTML = `
    <div class="title--h5 d-flex align-items-end ps-2">
      <img src="../img/1-level.svg" alt="img">
      <span class="ps-2">Бренд1</span>
    </div>`
  }
  if (addInfoSchemeLeft.childElementCount > 0) {
    item.innerHTML = `
    <div class="title--h5 d-flex align-items-end ps-2">
      <img src="../img/1-level2.svg" alt="img">
      <span class="ps-2" onclick={addSeries()}>Бренд2</span>
    </div>`
  }

  addInfoContent.style.maxHeight = (addInfoContent.scrollHeight + 50) + 'px';
  addInfoSchemeLeft.classList.add('pt-4')
  addInfoSchemeLeft.appendChild(item);
}

