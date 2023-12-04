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
        html+='                    <span>'+element.like+'</span>'
        html+='                </div>'
        html+='                <div class="item__statistic-number__element">'
        html+='                    <img src="../img/like-tag.svg" alt="Поставили нравиться">'
        html+='                    <span>'+element.positRevi+'</span>'
        html+='                </div>'
        html+='                <div class="item__statistic-number__element">'
        html+='                    <img src="../img/message-question.svg" alt="Заданные вопросы">'
        html+='                    <span>'+element.question+'</span>'
        html+='                </div>'
        html+='                <div class="item__statistic-number__element">'
        html+='                    <img src="../img/grey_eye.svg" alt="Показатель просмотров">'
        html+='                    <span>'+element.views+'</span>'
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
        "review":'Отзывы',
        "favarite":'Добавлено в избранное',
        "visitShop":'Переходы на маркетплейсы',
        "visitItem":'Переходы на страницу бренда',
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
                            // console.log(el.x.split('.')[1]);
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
        }else answerJson=data.cosmetics
    
        if($(outputBlock).length){
            $(outputBlock).pagination({
                dataSource:answerJson,
                pageSize: 5,
                pageNumber: 1,
                pageRange: 1,
                formatGoInput: 'go to <%= input %> st/rd/th',
                callback: function(item, pagination) {
                    var html = templatingItem(item);
                    $(outputBlock).prev().html(html);

                    $(".open_chart").click(function (elem) { 

                        $(elem.currentTarget.parentElement.parentElement.parentElement).toggleClass("item__chart-open");

                        $(elem.currentTarget.nextElementSibling).toggleClass("chart-open")


                        let idElem=elem.currentTarget.children[1].value

                        let charts = item[idElem].chart
                        
                        let canvas = document.createElement('canvas')

                        var ctx = canvas.getContext('2d')

                        const gradient = ctx.createLinearGradient(20, 0, 220, 0);

                        // Add three color stops
                        gradient.addColorStop(0, "green");
                        gradient.addColorStop(0.5, "cyan");
                        gradient.addColorStop(1, "green");


                        let dataOutpChart={
                            labels:charts[0].data.map(el=>el.x),
                            datasets:[
                                {
                                    label: 'Просмотры',
                                    data: charts[0].data.map(el=>el.y),
                                },
                                {
                                    label: 'Отзывы',
                                    data: charts[1].data.map(el=>el.y),
                                },
                                {
                                    label: 'Избранное',
                                    data: charts[2].data.map(el=>el.y),
                                },
                                {
                                    label: 'Переходы на маркетплейсы',
                                    data: charts[3].data.map(el=>el.y),
                                },
                                {
                                    label: 'Переходы на страницу бренда',
                                    data: charts[4].data.map(el=>el.y),
                                },
                            ]
                        }

                        if (elem.currentTarget.nextElementSibling.firstElementChild.value=="false") {
                            elem.currentTarget.nextElementSibling.append(canvas);
                            const chart=new Chart(canvas,{
                                type:'line',
                                data:dataOutpChart,
                                borderColor: '#fff',
                                color:'#fff'
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

$('#rating').click(function(el) {
    el.preventDefault();
    viewsItems("../manufacturer-lk__charts/all_cosmetics_manufacter.json",'rating', '#viewCosmeticChart')

})
$('#view').click(function(el) {
    el.preventDefault();
    viewsItems("../manufacturer-lk__charts/all_cosmetics_manufacter.json",'view','#viewCosmeticChart')

})
$('#visit').click(function(el) {
    el.preventDefault();
    viewsItems("../manufacturer-lk__charts/all_cosmetics_manufacter.json",'visit','#viewCosmeticChart')

})
$('#favarite').click(function(el) {
    el.preventDefault();
    viewsItems("../manufacturer-lk__charts/all_cosmetics_manufacter.json",'favarite','#viewCosmeticChart')

})
$('#new').click(function(el) {
    el.preventDefault();
    viewsItems("../manufacturer-lk__charts/all_cosmetics_manufacter.json",'new','#viewCosmeticChart')

})
$('#default').click(function(el) {
    el.preventDefault();
    viewsItems("../manufacturer-lk__charts/all_cosmetics_manufacter.json",'','#viewCosmeticChart')

})

if ($('#allItems').length!=0) {
    
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

        generateChart(cosmetics,$('#allItems'),'all')

        let btnClick=[
            {
                class:"all_btn",
                param:'all'
            },
            {
                class:"last_year_btn",
                param:'last_year'
            },{
                class:"last_half_year_btn",
                param:'last_half_year'
            },{
                class:"three_months_btn",
                param:'three_months'
            },{
                class:"day_btn",
                param:'day'
            },
        ]

        btnClick.forEach(btn => {
            
            $("."+btn.class).click(function (e) { 
                e.preventDefault();
                e.currentTarget.parentElement.parentElement.children[0].remove()
    
                let canvas = document.createElement('canvas')
                
                e.currentTarget.parentElement.parentElement.children[0].before(canvas)

                generateChart(cosmetics, e.currentTarget.parentElement.parentElement.children[0], btn.param)
            });
        });

    })
}

viewsItems("../manufacturer-lk__charts/all_cosmetics_manufacter.json",'','#viewCosmeticChart')