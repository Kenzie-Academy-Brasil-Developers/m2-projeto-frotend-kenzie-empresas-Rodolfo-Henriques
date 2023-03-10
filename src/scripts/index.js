import { getAllCompanies, getCompanyBySector } from "./request.js";

const listAllCompanies = await getAllCompanies();

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

async function renderCompanies(array){
    const companyBox = document.querySelector(".companyBox");
    array.forEach(company => {
        const companyDivCard = document.createElement("div");
        const companyTitle = document.createElement("h2");
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
    const select = document.querySelector(".companySelect");

    select.addEventListener("change", async() => {
        const companies = await getCompanyBySector(select.value)
        companyBox.innerHTML = "";
        renderCompanies(companies);
    })
}

renderCompanies(listAllCompanies);
renderCompanyBySector();
openDownMenu();