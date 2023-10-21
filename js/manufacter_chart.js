function templatingItem(data) {
    let html=''

    html = '<ul>';
    data.forEach(element => {

        html+='<li class="output__statistic-wrap">'
        html+='<div class="container container--bc">'
        html+='    <div class="col-xxl-10 offset-xxl-1">'
        html+='        <div class="item item__inside">'
        html+='            <div class="item__image-view">'
        html+='                <img src="../img/'+element.image+'" alt="'+element.mainTitle+'">'
        html+='            </div>'
        html+='            <div class="item__title">'
        html+='                <p class="text--15-30">'
        html+=element.mainTitle
        html+='                </p>'
        html+='                <p class="text--15-24">'
        html+=element.subTitle
        html+='                </p>'
        html+='            </div>'
        html+='            <div class="item__rating-value rating__body">'
        
        //высчитывание рейтинга

        html+='                <div class="rating__active" style="width: '+element.rating+'%;"></div>'

        html+='            </div>'
        html+='            <div class="item__statistic-number d-flex align-items-center">'
        html+='                <div class="item__statistic-number__element">'
        html+='                    <img src="../img/favorite-heart.svg" alt="Добавленией в избранное">'
        html+='                    <span class="text--15-24">'+element.like+'</span>'
        html+='                </div>'
        html+='                <div class="item__statistic-number__element">'
        html+='                    <img src="../img/like-tag.svg" alt="Поставили нравиться">'
        html+='                    <span class="text--15-24">'+element.positRevi+'</span>'
        html+='                </div>'
        html+='                <div class="item__statistic-number__element">'
        html+='                    <img src="../img/message-question.svg" alt="Заданные вопросы">'
        html+='                    <span class="text--15-24">'+element.question+'</span>'
        html+='                </div>'
        html+='                <div class="item__statistic-number__element">'
        html+='                    <img src="../img/grey_eye.svg" alt="Показатель просмотров">'
        html+='                    <span class="text--15-24">'+element.views+'</span>'
        html+='                </div>'
        html+='            </div>'
        html+='            <div class="item__btn">'

        // вывод всех магазинов где расположен товар
        element.linkShop.forEach(shop => {
            
            html+='                <a href="'+shop.link+'" class="btn">'
            html+='                    <p class="text--12-18">'
            html+=shop.name
            html+='                    </p>'
            html+='                </a>'
        });

        html+='            </div>'
        html+='        </div>'
        html+='    </div>'
        html+='</div>'
        html+='    <div class="item__chart">'
        html+='<div class="container container--bc">'
        html+='    <div class="col-xxl-10 offset-xxl-1">'
        html+='        <div class="open_chart">'
        html+='            <p class="text--15-30" >График</p>'
        html+='<svg viewBox="0 0 15 7"  >'
        html+='<path d="M14.1304 0.80744C14.1304 0.957419 14.0734 1.1074 13.9511 1.2258L8.63719 6.37246C7.77327 7.20918 6.35513 7.20918 5.49121 6.37246L0.177267 1.2258C-0.059089 0.996887 -0.059089 0.617993 0.177267 0.389077C0.413623 0.160161 0.804834 0.160161 1.04119 0.389077L6.35513 5.53573C6.74634 5.91462 7.38206 5.91462 7.77327 5.53573L13.0872 0.389077C13.3236 0.160161 13.7148 0.160161 13.9511 0.389077C14.0652 0.507482 14.1304 0.657461 14.1304 0.80744Z" fill="#1560BD"/>'
        html+='</svg>'
        html+='            <input type="hidden" name="id_item" value="'+element.id+'">'
        html+='        </div>'
        html+='        <div class="chart output_chart_id_item">'
        html+='            <input type="hidden" name="openTrig" value=false>'
        html+='        </div>'
        html+='    </div>'
        html+='        </div>'
        html+='    </div>'
        html+='</li>'
    });
    html += '</ul>';
    
    return html;
}

function fetchJSONFile(path, callback) {
    //path ссыллка на ресурс получения
    //callback что делать с полученными данными
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                var data = JSON.parse(httpRequest.responseText);
                if (callback) callback(data);
            }
        }
    };
    httpRequest.open('GET', path);
    httpRequest.send(); 
}

function getNameMount(number) {
    let arrayMounth=[
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь',
    ]
    return arrayMounth[number]
}
var countAtrrClick={
    rating:false,
    view:false,
    visit:false,
    favarite:false,
    new:false,
}

Chart.defaults.borderColor = '#fff';
Chart.defaults.color = '#fff';

function viewsItems(linkToBD, sort='', key='mounth') {

    var answerJson=[]
    
    fetchJSONFile(linkToBD, function(data){
    
        if (sort!='') {
            switch (sort) {
                case 'rating':
                    (countAtrrClick.rating ) ? answerJson=data.cosmetics.sort((x,y)=>x.rating-y.rating) : answerJson=data.cosmetics.sort((x,y)=>y.rating-x.rating)
                    countAtrrClick.rating=!countAtrrClick.rating

                    break;
                case 'view':
                    (countAtrrClick.view ) ? answerJson=data.cosmetics.sort((x,y)=>x.views-y.views) : answerJson=data.cosmetics.sort((x,y)=>y.views-x.views)
                    countAtrrClick.view=!countAtrrClick.view

                    break;
                case 'visit':
                    (countAtrrClick.visit ) ? answerJson=data.cosmetics.sort((x,y)=>x.visitAll-y.visitAll) : answerJson=data.cosmetics.sort((x,y)=>y.visitAll-x.visitAll)
                    countAtrrClick.visit=!countAtrrClick.visit

                    break;
                case 'favarite':
                    (countAtrrClick.favarite ) ? answerJson=data.cosmetics.sort((x,y)=>x.like-y.like) : answerJson=data.cosmetics.sort((x,y)=>y.like-x.like)
                    countAtrrClick.favarite=!countAtrrClick.favarite

                    break;
                case 'new':
                    (countAtrrClick.new ) ? answerJson=data.cosmetics.sort((x,y)=>new Date(x.dateCreate)-new Date(y.dateCreate)) : answerJson=data.cosmetics.sort((x,y)=>new Date(y.dateCreate)-new Date(x.dateCreate))
                    countAtrrClick.new=!countAtrrClick.new

                    break;
            }
        }else answerJson=data.cosmetics
    
        if($('#viewCosmeticChart').length){
            $('#viewCosmeticChart').pagination({
                dataSource:answerJson,
                pageSize: 50,
                pageNumber: 1,
                pageRange: 1,
                callback: function(item, pagination) {
                    var html = templatingItem(item);
                    $('#viewCosmeticChart').prev().html(html);

                    $(".open_chart").click(function (elem) { 

                        $(elem.currentTarget.parentElement.parentElement.parentElement).toggleClass("item__chart-open");

                        $(elem.currentTarget.nextElementSibling).toggleClass("chart-open")

                        elem.currentTarget.nextElementSibling.classList[2] ?
                            $(elem.currentTarget.children[0]).css('color','#FAFAFA') :
                            $(elem.currentTarget.children[0]).css('color','#1560BD')

                        let idElem=elem.currentTarget.children[2].value

                        let charts = item[idElem].chart
                        
                        let canvas = document.createElement('canvas')

                        let dataOutpChart={
                            labels:[],
                            datasets:[]
                        }

                        switch (key) {
                            case 'mounth':
                                //Получение месяца
                                let activeMount=-1
                                charts[0].data.forEach(el => {

                                    let arrayWithDate=[]
                                    
                                    for (let i = 0; i < el.x.split('.').length; i++) {
                                        let element = Number(el.x.split('.')[i]);
                                        if (i==1) 
                                            arrayWithDate.push(element-1)
                                        else
                                            arrayWithDate.push(element)
                                    }

                                    if (activeMount==-1 || activeMount!=arrayWithDate[1]) {
                                        activeMount=arrayWithDate[1]
                                        dataOutpChart.labels.push( getNameMount(arrayWithDate[1])+ ' ' + arrayWithDate[2] )
                                    }
                                    
                                });
                                //получение данных на каждый месяц
                                activeMount=-1
                                charts.forEach(chart => {
                                    let data=[]
                                    chart.data.forEach(el => {
                                        if (activeMount==-1 || activeMount!=Number(el.x.split('.')[1])) {
                                            activeMount=Number(el.x.split('.')[1])
                                            data.push(el.y)
                                        }else
                                            data[data.length-1] += el.y 
                                        
                                    });
                                    
                                    dataOutpChart.datasets.push({
                                        label: chart.name,
                                        data: data,
                                    })
                                });
                                console.log(dataOutpChart);
                                break;
                            case 'week':
                                
                                break;
                            case 'day':
                                
                                break;
                        }

                        // dataOutpChart={
                        //     datasets:[
                        //         {
                        //             label: 'Просмотры',
                        //             data: charts[0].data.map(el=>el.y),
                        //         },
                        //         {
                        //             label: 'Отзывы',
                        //             data: charts[1].data.map(el=>el.y),
                        //         },
                        //         {
                        //             label: 'Избранное',
                        //             data: charts[2].data.map(el=>el.y),
                        //         },
                        //         {
                        //             label: 'Переходы на маркетплейсы',
                        //             data: charts[3].data.map(el=>el.y),
                        //         },
                        //         {
                        //             label: 'Переходы на страницу бренда',
                        //             data: charts[4].data.map(el=>el.y),
                        //         },
                        //     ]
                        // }

                        if (elem.currentTarget.nextElementSibling.firstElementChild.value=="false") {
                            elem.currentTarget.nextElementSibling.append(canvas);
                            const chart=new Chart(canvas,{
                                type:'line',
                                data:dataOutpChart,
                                borderColor: '#fff',
                                color:'#fff',
                                options: {
                                    maintainAspectRatio: false,
                                }
                            })

                            elem.currentTarget.nextElementSibling.firstElementChild.value=true
                        } else {
                            $(elem.currentTarget.nextElementSibling.children[1]).remove();
                            elem.currentTarget.nextElementSibling.firstElementChild.value=false
                        }
                    });
                }
            })
        }
    });
}

$('.rating').click(function(el) {
    el.preventDefault();
    viewsItems("../manufacturer-lk__charts/all_cosmetics_manufacter.json",'rating')

})
$('.view').click(function(el) {
    el.preventDefault();
    viewsItems("../manufacturer-lk__charts/all_cosmetics_manufacter.json",'view')

})
$('.visit').click(function(el) {
    el.preventDefault();
    viewsItems("../manufacturer-lk__charts/all_cosmetics_manufacter.json",'visit')

})
$('.favarite').click(function(el) {
    el.preventDefault();
    viewsItems("../manufacturer-lk__charts/all_cosmetics_manufacter.json",'favarite')

})
$('.new').click(function(el) {
    
    el.preventDefault();
    viewsItems("../manufacturer-lk__charts/all_cosmetics_manufacter.json",'new')

})
$('#default').click(function(el) {
    el.preventDefault();
    viewsItems("../manufacturer-lk__charts/all_cosmetics_manufacter.json")

})

if ($('#allItems')=='') {
    
    fetchJSONFile("../manufacturer-lk__charts/all_cosmetics_manufacter.json", function(data){
    
        let cosmetics=[]
        data.cosmetics.forEach(cosmetic => {
            if (cosmetics.length==0) {
                cosmetic.chart.forEach(chart_el => {
                    cosmetics.push(chart_el)
                });
            }else{
                for (let i = 0; i < cosmetic.chart.length; i++) {
                    const el = cosmetic.chart[i];
                    if (el.name==cosmetics[i].name) 
                        for (let j = 0; j < cosmetics[i].data.length; j++) {
                            try {
                                cosmetics[i].data[j].y+=el.data[j].y
                            } catch (error) {
                                
                            }
                        }
                }
            }
        });
    
        let dataOutpChart={
            labels:cosmetics[0].data.map(el=>el.x),
            datasets:[
                {
                    label: 'Просмотры',
                    data: cosmetics[0].data.map(el=>el.y),
                },
                {
                    label: 'Отзывы',
                    data: cosmetics[1].data.map(el=>el.y),
                },
                {
                    label: 'Избранное',
                    data: cosmetics[2].data.map(el=>el.y),
                },
                {
                    label: 'Переходы на маркетплейсы',
                    data: cosmetics[3].data.map(el=>el.y),
                },
                {
                    label: 'Переходы на страницу бренда',
                    data: cosmetics[4].data.map(el=>el.y),
                },
            ]
        }
        
        const chart=new Chart($('#allItems'),{
            type:'line',
            data:dataOutpChart,
            options: {
                maintainAspectRatio: false,
            }})
    })
}


viewsItems("../manufacturer-lk__charts/all_cosmetics_manufacter.json")