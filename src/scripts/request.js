const token = localStorage.getItem("@kenzieEmpresas:token");
const baseUrl = "http://localhost:6278";
const requestHeaders = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};

export async function getAllCompanies(){
    const companies = await fetch(`${baseUrl}/companies`,{
        method: "GET",
        headers: requestHeaders,
    })
    .then(response => response.json())

    return companies
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

export async function loginRequest(loginBody){
    const token = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify(loginBody),
      })
      .then((response) => {
        if(response.ok){
            const responseJson = response.json().then(({token}) => {
                localStorage.setItem("@kenzieEmpresas:token", JSON.stringify(token))

                return token
            })

            return responseJson
        } else {
            response.json().then(resError => console.log(resError))
        }
    })

    return token
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