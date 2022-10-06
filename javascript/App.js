import {Paint} from './Paint.js';

export class App{

    constructor() {

        this.lineWidth = 1;
        this.colorPen = ("rgb(0,0,0");
        this.arrayPencil=["1"];
        this.buttonClear = document.querySelector('#clearCanvas')
        this.pencil = document.querySelectorAll(".pencil");
        this.couleur = document.querySelectorAll('.button-color');
        this.gomme = document.getElementById('gomme');
        this.picker = document.getElementById('picker');
        this.buttonForm = document.querySelector('.buttonForm');
        this.formulaire = document.querySelector('.formulaire');
        this.main = document.querySelector('#main');
        this.buttonClose = document.querySelector('#buttonClose');
        this.loader = document.querySelector('#loader')
        this.submitButton = document.querySelector('#submit-form');

        this.paintCanvas = new Paint(this.lineWidth,this.colorPen);
        this.init();
    }

    init(){
        const storage = localStorage.getItem('dessin');
        // Event sur les boutons taille du crayon
        for(let i = 0 ; i < this.pencil.length;i++){
            this.pencil[i].addEventListener('click',this.changeLineWidth.bind(this));
        }

        // Event sur les boutons couleurs du crayon
        for(let i = 0 ; i < this.couleur.length;i++){
            this.couleur[i].addEventListener('click',this.changeColor.bind(this));
        }
        // this.initNodeList(this.couleur);
        this.picker.addEventListener('change',this.pickerColorChange.bind(this))

        // Event sur la gomme
        this.gomme.addEventListener('click',this.selectGomme.bind(this));

        //Event sur le bouton clear
        this.buttonClear.addEventListener('click',this.clearCanvas.bind(this));

        //Event sur le formulaire
        this.buttonForm.addEventListener('click',this.openForm.bind(this));
        this.buttonClose.addEventListener('click',this.closeForm.bind(this));
        this.submitButton.addEventListener('submit', this.submitForm.bind(this)) ;

        if(storage){
            this.paintCanvas.loadImage(storage);
        }
    }

    changeColor(event){
        const target = event.currentTarget
        const dataColor = target.dataset.color;

        this.paintCanvas.setColor(dataColor);
        this.addBorder('border',target.parentNode.id,target);
        if(this.gomme.className == 'border'){
            this.gomme.classList.remove('border');
            // this.pencil.classList.add('border');
        }
        this.paintCanvas.setLineWidth(this.arrayPencil[this.arrayPencil.length-1]);
        for(let i=0 ; i < this.pencil.length ; i++ ){
            if(this.pencil[i].value == this.arrayPencil[this.arrayPencil.length-1])
            this.pencil[i].classList.add('border')
        }
    }

    changeLineWidth(event){
        const target = event.currentTarget
        const dataValue = target.value;

        if(dataValue!=undefined){
            this.arrayPencil.push(dataValue);
        }
        this.paintCanvas.setLineWidth(this.arrayPencil[this.arrayPencil.length-1]);
        this.addBorder('border',target.parentNode.id,target);
        if(this.gomme.className == 'border'){
            this.gomme.classList.remove('border');
        }

    }

    selectGomme(){
        this.paintCanvas.setLineWidth(30);
        this.paintCanvas.setColor('white');
        this.addBorder('border',null,this.gomme);

    }

    clearCanvas(){
        this.paintCanvas.clear(0,0,640,400);
    }

    pickerColorChange() {
        this.paintCanvas.setColor(this.picker.value);
        this.paintCanvas.setLineWidth(this.arrayPencil[this.arrayPencil.length-1]);
    }

    addBorder(selector,parent,target){
        let selected ;
        if(parent == null){
            selected = document.querySelectorAll('.'+selector);
        }
        else{
            selected = document.getElementById(parent).querySelectorAll('.'+selector);
        }
        for(let i=0 ; i < selected.length ; i++ ){
           selected[i].classList.remove(selector)
        }
        target.classList.add(selector);
    }

    openForm(){
        document.querySelector('#img').value = this.paintCanvas.canvas.toDataURL("image/png");
        this.formulaire.classList.remove('hide');
        this.main.classList.add('opacity')
    }

    closeForm(){
        this.formulaire.classList.add('hide');
        this.main.classList.remove('opacity');
    }

    async submitForm(event){
        event.preventDefault();
        const link = event.currentTarget;
        this.loader.classList.remove('hide');
        const response = await fetch(link.action,{ method: 'POST', body: new FormData(link) })
        const data = await response.json();
        this.loader.classList.add('hide');
        alert(data['confirmation']);
        this.closeForm()
        link.reset();
    }

}
