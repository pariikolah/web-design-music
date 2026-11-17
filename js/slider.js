// ---------- اسلایدر عکس‌های hero (صفحه‌ی index) ----------
let heroSlides = document.getElementById('heroSlides')
let prevBtn = document.getElementById('prevBtn')
let nextBtn = document.getElementById('nextBtn')

let count = heroSlides.children.length   // تعداد عکس‌ها
let index = 0                            // شماره‌ی عکسی که الان نشون داده میشه

function show_slide(){
    heroSlides.style.transform = 'translateX(-' + index * 100 + '%)'
}

nextBtn.addEventListener('click', function(){
    index++
    if(index === count){
        index = 0
    }
    show_slide()
})

prevBtn.addEventListener('click', function(){
    index--
    if(index < 0){
        index = count - 1
    }
    show_slide()
})
