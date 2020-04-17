import {Engine} from './engine.js';
import {Pacman} from './pacman.js';
import {Circle} from './shapes.js';
import {GameLog} from './gameLog.js';
import {Rect, Text, MLText} from './shapes.js';
import {Mouse, KeyBoard} from './inputDevices.js';
const scale = 1.3333;
const engine = new Engine(640, 480, '#3D4D3D', scale);

const keyBoard = new KeyBoard();
const mouse = new Mouse(scale);

const  gLog = new GameLog();

const pac = new Pacman();
const mousePos = new MLText(
{
    text : 'mousePos', 
    x : 20, 
    y : 80,
    color:  '#FF0000'
});
// const keys = engine.createMLText('keys', '', 10, 10);
const pacText = new MLText({
    text : 'pacText', 
    x : 400, 
    y : 10,
    color:  '#FFF000'
});

Number.prototype.round = function(places=0) {
    if (places==0) return Math.round(this);
    const p = Math.pow(10, places);
    return Math.round( this * p  + Number.EPSILON ) / p;
}

Number.prototype.parseHex = function(value) {
    return parseInt(value.replace('#', ''), 16);
}

const rect = new Rect( 
{
    x: 200, 
    y: 200, 
    width: 50, 
    height: 80, 
    color: '#3D4DFF', 
    fill: false
});

const circle = new Circle({
    x:100, 
    y:200, 
    width: 20, 
    height: 80, 
    color: '#FD4D00', 
    fill: true
});


engine.update = function (context) {
    engine.clearContext();

    context.fillStyle = '#FF00FF';
    context.beginPath();
    context.arc(200, 200, 50, 0, Math.PI);
    context.lineTo(100,100);
    context.arc(120, 100, 20, Math.PI, 0);
    context.fill();

    circle.draw(context);
    rect.draw(context);

    pac.draw(context);

    pacText.draw(context);
    mousePos.draw(context);

    // if (keyBoard.isPress('ENTER')){ 
    //     engine.stop();       
    //     engine.updateContext(engine.width-10, engine.height+10, engine.backgroundColor+10, engine.scale);
    // }    

    if (keyBoard.isPress('ESC')){        
        engine.pause();
        gLog.add('pause');        
    }        

    if (keyBoard.isPress('UP')){    
        // pac.turn(pac.sides.up);
        pac.moveForward();
        gLog.add('UP');
    }        

    if (keyBoard.isPress('DOWN')){
        // pac.turn(pac.sides.down);
        pac.moveBack();
        gLog.add('DOWN');
    }        

    if (keyBoard.isPress('RIGHT')){
        pac.turnOn(0.1);
        // pac.moveForward();
        gLog.add('RIGHT');
    }        

    if (keyBoard.isPress('LEFT')){
        pac.turnOn(-0.1);
        // pac.moveForward();
        gLog.add('LEFT');
    }
    
    mousePos.text = `x: ${mouse.x.round()} [${mouse.dx.round()}]\r\ny: ${mouse.y.round()} [${mouse.dy.round()}]`;
    // keys.text = `${keyBoard.lastDown.key}: ${keyBoard.lastDown.code}`;
    pacText.text = `dir.x:${pac.direction.x.round(2)}\r\ndir.y:${pac.direction.y.round(2)}`;
    
    // if (mouse.wereEvent('click', false))
    // {
        // if (runRectIntersector.includes(mouse.x, mouse.y)){
        //     runRect.fill = !runRect.fill;
        // }
        // console.log(runRect.fill);        
    // }
    
    // if (mouse.wereEvent('dblclick'))
    // {
    //     console.log('dblclick');        
    // }

    // if (mouse.wereEvent('click'))
    // {      
    //     shape.fill = !shape.fill;
    //     if (!shape.lineWidth){
    //         shape.lineWidth=0;
    //     }
    //     console.log(shape.lineWidth++);  
    // }
   
}

engine.start();