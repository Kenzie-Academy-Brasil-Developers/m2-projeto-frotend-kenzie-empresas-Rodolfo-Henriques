import { registerRequest } from "./request.js";

function openDownMenu(){
    let change = false;
    const menuBtn = document.querySelector(".openMenuBtn");
    menuBtn.addEventListener("click", (event) =>{
        event.preventDefault();
        const buttonImage = document.querySelector(".buttonImg");
        const menu = document.querySelector(".menuDown");
        menu.classList.toggle("menuShow");
        menuBtn.classList.toggle("closeMenuBtn");
        if (change === true){
            buttonImage.src = "/src/assets/icons/menuVector.svg";
        
        }else{
            buttonImage.src = "/src/assets/icons/CloseBtn.svg";
        }
        change = !change;
    });
}

function handleRegister(){
    const inputs = document.querySelectorAll('.registerInput')
    const button = document.querySelector('.registerBtn')
    const registerBody = {}
    let count = 0
  
    button.addEventListener('click', async (event) => {
      event.preventDefault()
  
      inputs.forEach(({name, value}) => {
        if(value === '') {
          count++
        }
  
        registerBody[name] = value
      })
  
      if(count !== 0) {
      return alert('por favor preencha todos os campos necessários para realizar o cadastro')
      } else {
        const newUser = await registerRequest(registerBody)
        console.log(newUser)
  
        setTimeout(() => {
          window.location.replace('/src/pages/login.html')
        }, 2000);
      }
    })
}

openDownMenu();
handleRegister();