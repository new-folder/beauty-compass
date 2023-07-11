// Bootstrap form validation
(function () {
    'use strict'
    const forms = document.querySelectorAll('.needs-validation')
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
async function initCarousel(id) {
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

const carousels = document.querySelectorAll('.carousel--base')
for (var i=0; i<carousels.length; i++)
{
    initCarousel(carousels[i].id)
}

// Hide tag links

function hideTagListInit(indexStartHide) {
    const wrapTagList = document.querySelector('.tag-links')
    const tagList = wrapTagList.querySelectorAll('.tag-links > .tag')
    const dots = createDots()

    const tagListHide = hideTagList(tagList, indexStartHide)

    tagListHide.forEach(item => wrapTagList.appendChild(item))

    wrapTagList.appendChild(dots)

    dots.addEventListener('click', function() {
        for (let i = indexStartHide; i < tagList.length; i++) {
            tagList[i].classList.remove('hide')
        }
        dots.remove()
    })
}

const createDots = () => {
    const dots = document.createElement('div')
    dots.className = 'tag tag--dots'
    dots.textContent = '• • •'
    return dots
}

const hideTagList = (tagList, indexStartHide) => {
    if (tagList.length > (indexStartHide + 1)) {
        for (let i = indexStartHide; i < tagList.length; i++) {
            tagList[i].classList.add('hide')
        }
    }
    return tagList
}

hideTagListInit(2)

function userInterface() {
    let userId

    // Authorization
    function saveUserLocalStorage() {
        const authForm = document.querySelector('.auth__form')
        authForm.onsubmit = async function(e) {
            // const formData = new FormData(e.target)
            const emailValue = document.querySelector('#headerAuthEmail')
            const passValue = document.querySelector('#authInputPassword')
            e.preventDefault()
            const authBody = { 
                // email: emailValue,
                // password: passValue,
                username: 'kminchelle',
                password: '0lelplR',
            }
            const resp = await fetch('https://dummyjson.com/auth/login',{
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(authBody)
            })
            const result = await resp.json()
            localStorage.setItem('userToken', result['token'])
            localStorage.setItem('userId', result['id'])
            console.log(userId)
        }    
    }
    saveUserLocalStorage()  

    // Add/remove class 'active' for favorite-brand
    async function toggleFavoriteBrand() {
        const favoriteBrand = document.querySelector('.favorite--brand')
        const userToken = localStorage.getItem('userToken')
        if (userToken) {
            const resp = await fetch('https://64a990b78b9afaf4844ad897.mockapi.io/favoritebrand')
            const result = await resp.json()
            userObject = result.find(elem => elem.id === userId)
            if (userObject['favorite']) {
                favoriteBrand.classList.add('active')
            }
        } else {
            console.log('Unauth')
        }
    }    
    toggleFavoriteBrand()    

}
userInterface()



//For demonstration

// Add/remove class 'active' for favorite-product
function toggleFavoriteProduct() {
    const favoriteList = document.querySelectorAll('.favorite--product')
    favoriteList.forEach(item => {
        item.addEventListener('click', elem => {
            elem.preventDefault()
            if(!elem.target.classList.contains('active')) {
                elem.target.classList.add('active')
            // сюда запрос для добавления в избранное
            } else
            elem.target.classList.remove('active')
            // сюда запрос для удаления из избранного
        }) 
    })
}

toggleFavoriteProduct()


// Add/remove class 'active' for subscription
function toggleSubscription() {
    const subBtn = document.querySelector('.follow-brand')
    let text
    if(subBtn) {
        subBtn.addEventListener('click', event => {
            if(!event.target.classList.contains('active')) {
                text = 'Вы подписаны'
                event.target.classList.add('active')
                document.querySelector('.follow-brand').textContent = text
            // сюда запрос для подписки
            } else{
                text = 'Подписаться'
                event.target.classList.remove('active')
                document.querySelector('.follow-brand').textContent = text
            // сюда запрос для отписки
            }
        }) 
    }
}

toggleSubscription()