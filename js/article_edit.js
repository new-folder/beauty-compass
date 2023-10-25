import EditorJS from './editorjs';

// const editor = new EditorJS({
//     /**
//      * Id of Element that should contain Editor instance
//      */
//     holder: 'editorjs'
// });

$(document).ready(function() {

    $('#saveProfile').on('click', function(){
        const data=new FormData($('.persData')[0]);
        file=data.get('cover__pic')
        if (file) {
            console.log("Загруженный файл:", file.name);
        }
    })

    $('#cover__pic').on("change", null, $('#cover__pic'), handleFileSelected)

    // $('#activeIgnore').select2({
    //     closeOnSelect: false,
    //     placeholder:"Выберите из списка",
    // })

})

function handleFileSelected(input) {
    let file = input.data[0].files[0]
    if(file){
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function () {
            $('#avatar').css('background-image', 'url('+reader.result+')'  )
            $('#avatar').css('background-size', '100%' )
        }
    }
    
}


