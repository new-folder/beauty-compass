
$('#view_comment').pagination({
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
            statusChat:'unlock-icon',
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
            statusChat:'unlock-icon',
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
        $('#view_comment').prev().html(html);
    }
});


function templatingItem(data) {
    html = '<ul>';
    
    data.forEach(element => {
        html += '<li class="">        <a href="#'
        if(element.statusChat=='unlock-icon'){
            html+='?lock'
        }
        html+= '" class="d-flex justify-content-between align-items-center '
        if(element.statusChat=='unlock-icon'){
            html+='unlock-icon'
        }
        html+=' "> <div class="infProg"> <p class="title '
        if(element.statusChat){
            if(element.statusChat=='unlock-icon'){
                html+='unlock-icon'
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