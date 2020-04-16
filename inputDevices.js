class InputDevice {
    constructor (){
        if(this.inited) {
            console.log('InputDevice inited!');
            return
        }
        this.inited = true;
    }
}

export class KeyBoard extends InputDevice {

    #pressedKeys = {};

    #lastUpCode = 0;
    get lastUp(){
        for(key in this.#keys){
            if (this.#keys[key] == this.#lastUpCode)
            return {key: key, code: this.#lastUpCode};
        }
        return {key: '', code: this.#lastUpCode};
    }

    #lastDownCode = 0;
    get lastDown(){
        for(var key in this.#keys){
            if (this.#keys[key] == this.#lastDownCode)
            return {key: key, code: this.#lastDownCode};
        }    
        return {key: '', code: this.#lastDownCode};
    }

    #keys = {
        'UP'    : 38,
        'DOWN'  : 40,
        'LEFT'  : 37,
        'RIGHT' : 39,
        'ESC' : 27,
        'ENTER' : 13,        
    };

    #keyUp = false;
    #keyDown = false;

    constructor(){
        super()
        const _keyBoard = this;

        window.addEventListener('keydown', e => { 
            if (_keyBoard.#keyDownListeners[e.keyCode]!=undefined)
                _keyBoard.#keyDownListeners[e.keyCode]();           
            _keyBoard.#lastDownCode = e.keyCode;
            _keyBoard.#pressedKeys[e.keyCode] = true;
        });

        window.addEventListener('keyup', e => {
            if (_keyBoard.#keyUpListeners[e.keyCode]!=undefined)
                _keyBoard.#keyUpListeners[e.keyCode]();
            _keyBoard.#lastUpCode = e.keyCode;
            _keyBoard.#pressedKeys[e.keyCode] = false;
        });
    }

    #keyUpListeners = { };
    #keyDownListeners = { };

    getKeyCode(key){
        const code = 0;
        if (typeof(key)==String)
            code = this.#keys[key];
        else if (typeof(key)==Number)
            cose = key;
        else return;
        if (code == NaN || code == undefined) return undefined
        return code;
        
    }

    listenKeyDown(key, listener) { 
        const code = this.getKeyCode(key);
        if (code == undefined) return;
        this.#keyDownListeners[code] = listener;
    }

    listenKeyUp(key, listener) {
        const code = this.getKeyCode(key);
        if (code == undefined) return;      
        this.#keyUpListeners[code] = listener;
    }
    

    isPress(keyName) 
    {
        return this.#pressedKeys[this.#keys[keyName]];
    }    
}

// export const getKeyBoard = function() {return new KeyBoard();}

export class Mouse extends InputDevice {
    
    #x = 0;
    get x() {return this.#x;}

    #y = 0;
    get y() {return this.#y;}

    #dx = 0;
    get dx() {return this.#dx;}

    #dy = 0;
    get dy() {return this.#dy;}

    #scale = 1;

    #wereEvents = {};    
    wereEvent(eventName, deleteEvent=true) {

        var result = wereEvents[eventName];
        if (result && deleteEvent)
        {
            this.#wereEvents[eventName]=false;
        }
        return result;
    }

    constructor(scale=1) {
        super()
        this.#scale = scale;
        //const _this = this;
    
        var baseEventHandler = function(e, _this) {
            _this.#wereEvents[e.type] = true;
            _this.#x = e.clientX/_this.#scale;
            _this.#y = e.clientY/_this.#scale;            
        }

        window.addEventListener('mousemove', e => {
            baseEventHandler(e, this);
            this.#dx = e.movementX/this.#scale;
            this.#dy = e.movementY/this.#scale;
        });


        window.addEventListener('dblclick', e => {
            baseEventHandler(e, this);
        });

        window.addEventListener('click', e => {
            baseEventHandler(e, this);
        });        
    }
}

// const _mouse = new Mouse();
// export const  getMouse = function(posScale) {
//     _mouse._scale = posScale;
//     return _mouse;
// }