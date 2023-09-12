$(document).ready(function() {

    jQuery.makeArray( $('.notice')).forEach(element => {
        if(Math.floor(Math.random() * 2)){
            $(element).css('display', 'block')
        }
    }) 

    $('#techChat').on('click',function(){
        location.replace('chat-tech.html');
    })

    $('#chat').on('click',function(){
        location.replace('chat-persons.html');
    })

    $('#saveProfile').on('click', function(){
        const data=new FormData($('.persData')[0]);
        file=data.get('form__pic')
        if (file) {
            console.log("Загруженный файл:", file.name);
        }
    })

    $('#form__pic').on("change", null, $('#form__pic'), handleFileSelected)
    
    $('#visPassword').on('click',function(){
        event.preventDefault()
        if($('.passwordInput')[0].type=='password'){
            $('#visPassword').css('background-image','url("../img/eye_hide.svg")');
            $('.passwordInput')[0].type='text'
        }
        else{
            $('.passwordInput')[0].type='password'
            $('#visPassword').css('background-image','url("../img/eye_show.svg")');
        } 
    })

    $('#visPasswordRep').on('click',function(){
        event.preventDefault()
        if($('.passwordRepitInput')[0].type=='password'){
            $('#visPasswordRep').css('background-image','url("../img/eye_hide.svg")');
            $('.passwordRepitInput')[0].type='text'
        }
        else{
            $('#visPasswordRep').css('background-image','url("../img/eye_show.svg")');
            $('.passwordRepitInput')[0].type='password'
        } 
    })

    $('#changeProfile').on('click', function(){
        $('#confidInfPerson').css('display','grid')
        $('#changeProfile').css('display','none')
        $('.redPrfile').css('display', 'block')
        $('.visPrfile').css('display', 'none')
        $('#ava').css('display', 'block')
        $('#ava').css('width', '90%')
        $('#avatar').css('width','100%')
        if(window.innerWidth<1440)        $('#saveProf').css('display','block')
        else        $('#saveProfile').css('display','flex')
    })

    $('#saveProf').on('click', function(){
        $('#confidInfPerson').css('display','flex')
        $('#changeProfile').css('display','flex')
        $('.redPrfile').css('display', 'none')
        $('.visPrfile').css('display', 'block')
        $('#ava').css('display', 'block')
        if(window.innerWidth<1440)        $('#ava').css('width', '50%')
        else        $('#ava').css('width', '30%')
        $('#avatar').css('width','50%')

        $('#saveProf').css('display','none')
    })

    $('#saveProfile').on('click', function(){
        $('#confidInfPerson').css('display','flex')
        $('#changeProfile').css('display','flex')
        $('.redPrfile').css('display', 'none')
        $('.visPrfile').css('display', 'block')
        $('#ava').css('display', 'block')

        if(window.innerWidth<1440)        $('#ava').css('width', '50%')
        else        $('#ava').css('width', '30%')

        $('#avatar').css('width','50%')
        $('#saveProfile').css('display','none')
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
