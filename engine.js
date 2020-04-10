import {gameLog} from './gameLog.js';

export class Engine {
    #width = 200;
    #height = 200;
    #scale = 1;
    #backgroundColor = 0;

    get width() {
        return this.#width;
    }

    get height() {
        return this.#height;
    }

    get scale() {
        return this.#scale;
    }

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
        cnv.style.width = this.width * this.#scale + 'px';
        cnv.style.height = this.height * this.#scale + 'px';
        cnv.style.backgroundColor = this.#backgroundColor;        
        document.body.appendChild(cnv);

        var _context = cnv.getContext('2d');
        this.context = _context;

        var log = new gameLog(_context, 0, 0, 4);

        this.update = function() {
            console.log('update not implemented')
        }
    
        var _engine = this;
        var engine = function(){

            _context.clearRect(0, 0, width, height);
            _engine.update();
            log.draw();           
            
            requestAnimationFrame(engine);
        }

        this.start = function() {
            engine();
        }
        
        this.log = function(text){
            log.add(text);        
        }

        this.clearLog = function(){
            log = new gameLog(_context, 0,0, 4);
        }
        
    }
}