// Bootstrap form validation
(function () {
    'use strict'
    var forms = document.querySelectorAll('.needs-validation')
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
        form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
            }
    
            form.classList.add('was-validated')
        }, false)
        })
    })()


// Pass validation
function valid(event){
    const pas = document.querySelector('#registerInputPassword1').value
    const cpas = document.querySelector('#registerInputPassword2').value
    const messPas = document.querySelector('#headerRegisterPassCheck1')
    const messCpas = document.querySelector('#headerRegisterPassCheck2')
    console.log(pas)
    for(i=0;i < cpas.length; i++)
    {
    
     if(pas[i] != cpas[i] && event.key != 8)
     {
        messPas.classList.add('auth__invalid--unchecked')
        messCpas.classList.add('auth__invalid--unchecked')
       break;
     } else {
        messPas.classList.remove('auth__invalid--unchecked')
        messCpas.classList.remove('auth__invalid--unchecked')
     }
    }
}

// Carousel
   function initCarousel(id) {
    const myCarousel = document.getElementById(`${id}`)
    const indicatorsContainer = myCarousel.querySelector(".carousel-indicators")
    const indicators = myCarousel.querySelectorAll(".carousel-indicators button")
    const inner = myCarousel.querySelectorAll(".carousel-inner div")

    const lengElements = indicators.length
    let centerLenthElement;

    if (lengElements % 2 === 0) {
        centerLenthElement = lengElements / 2
    } else {
        centerLenthElement = lengElements / 2 + 0.5
    }

    for (let i = 0; i < lengElements; i++) {
        if ((i + 1) === centerLenthElement ) {
            indicators[i].classList.add("active")
            inner[i].classList.add("active")
        } else {
            indicators[i].classList.remove("active")
            inner[i].classList.remove("active")
        }
    }

    function setClassToPrevNextSlide() {
        const slideActive = myCarousel.querySelector('.carousel-indicators .active');
        if (slideActive.previousElementSibling) {
            slideActive.previousElementSibling.classList.add('near-active');
        }

        if (slideActive.nextElementSibling) {
            slideActive.nextElementSibling.classList.add('near-active');
        }
    }

    setClassToPrevNextSlide()

    myCarousel.addEventListener('slide.bs.carousel', event => {
        myCarousel.querySelectorAll('.carousel-indicators button').forEach((item) => {
            item.classList.remove('near-active');
        });
        new Promise(resolve => {
            let actualDifferent = event.from - event.to
            let different = event.to - event.from
            if (different < 0) {
                different = -different
            }
            if (event.direction === "left") {
                if (different < 2 || event.from === lengElements - 1) {
                    const indicatorFirst = myCarousel.querySelector(".carousel-indicators > button")
                    addToEnd(indicatorFirst)
                } else {
                    if (event.from === 0 && different === lengElements - 1) {
                        const indicatorLast = myCarousel.querySelector(".carousel-indicators > button:last-child")
                        addToStart(indicatorLast)
                    } else {
                        if (actualDifferent < 0 && different >= centerLenthElement) {
                            for (let i = 1; i <= (lengElements - event.to + event.from); i++) {
                                const indicatorLast = myCarousel.querySelector(`.carousel-indicators > button:last-child`)
                                addToStart(indicatorLast)
                            }
                        } else {
                            for (let i = 1; i <= different; i++) {
                                const indicatorFirst = myCarousel.querySelector(`.carousel-indicators > button:nth-child(1)`)
                                addToEnd(indicatorFirst)
                            }
                        }
                    }
                }
            } else if (event.direction === 'right')  {
                if (different < 2 || event.to === lengElements - 1) {
                    const indicatorLast = myCarousel.querySelector(".carousel-indicators > button:last-child")
                    addToStart(indicatorLast)
                } else {
                    if (event.from === lengElements - 1 && different === lengElements - 1) {
                        const indicatorFirst = myCarousel.querySelector(".carousel-indicators > button")
                        addToEnd(indicatorFirst)
                    } else {
                        if (actualDifferent > 0 && different >= centerLenthElement) {
                            for (let i = 1; i <= (lengElements - event.from + event.to); i++) {
                                const indicatorFirst = myCarousel.querySelector(`.carousel-indicators > button:nth-child(1)`)
                                addToEnd(indicatorFirst)
                            }
                        } else {
                            for (let i = 1; i <= different; i++) {
                                const indicatorLast = myCarousel.querySelector(`.carousel-indicators > button:last-child`)
                                addToStart(indicatorLast)
                            }
                        }
                    }
                }
            }
            resolve(true)
        }).then(() => {
            setClassToPrevNextSlide()
        })
    })

    function addToEnd(indicator) {
        const clone = indicator.cloneNode(true)
        indicator.remove()
        indicatorsContainer.append(clone)
    }

    function addToStart(indicator) {
        const clone = indicator.cloneNode(true)
        indicator.remove()
        indicatorsContainer.prepend(clone)
    }
}

initCarousel('carouselMain')
initCarousel('carouselSelection')



