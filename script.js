// Função para rolar suavemente até o formulário
function scrollToForm(){const e=document.getElementById("form-section");e&&e.scrollIntoView({behavior:"smooth",block:"center"})}

// Manipulação do formulário com otimizações
document.addEventListener("DOMContentLoaded",function(){
const form=document.getElementById("waitlist-form");
const formMessage=document.getElementById("form-message");
const emailInput=document.getElementById("email");
const ageConfirm=document.getElementById("age-confirm");
const privacyConfirm=document.getElementById("privacy-confirm");

// Validação de e-mail otimizada
const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function showMessage(msg,type){
formMessage.textContent=msg;
formMessage.className="form-message "+type;
formMessage.style.display="block";
requestAnimationFrame(()=>{
formMessage.scrollIntoView({behavior:"smooth",block:"nearest"})
})
}

function submitForm(email){
const submitButton=form.querySelector(".submit-button");
submitButton.disabled=true;
submitButton.textContent="Enviando...";

setTimeout(()=>{
const waitlistData={
email:email,
timestamp:new Date().toISOString(),
ageConfirmed:true,
privacyAccepted:true
};

let waitlist=[];
try{
waitlist=JSON.parse(localStorage.getItem("waitlist")||"[]")
}catch(e){
console.error("Erro ao ler localStorage:",e)
}

if(waitlist.some(item=>item.email===email)){
showMessage("Este e-mail já está cadastrado na lista de espera!","error");
submitButton.disabled=false;
submitButton.textContent="Quero participar";
return
}

waitlist.push(waitlistData);
try{
localStorage.setItem("waitlist",JSON.stringify(waitlist))
}catch(e){
console.error("Erro ao salvar no localStorage:",e)
}

showMessage("Cadastro realizado com sucesso! Em breve você receberá novidades sobre a plataforma.","success");
form.reset();
submitButton.disabled=false;
submitButton.textContent="Quero participar"
},1500)
}

form.addEventListener("submit",function(e){
e.preventDefault();

formMessage.className="form-message";
formMessage.style.display="none";

const email=emailInput.value.trim();

if(!email){
showMessage("Por favor, preencha seu e-mail.","error");
emailInput.focus();
return
}

if(!emailRegex.test(email)){
showMessage("Por favor, insira um e-mail válido.","error");
emailInput.focus();
return
}

if(!ageConfirm.checked){
showMessage("Você precisa confirmar que é maior de 18 anos.","error");
return
}

if(!privacyConfirm.checked){
showMessage("Você precisa aceitar a política de privacidade.","error");
return
}

submitForm(email)
});

// Animação suave ao carregar a página com otimização
const hero=document.querySelector(".hero");
if(hero){
hero.style.opacity="0";
requestAnimationFrame(()=>{
hero.style.transition="opacity 1s ease-in";
hero.style.opacity="1"
})
}
});
