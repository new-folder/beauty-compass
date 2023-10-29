let trigerActive=false

function activeButton() {
    if (trigerActive) {
        return 1;
    }
    let timer=$('#timer')[0]
    let publish=$('#publish')[0]
    let draft=$('#draft')[0]

    $(timer.children[0]).addClass('active')
    $(timer.children[2].children[0]).addClass('active')
    $(timer.children[2].children[0].children[0]).addClass('active')

    $(publish.children[0]).addClass('active')
    $(draft.children[0]).addClass('active')

    timer.click(function (e) { 
        e.preventDefault();
        $('.datepicker').toggleClass('d-block')
        $('.datepicker').toggleClass('d-none')
    });

    // $('#saveProfile').on('click', function(){
    //     const data=new FormData($('.persData')[0]);
    //     file=data.get('cover__pic')
    //     if (file) {
    //         console.log("Загруженный файл:", file.name);
    //     }
    // })

    trigerActive=!trigerActive
}

$(document).ready(function() {

    $('.persData').on("input",function (e) { 
        e.preventDefault();
        activeButton()
    });

    $('#cover__pic').on("change", null, $('#cover__pic'), handleFileSelected)

    $('#tag_for_article').select2({
        closeOnSelect: false,
        placeholder:"Выберите из списка",
    })

    ClassicEditor
        .create( document.querySelector( '#editor' ), {
            image: {
                toolbar: [
                    'toggleImageCaption',
                    'imageTextAlternative',
                    '|',
                    'imageStyle:inline',
                    'imageStyle:block',
                    'imageStyle:side',
                    'imageResize'
                ]
            }
        } )
        .catch( error => {
            console.error( error );
        } );

    var constrained = new Datepicker('#constrained', {
        weekStart:1,
        max: (function(){
            var date = new Date();
            date.setDate(date.getDate() + 30);
            return date;
        })()
    });

    $('.datepicker').toggleClass('d-none')
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


