'use strict';

const game = new Game(800, 500, '#3D4D3D', 1);

// const shape = new Circle({
//     context : game.context,
//     x : 0,
//     y : 0,
//     width : 30,
//     height : 50,
//     color : '#0000F0',
//     fill : true,
//     lineWidth : 10,
// });

// const runRect = new Rect({
//     context : game.context,
//     x : 20,
//     y : 20,
//     width : 80,
//     height : 70,
//     color : '#3DA0F0',
//     fill : true,
// });

// const rectText = new Text({
//     context : game.context,
//     x : 0,
//     y : 40,        
//     color : '#FF0000',
//     text : 'Text',
//     fill : false,
//     font : '30px tahoma',
//     lineWidth : 0.1
// });

const mousePos = new Text({
    context : game.context,
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


const keyBoard = new KeyBoard();

const mouse = new Mouse(game.scale);

// const runRectIntersector = new RectIntersect(runRect);
const pac = new Pacman();

const persons = [pac];

var dlw = 0.1;
game.update = function () {

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

game.start();
