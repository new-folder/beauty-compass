$(document).ready(function () {

    for (let car of $('.carousel')) {

        let indexActiv=1
        
        $(car.children[indexActiv]).addClass('active');

        $(car.children[0]).click(()=>{
            
            if(indexActiv!=1){
                $(car.children[indexActiv]).removeClass('active');

                indexActiv--
                $(car.children[indexActiv]).addClass('active');
            }

        })

        $(car.children[car.children.length-1]).click(()=>{
            
            if(indexActiv<car.children.length-2){
                $(car.children[indexActiv]).removeClass('active');

                indexActiv++
                $(car.children[indexActiv]).addClass('active');
            }

        })
    }

    for(let cal of $('.calage')){

        for (let span of cal.children) {

            $(span).click(()=>{
                $(span).toggleClass('active')
            })

        }
    }
});