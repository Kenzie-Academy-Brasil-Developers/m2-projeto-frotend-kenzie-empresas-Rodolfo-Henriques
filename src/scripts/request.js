import { toast } from "./toast.js";

const {token} = getToken() || {}
const baseUrl = "http://localhost:6278";
const requestHeaders = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};

const red = "#CE4646";
const green = "#4BA036";


export function getToken(){
  const token = JSON.parse(localStorage.getItem("@kenzieEmpresas:token"))
  return token
}

export async function validateUser(){
  const isAdmin = await fetch(`${baseUrl}/auth/validate_user`, {
    method: "GET",
    headers: requestHeaders,
  })
  const validateUserJson = await isAdmin.json()

  if(!isAdmin.ok){
    console.log("error")
  }

  return validateUserJson
}

export async function getAllCompanies(){
    const companies = await fetch(`${baseUrl}/companies`,{
        method: "GET",
        headers: requestHeaders,
    })
    
    const allCompanies = await companies.json()

    return allCompanies
}

export async function getCompanyBySector(sectorName){
    const companies = await fetch(`${baseUrl}/companies/${sectorName}`,{
        method: "GET",
        headers: requestHeaders,
    })
    .then(response => response.json())

    return companies
}

export async function getAllSectors(){
    const sectors = await fetch(`${baseUrl}/sectors`, {
        method: "GET",
        headers: requestHeaders,
    })
    .then(response => response.json())

    return sectors
}


export async function loginRequest(loginBody) {
  const loginRequestData = await fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginBody),
  });
  const loginRequestDataJson = await loginRequestData.json();
  if (!loginRequestData.ok) {
    console.log(loginRequestDataJson.error);
  } else {
    console.log("Login Realizado com sucesso");
    localStorage.setItem("@kenzieEmpresas:token", JSON.stringify(loginRequestDataJson));
    const token = loginRequestDataJson.token
    window.location.replace("/src/pages/user.html")
  }

  return loginRequestDataJson;
}

export async function registerRequest(registerBody) {
    const newUser = await fetch(`${baseUrl}/auth/register`, {
      method: "POST",
      headers: requestHeaders,
      body: JSON.stringify(registerBody),
    }).then((response) => {
      if(response.ok){
        return response.json();
      } else {
        response.json().then((resError) => console.log(resError));
      }
    });
    
    return newUser;
  }

export async function getAllDepartments(){
    const departments = await fetch(`${baseUrl}/departments`, {
        method: "GET",
        headers: requestHeaders,
    })
    .then(response => response.json())

    return departments
}

export async function getAllDepartmentsById(company_id){
  const departmentsById = await fetch(`${baseUrl}/departments/${company_id}`, {
      method: "GET",
      headers: requestHeaders,
  })
  .then(response => response.json())

  return departmentsById
}

export async function getAllUsers(){
  const users = await fetch(`${baseUrl}/users`, {
    method: "GET",
    headers: requestHeaders,
  })
  .then(response => response.json())

  return users
}

export async function getUserProfile(){
  const userProfile = await fetch(`${baseUrl}/users/profile`, {
    method: "GET",
    headers: requestHeaders,
  })
  .then(response => response.json())

  return userProfile
}

export async function getUserCoworkers(){
  const userCoworkers = await fetch(`${baseUrl}/users/departments/coworkers`, {
    method: "GET",
    headers: requestHeaders,
  })
  .then(response => response.json())

  return userCoworkers
}

export async function unemployedUsers(){
  const unemployedUsers = await fetch(`${baseUrl}/admin/out_of_work`, {
    method: "GET",
    headers: requestHeaders,
  })
  .then(response => response.json())

  return unemployedUsers
}

export async function getUserDepartment(){
  const userDepartment = await fetch(`${baseUrl}/users/departments`, {
    method: "GET",
    headers: requestHeaders,
  })
  .then(response => response.json())

  return userDepartment
}

export async function updateDepartment(editDepartmentBody, id){
  const updateDescription = await fetch(`${baseUrl}/departments/${id}`, {
    method: "PATCH",
    headers: requestHeaders,
    body: JSON.stringify(editDepartmentBody),
  })

  const updateDescriptionJson = await updateDescription.json()

  if(!updateDescription.ok){
    console.log(updateDescriptionJson.error)
  } else {
    console.log("Informações atualizadas")
  }
  
  return updateDescriptionJson;
  
}

export async function fireWorker(id){
  const workerFired = await fetch(`${baseUrl}/departments/dismiss/${id}`, {
    method: "PATCH",
    headers: requestHeaders,
  })

  const workerFiredJson = await workerFired.json()

  if(!workerFired.ok){
    console.log(workerFiredJson.error)
  } else {
    console.log("Trabalhador demitido")
  }

  return workerFiredJson;
}

export async function hireWorker(workerBody){
  const workerForm = await fetch(`${baseUrl}/departments/hire/`, {
    method: "PATCH",
    headers: requestHeaders,
    body: JSON.stringify(workerBody),
  })

  const workerFormJson = await workerForm.json()

  if(!workerForm.ok){
    console.log(workerFormJson.error)
  } else {
    console.log("Contratação feita")
  }
  
  return workerFormJson;
}

export async function updateUser(userBody){
  const userUpdateForm = await fetch(`${baseUrl}/users`, {
    method: "PATCH",
    headers: requestHeaders,
    body: JSON.stringify(userBody),
  })
  
  const userUpdateJson = await userUpdateForm.json()

  if(!userUpdateForm.ok){
    console.log(userUpdateJson.error)
  } else {
    console.log("Informações atualizadas")
  }
  
  return userUpdateJson;
}

export async function deleteDepartAdmin(id){
  const departToDelete = await fetch(`${baseUrl}/departments/${id}`, {
    method: "DELETE",
    headers: requestHeaders,
  })
  if(!departToDelete.ok){
    console.log(departToDelete.error)
  } else {
    console.log("Departamento Deletado")
  }
}

export async function deleteUserAdmin(id){
  const userToDelete = await fetch(`${baseUrl}/admin/delete_user/${id}`, {
    method: "DELETE",
    headers: requestHeaders,
  })
  if(!userToDelete.ok){
    console.log(userToDelete.error)
  } else {
    console.log("Usuário Deletado")
  }

}

export async function updateUserAdmin(userAdminBody, id){
  const updateUserForm = await fetch(`${baseUrl}/admin/update_user/${id}`, {
    method: "PATCH",
    headers: requestHeaders,
    body: JSON.stringify(userAdminBody),
  })

  const updateUserAdmin = await updateUserForm.json()

  if(!updateUserForm.ok){
    console.log(updateUserAdmin.error)
  } else {
    console.log("Informações atualizadas")
  }

  return updateUserAdmin;
}

export async function createCompany(createBody){
  const createForm = await fetch(`${baseUrl}/companies`, {
    method: "POST",
    headers: requestHeaders,
    body: JSON.stringify(createBody),
  })

  const createCompanyJson = await createForm.json()

  if(!createForm.ok){
    console.log(createCompanyJson.error)
  } else {
    console.log("Empresa Criada")
  }

  return createCompanyJson;
}

export async function departmentCreate(createBody){
  const createForm = await fetch(`${baseUrl}/departments`, {
    method: "POST",
    headers: requestHeaders,
    body: JSON.stringify(createBody),
  })

  const departCreate = await createForm.json()

  if(!createForm.ok){
    console.log(departCreate.error)
  } else {
    console.log("Departamento Criado")
  }

  return departCreate;

}