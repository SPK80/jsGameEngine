import {FifoChain} from './chains.js';

export class gameLog {
    #context = null;
    #log = null;
    #x = 0;
    #y = 0;
    #size = 0;
    #strHeight = 0;  
    #count = 0;  

    constructor(context, x, y, size, strHeight=10){        
        this.#context = context;
        this.#x = x;
        this.#y = y;
        this.#size = size;
        this.#strHeight = strHeight;
        this.#log = new FifoChain();        
    }

    draw(){
        var _log = this.#log.toArray();
        var _y = 0;
        for (let i = 0; i < _log.length; i++) {
            
            const str = _log[_log.length-i-1];
            _y = this.#y+(i+1)*(this.#strHeight+1);
            
            this.#context.fillText(str, this.#x, _y);
        }
    }

    add(text){
        if (this.#count>=this.#size) {
            this.#log.get();
        }
        this.#log.add(text);
        this.#count++;
    }
}
