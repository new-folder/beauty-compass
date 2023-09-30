// accordion
const addInfoTrigger = document.querySelector(".add-info__trigger");
const addInfoContent = document.querySelector(".add-info__content");
const addInfoArrow = document.querySelector(".add-info__trigger img");
const questionSign = document.querySelector(".question-sign");
let isOpen = false;

addInfoTrigger.addEventListener("click", function () {
  if (!isOpen) {
    addInfoContent.style.maxHeight = "none";
    isOpen = true;
    addInfoArrow.style.transform = "rotate(180deg)";
    addInfoContent.style.margin = "1.5rem 0 1rem 0";
  } else {
    addInfoContent.style.maxHeight = "0";
    isOpen = false;
    addInfoArrow.style.transform = "rotate(0)";
    addInfoContent.style.paddingTop = "0px";
    addInfoContent.style.margin = "0";
  }
});

// tooltip
// tippy(".left__question", {
//   content: '<div class="cloud">Пример текста</div>',
//   theme: "light",
//   placement: "top-start",
//   arrow: false,
//   allowHTML: true,
// });

// tippy(".right__question", {
//   content:
//     '<div class="cloud">Вы можете задать порядок отображения средств перемещая их иконки</div>',
//   theme: "light",
//   placement: "top-start",
//   arrow: false,
//   allowHTML: true,
// });

// creating brands

// const addInfoSchemeLeft = document.querySelector('.add-info__schemes .left .left-inner');
// const addInfoSchemeRight = document.querySelector('.add-info__schemes .right .right-inner');
//
// const addItem = () => {
//   event.preventDefault();
//   const leftItem = document.createElement('div');
//   leftItem.classList.add('left-inner__item');
//   const brandItem = document.createElement('div');
//   brandItem.classList.add('left-inner__brand', 'title--h5', 'hover--red',
//     'd-flex', 'align-items-end', 'ps-2');
//   brandItem.id = 'left-inner__brand-' + addInfoSchemeLeft.childElementCount + 1
//
//   const rightItem = document.createElement('div');
//   rightItem.classList.add('right-inner__item');
//   // rightItem.classList.add('my-3')
//   rightItem.innerHTML = `
//     <a
//       href=""
//       class="right__title title--h5 hover--red text-decoration-none position-relative">
//       <span>Бренд ${addInfoSchemeRight.childElementCount + 1}</span>
//       <img class="question right__question d-none d-md-inline mx-2" src="../img/plus-rect.svg" alt="question logo">
//     </a>
//     `
//   const imgSrc = addInfoSchemeLeft.childElementCount === 0
//     ? '../img/1-level.svg'
//     : '../img/1-level2.svg';
//
//     brandItem.innerHTML = `
//
//       <img src="${imgSrc}" alt="img">
//       <span
//         class="ps-2"
//         role='button'
//         >
//         Бренд ${addInfoSchemeLeft.childElementCount + 1}
//       </span>
//     `
//   leftItem.appendChild(brandItem)
//
//
//   brandItem.addEventListener('click', () => {
//       event.preventDefault();
//       addSeries(leftItem);
//     });
//
//   addInfoContent.style.maxHeight = (addInfoContent.scrollHeight + 50) + 'px';
//   addInfoSchemeLeft.classList.add('pt-4')
//   addInfoSchemeLeft.appendChild(leftItem);
//   addInfoSchemeRight.appendChild(rightItem);
// }
//
// const addSeries = (parentItem) => {
//   const inner2lvlItem = document.createElement('div');
//   inner2lvlItem.classList.add('left-inner__2lvl');
//   inner2lvlItem.innerHTML = `
//   <div
//     class="title--h5 hover--red d-flex align-items-end"
//     role='button'
//     style="padding-left: 2rem;"
//     onclick={event.preventDefault()}
//     >
//     <img src="../img/2-level.svg" alt="img">
//     <span class="ps-2">Серия ${parentItem.childElementCount}</span>
//   </div>
//   `
//   addInfoContent.style.maxHeight = (addInfoContent.scrollHeight + 50) + 'px';
//   addInfoSchemeLeft.classList.add('pt-4')
//   parentItem.appendChild(inner2lvlItem);
// }

const addInfoInner = document.querySelector(".add-info__inner");

const addItem = () => {
  event.preventDefault();

  const addInfoRow = document.createElement("div");
  addInfoRow.classList.add("add-info__row", "d-flex");

  const addInfoLeft = document.createElement("div");
  addInfoLeft.classList.add("add-info__left", "col-6 border--right", "pt-4");

  const addInfoRight = document.createElement("div");
  addInfoRight.classList.add("add-info__right", "col-6", "ps-4", "pt-4");

  const leftItem = document.createElement("div");
  leftItem.classList.add(
    "left-inner__item",
    "title--h5",
    "hover--red",
    "d-flex",
    "align-items-end",
    "ps-2"
  );

  const rightItem = document.createElement("div");
  rightItem.classList.add(
    "right-inner__item",
    "title--h5",
    "hover--red",
    "d-flex",
    "align-items-end",
    "ps-2"
  );
};

// modal price
const modalPrices = document.getElementById("modal--prices");
const modalPricesConfirm = document.getElementById("modal--confirm");
const modalPricesCells = modalPrices.querySelectorAll(".table tr td");

modalPricesCells.forEach((cell) => {
  cell.setAttribute("data-bs-dismiss", "modal");
  cell.setAttribute("data-bs-toggle", "modal");
  cell.setAttribute("href", "#modal--confirm");

  cell.addEventListener("click", () => {
    console.log(cell);

    const cellElement = cell.querySelector("span");
    if (cellElement) {
      const cellPrice = cellElement.textContent.trim();
      const cellNumber = parseInt(cellPrice);
      if (!isNaN(cellNumber)) {
        console.log("Число внутри ячейки:", cellNumber);
      } else {
        console.log("Содержимое внутри ячейки не является числом:", cellPrice);
      }
    }
  });
});

var outputInfoDetails=''

// Сортировка по столбцу "очередь показа"
// $.ajax({
//   type: "post",
//   url: "url",
//   dataType: "json",
//   success: function (response) {
//     outputInfoDetails=response
//   }
// });

//предпологаемый и желаемый JSON данные
outputInfoDetails=""

var globalPageSize=4

//функция вывода данных

function outputInfo(outpBlock, arrayData, labelSearch, textAddBut, classNexPag,searchText,lastTrig=false, selectPage=1, elStart=0 ,pageItemCount=globalPageSize) {
if(searchText==''){ 
  html='<div class="outputInf">'
  +'<div class="input input--general d-flex justify-content-between">'
  +'  <label for="search" class="details__search label label--light label--profile">'
  +labelSearch
  +'</label>'
  +'  <input id="search" value="" type="text" class="details__search-input ">'
  +'  <a href="" class="details__btn btn btn--blue"> '
  +'    <p class="text--15-25">'
  +textAddBut
  +'</p>'
  +'  </a>'
  +'</div>'

  html+='<ul class="all-object">'
  
  for (let i = 0; i < arrayData.length; i++) {
    const element = arrayData[i];
    
    html+='<div class="details__view '

    if(i<elStart || i>elStart+pageItemCount) html+='d-none">'
    else html+='">'

        html+='<input type="text" value="'+element.place_display+'" class="details__view-place">'
        +'  <details class="details">'
        +'    <summary class="details__summary '
    
        if(lastTrig) html+='details__summary--last-item '
        html+='">'
        html+='      <p class="title--h5">'+element.name+'</p>   '
        +'      <div class="details-button">    '
        +'        <a class="details-button__edit btn" href="#">      '
        +'          <img src="../img/btn_pen.svg" alt="">    '
        +'        </a>    '
        +'        <a class="details-button__del btn" href="#">      '
        +'          <img src="../img/destr.svg" alt="">    '
        +'        </a>  '
        +'      </div>'
        +'    </summary>'
        if(classNexPag!=''){
          html+='<div class="content">'
          +'      <div class="pagin__output-info">  '
          +'        <div class="pagin__output-info" id="view-all-'+classNexPag+'-'+element.idDB+'">  '
          +'        </div>'
          +'      </div>'
          +'    </div>'
        }
        html+='  </details>'    
      
    
    html+='</div>'
  }
  html+='</ul>'

  html+='<div class="paginationjs">'
  +'            <div class="paginationjs-pages">'
  +'              <ul>'
  +'                <li class="paginationjs-prev ' 
  if(selectPage==1){
    html+='disabled'
  }
  
  html+='">'
  +'                  <a></a>'
  +'                </li>'

  for (let i = 1; i < Math.ceil(arrayData.length/pageItemCount); i++) {
    html+='<li class="paginationjs-page J-paginationjs-page'
    if (i==selectPage) {
      html+=' active'
    }
    html+='" data-num="'+i+'">'
    +'<a>'+i+'</a>'
    +'</li>'
  }

  html+='                <li class="paginationjs-next '
  if(selectPage==(Math.ceil(arrayData.length/pageItemCount)-1)){
    html+='disabled'
  }
  html+='">'
  +'                  <a></a>'
  +'                </li>'
  +'              </ul>'
  +'            </div>'
  +'          </div>'
  html+='</div>'
}
  $(outpBlock).html(html)
}

function changePage(params) {

  collectSort=params.data.pageSelect.parentElement.parentElement.parentElement.parentElement.children[1].children

  console.log(collectSort);
  //сортировка того, что отобразилось
  for (let i = 0; i < collectSort.length; i++) {
    const element = collectSort[i];
    //добавление удаление нужных классов
    console.log(element.classList.add('d-none'));
  }
  switch (params.data.pageSelect.attributes[0].value.split(' ')[0].split('-')[1]) {
    case 'page':
    
      selectPage=params.data.pageSelect.attributes[1].value

      break;
    case 'prev':

      activeValue=0;
      for (let ch = 0; ch < params.data.pageSelect.parentElement.children.length; ch++) {
        const child = params.data.pageSelect.parentElement.children[ch];

        if(child.classList[2]=='active'){
          activeValue=Number(child.attributes["data-num"].value)
        }
      }

      if(activeValue-1>=params.data.pageSelect.nextElementSibling.attributes[1].value){
        selectPage=activeValue-1
      }else
        selectPage=params.data.pageSelect.nextElementSibling.attributes[1].value
      
      break;
    case 'next':

      activeValue=0;
      for (let ch = 0; ch < params.data.pageSelect.parentElement.children.length; ch++) {
        const child = params.data.pageSelect.parentElement.children[ch];

        if(child.classList[2]=='active'){
          activeValue=Number(child.attributes["data-num"].value)
        }
      }

      if(activeValue+1<=params.data.pageSelect.previousElementSibling.attributes[1].value){
        selectPage=activeValue+1
      }else
        selectPage=params.data.pageSelect.previousElementSibling.attributes[1].value
      break;
  }


}

function search(el){

searchText=el.data.input.value

}

//анимация details
class Accordion {
  constructor(el) {
    this.el = el;
    this.summary = el.querySelector('summary');
    this.content = el.querySelector('.content');

    this.animation = null;
    this.isClosing = false;
    this.isExpanding = false;
    this.summary.addEventListener('click', (e) => this.onClick(e));
  }

  onClick(e) {
    e.preventDefault();
    this.el.style.overflow = 'hidden';
    if (this.isClosing || !this.el.open) {
      this.open();
    } else if (this.isExpanding || this.el.open) {
      this.shrink();
    }
  }

  shrink() {
    this.isClosing = true;
    
    const startHeight = `${this.el.offsetHeight}px`;
    const endHeight = `${this.summary.offsetHeight}px`;
    
    if (this.animation) {
      this.animation.cancel();
    }
    
    this.animation = this.el.animate({
      height: [startHeight, endHeight]
    }, {
      duration: 400,
      easing: 'ease-out'
    });
    this.animation.onfinish = () => this.onAnimationFinish(false);
    this.animation.oncancel = () => this.isClosing = false;
  }

  open() {
    this.el.style.height = `${this.el.offsetHeight}px`;
    this.el.open = true;
    window.requestAnimationFrame(() => this.expand());
  }

  expand() {
    this.isExpanding = true;
    const startHeight = `${this.el.offsetHeight}px`;
    const endHeight = `${this.summary.offsetHeight + this.content.offsetHeight}px`;
    
    if (this.animation) {
      this.animation.cancel();
    }
    
    this.animation = this.el.animate({
      height: [startHeight, endHeight]
    }, {
      duration: 400,
      easing: 'ease-out'
    });
    this.animation.onfinish = () => this.onAnimationFinish(true);
    this.animation.oncancel = () => this.isExpanding = false;
  }

  onAnimationFinish(open) {
    this.el.open = open;
    this.animation = null;
    this.isClosing = false;
    this.isExpanding = false;
    this.el.style.height = this.el.style.overflow = '';
  }
}
// Присваивание анимаций
document.querySelectorAll('.add-info__schemes details').forEach((el) => {
  new Accordion(el);
});

//вывод информации с помощью пагинации
//производитель

var classPg='brand'

outputInfo($('#view-all-item'), outputInfoDetails[0].brands,'Поиск бренда', 'Добавить бренд',classPg,'' )

outputInfoDetails[0].brands.forEach(brand => {

  let nxtClassPg='serie'

  if (brand.series != undefined) {
    outputInfo($('#view-all-'+classPg+'-'+brand.idDB), brand.series,'Поиск  серии', 'Добавить серию',nxtClassPg,'' )

    brand.series.forEach(serie => {
      outputInfo($('#view-all-'+nxtClassPg+'-'+serie.idDB), serie.cosmetics,'Поиск  средства', 'Добавить средство','', '',true )
      
    });
    
  } else {
    outputInfo($('#view-all-'+classPg+'-'+brand.idDB), brand.cosmetics,'Поиск  средства', 'Добавить средство','','',true  )
  }

});

for (let i = 0; i < $('li[class^="paginationjs"]').length; i++) {
  const element = $('li[class^="paginationjs"]')[i];

  triger=false
  element.classList.forEach((classEl)=>{
    if(classEl=='disabled'){
      triger=true
    }
  })
  
  if(!triger)
    $(element).bind('click', {pageSelect: element}, changePage);
}

for(let i=0;i<$('input[id="search"]').length;i++){
  const element = $('input[id="search"]')[i];

  array=element.parentElement.parentElement.children[1].children

  $(element).bind('keyup', {input: element, arraySearch:array}, search)

}