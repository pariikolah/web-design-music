// ---------- پاپ‌آپ نوشتن پست ----------
let postBtn = document.getElementById('post')
let postOverlay = document.getElementById('postOverlay')
let postClose = document.getElementById('postClose')

function open_post(){
    postOverlay.classList.add('show')
}

function close_post(){
    postOverlay.classList.remove('show')
}

postBtn.addEventListener('click', open_post)
postClose.addEventListener('click', close_post)


// ---------- سرچ تگ ----------
let tagSearch = document.getElementById('tagSearch')
let tagSearchBtn = document.getElementById('tagSearchBtn')
let tagMsg = document.getElementById('tagMsg')

function filter_posts(){
    let value = tagSearch.value.trim().toLowerCase()
    let posts = document.querySelectorAll('.post')
    tagMsg.textContent = ''

    // اول همه‌ی پست‌ها رو نشون بده
    for(let i = 0; i < posts.length; i++){
        posts[i].style.display = 'flex'
    }

    // خالی بود همین کافیه
    if(value === ''){
        return
    }

    // # نداشت پیام خطا بده
    if(value[0] !== '#'){
        tagMsg.textContent = 'tag must start with #'
        return
    }

    // پست‌هایی که تگشون با سرچ نمیخونه مخفی میشن
    for(let i = 0; i < posts.length; i++){
        let tags = posts[i].querySelectorAll('.tags button')
        let match = false

        for(let j = 0; j < tags.length; j++){
            if(tags[j].textContent.toLowerCase().includes(value)){
                match = true
            }
        }

        if(!match){
            posts[i].style.display = 'none'
        }
    }
}

tagSearch.addEventListener('input', filter_posts)
tagSearchBtn.addEventListener('click', filter_posts)
