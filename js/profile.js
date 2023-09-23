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
outputInfoDetails=[{
  idDB:1,
  name:"Производитель1",
  place_display:"1",
  brands:[
    {
      idDB:1,
      name:"Бранд1",
      place_display:"1",
      series:[
        {
          idDB:1,
          name:"Серия1",
          place_display:"1",
          cosmetics:[
            {
              idDB:1,
              name:"Средство1",
              place_display:"1",
            },
            {
              idDB:2,
              name:"Средство2",
              place_display:"2",
            },
            {
              idDB:3,
              name:"Средство3",
              place_display:"3",
            },
            {
              idDB:4,
              name:"Средство4",
              place_display:"4",
            },
          ]
        },
        {
          idDB:2,
          name:"Серия2",
          place_display:"2",
          cosmetics:[
            {
              idDB:1,
              name:"Средство1",
              place_display:"1",
            },
            {
              idDB:2,
              name:"Средство2",
              place_display:"2",
            },
            {
              idDB:3,
              name:"Средство3",
              place_display:"3",
            },
            {
              idDB:4,
              name:"Средство4",
              place_display:"4",
            },
          ]
        },
      ]
    },
    {
      idDB:2,
      name:"Бранд2",
      place_display:"2",
      cosmetics:[
        {
          idDB:1,
          name:"Средство1",
          place_display:"1",
        },
        {
          idDB:2,
          name:"Средство2",
          place_display:"2",
        },
        {
          idDB:3,
          name:"Средство3",
          place_display:"3",
        },
        {
          idDB:4,
          name:"Средство4",
          place_display:"4",
        },
      ]
    },
  ]
}]


//функция вывода данных
function createPagin(arrayIdParent ,blockOutput, _data, _classEl,_lastItem=false,  _placeholderSearch='', _textButtonAdd='',_visSearch=true, _pageSize=5, _pageNumber=1, _pageRange=0){
  blockOutput.pagination({
    dataSource: _data,
    pageSize: 5,
    pageNumber: 1,
    pageRange: 0,
    callback: function(data, pagination) {
      var html = templatingItem(arrayIdParent, data, _classEl, _placeholderSearch, _textButtonAdd, _visSearch, _lastItem);
      blockOutput.prev().html(html);
    }
  })
}

//шаблон вывода инфы
function templatingItem(arrayIdParent, data, classEl='', placeholderSearch, textButtonAdd, visSearch, lastItem) {
  
  html = '<ul>'

  for (let i = 0; i < data.length; i++) {
    const manufacter = data[i];
    if(i==0 && visSearch){
      html+='<div class="input input--general d-flex justify-content-between">'
      +'<label for="search_'+classEl
      arrayIdParent.forEach(id=>{
        html+='_'+id
      })
      html+='" class="details__search label label--light label--profile">'
      +placeholderSearch
      +'</label>'
      +'<input  id="searchIn_'+classEl
      arrayIdParent.forEach(id=>{
        html+='_'+id
      })
      html+='" value="" type="text" class="details__search-input '
      if(lastItem) html+='details__search-input-last'
      html+='">'
      +'<a href="" class="details__btn btn btn--blue"> <p class="text--15-25">Добавить '
      +textButtonAdd
      +'</p></a>'
      +'</div>'
    }
    html+='<div class="details__view">'
    +'<input type="text" value="'+manufacter.place_display+'" name="" class="details__view-place" id="">'

    html+='<details class="details">'
    +'<summary class="details__summary '
    if(lastItem) html+='details__summary--last-item'
    html+='">'
    +'  <p class="title--h5">'
    +manufacter.name
    +'  </p> '
    +'  <div class="details-button">'
    +'    <a class="details-button__edit btn" href="#">'
    +'      <img src="../img/btn_pen.svg" alt="">'
    +'    </a>'
    +'    <a class="details-button__del btn" href="#">'
    +'      <img src="../img/destr.svg" alt="">'
    +'    </a>'
    +'  </div>'
    +'</summary>'
    +'<div class="content">'
    +'<div class="pagin__output-info">'
    +'  <p></p>'
    +'  <div class="pagin__output-info" id="'
    +classEl+'_'+manufacter.idDB+'_view-all'
    +'">'
    +'  </div>'
    +'</div>'
    +'</div>'
    +'</details>'
    +'</div>'
  }
  html += '</ul>'

  return html;
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
let global_club='manuf'
createPagin([0],$('#view_all_info_manufacter'),outputInfoDetails, global_club,false, null, null, false,)

var object=$('#'+global_club+'_'+outputInfoDetails[0].idDB+'_view-all')
//бренды
global_club='brand'
createPagin([0],object,outputInfoDetails[0].brands, global_club,false, 'Поиск бренда', 'бренд')

for (let i = 0; i < outputInfoDetails[0].brands.length; i++) {
  const brand = outputInfoDetails[0].brands[i];
  
  object=$('#'+global_club+'_'+brand.idDB+'_view-all')
  
  //зависимости есть ли серия у бренда
  if(brand.series != undefined){
    createPagin([0, i],object, brand.series, 'seria',false, 'Поиск серии', 'серия')

    for (let j = 0; j < brand.series.length; j++) {
      const seria = brand.series[j];
      object=$('#seria_'+seria.idDB+'_view-all')

      createPagin([0, i, j],object, seria.cosmetics, 'cosmetic',true, 'Поиск средства', 'средство')
    }
  }else{
    createPagin([0, i],object, brand.cosmetics, 'cosmetic',true, 'Поиск средства', 'средство')
  }
}

$('input[id^="searchIn"]').keyup(function (element) { 
  
  //вывод новой пагинации по поиску
  var outputHtml=element.currentTarget.parentElement.parentElement.parentElement.parentElement.lastChild

  //строка поиска
  var stroke_seach=element.target.value

  //id_elem [id производителя, id брендов, id серии] в json
  let id_elem=$.grep(element.target.attributes.id.value.split('_'), function(el){
    return !isNaN(el)
  })

  var arrayOutput=[];
  switch (id_elem.length) {
    case 1:
        arraySearch=outputInfoDetails[id_elem[0]].brands
        
        arraySearch.forEach(el=>{
          if(el.name.includes(stroke_seach))
            arrayOutput.push(el)
        })
        console.log(arrayOutput);
      break;
    case 2:
      if (outputInfoDetails[id_elem[0]].brands[id_elem[1]].series == undefined) 
        arraySearch=outputInfoDetails[id_elem[0]].brands[id_elem[1]].cosmetics
      else 
        arraySearch=outputInfoDetails[id_elem[0]].brands[id_elem[1]].series

        arraySearch.forEach(el=>{
          if(el.name.includes(stroke_seach))
            arrayOutput.push(el)
        })
        console.log(arrayOutput);
      break;
    case 3:
        arraySearch=outputInfoDetails[id_elem[0]].brands[id_elem[1]].series[id_elem[2]].cosmetics
        
        arraySearch.forEach(el=>{
          if(el.name.includes(stroke_seach))
            arrayOutput.push(el)
        })
        console.log(arrayOutput);
  }

});