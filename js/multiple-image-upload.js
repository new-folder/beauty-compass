const fileInput = document.getElementById('img-multiple');
const imageContainer = document.getElementById('imageContainer');
const imageContainerHeader = document.querySelector('.image-container-header');

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

        const containerNumber = document.createElement('span');
        containerNumber.textContent = `${containerCounter + 1}: `;
        containerCounter++;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `copyright-${i}`;

        const label = document.createElement('label');
        label.textContent = 'Добавить копирайт';
        label.htmlFor = `copyright-${i}`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Удалить';
        deleteButton.classList.add('delete-button');

        deleteButton.addEventListener('click', () => {
          const imageContainerItem = deleteButton.parentNode;
          imageContainer.removeChild(imageContainerItem);
          updateContainerNumbers();
        });

        const imageContainerItem = document.createElement('div');
        imageContainerItem.classList.add('image-container');
        imageContainerItem.appendChild(containerNumber);
        imageContainerItem.appendChild(image);
        imageContainerItem.appendChild(checkbox);
        imageContainerItem.appendChild(label);
        imageContainerItem.appendChild(deleteButton);

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
  handle: '.image-container',
  draggable: '.image-container',
  onEnd: updateContainerNumbers,
});

// Функция для обновления порядковых номеров
function updateContainerNumbers() {
  const imageContainers = document.querySelectorAll('.image-container');
  imageContainers.forEach((container, index) => {
    const containerNumber = container.querySelector('span:first-child');
    containerNumber.textContent = `${index + 1}: `;
  })
}
