import { loginRequest } from "./request.js";

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

function handleLogin(){
    const inputs = document.querySelectorAll(".loginInput")
    const button = document.querySelector(".loginBtn")
    const loginBody = {}
    let count = 0

    button.addEventListener("click", async (event) => {
        event.preventDefault()

        inputs.forEach(({name, value}) => {
            if(value === ""){
                count++
            }

            loginBody[name] = value
        })
        if(count != 0){
            return alert("Por favor preencha os campos e tente novamente")
        } else {
            const token = await loginRequest(loginBody)
            window.location.replace("/src/pages/admin.html")
            return token
        }
    })
}

openDownMenu();
handleLogin();