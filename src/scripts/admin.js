import { getAllDepartments } from "./request.js";

function logoutButton(){
    const logout = document.querySelector(".logoutButton");
    logout.addEventListener("click", () => {
        localStorage.removeItem("@kenzieEmpresas:token");
        window.location.replace("/")
    })
}

async function renderDepartments(){
    const departments = document.querySelector(".departamentBox");
    const departmentsList = await getAllDepartments();
    console.log(departmentsList)
    departmentsList.forEach(department => {
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
        departCompany.innerText = `${department.company}`;
        divFooter.classList.add("buttonsFooter");
        viewButton.classList.add("viewBtn");
        editButton.classList.add("editBtn");
        deleteButton.classList.add("deleteBtn");
        viewImg.src = "/src/assets/icons/viewVector.svg";
        editImg.src = "/src/assets/icons/editVector.svg";
        deleteImg.src = "/src/assets/icons/deleteVector.svg";

        departments.appendChild(departCard);
        departCard.append(departTitle, departDesc, departCompany, divFooter);
        divFooter.append(viewButton, editButton, deleteButton);
        viewButton.appendChild(viewImg);
        editButton.appendChild(editImg);
        deleteButton.appendChild(deleteImg);
    });

}

logoutButton();
renderDepartments();