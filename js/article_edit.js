log=(el)=>{
    console.log(el)
}
//ссылка на хранилище изображений(путь нужен для загрузки шаблона, чтоб его потом не переделывать)
let linkForStorageImg=''
//проверка активации кнопок
let trigerActive=false
// проверка загрузки изображений
let trigerActiveUploadImg=false
//объект для содержимого текстового редактора
let editor={}
//обновление значений под файлы
$('#upload-image')[0].value=''
$('#cover__pic')[0].value=''
//временный массив для файлов
let ArrayFile={}
//массив для отправки на сервер с доп параметрами
let ArrayFileSendServ={}
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
        $('.datepicker').addClass('timer-visibl')

        let bcgDp=document.createElement('div')
        bcgDp.id='wallDatePicer'
        timer.appendChild(bcgDp)
        $('#wallDatePicer').click(()=>{
            $('.datepicker').removeClass('timer-visibl')
            bcgDp.remove()
        })

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

                let wrapTime=document.createElement('div')

                wrapTime.classList.add('d-flex','align-items-center','justify-content-between')
                wrapTime.id='timer-res-wrap'

                let timePublish=document.createElement('p')

                timePublish.id="timer-res"
                timePublish.classList.add('text--15-30')
                timePublish.innerText=params.getDate()+'.'+(params.getMonth()+1)+'.'+params.getFullYear()+' '+params.getHours()+':'+params.getMinutes()
                updateTime=timePublish

                wrapTime.appendChild(timePublish)

                wrapTime.appendChild(
                    (
                        function() {
                            let buttonCansel=document.createElement('div')
                            buttonCansel.id='btn-cansel'
                            buttonCansel.appendChild(
                                (function(){
                                    let p=document.createElement('p')
                                    p.innerText='х'
                                    p.classList.add('text--10-15')
    
                                    return p
                                }
                                )()
                            )

                            return buttonCansel
                        }
                    )()
                )

                timer.parentElement.appendChild(wrapTime)
                    
                $($(timer.parentElement)[0].children[$(timer.parentElement)[0].children.length-1].children[1]).click((e)=>{
                    e.preventDefault()
                    $('#constrained')[0].value=''
                    $('#timer-res-wrap').remove()
                })
            }
        }
    });

    $('.datepicker').addClass('timer-hide')

    function sendFormData(formData,link=''){
        
        function seacrhId(el){
            if(el.length!=0){
                if(el[0].id=="")
                    return true
            }
            else
                return false
        }

        //проверка входных значений
        if (
        (!editor[0].getData() || 
        (!seacrhId($('.carousel')) && !seacrhId($('.calage')))
        ) || 
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

        //выдача текста из редактора и изображений
        let globalText=''
        for (let index = 0; index < Object.keys(editor).length; index++) {
            const element = editor[index];
            globalText+=element.getData()
            if($($('#editor_'+index)[0].nextElementSibling)[0].nextElementSibling.id!='img-add'){
                let divClone=document.createElement('div')
                divClone.classList.add($($($('#editor_'+index)[0].nextElementSibling)[0].nextElementSibling)[0].classList[0])
                let startEl=0
                let endEl=0
                if(divClone.classList[0]=='carousel'){
                    startEl=1
                    endEl=$($($('#editor_'+index)[0].nextElementSibling)[0].nextElementSibling)[0].children.length-1
                }else{
                    endEl=$($($('#editor_'+index)[0].nextElementSibling)[0].nextElementSibling)[0].children.length
                }

                let countFile=createCounter(0)

                for (let j = startEl; j < endEl; j++) {
                    const element = $($($('#editor_'+index)[0].nextElementSibling)[0].nextElementSibling)[0].children[j];
                    const numberFile=countFile()

                    divClone.appendChild( (function (parent, name, link) {
                        let span=document.createElement('span')
                        let img=document.createElement('img')
                        
                        span.classList=parent.classList

                        img.alt=parent.children[0].alt

                        img.src=link+name

                        span.appendChild(img)

                        return span
                    })(element,ArrayFileSendServ[numberFile].name, linkForStorageImg))
                
                }

                // добавка обработки ссылок на изображения

                globalText+=divClone.outerHTML

            }
        }

        // смена путей для встроенного блока
        data.append('articleText', globalText)

        console.log(data);
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
            $('#successFormFill').modal('show')
        }
    })

    //в sendFormData добавить ссылку на обработчик  для черновиков на бэке

    $('#draft').on('click', function(){
        if (sendFormData('.article__edit-form')==undefined) {
            $('#errorFormFill').modal('show')
        }else{
            console.log("Отправка завершена");
            $('#successDraftFormFill').modal('show')
        }
    })
    

    trigerActive=!trigerActive
}
//загрузка изображения для обложки
function handleFileSelected(input) {
    activeButton()
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

function pass_gen(len=15) {
    chrs = 'abdehkmnpswxzABDEFGHKMNPQRSTWXZ123456789';
    var str = '';
    for (var i = 0; i < len; i++) {
        var pos = Math.floor(Math.random() * chrs.length);
        str += chrs.substring(pos,pos+1);
    }
    return str;
}
// счетчик
var createCounter = function(n) {
    return () => n++;
};
$(document).ready(function() {

    let uploadButton = document.getElementById("upload-image");
    let container = document.querySelector(".article__img-add");
    let error = document.getElementById("upload-error");
    let imageDisplay = document.getElementById("upload-preview");

    const counter = createCounter(0)
    
    //генерация select 2 
    $('#tag_for_article').select2({
        closeOnSelect: false,
        placeholder:"Выберите из списка",
    })

    //добавление файлов к посту
    const fileHandler = (file, name, type, numberFile) => {
        activeButton()
        //появление нужных кнопок и регистрация на них нажатия
        if(!trigerActiveUploadImg){

            $('#upload-func-btn').removeClass('d-none')

            $('#display_img').change(()=>{
                if($('#display_img')[0].value!='grid'){

                    for (let i = 0; i < $('#upload-preview')[0].children.length; i++) {
                        const el = $('#upload-preview')[0].children[i];

                        if(el.classList.contains('active')){
                            $(el).removeClass('active')
                        }
                    }

                    $('#upload-preview').removeClass('calage')
                    $('#upload-preview').addClass('carousel')
                    
                    $($('#upload-preview')[0].children[0]).addClass('active')

                    $('#upload-preview')[0].prepend((function(className){
                        let span=document.createElement('span')
                        let img=document.createElement('img')
                        img.src='../img/arrow-text.svg'
                        img.alt='Переход на след.страницу'
                        span.appendChild(img)
                        span.classList.add(className)
                        return span
                    })('carousel-prev'))

                    $('#upload-preview')[0].append((function(className){
                        let span=document.createElement('span')
                        let img=document.createElement('img')
                        img.src='../img/arrow-text.svg'
                        img.alt='Переход на след.страницу'
                        span.appendChild(img)
                        span.classList.add(className)
                        return span
                    })('carousel-next'))

                    for (let car of $('.carousel')) {

                        let indexActiv=1
                        
                        $(car.children[indexActiv]).addClass('active');
                
                        $(car.children[0]).click(()=>{
                            
                            if(indexActiv!=1){
                                $(car.children[indexActiv]).removeClass('active');
                
                                indexActiv--
                                $(car.children[indexActiv]).addClass('active');
                            }
                
                        })
                
                        $(car.children[car.children.length-1]).click(()=>{
                            
                            if(indexActiv<car.children.length-2){
                                $(car.children[indexActiv]).removeClass('active');
                
                                indexActiv++
                                $(car.children[indexActiv]).addClass('active');
                            }
                
                
                        })
                    }
                }else{

                    for (let i = 0; i < $('#upload-preview')[0].children.length; i++) {
                        const el = $('#upload-preview')[0].children[i];
                            
                        if(el.classList.contains('active')){
                            $(el).removeClass('active')
                        }
                        
                        if (!el.classList.contains('item')){
                            el.remove()
                            i--
                        }
                    }

                    $('#upload-preview').removeClass('carousel')
                    $('#upload-preview').addClass('calage')
                    
                    for(let cal of $('.calage')){

                        for (let span of cal.children) {
                
                            $(span).click(()=>{
                                $(span).toggleClass('active')
                            })
                
                        }
                    }
                }
            })

            trigerActiveUploadImg=true
        }   

        //если загрузили не изображение
        if (type.split("/")[0] !== "image") {
            error.innerText = "Пожалуйста, выберите изображение";
            return false;
        }
        error.innerText = "";
        //проверка размера изображения
        if(file.size/8/1024/1024 > 100){
            error.innerText = "Изображение не может весить больше 100 Мбайт";
            return false;
        } 

        //загрузка изображений
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            let outputImg=document.createElement('div')
            outputImg.classList.add('calage')

            //элемент изображений с копирайтом и прочее 
            let imageContainer = document.createElement("span");
            imageContainer.classList.add('item')

            let img = document.createElement("img");
            img.src = reader.result;
            img.id =name.split('.')[0]
            img.alt=name
            
            imageContainer.appendChild(img);
            
            let imgRemove=document.createElement('span')
            imgRemove.classList.add('item-rem')
            imgRemove.id=`item_${numberFile}`
            
            let iconRem=document.createElement('img')
            iconRem.src="../img/cansel-icon.svg"
            iconRem.alt="Удалить фото"

            imgRemove.appendChild(iconRem)
            
            imageContainer.appendChild(imgRemove)

            imageContainer.innerHTML += 
            `<div class="check__wrap m-0 article__copyrate">
                <input type="checkbox" name="copy_${numberFile}" id="copy_${numberFile}"  >
                <label class="text--10-15" for="copy_${numberFile}">Поставить копирайт?</label>
            </div>
            `;
            imageDisplay.appendChild(imageContainer);

            $(imageContainer)
            for(let item of $(imageContainer)[0].children){
                switch (item.localName) {
                    case "img":
                        $(item).click((e)=>{
                            let parent=e.delegateTarget.parentElement

                            if(!parent.parentElement.classList.contains('carousel'))
                                $(parent).toggleClass('active')

                        })
                        break;
                    case "span":
                        $(item).click((e)=>{
                            let parent=e.delegateTarget.parentElement
                            
                            if(parent.classList.contains('active')){
    
                                for (let i = 1; i < parent.parentElement.children.length-1; i++) {
                                    const element = parent.parentElement.children[i];

                                    if(parent.parentElement.children.length==3){
                                        $(parent.parentElement.children[parent.parentElement.children.length-1]).remove()
                                        $(parent.parentElement.children[0]).remove()
                                        break;
                                    }
                                    if(parent==element){
                                        switch (i) {
                                            case 1:
                                                $(parent.parentElement.children[i+1]).toggleClass('active')
                                                
                                                break;
                                            case parent.parentElement.children.length-2:
                                                $(parent.parentElement.children[i-1]).toggleClass('active')
                                                
                                                break;
                                            default:
                                                $(parent.parentElement.children[i-1]).toggleClass('active')
                                                break;
                                        }
                                    }
                                }

                            }

                            parent.remove()

                            delete ArrayFile[numberFile]
                        })
                        break;
                }
            }

        };
    };

    // вызов метода при изменении состояния input
    uploadButton.addEventListener("change", () => {

        if (Object.keys(ArrayFile).length+uploadButton.files.length <11) {
            imageDisplay.innerHTML = "";
            
            Array.from(uploadButton.files).forEach((file) => {
                let numberFile=counter()
                ArrayFile[numberFile]= file
            })

            for(const [keyFile, valueFile] of Object.entries(ArrayFile)){

                fileHandler(valueFile, valueFile.name, valueFile.type, keyFile);

            }
            $('#display_img')[0].value="grid"

            $(imageDisplay).removeClass('carousel')
            $(imageDisplay).addClass('calage')
        } else 
            error.innerText = "Пожалуйста, выберите не больше 10 изображений";
        
    });

    // эфффект когда мышь заходит над элементом
    container.addEventListener(
    "dragenter",
    (e) => {
        e.preventDefault();
        e.stopPropagation();
        container.classList.add("active");
    },
    false
    );

    // эффект при убирании курсора мыши с элемента
    container.addEventListener(
    "dragleave",
    (e) => {
        e.preventDefault();
        e.stopPropagation();
        container.classList.remove("active");
    },
    false
    );

    // эффект при наведении 
    container.addEventListener(
        "dragover",
        (e) => {
            e.preventDefault();
            e.stopPropagation();
            container.classList.add("active");
        },
        false
    );

    // добавление изображений когда файлы отпускают
    container.addEventListener(
    "drop",
    (e) => {
        e.preventDefault();
        e.stopPropagation();
        container.classList.remove("active");

        let draggedData = e.dataTransfer;
        let files = draggedData.files;

        imageDisplay.innerHTML = "";

        if (Object.keys(ArrayFile).length+files.length <11) {
            imageDisplay.innerHTML = "";
            
            Array.from(files).forEach((file) => {
                let numberFile=counter()
                ArrayFile[numberFile]= file
            })

            for(const [keyFile, valueFile] of Object.entries(ArrayFile)){

                fileHandler(valueFile, valueFile.name, valueFile.type, keyFile);

            }

            $('#display_img')[0].value="grid"

            $(imageDisplay).removeClass('carousel')
            $(imageDisplay).addClass('calage')

        } else 
            error.innerText = "Пожалуйста, выберите не больше 10 изображений";
    },
    false
    );

    window.onload = () => {
        error.innerText = "";
    };

    //создание элемента editor
    new Promise((resolve, reject) => {
        resolve(ClassicEditor
            .create( document.querySelector( '#editor_0' ), {
                } )
            .catch( error => {
                console.error( error );
            } ))
    }).then((val)=>{

        $('.ck-body-wrapper').remove()
        
        editor[Object.keys(editor).length]=val

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

        //добавление изображения на обложку
        $('#cover__pic').on("change", null, $('#cover__pic'), handleFileSelected)

        $('.check__wrap').click(function (e){
            activeButton()
        })

    })

    $('#upload-btn').click((e)=>{
        e.preventDefault()

        if(imageDisplay.children.length==0){
            error.innerText="Нужно загрузить хотя бы одну фотографию"
        }else{
            error.innerText=""
            let div=document.createElement('div')
            div.classList.add(imageDisplay.classList[0])
            
            const counterFileServ = createCounter(0)
    
            for(let spanPar of imageDisplay.children){
                let span=document.createElement('span')
                span.classList=spanPar.classList
                for(let file of spanPar.children){
                    switch (file.localName) {
                        case "img":
                            span.appendChild(file)
                            break;
                        case "div":
                            let numFile=counterFileServ()

                            if($(file.children[0])[0].checked){
                                ArrayFileSendServ[numFile]={
                                    'file':ArrayFile[$(file.children[0])[0].id.split('_')[1]],
                                    'copyright':true,
                                    'name':pass_gen()+"."+ArrayFile[$(file.children[0])[0].id.split('_')[1]].name.split('.')[1]
                                }
                            }else{
                                ArrayFileSendServ[numFile]={
                                    'file':ArrayFile[$(file.children[0])[0].id.split('_')[1]],
                                    'copyright':false,
                                    'name':pass_gen()+"."+ArrayFile[$(file.children[0])[0].id.split('_')[1]].name.split('.')[1]
                                }
                            }
                            break;
                        default:
                            break;
                    }
    
                }
                div.appendChild(span)
            }
            ArrayFile={}
            imageDisplay.innerHTML=''
    
            $($('#editor_'+(Object.keys(editor).length-1))[0].nextElementSibling).after(div)
    
            let divForEditor=document.createElement('div')

            let indexActiv=1
            
            for (let index = 1; index < div.children.length-1; index++) {
                $(div.children[index]).removeClass('active');
            }
            if(div.classList.contains('carousel')){

                $(div.children[indexActiv]).addClass('active');
            }
    
            $(div.children[0]).click(()=>{
                
                if(indexActiv!=1){
                    $(div.children[indexActiv]).removeClass('active');
    
                    indexActiv--
                    $(div.children[indexActiv]).addClass('active');
                }
    
            })
    
            $(div.children[div.children.length-1]).click(()=>{
                
                if(indexActiv<div.children.length-2){
                    $(div.children[indexActiv]).removeClass('active');
    
                    indexActiv++
                    $(div.children[indexActiv]).addClass('active');
                }

            })
    
            divForEditor.id=`editor_${Object.keys(editor).length}`
            $(div).after(divForEditor)
            new Promise((resolve, reject) => {
                resolve(ClassicEditor
                    .create( document.querySelector( '#editor_'+(Object.keys(editor).length) ), {
                        } )
                    .catch( error => {
                        console.error( error );
                    } ))
            }).then((val)=>{
                $('.ck-body-wrapper').remove()
                
                editor[Object.keys(editor).length]=val
            })
        }


    })
})


