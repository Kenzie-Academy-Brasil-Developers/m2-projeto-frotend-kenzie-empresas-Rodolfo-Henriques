import { createCompany, getAllSectors, getCompanyBySector, hireWorker, deleteDepartAdmin, updateDepartment, deleteUserAdmin, departmentCreate, getAllCompanies, getAllDepartments, getAllDepartmentsById, getAllUsers, getToken, validateUser, updateUserAdmin, unemployedUsers, fireWorker } from "./request.js";

const allCompanies = await getAllCompanies();
const allUsers = await getAllUsers();
const allSectors = await getAllSectors();
const departmentsList = await getAllDepartments();
const unemployedWorkers = await unemployedUsers();

function logoutButton(){
    const logout = document.querySelector(".logoutButton");
    logout.addEventListener("click", () => {
        localStorage.clear()
        window.location.replace("/")
    })
}

async function verifyUser(){
    const {is_admin} = await validateUser();
    const token = getToken();
    if(!token){
        window.location.replace("/src/pages/login.html")
    } else if (!is_admin){
        window.location.replace("/src/pages/user.html")
    }
}

function createViewDepartmentModal(name, description, companyName, departId ){
    const workerBody = {}
    const departCoworkers = []
    allUsers.forEach(user => {
        if(user.department_uuid === departId){
            departCoworkers.push(user)
        }
    })

    const modalContainer = document.createElement("div")
    const modalDiv = document.createElement("div")
    const modalTitle = document.createElement("h2")
    const headDiv = document.createElement("div")
    const headDivInfo = document.createElement("div")
    const headDepartment = document.createElement("h3")
    const headCompany = document.createElement("span")
    const headDivButtons = document.createElement("div")
    const headSelect = document.createElement("select")
    const headSelectOption = document.createElement("option")
    headSelect.appendChild(headSelectOption)
    const headAdmitButton = document.createElement("button")
    const closeModalButton = document.createElement("button")

    const workersDiv = document.createElement("div")
    workersDiv.classList.add("workersDiv")
    departCoworkers.forEach(coworker =>{
        const divCard = document.createElement("div")
        const cardUserName = document.createElement("h3")
        const cardUserLevel = document.createElement("span")
        const cardUserCompany = document.createElement("span")
        const cardButton = document.createElement("button")

        divCard.classList.add("coworkerCard")
        cardUserName.innerText = `${coworker.username[0].toUpperCase() + coworker.username.substring(1)}`
        cardUserLevel.innerText = `${coworker.professional_level[0].toUpperCase() + coworker.professional_level.substring(1)}`
        cardUserCompany.innerText = `${companyName}`
        cardButton.classList.add("fireButton")
        cardButton.innerText = "Desligar"

        cardButton.addEventListener("click", async (e) => {
            e.preventDefault();
            
            fireWorker(coworker.uuid);

            setTimeout(() => {
                window.location.reload()
            }, 2000);
        })

        workersDiv.appendChild(divCard)
        divCard.append(cardUserName, cardUserLevel, cardUserCompany, cardButton)
    })

    modalContainer.classList.add("modalBoxContainer")
    modalDiv.classList.add("modalViewBox")
    modalTitle.innerText = `Departamento de ${name}`
    headDiv.classList.add("headDiv")
    headDivInfo.classList.add("headDivInfo")
    headDivButtons.classList.add("headDivButtons")
    headDepartment.innerText = `${description}`
    headCompany.innerText = `Empresa: ${companyName}`
    headSelect.classList.add("headSelect")
    headSelectOption.value = ""
    headSelectOption.innerText = "Selecionar Usuário"
    headAdmitButton.innerText = "Contratar"
    headAdmitButton.classList.add("admitButton")
    closeModalButton.classList.add("closeButton")
    closeModalButton.innerText = "X"

    unemployedWorkers.forEach(worker => {
        const option = document.createElement("option")

        option.innerText = `${worker.username[0].toUpperCase() + worker.username.substring(1)}`
        option.value = `${worker.uuid}`
        option.classList.add("workerOption")

        headSelect.appendChild(option)
    })

    headAdmitButton.addEventListener("click", async (e) => {
        e.preventDefault();
        const options = document.querySelectorAll(".workerOption")
        options.forEach(option => {
            if(option.selected){
                workerBody["user_uuid"] = option.value
                workerBody["department_uuid"] = departId
            }
        })
        
        const objetoVazio = Object.keys(workerBody).length === 0;
        if(objetoVazio === true){
            alert("Nenhum usuario selecionado")
        } else {
            hireWorker(workerBody)
    
            setTimeout(() => {
                window.location.reload()
            }, 2000);
        }
        
    })

    modalContainer.appendChild(modalDiv)
    modalDiv.append(modalTitle, headDiv, workersDiv, closeModalButton)
    headDiv.append(headDivInfo, headDivButtons)
    headDivInfo.append(headDepartment, headCompany)
    headDivButtons.append(headSelect, headAdmitButton)
    

    return modalContainer
}

function createDeleteDepartmentModal(id, name){
    const modalContainer = document.createElement("div")
    const modalDiv = document.createElement("div")
    const modalTitle = document.createElement("h2")
    
    const closeModalButton = document.createElement("button")
    const deleteDepartButton = document.createElement("button")

    modalContainer.classList.add("modalBoxContainer")
    modalDiv.classList.add("deleteDepartTitle")
    modalTitle.innerHTML = `Realmente deseja deletar o Departamento <span>${name}</span> e demitir seus funcionários?`
    modalTitle.classList.add("deleteDepartText")
    
    closeModalButton.classList.add("closeButton")
    closeModalButton.innerText = "X"
    deleteDepartButton.classList.add("deleteDepartBtn")
    deleteDepartButton.innerText = "Confirmar"

    deleteDepartButton.addEventListener("click", async (e) => {
        e.preventDefault()
        
        deleteDepartAdmin(id)

        setTimeout(() => {
            window.location.reload()
        }, 2000);

    })

    modalContainer.appendChild(modalDiv)
    modalDiv.append(modalTitle, closeModalButton, deleteDepartButton)

    return modalContainer

}

function createDeleteUserModal(id, name){
    const modalContainer = document.createElement("div")
    const modalDiv = document.createElement("div")
    const modalTitle = document.createElement("h2")
    const modalTitleName = document.createElement("span")
    const closeModalButton = document.createElement("button")
    const deleteUserButton = document.createElement("button")

    modalContainer.classList.add("modalBoxContainer")
    modalDiv.classList.add("deleteUserTitle")
    modalTitle.innerText = "Realmente deseja remover o usuário "
    modalTitle.classList.add("deleteUserText")
    modalTitleName.innerText = `${name} ?`
    closeModalButton.classList.add("closeButton")
    closeModalButton.innerText = "X"
    deleteUserButton.classList.add("deleteUserBtn")
    deleteUserButton.innerText = "Deletar"

    deleteUserButton.addEventListener("click", async (e) => {
        e.preventDefault()
        
        deleteUserAdmin(id)

        setTimeout(() => {
            window.location.reload()
        }, 2000);

    })

    modalContainer.appendChild(modalDiv)
    modalDiv.append(modalTitle, closeModalButton, deleteUserButton)
    modalTitle.append(modalTitleName)

    return modalContainer
}

function createEditDepartmentModal(id, description){
    const editDepartmentBody = {}

    const modalContainer = document.createElement("div")
    const modalDiv = document.createElement("div")
    const modalTitle = document.createElement("h2")
    const modalTextArea = document.createElement("textarea")
    const closeModalButton = document.createElement("button")
    const saveDepartmentChanges = document.createElement("button")

    modalContainer.classList.add("modalBoxContainer")
    modalDiv.classList.add("modalBox")
    modalTitle.innerText = "Editar Departamento"
    closeModalButton.classList.add("closeButton")
    closeModalButton.innerText = "X"
    modalTextArea.classList.add("modalTextArea")
    modalTextArea.id = "description"
    modalTextArea.placeholder = `${description}`
    saveDepartmentChanges.classList.add("saveChanges")
    saveDepartmentChanges.innerText = "Salvar alterações"

    saveDepartmentChanges.addEventListener("click", async (e) => {
        e.preventDefault();
        const input = document.querySelector(".modalTextArea")
        editDepartmentBody[input.id] = input.value
    
        updateDepartment(editDepartmentBody, id)

        window.location.reload();

        
    })

    modalContainer.appendChild(modalDiv)
    modalDiv.append(modalTitle, modalTextArea, closeModalButton, saveDepartmentChanges)
    
    return modalContainer
}

function createUpdateUserAdminModal(id){
    const userAdminBody = {}
    
    const modalContainer = document.createElement("div")
    const modalDiv = document.createElement("div")
    const modalTitle = document.createElement("h2")
    const closeModalButton = document.createElement("button")
    const selectKind = document.createElement("select")
    const selectLevel = document.createElement("select")
    const selectKindOption = document.createElement("option")
    const homeOfficeOption = document.createElement("option")
    homeOfficeOption.value = "kind_of_work"
    homeOfficeOption.classList.add("updateUserOption")
    homeOfficeOption.innerText = "Home Office"
    homeOfficeOption.id = "home office"
    const presencialOption = document.createElement("option")
    presencialOption.value = "kind_of_work"
    presencialOption.classList.add("updateUserOption")
    presencialOption.innerText = "Presencial"
    presencialOption.id = "presencial"
    const hibridoOption = document.createElement("option")
    hibridoOption.value = "kind_of_work"
    hibridoOption.classList.add("updateUserOption")
    hibridoOption.innerText = "Híbrido"
    hibridoOption.id = "hibrido"
    const selectLevelOption = document.createElement("option")
    const estagioOption = document.createElement("option")
    estagioOption.value = "professional_level"
    estagioOption.classList.add("updateUserOption")
    estagioOption.innerText = "Estágio"
    estagioOption.id = "estágio"
    const juniorOption = document.createElement("option")
    juniorOption.value = "professional_level"
    juniorOption.classList.add("updateUserOption")
    juniorOption.innerText = "Júnior"
    juniorOption.id = "júnior"
    const plenoOption = document.createElement("option")
    plenoOption.value = "professional_level"
    plenoOption.classList.add("updateUserOption")
    plenoOption.innerText = "Pleno"
    plenoOption.id = "pleno"
    const seniorOption = document.createElement("option")
    seniorOption.value = "professional_level"
    seniorOption.classList.add("updateUserOption")
    seniorOption.innerText = "Sênior"
    seniorOption.id = "sênior"
    const editUserButton = document.createElement("button")

    modalContainer.classList.add("modalBoxContainer")
    modalDiv.classList.add("modalBox")
    modalTitle.innerText = "Editar Usuário"
    closeModalButton.classList.add("closeButton")
    closeModalButton.innerText = "X"
    selectKind.classList.add("modalInput")
    selectLevel.classList.add("modalInput")
    selectKindOption.value = ""
    selectKindOption.innerText = "Selecionar modalidade de trabalho"
    selectLevelOption.value = ""
    selectLevelOption.innerText = "Selecionar nível profissional"
    editUserButton.classList.add("editUser")
    editUserButton.innerText = "Editar"

    editUserButton.addEventListener("click", (e) => {
        e.preventDefault()
        const options = document.querySelectorAll(".updateUserOption")
        options.forEach(option => {
            if(option.selected){
                userAdminBody[option.value] = option.id
            }
        })
        updateUserAdmin(userAdminBody, id)

        
        window.location.reload()
        
    })

    modalContainer.appendChild(modalDiv)
    modalDiv.append(modalTitle, closeModalButton, selectKind, selectLevel, editUserButton)
    selectLevel.append(selectLevelOption, estagioOption, juniorOption, plenoOption, seniorOption)
    selectKind.append(selectKindOption, homeOfficeOption, hibridoOption, presencialOption)

    return modalContainer
}

function createNewCompanyModal(){
    const createBody = {}

    const modalContainer = document.createElement("div")
    const modalDiv = document.createElement("div")
    const modalTitle = document.createElement("h2")
    const closeModalButton = document.createElement("button")
    const companyName = document.createElement("input")
    const companyDescription = document.createElement("input")
    const sectorSelect = document.createElement("select")
    const sectorSelectOption = document.createElement("option")
    const createButton = document.createElement("button")

    modalContainer.classList.add("modalBoxContainer")
    modalDiv.classList.add("modalBox")
    modalTitle.innerText = "Criar Nova Empresa"
    closeModalButton.classList.add("closeButton")
    closeModalButton.innerText = "X"
    companyName.classList.add("modalInput")
    companyName.name = "name"
    companyName.placeholder = "Nome da empresa"

    companyDescription.classList.add("modalInput")
    companyDescription.name = "description"
    companyDescription.placeholder = "Descrição"

    sectorSelect.classList.add("modalInput")
    sectorSelectOption.value = ""
    sectorSelectOption.innerText = "Selecionar setor"

    sectorSelect.append(sectorSelectOption)

    allSectors.forEach(sector => {
        const option = document.createElement("option")

        option.innerText = `${sector.description}`
        option.value = `${sector.uuid}`

        sectorSelect.appendChild(option)
    })

    createButton.classList.add("createButton")
    createButton.innerText = "Criar a empresa"

    createButton.addEventListener("click", async (e) => {
        e.preventDefault()
        const inputs = document.querySelectorAll(".modalInput")
        inputs.forEach(({name, value}) => {
            if(!name){
                createBody["sector_uuid"] = value
                createBody["opening_hours"] = "09:00"
            } else {
                createBody[name] = value
            }
        } )
        
        createCompany(createBody)
        window.location.reload()
    })

    modalContainer.appendChild(modalDiv)
    modalDiv.append(modalTitle, closeModalButton, companyName, companyDescription, sectorSelect, createButton)
    
    return modalContainer
}

function createDepartmentModal(){
    const createBody = {}

    const modalContainer = document.createElement("div")
    const modalDiv = document.createElement("div")
    const modalTitle = document.createElement("h2")
    const closeModalButton = document.createElement("button")
    const departmentName = document.createElement("input")
    const departmentDescription = document.createElement("input")
    const companySelect = document.createElement("select")
    const companySelectOption = document.createElement("option")
    const createButton = document.createElement("button")

    modalContainer.classList.add("modalBoxContainer")
    modalDiv.classList.add("modalBox")
    modalTitle.innerText = "Criar Departamento"
    closeModalButton.classList.add("closeButton")
    closeModalButton.innerText = "X"
    departmentName.classList.add("modalInput")
    departmentName.name = "name"
    departmentName.placeholder = "Nome do departamento"

    departmentDescription.classList.add("modalInput")
    departmentDescription.name = "description"
    departmentDescription.placeholder = "Descrição"

    companySelect.classList.add("modalInput")
    companySelectOption.value = ""
    companySelectOption.innerText = "Selecionar empresa"

    companySelect.append(companySelectOption)
    
    allCompanies.forEach(company => {
        const option = document.createElement("option")

        option.innerText = `${company.name}`
        option.value = `${company.uuid}`
        option.name = "company_uuid"

        companySelect.appendChild(option)
    })

    companySelect.addEventListener("change", () => {
        const selectValue = `${companySelect.value}`
    })

    
    createButton.classList.add("createButton")
    createButton.innerText = "Criar o departamento"

    createButton.addEventListener("click", async (e) => {
        e.preventDefault()
        const inputs = document.querySelectorAll(".modalInput")
        inputs.forEach(({name, value}) => {
            if(value === ""){
                return alert("Por favor preencha os campos e tente novamente")
            } else {
                if(!name){
                    createBody["company_uuid"] = value
                } else {
                    createBody[name] = value
                }
            }
        } )
        
        departmentCreate(createBody)
        window.location.reload()
    })

    modalContainer.appendChild(modalDiv)
    modalDiv.append(modalTitle, closeModalButton, departmentName, departmentDescription, companySelect, createButton)
    
    return modalContainer
}

async function renderCreateCompanyModal(){
    const createCompanyModal = document.querySelector(".createCompanyModal")
    const openModalButton = document.querySelector(".createCompany")
    openModalButton.addEventListener("click", (e) => {
        e.preventDefault()
        
        const openedModal = createNewCompanyModal()
        createCompanyModal.innerHTML = "";
        createCompanyModal.appendChild(openedModal);

        createCompanyModal.showModal();
        closeModal();
    })
}


async function renderCreateDepartmentModal(){
    const createDepartModal = document.querySelector(".departCreateModal")
    const openModalButton = document.querySelector(".createDepartment")

    openModalButton.addEventListener("click", (e) => {
        e.preventDefault()
        
        const openedModal = createDepartmentModal()
        createDepartModal.innerHTML = "";
        createDepartModal.appendChild(openedModal);

        createDepartModal.showModal();
        closeModal();

    })

}

async function renderAllDepartments(array){
    const departments = document.querySelector(".departamentBox");
    array.forEach(department => {
        const departCard = document.createElement("div");
        const departTitle = document.createElement("h3");
        const departDesc = document.createElement("p");
        const departCompany = document.createElement("span");
        const divFooter = document.createElement("div");
        const viewButton = document.createElement("button");
        const editButton = document.createElement("button");
        const deleteButton = document.createElement("button");
        const viewImg = document.createElement("img");
        const editImg = document.createElement("img");
        const deleteImg = document.createElement("img");

        departCard.classList.add("departamentCard");
        departTitle.innerText = `${department.name}`;
        departDesc.innerText = `${department.description}`;
        departCompany.innerText = `${department.companies.name}`;
        divFooter.classList.add("buttonsFooter");
        viewButton.classList.add("viewBtn");
        viewButton.dataset.id = `${department.uuid}`
        editButton.classList.add("editBtn");
        editButton.dataset.id = `${department.uuid}`
        deleteButton.classList.add("deleteBtn");
        deleteButton.dataset.id = `${department.uuid}`
        viewImg.src = "/src/assets/icons/viewVector.svg";
        editImg.src = "/src/assets/icons/editVector.svg";
        deleteImg.src = "/src/assets/icons/deleteVector.svg";

        editButton.addEventListener("click", async (e) => {
            e.preventDefault();
            const departEditDialog = document.querySelector(".departEditModal")
            const openedModal = createEditDepartmentModal(editButton.dataset.id, departDesc.innerText);
            
            departEditDialog.innerHTML = "";
            departEditDialog.appendChild(openedModal);
    
            departEditDialog.showModal();
            
            closeModal();
        })

        viewButton.addEventListener("click", async (e) => {
            e.preventDefault();
            const departViewDialog = document.querySelector(".departViewModal")
            const openedModal = createViewDepartmentModal(department.name, department.description, department.companies.name, viewButton.dataset.id )

            departViewDialog.innerHTML = "";
            departViewDialog.appendChild(openedModal);

            departViewDialog.showModal();

            closeModal();
        })

        deleteButton.addEventListener("click", async (e) => {
            e.preventDefault();
            const departDeleteDialog = document.querySelector(".departDeleteModal")
            const openedModal = createDeleteDepartmentModal(deleteButton.dataset.id, department.name);

            departDeleteDialog.innerHTML = "";
            departDeleteDialog.appendChild(openedModal);

            departDeleteDialog.showModal();

            closeModal();
        })

        departments.appendChild(departCard);
        departCard.append(departTitle, departDesc, departCompany, divFooter);
        divFooter.append(viewButton, editButton, deleteButton);
        viewButton.appendChild(viewImg);
        editButton.appendChild(editImg);
        deleteButton.appendChild(deleteImg);
    });
}

async function renderDepartmentsById(){
    const departments = document.querySelector(".departamentBox");
    const select = document.querySelector(".selectCompany") 
    
    allCompanies.forEach(company => {
        const option = document.createElement("option")

        option.innerText = `${company.name}`
        option.value = `${company.uuid}`

        select.appendChild(option)
    })

    select.addEventListener("change", async() => {
        const companyDepartments = await getAllDepartmentsById(select.value)
        departments.innerHTML = "";
    
        if(companyDepartments.length === 0){
            const textDiv = document.createElement("div")
            textDiv.classList.add("emptyDeparts")
            const showText = document.createElement("h2")
            showText.innerText = "Esta empresa ainda não tem departamentos cadastrados"

            departments.appendChild(textDiv)
            textDiv.appendChild(showText)
        } else {
            renderAllDepartments(companyDepartments);
        }
    })
}

async function renderAllUsers(){
    const getCompany = ""
    const usersContainer = document.querySelector(".userBox");
    usersContainer.innerHTML = ""
    const allUsers = await getAllUsers();
    const allDeparts = await getAllDepartments();


    allUsers.forEach(user => {
        if(user.is_admin === false){
            const userCard = document.createElement("div");
            const userTitle = document.createElement("h3");
            const userLevel = document.createElement("p");
            const userCompany = document.createElement("span");
            const divFooter = document.createElement("div");
            const editButton = document.createElement("button");
            editButton.dataset.id = `${user.uuid}`
            const deleteButton = document.createElement("button");
            deleteButton.dataset.id = `${user.uuid}`
            const editImg = document.createElement("img");
            const deleteImg = document.createElement("img");

            userCard.classList.add("userCard");
            userTitle.innerText = `${user.username[0].toUpperCase() + user.username.substring(1)}`;
            if(user.professional_level === null){
                userLevel.innerText = "Nível profissional não definido"
            }else{
                userLevel.innerText = `${user.professional_level[0].toUpperCase() + user.professional_level.substring(1)}`;
            }
            if(user.department_uuid === null){
                userCompany.innerText = "Usuário não contratado"
            } else{
                userCompany.dataset.id = `${user.department_uuid}`;
            }

            allDeparts.forEach(depart => {
                if(depart.uuid === userCompany.dataset.id){
                    userCompany.innerText = `Departamento de ${depart.name}`
                }
            })

            divFooter.classList.add("userButtonsFooter");
            editButton.classList.add("userEditBtn");
            deleteButton.classList.add("userDeleteBtn");
            editImg.src = "/src/assets/icons/coloredEdit.svg";
            deleteImg.src = "/src/assets/icons/deleteVector.svg";

            editButton.addEventListener("click", (e) => {
                e.preventDefault();
                const userEditModalDialog = document.querySelector(".userEditModal")
                const openedModal = createUpdateUserAdminModal(editButton.dataset.id);
                
                userEditModalDialog.innerHTML = "";
                userEditModalDialog.appendChild(openedModal);
        
                userEditModalDialog.showModal();
                
                closeModal();
            })

            deleteButton.addEventListener("click", (e) => {
                e.preventDefault();
                const userDeleteDialog = document.querySelector(".userDeleteModal")
                const openedModal = createDeleteUserModal(deleteButton.dataset.id, userTitle.innerText)
                
                userDeleteDialog.innerHTML = "";
                userDeleteDialog.appendChild(openedModal);

                userDeleteDialog.showModal();

                closeModal();
            })

            usersContainer.appendChild(userCard);
            userCard.append(userTitle, userLevel, userCompany, divFooter);
            divFooter.append(editButton, deleteButton);
            editButton.appendChild(editImg);
            deleteButton.appendChild(deleteImg);
        }
        
    });
}

async function renderCompanies(array){
    const companyBox = document.querySelector(".companyBox");
    array.forEach(company => {
        const companyDivCard = document.createElement("div");
        const companyTitle = document.createElement("h3");
        const time = document.createElement("p");
        const sector = document.createElement("span");

        companyDivCard.classList.add("companyCard");
        companyTitle.innerText = `${company.name}`;
        time.innerText = `${company.opening_hours}`;
        sector.innerText = `${company.sectors.description}`;

        companyBox.appendChild(companyDivCard);
        companyDivCard.append(companyTitle, time, sector);
    });
}

async function renderCompanyBySector(){
    const companyBox = document.querySelector(".companyBox");
    const select = document.querySelector(".selectCompanySector");

    select.addEventListener("change", async() => {
        const companies = await getCompanyBySector(select.value)
        companyBox.innerHTML = "";
        renderCompanies(companies);
    })
}

async function closeModal(){
    const createCompanyModal = document.querySelector(".createCompanyModal")
    const departViewModal = document.querySelector(".departViewModal")
    const deleteDepartModal = document.querySelector(".departDeleteModal")
    const editDepartmentModal = document.querySelector(".departEditModal")
    const adminUserEdit = document.querySelector(".userEditModal")
    const adminUserDelete = document.querySelector(".userDeleteModal")
    const createDepartModal = document.querySelector(".departCreateModal")
    const closeButton = document.querySelector(".closeButton")

    closeButton.addEventListener("click", () =>{
        createCompanyModal.innerHTML = ""
        createCompanyModal.close();
        departViewModal.innerHTML = ""
        departViewModal.close();
        deleteDepartModal.innerHTML = ""
        deleteDepartModal.close();
        createDepartModal.innerHTML = ""
        createDepartModal.close();
        adminUserEdit.innerHTML = ""
        adminUserEdit.close();
        adminUserDelete.innerHTML = ""
        adminUserDelete.close();
        editDepartmentModal.innerHTML = ""
        editDepartmentModal.close();
    } )
}

verifyUser();
logoutButton();
renderAllDepartments(departmentsList);
renderDepartmentsById();
renderAllUsers();
renderCompanies(allCompanies);
renderCompanyBySector();
renderCreateDepartmentModal();
renderCreateCompanyModal();