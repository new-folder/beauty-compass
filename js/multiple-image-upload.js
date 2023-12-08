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
        containerNumber.classList.add('col-3', 'text-center', 'text--20-30');
        containerNumber.textContent = `${containerCounter + 1} `;
        containerCounter++;

        const checkboxContainer = document.createElement('div');
        checkboxContainer.classList.add('col-3', 'text-center');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('added-imgs__check');
        checkbox.id = `copyright-${i}`;

        const question = document.createElement('span');
        question.classList.add('added-imgs__question');
        question.textContent = 'Поставить копирайт?';
        question.htmlFor = `copyright-${i}`;

        checkboxContainer.appendChild(checkbox);

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('added-imgs__delete');

        const col3Wrapper = document.createElement('div');
        col3Wrapper.classList.add('col-3', 'text-center');
        col3Wrapper.appendChild(deleteButton);

        deleteButton.addEventListener('click', () => {
          const imageContainerItem = deleteButton.parentNode.parentNode;
          imageContainer.removeChild(imageContainerItem);
          updateContainerNumbers();
        });

        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add('col-3', 'text-center');
        imageWrapper.appendChild(image);

        const imageContainerItem = document.createElement('div');
        imageContainerItem.classList.add('added-imgs__item');
        imageContainerItem.appendChild(containerNumber);
        imageContainerItem.appendChild(imageWrapper);
        imageContainerItem.appendChild(question);
        imageContainerItem.appendChild(checkboxContainer);
        imageContainerItem.appendChild(col3Wrapper);

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
});

// Функция для обновления порядковых номеров
function updateContainerNumbers() {
  const imageContainers = document.querySelectorAll('.added-imgs__item');
  imageContainers.forEach((container, index) => {
    const containerNumber = container.querySelector('div:first-child');
    containerNumber.textContent = `${index + 1}`;
  });
}
