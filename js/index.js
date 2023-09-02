$(document).ready(function() {

    jQuery.makeArray( $('.notice')).forEach(element => {
        if(Math.floor(Math.random() * 2)){
            $(element).css('display', 'block')
        }
    }) 

    $('#techChat').on('click',function(){
        location.replace('chatTech.html');
    })

    $('#saveProfile').on('click', function(){
        const data=new FormData($('.persData')[0]);
        file=data.get('form__pic')
        if (file) {
            console.log("Загруженный файл:", file.name);
        }
    })
})
