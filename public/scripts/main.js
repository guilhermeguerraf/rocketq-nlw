import { Modal } from "./modal.js";

const modal = Modal()

const modalTitle = document.querySelector('.modal-wrapper .modal h2')
const modalDescription = document.querySelector('.modal-wrapper .modal p')
const modalButton = document.querySelector('.modal-wrapper .modal .buttons button')

const checkButtons = document.querySelectorAll('.actions a.check');

checkButtons.forEach(button => {

    button.addEventListener('click', (event) => handleClick(event, true))
})

const deleteButtons = document.querySelectorAll('.actions a.delete');

deleteButtons.forEach(button => {

    button.addEventListener('click', (event) => handleClick(event, false))
})

function handleClick(event, check = true){
    event.preventDefault()

    // Alterar o action do form do modal
    // Pegar id room
    const roomId = document.querySelector('#room-id').dataset.id
    // Pegar id question
    const questionId = event.target.dataset.id
    // Pegar action
    const slug = check ? "check" : "delete"
    // /room/:room/:question/:action
    const form = document.querySelector('.modal-wrapper .modal form')
    form.setAttribute('action', `/${roomId}/${questionId}/${slug}`)

    // Alterar o conteúdo do modal
    const title = check ? "Marcar pergunta como lida" : "Excluir pergunta"
    modalTitle.innerHTML = title

    const text = check ? "Marcar como lida" : "Excluir"
    modalDescription.innerHTML = `Tem certeza que você deseja ${text.toLowerCase()} esta pergunta?`

    modalButton.innerHTML = `Sim, ${text.toLowerCase()}`
    check ? modalButton.classList.remove('red') : modalButton.classList.add('red')
    
    // Abrir modal
    modal.open()
}