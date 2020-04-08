class InputDevice {
    constructor (){
        if(this.inited) {
            console.log('InputDevice inited!');
            return
        }
        this.inited = true;
    }
}

class KeyBoard extends InputDevice {
    constructor(){
        super()
        var keys = {
            'UP'    : 38,
            'DOWN'  : 40,
            'LEFT'  : 37,
            'RIGHT' : 39,
        };

        var pressedKeys = {};

        window.addEventListener('keydown', e =>{
            pressedKeys[e.keyCode] = true;
        });

        window.addEventListener('keyup', function (e){
            pressedKeys[e.keyCode] = false;
        }); 

        this.isPress = (keyName) => (pressedKeys[keys[keyName]])       
    }
    
}

export const getKeyBoard = function() {return new KeyBoard();}

class Mouse extends InputDevice {
    constructor(scale=1) {
        super()
        this.x = 0;
        this.y = 0;
        this.dx = 0;
        this.dy = 0;
        this.scale = scale;

        var wereEvents = {};

        var baseEventHandler = function(e, _mouse) {
            wereEvents[e.type] = true;
            _mouse.x = e.clientX/_mouse.scale;
            _mouse.y = e.clientY/_mouse.scale;
        }

        window.addEventListener('mousemove', e => {
            baseEventHandler(e, this);
            this.dx = e.movementX/this.scale;
            this.dy = e.movementY/this.scale;
        });


        window.addEventListener('dblclick', e => {
            baseEventHandler(e, this);
        });

        window.addEventListener('click', e => {
            baseEventHandler(e, this);
        });

        this.wereEvent = function(eventName, deleteEvent=true) {

            var result = wereEvents[eventName];
            if (result && deleteEvent)
            {
                wereEvents[eventName]=false;
            }
            return result;
        }
    }
} 
const _mouse = new Mouse();
export const  getMouse = function(posScale) {
    _mouse.scale = posScale;
    return _mouse;
}

