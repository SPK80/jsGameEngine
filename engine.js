import {gameLog} from './gameLog.js';
// export const engine = function(width, height, backgroundColor, scale = 1.0) {
//     var _width = width;
//     var _height = height;
//     var _scale = scale;
//     var _backgroundColor = backgroundColor;

//     this.width = function() {
//         return _width;
//     }

//     this.height = function() {
//         return _height;
//     }

//     this.scale = function() {
//         return _scale;
//     }

//     var _context = _createContext(_width, _height, _backgroundColor, _scale)
        
//         var log = new gameLog(_context, 0, 0, 4);

//         this.update = function() {
//             console.log('update not implemented')
//         }
    
//         var _engine = this;
//         var engine = function(){

//             _context.clearRect(0, 0, width, height);
//             _engine.update();
//             log.draw();           
            
//             requestAnimationFrame(engine);
//         }

//         this.start = function() {
//             engine();
//         }
        
//         this.log = function(text){
//             log.add(text);        
//         }

//         this.clearLog = function(){
//             log = new gameLog(_context, 0,0, 4);
//         }
        

// } 

class GameContext{
    #width = 200;
    #height = 200;
    #scale = 1;
    #backgroundColor = 0;
    #context = null;

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

// function _createContext(width, height, backgroundColor, scale = 1.0){
            
//     var cnv = null;
//     var cnvs = document.getElementsByTagName('canvas');
//     if (cnvs==undefined || cnvs.length<1) cnv = document.createElement('canvas');
//     else cnv = cnvs[0];

//     cnv.width = width;
//     cnv.height = height;
//     cnv.style.position = 'fixed';
//     cnv.style.left = 0;
//     cnv.style.top = 0;
//     cnv.style.width = width * scale + 'px';
//     cnv.style.height = height * scale + 'px';
//     cnv.style.backgroundColor = backgroundColor;        
//     document.body.appendChild(cnv);

//     return cnv.getContext('2d');
// }

// const _engine =  new Engine(200,200,0);

// export const engine = function(width, height, backgroundColor, scale = 1.0) {

//     return _engine;
// }

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

    constructor(_width, _height, _backgroundColor, _scale = 1.0) {                
        
        this.#gameContext = new GameContext(_width, _height, _backgroundColor, _scale);

        var _context = this.context;

        var log = new gameLog(_context, 0, 0, 4);

        this.update = function() {
            console.log('update not implemented')
        }
    
        var _engine = this;

        var engine = function(){

            _context.clearRect(0, 0, _engine.width, _engine.height);
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