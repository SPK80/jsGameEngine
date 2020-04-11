import {gameLog} from './gameLog.js';

// export function engine(width, height, BCLR, scale = 1.0) {

//     this.width = width;
//     this.height = height;
//     this.scale = scale;
//     this.backgroundColor = BCLR;

//     var cnv = document.createElement('canvas')
//     cnv.width = this.#width;
//     cnv.height = this.#height;
//     cnv.style.position = 'fixed';
//     cnv.style.left = 0;
//     cnv.style.top = 0;
//     cnv.style.width = this.width * this.scale + 'px';
//     cnv.style.height = this.height * this.scale + 'px';
//     cnv.style.backgroundColor = this.#backgroundColor;        
//     document.body.appendChild(cnv);

//     this.#context = cnv.getContext('2d');

//     this.clearLog();   

// }
export class Engine {
    #width = 200;
    #height = 200;
    #scale = 1;
    #backgroundColor = 0;

    #context = null;

    #log  = null;

    get context() {
        return this.#context;
    }

    get width() {
        return this.#width;
    }

    get height() {
        return this.#height;
    }

    get scale() {
        return this.#scale;
    }    

    // update() {
    //     console.log('update not implemented')
    // }

    constructor(width, height, BCLR, scale = 1.0) {
        
        this.#width = width;
        this.#height = height;
        this.#scale = scale;
        this.#backgroundColor = BCLR;

        var cnv = document.createElement('canvas')
        cnv.width = this.#width;
        cnv.height = this.#height;
        cnv.style.position = 'fixed';
        cnv.style.left = 0;
        cnv.style.top = 0;
        cnv.style.width = this.#width * this.#scale + 'px';
        cnv.style.height = this.#height * this.#scale + 'px';
        cnv.style.backgroundColor = this.#backgroundColor;        
        document.body.appendChild(cnv);

        this.#context = cnv.getContext('2d');

        this.clearLog();   
               
        this.update = function() {
            console.log('update not implemented')
        }
        
    }

    start() {
        console.log('start', this);
        this.engine();
    }

    engine(){

        console.log('engine', this);        
        // if (this == undefined) return;

        this.#context.clearRect(0, 0, this.#width, this.#height);
        this.update();
        this.#log.draw();           
        
        requestAnimationFrame(this.engine);
    }

    log(text){
        this.#log.add(text);        
    }

    clearLog(){
        this.#log = new gameLog(this.#context, 0, 0, 4);  
    }
}