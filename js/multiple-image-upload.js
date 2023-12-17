const fileInput = document.getElementById('img-multiple');
const imageContainer = document.querySelector('.added-imgs__container');
const imageContainerHeader = document.querySelector('.added-imgs__header');

let containerCounter = 0;

fileInput.addEventListener('change', (e) => {
  const files = e.target.files;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const image = new Image();
        image.src = e.target.result;

        if (containerCounter === 0) {
          imageContainerHeader.style.display = 'flex';
        }

        const containerNumber = document.createElement('div');
        containerNumber.classList.add('col-1', 'col-xxl-3', 'text-center', 'text--15-30');
        containerNumber.textContent = `${containerCounter + 1} `;
        containerCounter++;

        const checkboxContainer = document.createElement('div');
        checkboxContainer.classList.add('col-5', 'col-xxl-3', 'd-flex', 'align-items-center', 'justify-content-center', 'text-center');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('added-imgs__check', 'me-2', 'me-xxl-0');
        checkbox.id = `copyright-${i}`;

        const question = document.createElement('div'); // добавление вопроса Поставить копирайт?
        question.classList.add('added-imgs__question');
        question.textContent = 'Поставить копирайт?';
        question.htmlFor = `copyright-${i}`;

        checkboxContainer.appendChild(checkbox);
        checkboxContainer.appendChild(question);

        const deleteButton = document.createElement('button'); // deleteButton
        deleteButton.classList.add('added-imgs__delete', 'd-none', 'd-xxl-block');

        const buttonPopupQuestion = document.createElement('div');
        buttonPopupQuestion.classList.add('added-imgs__popup-question', 'd-xxl-none');
        buttonPopupQuestion.setAttribute('data-bs-whatever', 'Поставьте копирайт, если вы автор этого фото.');
        buttonPopupQuestion.setAttribute('data-bs-target', '#openCopyComment');
        buttonPopupQuestion.setAttribute('data-bs-toggle', 'modal');
        buttonPopupQuestion.id = `infForCopy-${i}`;

        const colLastWrapper = document.createElement('div');
        colLastWrapper.classList.add('col-1', 'col-xxl-3', 'd-flex', 'justify-content-center');
        colLastWrapper.appendChild(deleteButton);
        colLastWrapper.appendChild(buttonPopupQuestion);

        deleteButton.addEventListener('click', () => {
          const imageContainerItem = deleteButton.parentNode.parentNode;
          imageContainer.removeChild(imageContainerItem);
          updateContainerNumbers();
        });

        const deleteButtonMobile = document.createElement('button'); // deleteButton для мобильной версии
        deleteButtonMobile.classList.add('added-imgs__delete','added-imgs__delete--mobile', 'd-xxl-none');

        const col3Wrapper2 = document.createElement('div');
        col3Wrapper2.classList.add('col-1', 'col-xxl-4', 'text-center');
        col3Wrapper2.appendChild(deleteButtonMobile);

        deleteButtonMobile.addEventListener('click', () => {
          const imageContainerItem = deleteButtonMobile.parentNode.parentNode;
          imageContainer.removeChild(imageContainerItem);
          updateContainerNumbers();
        });

        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add('col-4', 'col-xxl-3', 'text-center', 'position-relative');
        imageWrapper.appendChild(image);
        imageWrapper.appendChild(deleteButtonMobile); // добавляем deleteButton в imageWrapper

        const imageContainerItem = document.createElement('div');
        imageContainerItem.classList.add('added-imgs__item');
        imageContainerItem.appendChild(containerNumber);
        imageContainerItem.appendChild(imageWrapper);
        imageContainerItem.appendChild(checkboxContainer);
        imageContainerItem.appendChild(colLastWrapper);

        imageContainer.appendChild(imageContainerItem);

        updateContainerNumbers();
      };

      reader.readAsDataURL(file);
    }
  }
});

// Используем библиотеку SortableJS
const sortable = new Sortable(imageContainer, {
  animation: 150,
  handle: '.added-imgs__item',
  draggable: '.added-imgs__item',
  onEnd: updateContainerNumbers,
  onTouchStart: function (/** Event */evt) {
    // Обработка начала касания
  },
  onTouchEnd: function (/** Event */evt) {
    // Обработка окончания касания
  },
});

// Функция для обновления порядковых номеров
function updateContainerNumbers() {
  const imageContainers = document.querySelectorAll('.added-imgs__item');
  imageContainers.forEach((container, index) => {
    const containerNumber = container.querySelector('div:first-child');
    containerNumber.textContent = `${index + 1}`;
  });
}


// Bootstrap для всплывающих комментариев 
setTimeout(() => {
  var copyModal = document.getElementById('openCopyComment')
  copyModal.addEventListener('show.bs.modal', function (event) {
    var button = event.relatedTarget
    var info = button.getAttribute('data-bs-whatever')
    var modalInfo = copyModal.querySelector('.modal-text')

    modalInfo.textContent = info
  })
}, 1000)