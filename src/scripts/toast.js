export function toast(color, message){
    const toast = document.querySelector(".toast__container")
    const toastP = document.querySelector('.toast__container > p')

    toastP.innerText = message

    toast.style = `background-color: ${color}; border-color: ${color}`

    toast.classList.remove('hidden')
}