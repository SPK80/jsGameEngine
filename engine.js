import {gameLog} from './gameLog.js';
import {Rect, Text, MLText} from './shapes.js';
import {Mouse, KeyBoard} from './inputDevices.js';

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

class GameObjects{
    #objects = {};

    draw(){
        for (var key in this.#objects){
            this.#objects[key].draw();
        }
    }

    add(key, obj){
        this.#objects[key] = obj; 
    }

    remove(key){
        delete this.#objects[key];
    }

    get(key){
        return this.#objects[key];
    }

}

export class Engine {
    
    #gameContext = null;

    updateContext(_width, _height, _backgroundColor, _scale = 1.0) {
        this.#gameContext = new GameContext(_width, _height, _backgroundColor, _scale);
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
        return this.#gameContext.backgroundColor;
    }

    #log = null;

    constructor(_width, _height, _backgroundColor, _scale = 1.0) {                

        this.updateContext(_width, _height, _backgroundColor, _scale);        
        this.#log = new gameLog(this.#gameContext.context, 0, 0, 4);
        this.clearLog();   
               
        this.update = () => console.log('update not implemented');
    }

    #pause = false;

    #gameObjects = new GameObjects();

    getGameObject(key){
        return this.#gameObjects.get(key);
    }

    start() {
        const _engine = this;
        this.#pause = false;
        console.log('start');

        
        requestAnimationFrame(function engine(){
            if (!_engine.#pause) {
                _engine.#gameContext.context.clearRect(0, 0, _engine.width, _engine.height);
                _engine.update(); //implemented outside
                _engine.#gameObjects.draw();
                _engine.#log.draw();        
            }
            else{
                if (_engine.keyBoard.isPress('ESC')){        
                    _engine.#pause = false;                    
                } 
            }
            
            requestAnimationFrame(engine);
        });
    }

    pause(){
        if (this.#pause) return;
        this.#log.add('Engine.pause');
        this.#pause = true;
    }

    log(text){
        this.#log.add(text);        
    }

    clearLog(){
        this.#log = new gameLog(this.#gameContext.context, 0, 0, 4);  
    }

    #mouse=null;
    get mouse(){
        if (this.#mouse==null){
            this.#mouse = new Mouse(this.scale);
        }
        return this.#mouse;
    }
    
    #keyBoard=null;
    get keyBoard(){
        if (this.#keyBoard==null){
            this.#keyBoard = new KeyBoard();
        }
        return this.#keyBoard;
    }    
    
    #defaultFont = '10px times';
    #defaultTextColor = '#FFFFFF';

    createMLText(key, text, x, y, color = this.#defaultTextColor, font=this.#defaultFont){
        const result = new MLText({
            context: this.#gameContext.context,
            x :     x,
            y :     y,
            color : color,
            text :  text,
            fill :  true,
            font : font
        });
        this.#gameObjects.add(key, result);
        return result;    
    }

    createText(key, text, x, y, color = this.#defaultTextColor, font=this.#defaultFont){
        const result = new Text({
            context: this.#gameContext.context,
            x :     x,
            y :     y,
            color : color,
            text :  text,
            fill :  true,
            font : font
        });
        this.#gameObjects.add(key, result);
        return result;
    }
    
    createRect(key, x, y, wi, he, color, fill){
        const result = new Rect({
            context : this.#gameContext.context,
            x : x,
            y : y, 
            width : wi,       
            height : he,       
            color : color,
            fill : fill,
        });
        this.#gameObjects.add(key, result);
        return result;
    }

    #classes = {
        'Rect': Rect, 
        'Text':  Text, 
        'MLText': MLText,
        // 'Circle' : Circle,
    };
    
    createObject(key, className, params){
        params.context = this.#gameContext.context;    
        const result = new this.#classes[className](params);
        this.#gameObjects.add(key, result);
        return result;

    }

    addClass(className, _class){
        this.#classes[className]=_class;
    }
    
}