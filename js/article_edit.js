ClassicEditor
        .create( document.querySelector( '#editor' ) )
        .catch( error => {
            console.error( error );
        } );

// var constrained = new Datepicker('#constrained', {

//     // 10 days in the future
//     max: (function(){
//         var date = new Date();
//         date.setDate(date.getDate() + 10);
//         return date;
//     })()
// });

$(document).ready(function() {

    // $('#saveProfile').on('click', function(){
    //     const data=new FormData($('.persData')[0]);
    //     file=data.get('cover__pic')
    //     if (file) {
    //         console.log("Загруженный файл:", file.name);
    //     }
    // })

    $('#cover__pic').on("change", null, $('#cover__pic'), handleFileSelected)

    $('#tag_for_article').select2({
        closeOnSelect: false,
        placeholder:"Выберите из списка",
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
        }
    }
    
}


