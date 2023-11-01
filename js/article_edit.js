//проверка активации кнопок
let trigerActive=false
//объект для содержимого текстового редактора
let editor={}
//обновление значений под файлы
$('#upload-image')[0].value=''
$('#cover__pic')[0].value=''
//массив для файлов
let ArrayFile={}
//активация кнопок
function activeButton() {
    if (trigerActive) {
        return 1;
    }
    let timer=$('#timer')[0]
    let publish=$('#publish')[0]
    let draft=$('#draft')[0]

    $(timer.children[0]).addClass('active')

    $(timer.children[2]).addClass('active')
    $(timer.children[2].children[0]).addClass('active')
    $(timer.children[2].children[0].children[0]).addClass('active')

    $(publish.children[0]).addClass('active')
    $(draft.children[0]).addClass('active')

    $(timer.children[0]).click(function (e) { 
        e.preventDefault();
        $('.datepicker').toggle('timer-visibl')
    });

    let updateTime=''

    var constrained = new Datepicker('#constrained', {
        weekStart:1,
        time:true,
        min: (function(){
            var date = new Date();
            date.setDate(date.getDate()-1);
            return date;
        })(),
        max: (function(){
            var date = new Date();
            date.setDate(date.getDate() + 30);
            return date;
        })(),
        onChange:function (params) {
            if (params==undefined) {
                return ''
            }
            if (new Date()>params) {
                $('#errorDateModal').modal('show')
            }
            if (params!=undefined) {
                $(updateTime).remove()
                let timePublish=document.createElement('p')
                timePublish.id="timer-res"
                timePublish.classList.add('text--15-30')
                timePublish.innerText=params.getDate()+'.'+(params.getMonth()+1)+'.'+params.getFullYear()+' '+params.getHours()+':'+params.getMinutes()
                updateTime=timePublish
                timer.parentElement.appendChild(timePublish)

                $('.editor_article').click((e)=>{
                    e.preventDefault()
                    if(e.target!=timer && $('.datepicker')[0].attributes[1].value.split(' ')[$('.datepicker')[0].attributes[1].value.split(' ').length-1]=='timer-visibl')
                    {
                        $('.datepicker').removeClass('timer-visibl')
                    }
                })
                
            }
        }
    });

    $('.datepicker').addClass('timer-hide')

    function sendFormData(formData,link=''){
        
        //проверка входных значений
        if (!editor.getData() || 
        $('#upload-image')[0].files.length==0 || 
        $('#cover__pic')[0].files.length==0 || 
        $('#title_article').value=='' || 
        $('#brandItem')[0].value=='' ||
        $('#categoryArticl')[0].value=='' ||
        $('#tag_for_article')[0].value=='' 
        ) {
            return undefined
        }
        //передача данных формы
        const data=new FormData($(formData)[0]);

        // выдача даты и времени
        if ($('#constrained')[0].value!=undefined && $('#constrained')[0].value) {
            let separateDate=$('#constrained')[0].value.split('@')
            separateDate=[...separateDate[0].split('.'),...separateDate[1].split(':')]
            data.append('articleDate',new Date(separateDate[2], --separateDate[1],separateDate[0],separateDate[4],separateDate[3]))
        }
        else    
            data.append('articleDate',new Date())

        //выдача текста из редактора
        data.append('articleText', editor.getData())

        //добавление тригеров для водяного знака
        for(let el of data.entries()){
            if (el[0].indexOf('copy_')) {
                data.append('watermarkImgId', el[0].split('_')[1])
            }
        }

        //раскомментировать для рабоы с БД

        // return $.ajax({
        //     type: "post",
        //     url: link,
        //     data: data,
        //     dataType: "dataType",
        //     success: function (response) {
        //         return 'good'
        //     }
        // });

        return 'good'
    }

    //в sendFormData добавить ссылку на обработчик для чистовиков на бэке

    $('#publish').on('click', function(){
        if (sendFormData('.article__edit-form')==undefined) {
            $('#errorFormFill').modal('show')
        }else{
            console.log("Отправка завершена");
        }
    })

    //в sendFormData добавить ссылку на обработчик  для черновиков на бэке

    $('#draft').on('click', function(){
        if (sendFormData('.article__edit-form')==undefined) {
            $('#errorFormFill').modal('show')
        }else{
            console.log("Отправка завершена");
        }
    })
    

    trigerActive=!trigerActive
}
//загрузка изображения для обложки
function handleFileSelected(input) {
    
    let file = input.data[0].files[0]
    if(file){
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function () {
            $('#avatar').css('background-image', 'url('+reader.result+')'  )
            $('#avatar').css('background-size', '100%' )
            activeButton()
        }
    }
    
}

$(document).ready(function() {

    let uploadButton = document.getElementById("upload-image");
    let container = document.querySelector(".article__img-add");
    let error = document.getElementById("upload-error");
    let imageDisplay = document.getElementById("upload-preview");

    // счетчик
    var createCounter = function(n) {
        return () => n++;
    };

    const counter = createCounter(0)
    
    //добавление изображения на обложку
    $('#cover__pic').on("change", null, $('#cover__pic'), handleFileSelected)

    $('#tag_for_article').select2({
        closeOnSelect: false,
        placeholder:"Выберите из списка",
    })

    //добавление файлов к посту
    const fileHandler = (file, name, type) => {
        activeButton()
        if (type.split("/")[0] !== "image") {
            //File Type Error
            error.innerText = "Пожалуйста, выберите изображение";
            return false;
        }
        error.innerText = "";

        if(file.size/8/1024/1024 > 100){
            error.innerText = "Изображение не может весить больше 100 Мбайт";
            return false;
        } 

        let numberFile=counter()

        ArrayFile[numberFile]= file

        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            //изображение и имя файла 
            let imageContainer = document.createElement("figure");
            let img = document.createElement("img");
            img.src = reader.result;
            img.id =name.split('.')[0]
            imageContainer.appendChild(img);
            imageContainer.innerHTML += `<figcaption><div class="check__wrap m-0 article__copyrate">
                <input type="checkbox" name="copy_${numberFile}" id="copy_${numberFile}" >
                <label class="text--10-15" for="copy_${numberFile}">Поставить копирайт?</label>
            </div></figcaption>`;
            imageDisplay.appendChild(imageContainer);

            $(imageContainer).click((e)=>{
                if(e.target.localName=='img'){
                    let numberEl=e.target.parentElement.children[1].children[0].children[0].attributes.name.nodeValue.split('_')[1]

                    delete ArrayFile[numberEl]

                    e.target.parentElement.remove()
                }
            })
        };
    };

    uploadButton.addEventListener("change", () => {
    imageDisplay.innerHTML = "";
        if (uploadButton.files.length<=10) {
            Array.from(uploadButton.files).forEach((file) => {
                fileHandler(file, file.name, file.type);
            });    
        }else error.innerText = "Пожалуйста, выберите не больше 10 изображений";
    });

    container.addEventListener(
    "dragenter",
    (e) => {
        e.preventDefault();
        e.stopPropagation();
        container.classList.add("active");
    },
    false
    );

    container.addEventListener(
    "dragleave",
    (e) => {
        e.preventDefault();
        e.stopPropagation();
        container.classList.remove("active");
    },
    false
    );

    container.addEventListener(
    "dragover",
    (e) => {
        e.preventDefault();
        e.stopPropagation();
        container.classList.add("active");
    },
    false
    );

    container.addEventListener(
    "drop",
    (e) => {
        e.preventDefault();
        e.stopPropagation();
        container.classList.remove("active");
        let draggedData = e.dataTransfer;
        let files = draggedData.files;
        imageDisplay.innerHTML = "";
        if (files.length<=10) {
            Array.from(files).forEach((file) => {
                fileHandler(file, file.name, file.type);
            });
        }else  error.innerText = "Пожалуйста, выберите не больше 10 изображений";
    },
    false
    );

    window.onload = () => {
        error.innerText = "";
    };

    //создание элемента editor
    new Promise((resolve, reject) => {
        resolve(ClassicEditor
            .create( document.querySelector( '#editor' ), {
                toolbar: {
                    items: [ 
                        'undo', 'redo',
                        '|', 'bold', 'italic', 'strikethrough','fontColor',
                        '|','alignment', 'bulletedList', 'numberedList'
                    ],
                }
                } )
            .catch( error => {
                console.error( error );
            } ))
    }).then((val)=>{

        editor=val

        $('.ck-blurred').click(function (e) {
            e.preventDefault();
            activeButton()        
        })

        $('.persData').on("input",function (e) { 
            e.preventDefault();
            activeButton()
        });

        $('#title_article').click(function (e){
            activeButton()
        })

        $('.select-wrap').click(function (e){
            activeButton()
        })

        $('.check__wrap').click(function (e){
            activeButton()
        })

    })
})


