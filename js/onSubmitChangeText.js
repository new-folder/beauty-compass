function onSubmitChangeText (event) {
    event.preventDefault()
    const btn = event.target.querySelector('button')

    btn.innerText.toLowerCase() == 'ответить' ?
        btn.innerText = 'редактировать' : 
        btn.innerText = 'ответить'
}