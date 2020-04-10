import {Engine} from './engine.js';
import {getMouse, getKeyBoard} from './inputDevices.js';
import {Pacman} from './pacman.js';
import {Text} from './shapes.js';
import {FifoChain} from './chains.js';

const ch = new FifoChain();
ch.add(0);
ch.add(1);
ch.add(2);
ch.add(3);

// var ch3 = JSON.parse(JSON.stringify(ch));
// Object.assign(ch3 , ch);
// console.log(JSON.stringify(ch));
// console.log(ch.cutLast());
console.log(ch);
console.log(ch.toArray());
console.log(ch.get());
console.log(ch.toArray());
console.log(ch);


const engine = new Engine(640, 480, '#3D4D3D', 1.3333);

const mousePos = new Text({
    context : engine.context,
    x : 0,
    y : 80,        
    color : '#FF00F0',
    text : 'Text',
    fill : true,
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


const keyBoard = getKeyBoard();
const mouse = getMouse(engine.scale);


// const runRectIntersector = new RectIntersect(runRect);
const pac = new Pacman(engine.context);

const persons = [pac];

engine.log('log1');
engine.log('log2');
engine.log('log3');
engine.log('log4');

// var dlw = 0.1;
engine.update = function () {
// console.log('update');

    persons.forEach(pers => {
        pers.operate();
        pers.draw();
    });
    

    if (keyBoard.isPress('UP')){        
        pac.toDo.push('moveUp');
        // console.log('UP');
    }        

    if (keyBoard.isPress('DOWN')){
        pac.toDo.push('moveDown');
        // console.log('DOWN');
    }        

    if (keyBoard.isPress('RIGHT')){
        pac.toDo.push('moveForward');
        // console.log('RIGHT');
    }        

    if (keyBoard.isPress('LEFT')){
        pac.toDo.push('moveBack');
        // console.log('LEFT');
    }
    // console.log(pac.toDo);
    
    // runRect.x+=1;
    // if (runRect.x>game.width-runRect.width) {
    //     runRect.x = 0;
    // }
    
    // rectText.lineWidth += dlw;
    // if (rectText.lineWidth>3) dlw = -0.1;
    // if (rectText.lineWidth<0.2) dlw = 0.1;

    // rectText.draw('x:' + Math.round(shape.x) + ' y:' + Math.round(shape.y)); 

    // shape.draw();
    
    mousePos.draw('x:' + Math.round(mouse.x) +' ['+ Math.round(mouse.dx) + '] y:' + Math.round(mouse.y) +' ['+ Math.round(mouse.dy)+']' );
        
    // runRect.draw();
    // path.draw();

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
