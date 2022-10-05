import {Paint} from './Paint.js';

export class App{

    constructor() {

        this.lineWidth = 1;
        this.colorPen = ("rgb(0,0,0");
        this.colorTemp=null;
        this.arrayPencil=["1"];
        this.buttonClear = document.querySelector('#clearCanvas')
        this.pencil = document.querySelectorAll(".pencil");
        this.couleur = document.querySelectorAll('.button-color');
        this.gomme = document.getElementById('gomme');
        this.picker = document.getElementById('picker');
        this.paintCanvas = new Paint(this.lineWidth,this.colorPen)
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
        this.buttonClear.addEventListener('click',this.clearCanvas.bind(this));

        if(storage){
            this.paintCanvas.loadImage(storage);
        }

    }

    changeColor(event){
        const target = event.currentTarget
        const dataColor = target.dataset.color;
        console.log(dataColor);
        this.paintCanvas.setColor(dataColor);
        this.addBorder('border',target.parentNode.id,target);
        if(this.gomme.className == 'border'){
            this.gomme.classList.remove('border');
        }
        this.paintCanvas.setLineWidth(this.arrayPencil[this.arrayPencil.length-1]);
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
}
