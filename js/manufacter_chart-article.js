const linkToBDMain="../manufacturer-lk__charts/all_articles_manufacter.json"
function templatingItem(data) {
    let html=''

    html = '<ul>';
    data.forEach(element => {
        html+='<li class="output__statistic-wrap">'
        html+='    <div class="container container--bc"> '   
        html+='        <div class="col-xxl-10 offset-xxl-1">   '     
        html+='            <div class="item item__inside-article">'            
        html+='                <div class="item__title">   '             
        html+='                    <p class="text--15-30">'+element.mainTitle+'</p> '           
        html+='                </div>'
        html+='                <div class="item__logo-avtor mb-2">'        
        html+='                    <div class="item__logo">'
        html+='                        <img src="../img/logo-blue.svg" alt="beauty compas">'
        html+='                    </div>        '
        html+='                    <div class="item__avtor">'
        html+='                        <p class="text--15-30">'+element.author+'</p>  '          
        html+='                    </div>  '
        html+='                </div> '
        html+='                <div class="item__statistic-number d-flex align-items-center">'
        html+='                    <div class="item__statistic-number__element">                    '
        html+='                        <img src="../img/like.svg" alt="Сохранили в избранное">                    '
        html+='                        <span class="text--15-24">'+element.viewsAll+'</span>                '
        html+='                    </div>                '
        html+='                    <div class="item__statistic-number__element">                    '
        html+='                        <img src="../img/favorite-heart.svg" alt="Поставили нравиться">                    '
        html+='                        <span class="text--15-24">'+element.commentsAll+'</span>                '
        html+='                    </div>                '
        html+='                    <div class="item__statistic-number__element">                    '
        html+='                        <img src="../img/message-question.svg" alt="Комментарии">                    '
        html+='                        <span class="text--15-24">'+element.favariteAll+'</span>                '
        html+='                    </div>                '
        html+='                    <div class="item__statistic-number__element">                    '
        html+='                        <img src="../img/grey_eye.svg" alt="Показатель просмотров">                    '
        html+='                        <span class="text--15-24">'+element.likeAll+'</span>                '
        html+='                    </div>            '
        html+='                </div>'
        html+='    <div class="item__chart">'
        html+='        <div class="open_chart">'
        html+='            <p class="text--15-30" >График</p>'
        html+='<svg viewBox="0 0 15 7"  >'
        html+='<path d="M14.1304 0.80744C14.1304 0.957419 14.0734 1.1074 13.9511 1.2258L8.63719 6.37246C7.77327 7.20918 6.35513 7.20918 5.49121 6.37246L0.177267 1.2258C-0.059089 0.996887 -0.059089 0.617993 0.177267 0.389077C0.413623 0.160161 0.804834 0.160161 1.04119 0.389077L6.35513 5.53573C6.74634 5.91462 7.38206 5.91462 7.77327 5.53573L13.0872 0.389077C13.3236 0.160161 13.7148 0.160161 13.9511 0.389077C14.0652 0.507482 14.1304 0.657461 14.1304 0.80744Z" fill="#1560BD"/>'
        html+='</svg>'
        html+='            <input type="hidden" name="id_item" value="'+element.id+'">'
        html+='        </div>'
        html+='    </div>'
        html+='</div>'        
        html+='</div>'
        html+='</div>'
        html+='<div class="item__chart-open item__chart-open-brand">'
            html+='<div class="container container--bc">'
            html+='<div class="col-xxl-10 offset-xxl-1">'
                html+='<div class="chart output_chart_'+element.id+'">'
                    html+='<input type="hidden" name="openTrig" value=false>'
                html+='</div>'
            html+='</div>'
            html+='</div>'
        html+='</div>'
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
        'Май',
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
function getNameLabelProduct(name) {
    let arrayMounth={
        "views":'Просмотры',
        "favarite":'Добавлено в избранное',
        "comments":'Написано комментариев',
        "like":'Поставлено оценок "Нравится"',
    }
    return arrayMounth[name]
}

function getNumberOfDays(start, end) {
    const date1 = new Date(start);
    const date2 = new Date(end);

    // One day in milliseconds
    const oneDay = 1000 * 60 * 60 * 24;

    // Calculating the time difference between two dates
    const diffInTime = date2.getTime() - date1.getTime();

    // Calculating the no. of days between two dates
    const diffInDays = Math.round(diffInTime / oneDay);

    return diffInDays;
}

function generateChart(charts, blockOutput, period) {
    
    let dataOutpChart={
        labels:[],
        datasets:[]
    }

    let activeMount=-1
    switch (period) {
        case 'all':
            //Получение месяца
            activeMount=-1
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
                    label: getNameLabelProduct(chart.name),
                    data: data,
                })
            });
            break;
        case 'last_year':
            activeMount=-1
            charts[0].data.forEach(el => {
                if (charts[0].data.indexOf(el)>(charts[0].data.indexOf(charts[0].data[charts[0].data.length-1])-365)) {

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
                }

            });
            //получение данных на каждый месяц
            activeMount=-1
            charts.forEach(chart => {
                let dataPush=[]
                chart.data.forEach(el => {
                    if (chart.data.indexOf(el)>(chart.data.indexOf(chart.data[chart.data.length-1])-365)) {
                        
                        if (activeMount==-1 || activeMount!=Number(el.x.split('.')[1])) {
                            activeMount=Number(el.x.split('.')[1])
                            dataPush.push(el.y)
                        }else{
                            dataPush[dataPush.length-1] += el.y 
                        }
                    }
                });

                activeMount=-1

                dataOutpChart.datasets.push({
                    label: getNameLabelProduct(chart.name),
                    data: dataPush,
                })
            });
            break;
        case 'last_half_year':
            activeMount=-1
            charts[0].data.forEach(el => {
                if (charts[0].data.indexOf(el)>(charts[0].data.indexOf(charts[0].data[charts[0].data.length-1])-183)) {

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
                }

            });
            //получение данных на каждый месяц
            activeMount=-1
            charts.forEach(chart => {
                let dataPush=[]
                chart.data.forEach(el => {
                    if (chart.data.indexOf(el)>(chart.data.indexOf(chart.data[chart.data.length-1])-183)) {
                        
                        if (activeMount==-1 || activeMount!=Number(el.x.split('.')[1])) {
                            activeMount=Number(el.x.split('.')[1])
                            dataPush.push(el.y)
                        }else{
                            dataPush[dataPush.length-1] += el.y 
                        }
                    }
                });

                activeMount=-1

                dataOutpChart.datasets.push({
                    label: getNameLabelProduct(chart.name),
                    data: dataPush,
                })
            });
            break;
        case 'three_months':
            //Получение недели
            let activeWeek=[]
            let arrayWithDate=[]
            let forSearch=[]

            for (let i = 0; i < charts[0].data[charts[0].data.length-1].x.split('.').length; i++) {
                let element = Number(charts[0].data[charts[0].data.length-1].x.split('.')[i]);
                forSearch.push(element)
            }

            charts[0].data.forEach(el => {
                if (charts[0].data.indexOf(el)>(charts[0].data.indexOf(charts[0].data[charts[0].data.length-1])-92)) {
                    arrayWithDate=[]
                    
                    for (let i = 0; i < el.x.split('.').length; i++) {
                        let element = Number(el.x.split('.')[i]);
                        arrayWithDate.push(element)
                    }

                    if (activeWeek[0]==undefined || 7==getNumberOfDays(activeWeek[2]+'-'+activeWeek[1]+'-'+activeWeek[0],arrayWithDate[2]+'-'+arrayWithDate[1]+'-'+arrayWithDate[0]) || (arrayWithDate[0]==forSearch[0] && arrayWithDate[1]==forSearch[1] && arrayWithDate[2]==forSearch[2])) {
                        if (activeWeek[0]!=undefined) {
                            dataOutpChart.labels.push( activeWeek[0]+'.'+activeWeek[1]+'.'+activeWeek[2]+'-'+ arrayWithDate[0]+'.'+arrayWithDate[1]+'.'+arrayWithDate[2])
                            
                        }
                        activeWeek=[arrayWithDate[0]+1,arrayWithDate[1],arrayWithDate[2]]
                    }
                }
                
            });
            //получение данных на каждой неделе
            activeWeek=[]
            charts.forEach(chart => {
                let data=[]

                chart.data.forEach(el => {
                    if (chart.data.indexOf(el)>(chart.data.indexOf(chart.data[chart.data.length-1])-92)) {
                        arrayWithDate=[]
                    
                        for (let i = 0; i < el.x.split('.').length; i++) {
                            let element = Number(el.x.split('.')[i]);
                            arrayWithDate.push(element)
                        }
                        
                        if (activeWeek[0]==undefined || 7==getNumberOfDays(activeWeek[2]+'-'+activeWeek[1]+'-'+activeWeek[0],arrayWithDate[2]+'-'+arrayWithDate[1]+'-'+arrayWithDate[0])) {
                            activeWeek=[arrayWithDate[0]+1,arrayWithDate[1],arrayWithDate[2]]
                            data.push(el.y)
                        }else
                            data[data.length-1] += el.y

                    }
                    
                });
                activeWeek=[]
                dataOutpChart.datasets.push({
                    label: getNameLabelProduct(chart.name),
                    data: data,
                })
            });
            break;
        case 'day':
            charts[0].data.forEach(el => {
                let arrayWithDate=[]
                if (charts[0].data.indexOf(el)>(charts[0].data.indexOf(charts[0].data[charts[0].data.length-1])-32)) {
                    dataOutpChart.labels.push( el.x )
                
                }

            });
            //получение данных на каждый месяц
            charts.forEach(chart => {
                let data=[]
                chart.data.forEach(el => {
                    if (chart.data.indexOf(el)>(chart.data.indexOf(chart.data[chart.data.length-1])-32)) {
                        data.push(el.y)
                    }
                });
                
                dataOutpChart.datasets.push({
                    label: getNameLabelProduct(chart.name),
                    data: data,
                })
            });
            break;
    }
    const chart=new Chart(blockOutput,{
        type:'line',
        data:dataOutpChart,
        borderColor: '#fff',
        color:'#fff',
        options: {
            maintainAspectRatio: false,
        }
    })
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

function viewsItems(linkToBD, sort='',outputBlock='' ) {

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
        }else answerJson=data.articles
    
        if($(outputBlock).length){
            $(outputBlock).pagination({
                dataSource:answerJson,
                pageSize: 50,
                pageNumber: 1,
                pageRange: 1,
                callback: function(item, pagination) {
                    var html = templatingItem(item);
                    $(outputBlock).prev().html(html);

                    $(".open_chart").click(function (elem) { 

                        $(elem.currentTarget).toggleClass('active')

                        let blokForChart=elem.currentTarget.parentElement.parentElement.parentElement.parentElement.nextElementSibling.firstElementChild.firstElementChild.firstElementChild

                        $(blokForChart).toggleClass("chart-open")

                        let idElem=elem.currentTarget.children[2].value

                        let charts = item[idElem].chart
                        
                        let canvas = document.createElement('canvas')

                        if (blokForChart.firstElementChild.value=="false") {
                            blokForChart.append(canvas);
                            
                            generateChart(charts, canvas, 'all')
                            
                            let divWithParam=document.createElement('div')
                            divWithParam.classList.add("chart-open__btn-param")
                            divWithParam.classList.add("d-flex")
                            divWithParam.classList.add("justify-content-around")
                            divWithParam.classList.add("align-items-center")
                            divWithParam.classList.add("flex-wrap")

                            let buttons=[
                                {
                                    class:"all_btn",
                                    text:"Весь период",
                                    param:'all'
                                },
                                {
                                    class:"last_year_btn",
                                    text:"За последний год",
                                    param:'last_year'
                                },{
                                    class:"last_half_year_btn",
                                    text:"За полгода",
                                    param:'last_half_year'
                                },{
                                    class:"three_months_btn",
                                    text:"За три меясца",
                                    param:'three_months'
                                },{
                                    class:"day_btn",
                                    text:"За месяц",
                                    param:'day'
                                },
                            ]

                            buttons.forEach(btn => {
                                let btnCreated=document.createElement('a')
                                btnCreated.classList.add('btn')
                                btnCreated.classList.add(btn.class)
                                let textInBtn=document.createElement('p')
                                textInBtn.classList.add("text--12-18")
                                textInBtn.innerText=btn.text
                                btnCreated.append(textInBtn)

                                $(btnCreated).click(function (e) { 
                                    e.preventDefault();

                                    e.currentTarget.parentElement.parentElement.children[1].remove()

                                    let canvas = document.createElement('canvas')
                                    
                                    e.currentTarget.parentElement.parentElement.children[1].before(canvas)
                                    generateChart(charts,e.currentTarget.parentElement.parentElement.children[1], btn.param)
                                });

                                divWithParam.append(btnCreated)


                            });

                            blokForChart.append(divWithParam);

                            blokForChart.firstElementChild.value=true
                        } else {
                            $(blokForChart.children[1]).remove();
                            $(blokForChart.children[1]).remove();
                            blokForChart.firstElementChild.value=false
                        }
                    });
                }
            })
        }
    });
}

viewsItems(linkToBDMain,'','#viewArticleChart')