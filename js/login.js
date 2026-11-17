// ---------- پاپ‌آپ لاگین (توی همه‌ی صفحه‌ها استفاده میشه) ----------
let profileBtn = document.getElementById('profileBtn')
let loginOverlay = document.getElementById('loginOverlay')
let loginClose = document.getElementById('loginClose')
let loginBtn = document.getElementById('loginBtn')
let loginEmail = document.getElementById('loginEmail')
let loginPass = document.getElementById('loginPass')
let emailError = document.getElementById('emailError')
let passError = document.getElementById('passError')
let loginMsg = document.getElementById('loginMsg')

// ایمیل
let emailregex = /^[A-Za-z0-9._-]+@[A-Za-z0-9-]+\.[A-Za-z]{2,}$/
// رمز: فقط حروف و عدد انگلیسی، حداقل یه حرف و یه عدد، حداقل 6 کاراکتر
let passregex = /^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9]{6,}$/

function open_login(){
    loginOverlay.classList.add('show')
}

function close_login(){
    loginOverlay.classList.remove('show')
}

profileBtn.addEventListener('click', open_login)
loginClose.addEventListener('click', close_login)

loginBtn.addEventListener('click', function(){
    let ok = true

    if(!emailregex.test(loginEmail.value)){
        emailError.textContent = 'email isnt valid'
        ok = false
    }
    else{
        emailError.textContent = ''
    }

    if(!passregex.test(loginPass.value)){
        passError.textContent = 'use english letters and numbers only (min 6, at least one of each)'
        ok = false
    }
    else{
        passError.textContent = ''
    }

    if(ok){
        loginMsg.textContent = 'login is ok'
        // بک‌اند بعدا اینجا وصل میشه
    }
    else{
        loginMsg.textContent = ''
    }
})
