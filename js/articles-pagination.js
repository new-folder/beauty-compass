$(document).ready(() => {
    // Инициализация пагинации с использованием pagination.js
    $('#pagination').pagination({
        dataSource: (done) => {
            // Загрузка данных с использованием AJAX
            $.ajax({
                type: 'GET',
                url: 'generated.json', // Замените на ваш URL для получения данных
                success: (response) => {
                    done(response);
                }
            });
        },
        pageSize: 10, // Количество статей на странице
        callback: (data, pagination) => {
            const articlesContainer = $('#articles-container');
            articlesContainer.empty();

            data.forEach((item) => {
                // Создание HTML для каждой статьи
                const articleHtml = `
                    <div class="col-12 col-md-6 col-xxl-5 py-1 py-md-3">
                        <a href="${item.slug}" class="shadow articles__item">
                            <div class="row articles__info">
                                <div class="col-6">
                                    <img src="/img/logo-min.png" alt="" />
                                </div>
                                <div class="col-6 text-end articles__date">${formatDate(item.date)}</div>
                            </div>
                            <!--<img src="${item.thumbnail}" class="articles__img" alt="" />-->
                            <img src="../img/image194.png" class="articles__img" alt="" />
                            <h5 class="articles__title">${item.title}</h5>
                            <p>${item.text}</p>
                        </a>
                    </div>
                `;

                articlesContainer.append(articleHtml);
            });
        }
    });

    // Функция для форматирования даты
    const formatDate = (dateString) => {
        // Обрезаем первые 8 символов и разбиваем на год, месяц и день
        const year = dateString.slice(0, 4);
        const month = dateString.slice(5, 7);
        const day = dateString.slice(8, 10);

        // Форматируем дату
        const formattedDate = `${day}.${month}.${year}`;
        return formattedDate;
    };
});