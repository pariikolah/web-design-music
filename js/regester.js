const form      = document.getElementById("regForm");
const nameEl    = document.getElementById("name");
const idEl      = document.getElementById("userid");
const emailEl   = document.getElementById("email");
const ageEl     = document.getElementById("age");
const passEl    = document.getElementById("password");
const termsEl   = document.getElementById("terms");
const successEl = document.getElementById("success");


function setError(input, errId, message){
  const box = input.closest(".field");
  document.getElementById(errId).textContent = message;
  if (box){
    box.classList.toggle("invalid", message !== "");
    box.classList.toggle("valid", message === "" && input.value !== "");
  }
  return message === "";
}


const rules = {
  length: (p) => p.length >= 8,
  upper:  (p) => /[A-Z]/.test(p),
  lower:  (p) => /[a-z]/.test(p),
  digit:  (p) => /[0-9]/.test(p),
};

function checkPasswordRules(){
  const p = passEl.value;
  let all = true;
  document.querySelectorAll("#rules li").forEach((li) => {
    const ok = rules[li.dataset.rule](p);
    li.classList.toggle("ok", ok);
    if (!ok) all = false;
  });
  return all;
}

function validatePassword(){
  const p = passEl.value;
  if (p === "")                         return setError(passEl, "passwordErr", "Password is required.");
  if (!/^[A-Za-z0-9]+$/.test(p))        return setError(passEl, "passwordErr", "Use only English letters and numbers.");
  if (!checkPasswordRules())            return setError(passEl, "passwordErr", "Password does not meet all the rules.");
  return setError(passEl, "passwordErr", "");
}


function validateName(){
  const v = nameEl.value.trim();
  if (v.length < 2) return setError(nameEl, "nameErr", "Please enter your name.");
  return setError(nameEl, "nameErr", "");
}
function validateId(){
  const v = idEl.value.trim();
  if (!/^[A-Za-z0-9_]{3,20}$/.test(v))
    return setError(idEl, "useridErr", "ID: 3-20 characters, English letters, numbers or _");
  return setError(idEl, "useridErr", "");
}
function validateEmail(){
  const v = emailEl.value.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v))
    return setError(emailEl, "emailErr", "Please enter a valid email.");
  return setError(emailEl, "emailErr", "");
}
function validateAge(){
  const n = Number(ageEl.value);
  if (ageEl.value === "" || !Number.isInteger(n) || n < 1 || n > 120)
    return setError(ageEl, "ageErr", "Please enter a valid age (1-120).");
  return setError(ageEl, "ageErr", "");
}
function validateTerms(){
  const ok = termsEl.checked;
  document.getElementById("termsErr").textContent = ok ? "" : "You must accept the terms.";
  return ok;
}


passEl.addEventListener("input", () => { checkPasswordRules(); validatePassword(); });
nameEl.addEventListener("blur", validateName);
idEl.addEventListener("blur", validateId);
emailEl.addEventListener("blur", validateEmail);
ageEl.addEventListener("blur", validateAge);


document.getElementById("togglePass").addEventListener("click", () => {
  passEl.type = passEl.type === "password" ? "text" : "password";
});


form.addEventListener("submit", (e) => {
  e.preventDefault();
  successEl.textContent = "";
  const results = [
    validateName(), validateId(), validateEmail(),
    validateAge(), validatePassword(), validateTerms(),
  ];
  if (results.every(Boolean)){
    successEl.textContent = "Account created successfully!";
   
  }
});
