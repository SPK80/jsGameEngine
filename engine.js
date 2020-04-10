export class Engine {
    constructor(WIDTH, HEIGHT, BCLR, scale = 1.0) {
        
        this.width = WIDTH;
        this.height = HEIGHT;
        this.scale = scale;

        var cnv = document.createElement('canvas')
        cnv.width = this.width;
        cnv.height = this.height;
        cnv.style.position = 'fixed';
        cnv.style.left = 0;
        cnv.style.top = 0;
        cnv.style.width = this.width*this.scale + 'px';
        cnv.style.height = this.height*this.scale + 'px';
        cnv.style.backgroundColor = BCLR;        
        document.body.appendChild(cnv);

        var _context = cnv.getContext('2d');
        this.context = _context;

        var log = new Log(_context, 0,0);

        this.update = function(){
            console.log('update not implemented')
        }
    
        var _engine = this;
        var engine = function(){

            _context.clearRect(0, 0, WIDTH, HEIGHT);
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
        // this.clearLog = function(){
        //     log.clear();
        // }
        
    }
}

import {FifoChain} from './chains.js';

class Log 
{
    constructor(context, x, y, size, strHeight=10){
        
        this.#log = new FifoChain();
    }

    draw(){
        var _log =this.#log.toArray();
        for (let i = 0; i < _log.length; i++) {
            
            const str = _log[_log.length-i-1];
            const _y = y+(i+1)*(strHeight+1);
            
            context.fillText(str, x, _y);
        }
    }

    add(text){
        this.#log.add(text);
    }

}

