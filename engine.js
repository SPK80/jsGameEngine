import {gameLog} from './gameLog.js';

class GameContext{
    #width = 200;
    #height = 200;
    #scale = 1;
    #backgroundColor = 0;
    #context = null;

    get context() {
        return this.#context;
    }

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

    get backgroundColor() {
        return this.#backgroundColor;
    }

    constructor(width, height, backgroundColor, scale = 1.0) {
                
        this.#width = width;
        this.#height = height;
        this.#scale = scale;
        this.#backgroundColor = backgroundColor;

        var cnv = null;
        var cnvs = document.getElementsByTagName('canvas');
        if (cnvs==undefined || cnvs.length<1) cnv = document.createElement('canvas');
        else cnv = cnvs[0];

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
    }

}

export class Engine {
    
    #gameContext = null;

    get context() {
        return this.#gameContext.context;
    }

    get width() {
        return this.#gameContext.width;
    }

    get height() {
        return this.#gameContext.height;
    }

    get scale() {
        return this.#gameContext.scale;
    }

    get backgroundColor() {
        return this.gameContext.backgroundColor;
    }

    #log = null;

    constructor(_width, _height, _backgroundColor, _scale = 1.0) {                
        
        this.#gameContext = new GameContext(_width, _height, _backgroundColor, _scale);

        var _context = this.context;
        this.#log = new gameLog(_context, 0, 0, 4);

        this.clearLog();   
               
        this.update = function() {
            console.log('update not implemented')
        }
    
        var _engine = this;
        var _log = this.#log;

        var engine = function(){

            _context.clearRect(0, 0, _engine.width, _engine.height);
            _engine.update();
            _log.draw();           
            
            requestAnimationFrame(engine);
        }

        this.start = function() {
            engine();
        }
        
    }

    start() {
        console.log('start', this);
        this.engine();
    }

    engine(){

        console.log('engine', this);        
        // if (this == undefined) return;

        this.context.clearRect(0, 0, this.width, this.height);
        this.update();
        this.#log.draw();           
        
        requestAnimationFrame(this.engine);
    }

    log(text){
        this.#log.add(text);        
    }

    clearLog(){
        this.#log = new gameLog(this.context, 0, 0, 4);  
    }
}