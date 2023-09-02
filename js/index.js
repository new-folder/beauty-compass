$(document).ready(function() {

    jQuery.makeArray( $('.notice')).forEach(element => {
        if(Math.floor(Math.random() * 2)){
            $(element).css('display', 'block')
        }
    }) 

    $('#techChat').on('click',function(){
        location.replace('chatTech.html');
    })

    
})
