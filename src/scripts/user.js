import { validateUser, getToken, getUserProfile, updateUser, getUserCoworkers, getAllCompanies } from "./request.js";

function logoutButton(){
    const logout = document.querySelector(".logoutButton");
    logout.addEventListener("click", () => {
        localStorage.removeItem("@kenzieEmpresas:token");
        window.location.replace("/")
    })
}

async function verifyUser(){
    const {is_admin} = await validateUser();
    const token = getToken();
    if(!token){
        window.location.replace("/src/pages/login.html")
    } else if (is_admin){
        window.location.replace("/src/pages/admin.html")
    }
}

async function renderUserPanel(){
    const userPanel = document.querySelector(".userPanel")
    const userProfile = await getUserProfile();
    
    const divUser = document.createElement("div")
    const userName = document.createElement("h3")
    const userEmail = document.createElement("p")
    const userLevel = document.createElement("span")
    const userKindWork = document.createElement("span")
    const editButton = document.createElement("button")
    const editImage = document.createElement("img")

    userName.innerText = `${userProfile.username}`
    userEmail.innerText = `${userProfile.email}`
    if(userProfile.professional_level === null){
        userLevel.innerText = "Nível profissional não definido"
    } else {
        userLevel.innerText = `${userProfile.professional_level[0].toUpperCase() + userProfile.professional_level.substring(1)}`
    }
    if(userProfile.kind_of_work === null){
        userKindWork.innerText = "Sem modalidade definida"
    } else {
        userKindWork.innerText = `${userProfile.kind_of_work[0].toUpperCase() + userProfile.kind_of_work.substring(1) }`
    }
    editButton.classList.add("editUser")
    editImage.src = "/src/assets/icons/coloredEdit.svg"

    editButton.addEventListener("click", async (e) => {
        e.preventDefault();
        const modalDialog = document.querySelector(".userEditModal")
        const openedModal = await createUserModal(userProfile)

        modalDialog.innerHTML = "";
        modalDialog.appendChild(openedModal);

        modalDialog.showModal();
        saveUserChanges();
        closeModal();
    })

    userPanel.appendChild(divUser)
    divUser.append(userName, userEmail)
    userPanel.append(userLevel, userKindWork, editButton)
    editButton.appendChild(editImage)
    
}

async function renderCoworkers(){
    const userJobPanel = document.querySelector(".userJobPanel")
    const coworkers = await getUserCoworkers();
    const userProfile = await getUserProfile();
    const companies = await getAllCompanies();
    const userId = userProfile.uuid
    if(coworkers.length === 0){
        const text = document.createElement("h1")
                text.classList.add("noJob")
                text.innerText = "Você ainda não foi contratado"
                userJobPanel.appendChild(text)
    } else {
        companies.forEach(company => {
            if(company.uuid === coworkers[0].company_uuid){
                const companyName = `${company.name}`
                if(coworkers.length === 0){
                    const text = document.createElement("h1")
                    text.classList.add("noJob")
                    text.innerText = "Você ainda não foi contratado"
                    userJobPanel.appendChild(text)
                } else {
                    const divTitle = document.createElement("h1")
                    const divBox = document.createElement("div")
                    divBox.classList.add("cardsBox")
                    divTitle.classList.add("headTitle")
                    divTitle.innerText = `${companyName} - Departamento de ${coworkers[0].name}`
                    userJobPanel.appendChild(divTitle)
                    userJobPanel.appendChild(divBox)
                    coworkers.forEach(element => {
                        element.users.forEach(user => {
                            if(userId != user.uuid){
                                const divCard = document.createElement("div")
                                const cardName = document.createElement("p")
                                const cardLevel = document.createElement("span")
    
                                divCard.classList.add("coworkerCard")
                                cardName.innerText = `${user.username[0].toUpperCase() + user.username.substring(1)}`
                                cardLevel.innerText = `${user.professional_level[0].toUpperCase() + user.professional_level.substring(1)}`
    
                                divBox.appendChild(divCard)
                                divCard.append(cardName, cardLevel)
                            }
                        })
                    })
                }
            }
        })
        
    }
}

async function createUserModal(userProfile){
    const modalContainer = document.createElement("div")
    const modalDiv = document.createElement("div")
    const modalTitle = document.createElement("h2")
    const closeModalButton = document.createElement("button")
    const nameInput = document.createElement("input")
    const emailInput = document.createElement("input")
    const passInput = document.createElement("input")
    const saveEdit = document.createElement("button")

    modalContainer.classList.add("modalBoxContainer")
    modalDiv.classList.add("modalBox")
    modalTitle.innerText = "Editar Perfil"
    closeModalButton.classList.add("closeButton")
    closeModalButton.innerText = "X"
    nameInput.classList.add("modalInput")
    nameInput.name = "username"
    nameInput.placeholder = `${userProfile.username}`
    emailInput.classList.add("modalInput")
    emailInput.name = "email"
    emailInput.placeholder = `${userProfile.email}`
    passInput.classList.add("modalInput")
    passInput.name = "password"
    passInput.placeholder = `${"Senha"}`
    saveEdit.classList.add("saveButton")
    saveEdit.innerText = "Editar Perfil"

    modalContainer.appendChild(modalDiv)
    modalDiv.append(modalTitle, closeModalButton, nameInput, emailInput, passInput, saveEdit)
    
    return modalContainer
}

async function saveUserChanges(){
    const inputs = document.querySelectorAll(".modalInput")
    const saveButton = document.querySelector(".saveButton")
    const userPanel = document.querySelector(".userPanel")
    const userBody = {};
    saveButton.addEventListener("click", async (e) => {
        e.preventDefault();
        
        inputs.forEach(({name, value}) => {
            userBody[name] = value
        })
        updateUser(userBody);
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    })
}

async function closeModal(){
    const modalDialog = document.querySelector(".userEditModal")
    const closeButton = document.querySelector(".closeButton")

    closeButton.addEventListener("click", () =>{
        modalDialog.close()
    } )
}

renderUserPanel();
renderCoworkers();
verifyUser();
logoutButton();