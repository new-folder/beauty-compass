if($('#viewChatBC').length){
    $('#viewChatBC').pagination({
        dataSource: [
            {
                nameUserProgram: 'Ник, весна 2025',
                date:'№ 876324876239847 от 22.08.2022',
                statusChat:'bing',
                descriptProgram: 'Причина обращения: Программа для сухой кожи на весну. Дополнительные решаемые задачи: потеря упругости, гиперпигментация'
            },
            {
                nameUserProgram: 'Ник, весна 2025',
                date:'№ 876324876239847 от 22.08.2022',
                statusChat:'unlockIcon',
                descriptProgram: 'Причина обращения: Программа для сухой кожи на весну. Дополнительные решаемые задачи: потеря упругости, гиперпигментация'
            },
            {
                nameUserProgram: 'Ник, весна 2025',
                date:'№ 876324876239847 от 22.08.2022',
                statusChat:'bing',
                descriptProgram: 'Причина обращения: Программа для сухой кожи на весну. Дополнительные решаемые задачи: потеря упругости, гиперпигментация'
            },
            {
                nameUserProgram: 'Ник, весна 2025',
                date:'№ 876324876239847 от 22.08.2022',
                statusChat:'unlockIcon',
                descriptProgram: 'Причина обращения: Программа для сухой кожи на весну. Дополнительные решаемые задачи: потеря упругости, гиперпигментация'
            },
            {
                nameUserProgram: 'Ник, весна 2025',
                date:'№ 876324876239847 от 22.08.2022',
                statusChat:'',
                descriptProgram: 'Причина обращения: Программа для сухой кожи на весну. Дополнительные решаемые задачи: потеря упругости, гиперпигментация'
            },
            {
                nameUserProgram: 'Ник, весна 2025',
                date:'№ 876324876239847 от 22.08.2022',
                statusChat:'',
                descriptProgram: 'Причина обращения: Программа для сухой кожи на весну. Дополнительные решаемые задачи: потеря упругости, гиперпигментация'
            },
            {
                nameUserProgram: 'Ник, весна 2025',
                date:'№ 876324876239847 от 22.08.2022',
                statusChat:'',
                descriptProgram: 'Причина обращения: Программа для сухой кожи на весну. Дополнительные решаемые задачи: потеря упругости, гиперпигментация'
            },
            {
                nameUserProgram: 'Ник, весна 2025',
                date:'№ 876324876239847 от 22.08.2022',
                statusChat:'',
                descriptProgram: 'Причина обращения: Программа для сухой кожи на весну. Дополнительные решаемые задачи: потеря упругости, гиперпигментация'
            },
            
        ],
        pageSize: 10,
        pageNumber: 1,
        pageRange: 0,
        callback: function(data, pagination) {
            var html = templatingItem(data);
            $('#viewChatBC').prev().html(html);
        }
    });
}

$('#them').select2({
    closeOnSelect: false,
    placeholder:"Выберите из списка",
    multiple: true,
    dropdownParent: $("#sendMess")
}
);

if($('#viewRez').length){
    $('#viewRez').pagination({
        dataSource: [
            {
                nameUserProgram: 'Ник, длииииииииииииииинное Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis temporibus quasi iure illum! Architecto a atque fugiat ratione autem numquam, mollitia nam dolores et veritatis iusto excepturi vero minima. Deleniti!',
                date:'22.08.2022'
            },
            {
                nameUserProgram: 'Ник, длииииииииииииииинное название теста',
                date:'22.08.2022'
            },
            {
                nameUserProgram: 'Ник, длииииииииииииииинное название теста',
                date:'22.08.2022'
            },{
                nameUserProgram: 'Ник, длииииииииииииииинное название теста',
                date:'22.08.2022'
            },{
                nameUserProgram: 'Ник, длииииииииииииииинное название теста',
                date:'22.08.2022'
            },{
                nameUserProgram: 'Ник, длииииииииииииииинное название теста',
                date:'22.08.2022'
            },{
                nameUserProgram: 'Ник, длииииииииииииииинное название теста',
                date:'22.08.2022'
            },{
                nameUserProgram: 'Ник, длииииииииииииииинное название теста',
                date:'22.08.2022'
            },{
                nameUserProgram: 'Ник, длииииииииииииииинное название теста',
                date:'22.08.2022'
            },
            {
                nameUserProgram: 'Ник, длииииииииииииииинное название теста',
                date:'22.08.2022'
            },
            {
                nameUserProgram: 'Ник, длииииииииииииииинное название теста',
                date:'22.08.2022'
            },
            {
                nameUserProgram: 'Ник, длииииииииииииииинное название теста',
                date:'22.08.2022'
            },
            {
                nameUserProgram: 'Ник, длииииииииииииииинное название теста',
                date:'22.08.2022'
            },
            {
                nameUserProgram: 'Ник, длииииииииииииииинное название теста',
                date:'22.08.2022'
            },
            {
                nameUserProgram: 'Ник, длииииииииииииииинное название теста',
                date:'22.08.2022'
            },
            {
                nameUserProgram: 'Ник, длииииииииииииииинное название теста',
                date:'22.08.2022'
            },
            {
                nameUserProgram: 'Ник, длииииииииииииииинное название теста',
                date:'22.08.2022'
            },
            {
                nameUserProgram: 'Ник, длииииииииииииииинное название теста',
                date:'22.08.2022'
            },{
                nameUserProgram: 'Ник, длииииииииииииииинное название теста',
                date:'22.08.2022'
            },{
                nameUserProgram: 'Ник, длииииииииииииииинное название теста',
                date:'22.08.2022'
            },{
                nameUserProgram: 'Ник, длииииииииииииииинное название теста',
                date:'22.08.2022'
            },{
                nameUserProgram: 'Ник, длииииииииииииииинное название теста',
                date:'22.08.2022'
            },{
                nameUserProgram: 'Ник, длииииииииииииииинное название теста',
                date:'22.08.2022'
            },{
                nameUserProgram: 'Ник, длииииииииииииииинное название теста',
                date:'22.08.2022'
            },
            {
                nameUserProgram: 'Ник, длииииииииииииииинное название теста',
                date:'22.08.2022'
            },
            {
                nameUserProgram: 'Ник, длииииииииииииииинное название теста',
                date:'22.08.2022'
            },
            {
                nameUserProgram: 'Ник, длииииииииииииииинное название теста',
                date:'22.08.2022'
            },
            {
                nameUserProgram: 'Ник, длииииииииииииииинное название теста',
                date:'22.08.2022'
            },
            {
                nameUserProgram: 'Ник, длииииииииииииииинное название теста',
                date:'22.08.2022'
            },
            {
                nameUserProgram: 'Ник, длииииииииииииииинное название теста',
                date:'22.08.2022'
            },
            {
                nameUserProgram: 'Ник, длииииииииииииииинное название теста',
                date:'22.08.2022'
            },
            {
                nameUserProgram: 'Ник, длииииииииииииииинное название теста',
                date:'22.08.2022'
            },
            {
                nameUserProgram: 'Ник, длииииииииииииииинное название теста',
                date:'22.08.2022'
            },
            {
                nameUserProgram: 'Ник, длииииииииииииииинное название теста',
                date:'22.08.2022'
            },
            {
                nameUserProgram: 'Ник, длииииииииииииииинное название теста',
                date:'22.08.2022'
            },
    
        ],
        pageSize: 5,
        pageNumber: 3,
        pageRange: 0,
        callback: function(data, pagination) {
            var html = templatingItem(data);
            $('#viewRez').prev().html(html);
        }
    })
}

function templatingItem(data) {
    html = '<ul>';
    data.forEach(element => {
        html += '<li class="">        <a href="" class="d-flex justify-content-between align-items-center '
        if(element.statusChat=='unlockIcon'){
            html+='unlockIcon'
        }
        html+=' ">           <div class="infProg">            <p class="title '
        if(element.statusChat){
            if(element.statusChat=='unlockIcon'){
                html+='unlockIcon'
            }
            else if(element.statusChat=='bing')
                html+='bing'
        }
            

        html+='">'+element.nameUserProgram+'</p> <small>'+element.date+'</small>'
        if(element.descriptProgram!=undefined){
            html+= '<p class="descr">'+element.descriptProgram+'</p>'
        }
        html+='</div></a> </li>';
    });
    html += '</ul>';

    return html;
}

$('.sendMessTech input#form__pic.file-input').on("change", null, $('#form__pic'), handleFileSelected)

function handleFileSelected(input) {

    console.log(input);

    var container=$(".previewImage")
    if(input.data[0])
        file = input.data[0].files
    else
        file = input[0].files

    if(file.length!=0){
        if (parseInt($fileUpload.get(0).files.length)>6){
            for (let index = 0; index < file.length; index++) {
                const element = file[index];
                let reader = new FileReader()
                reader.readAsDataURL(element)
                reader.onload = function () {
                    html='<div id="image_'+index+'"' 
                    html+='class="delImage addImage" '
                    html+='style="background-image:url('+reader.result+'); "></div>'
                    output=$(html)
                    output.on('click', delImg)
                    container[0].prepend(output[0]);
                    
                }
            }
        }
        else{
            
        }
    }

}

function delImg(image){
    this.remove()
    event.preventDefault()
}