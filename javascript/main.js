import { App } from './App.js';

new App();

let buttonForm = document.querySelector('.buttonForm');
let formulaire = document.querySelector('.formulaire');
let main = document.querySelector('main');
let buttonClose = document.querySelector('#buttonClose');
let canvas = document.getElementById('paint-canvas');
let loader = document.querySelector('#loader')

const submitButton = document.querySelector('#submit-form');

buttonForm.addEventListener('click',openForm);
buttonClose.addEventListener('click',closeForm);

function openForm(){
    document.querySelector('#img').value = canvas.toDataURL("image/png");
    formulaire.classList.remove('hide');
    main.classList.add('opacity')
}

function closeForm(){
    formulaire.classList.add('hide');
    main.classList.remove('opacity');
}

submitButton.addEventListener('submit', async function(event){
    event.preventDefault();
    const link = event.currentTarget;
    loader.classList.remove('hide');
    const response = await fetch(link.action,{ method: 'POST', body: new FormData(link) })
    const data = await response.json();
    loader.classList.add('hide');
    alert(data['confirmation']);
    closeForm()
    link.reset();
} )






