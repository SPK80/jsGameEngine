import {Engine} from './engine.js';
import {Pacman} from './pacman.js';
import {Circle} from './shapes.js';

const engine = new Engine(640, 480, '#3D4D3D', 1.3333);

const mousePos = engine.createMLText('mouse', '', 20, 80, '#FF0000');
const keys = engine.createMLText('keys', '', 10, 10);
const pacText = engine.createMLText('pacText', '', 400, 10);

Number.prototype.round = function(places=0) {
    if (places==0) return Math.round(this);
    const p = Math.pow(10, places);
    return Math.round( this * p  + Number.EPSILON ) / p;
}

const rect = engine.createObject('rect','Rect', 
{
    x: 200, 
    y: 200, 
    width: 50, 
    height: 80, 
    color: '#3D4DFF', 
    fill: true
});

engine.addClass('Pacman', Pacman);
const pac = engine.createObject('pac', 'Pacman', {});
engine.addClass('Circle', Circle);
const circle = engine.createObject('circle', 'Circle', {
    x:100, 
    y:200, 
    width: 20, 
    height: 80, 
    color: '#FD4D00', 
    fill: false
});

// const path = new Path({
//     context : game.context,
//     x : 200,
//     y : 100,        
//     color : '#AFA0F0',
//     lineWidth: 3,
//     shifting: true,
//     points : [{x:0, y:0}, {x:20, y:10},{x:0, y:25},{x:20, y:-5}]
// });

const keyBoard = engine.keyBoard;
const mouse = engine.mouse;

engine.update = function () {

    // if (keyBoard.isPress('ENTER')){ 
    //     engine.stop();       
    //     engine.updateContext(engine.width-10, engine.height+10, engine.backgroundColor+10, engine.scale);
    // }    

    if (keyBoard.isPress('ESC')){        
        engine.stop();
    }        

    if (keyBoard.isPress('UP')){    
        // pac.turn(pac.sides.up);
        pac.moveForward();
        engine.log('UP');
    }        

    if (keyBoard.isPress('DOWN')){
        // pac.turn(pac.sides.down);
        pac.moveBack();
        engine.log('DOWN');
    }        

    if (keyBoard.isPress('RIGHT')){
        pac.turn(0.1);
        // pac.moveForward();
        engine.log('RIGHT');
    }        

    if (keyBoard.isPress('LEFT')){
        pac.turn(-0.1);
        // pac.moveForward();
        engine.log('LEFT');
    }
    
    mousePos.text = `x: ${mouse.x.round()} [${mouse.dx.round()}]\r\ny: ${mouse.y.round()} [${mouse.dy.round()}]`;
    keys.text = `${keyBoard.lastDown.key}: ${keyBoard.lastDown.code}`;
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
   
};

engine.start();
