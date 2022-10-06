export class Paint {
    constructor(lineWidth,color) {

        this.canvas = document.getElementById('paint-canvas');;
        this.imageParametre = new Image();
        this.ctx = this.canvas.getContext('2d');
        this.isMouseDown=false
        this.lineWidth  = lineWidth;
        this.lineCap = "round";
        this.color = color;
        this.ctx.fillStyle = 'white'
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
        this.init();
    }

    init() {
        //Event sur le canvas
        this.canvas.addEventListener('mousedown', this.mouseDown.bind(this));
        this.canvas.addEventListener('mousemove', this.mouseMove.bind(this), false);
        document.querySelector('body').addEventListener('mouseup', this.mouseUp.bind(this));

        this.imageParametre.addEventListener('load',function (){
            this.imageParametre.src = localStorage.getItem('dessin');
            this.ctx.drawImage(this.imageParametre,0,0,640,400);
        });

    }

    startDraw(coord){
        // this.isMouseDown=true

        this.ctx.beginPath();
        this.ctx.moveTo(coord.x, coord.y)
        this.ctx.lineWidth  = this.lineWidth;
        this.ctx.lineCap = this.lineCap;
        this.ctx.strokeStyle = this.color;
    }

    draw(coord) {

        // const rect = canvas.getBoundingClientRect();
        const x = coord.x;
        const y = coord.y;
        // if(this.isMouseDown){
        this.ctx.lineTo(x, y);
        this.ctx.stroke();

        // }
    }

    mouseDown(event){
        this.isMouseDown=true
        const coord= this.getMousePos(event);

        this.startDraw(coord);

    }

    mouseMove(event) {
        const coord= this.getMousePos(event);

        if(this.isMouseDown) {
            this.draw(coord);
        }

    }
    mouseUp(){
        localStorage.setItem('dessin',this.canvas.toDataURL("image/png"));

        this.isMouseDown = false;
    }

    getMousePos(event) {
        const rect = this.canvas.getBoundingClientRect();
        return {
            x : event.clientX - rect.left,
            y : event.clientY - rect.top
        }

    }

    setLineWidth(lineWidth){
        this.lineWidth = lineWidth;
    }

    setColor(color){
        this.color=color;
    }

    loadImage(dataImage){
        const image = new Image()
        image.src = dataImage;

        image.addEventListener('load',()=>{
            this.ctx.drawImage(image,0,0);
        })
    }

    clear(x,y,w,h){
        this.ctx.clearRect(x,y,w,h);
    }

}