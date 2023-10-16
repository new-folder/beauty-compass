function newFeedReplies() {

    const feeds = document.querySelectorAll('.feed')

    feeds.forEach( el => { 
        el.querySelector('.js-newAnswerBtn').addEventListener('click', (event) => { 

            event.preventDefault()
            event.target.classList.add('pe-none')
            createReplies(el)
            
        }, { once: true } )
    })

}

function createReplies(parent) {

    //CREATE text editor
    const replies = document.createElement("div");
    replies.classList.add( "feed-replies", "my-2");
    
    replies.innerHTML = `
        <form action="" method="post">
            <textarea name="content" class="editor" placeholder="Оставить комментарий"></textarea>
            <input type="submit" value="Отправить комментарий" class="btn btn--base mt-3">
        </form>
    `;

    parent.insertAdjacentElement('beforeend', replies)


    // INIT text editor
    ClassicEditor
        .create( parent.querySelector( '.editor' ), {
            toolbar: {
                items: [
                    'bold',
                    'italic',
                    'strikethrough',
                    'underline',
                    '|',
                    'numberedList',
                    'bulletedList',
                    '|',
                    'link',
                ]
            },
        } )
        .then( editor => {
            window.editor = editor;
        } )
        .catch( handleSampleError );

        function handleSampleError( error ) {
        const issueUrl = 'https://github.com/ckeditor/ckeditor5/issues';

        const message = [
            'Oops, something went wrong!',
            `Please, report the following error on ${ issueUrl } with the build id "imv2hnq0y3vb-2iq20258slh1" and the error stack trace:`
        ].join( '\n' );

        console.error( message );
        console.error( error );
    }
}

newFeedReplies()