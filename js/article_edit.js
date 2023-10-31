let trigerActive=false
let editor={}

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
        $('.datepicker').removeClass('timer-hide')

        $('.datepicker').addClass('timer-visibl')

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
                    if(e.target!=timer)
                    {
                        $('.datepicker').addClass('timer-hide')
                        $('.datepicker').removeClass('timer-visibl')
                        $(document).off('click', $('.editor_article'))
                    }
                })
                
            }
        }
    });

    $('.datepicker').addClass('timer-hide')

    function sendFormData(formData,link=''){
        
        let json=''
        if (!editor.getData()) {
            return undefined
        }

        const data=new FormData($(formData)[0]);

        if ($('#constrained')[0].value!=undefined && $('#constrained')[0].value) {

            let separateDate=$('#constrained')[0].value.split('@')
            separateDate=[...separateDate[0].split('.'),...separateDate[1].split(':')]

            data.append('articleDate',new Date(separateDate[2], --separateDate[1],separateDate[0],separateDate[4],separateDate[3]))
        }
        else    
            data.append('articleDate',new Date())

        data.append('articleText', editor.getData())

        for (let pair of data.entries()) {
            if (pair[1]=="") {
                console.log(pair[0] + ', ' + pair[1]);
                data.delete(pair[0])
            }
        }
        for (let pair of data.entries()) {
            if (pair[1]=="") {
                console.log(pair[0] + ', ' + pair[1]);
                data.delete(pair[0])
            }
        }
        
        // file=data.get('cover__pic')
        // if (file) {
        //     console.log("Загруженный файл:", file.name);
        // }

        console.log(data);
        return json
    }

    $('#publish').on('click', function(){
        console.log(sendFormData('.article__edit-form'));
        if (sendFormData('.article__edit-form')==undefined) {
            $('#errorFormFill').modal('show')
        }
    })

    trigerActive=!trigerActive
}

$(document).ready(function() {

    $('#cover__pic').on("change", null, $('#cover__pic'), handleFileSelected)

    $('#tag_for_article').select2({
        closeOnSelect: false,
        placeholder:"Выберите из списка",
    })

    let uploadButton = document.getElementById("upload-image");
    let container = document.querySelector(".article__img-add");
    let error = document.getElementById("upload-error");
    let imageDisplay = document.getElementById("upload-preview");

    var createCounter = function(n) {
        return () => n++;
    };

    const counter = createCounter(0)

    let ArrayFile={}

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
            //image and file name
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

    //Upload Button
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


