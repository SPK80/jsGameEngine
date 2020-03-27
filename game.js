'use strict';

const game = new Game(800, 500, '#3D4D3D',1.5);

const rect = new Rect({
    context : game.context,
    x : 100,
    y : 50,
    width : 50,
    height : 50,
    fillColor : '#3D00A0'
});

const runRect = new Rect({
    context : game.context,
    x : 20,
    y : 20,
    width : 80,
    height : 70,
    fillColor : '#3DA0F0'
});

const rectPos = new Text({
    context : game.context,
    x : 0,
    y : 10,        
    fillColor : '#FF0000',
    text : 'Text'
});

const mousePos = new Text({
    context : game.context,
    x : 0,
    y : 20,        
    fillColor : '#FF00F0',
    text : 'Text'
});

const path = new Path({
    context : game.context,
    x : 30,
    y : 50,        
    color : '#AFA0F0',
    lineWidth: 10,
    shifting: true,
    points : [{x:0, y:0}, {x:20, y:10},{x:0, y:25},{x:20, y:-5}]
});


const circle = new Circle({
    context : game.context,
    x : 100,
    y : 100, 
    width : 20,
    lineWidth: 1,
    fill : true,
    color : '#00A0F0',
    fillColor : '#F0A000',
});

const keyBoard = new KeyBoard();

const mouse = new Mouse();

game.update = function () {

    if (keyBoard.isPress('UP')){        
        rect.y--;
        // console.log('UP');
    }        

    if (keyBoard.isPress('DOWN')){
        rect.y++;
        // console.log('DOWN');
             
    }        

    if (keyBoard.isPress('RIGHT')){
        rect.x++
        // console.log('RIGHT');
    }
        

    if (keyBoard.isPress('LEFT')){
        rect.x--
        // console.log('LEFT');
    }

    runRect.x+=1;
    if (runRect.x>game.width-runRect.width) {
        runRect.x = 0;
    }

    // if (rect.intersect(rect1))
    // {
    //     rect1.fillColor = '#FF0000'
    // }
    // else
    // {
    //     rect1.fillColor = '#3DA0F0'
    // }
    rectPos.draw('x:' + rect.x + ' y:' + rect.y);    
    rect.draw();

    mousePos.draw('x:' + mouse.x +' ['+ mouse.dx + '] y:' + mouse.y +' ['+ mouse.dy+']' );
    runRect.draw();

    path.draw();

    circle.draw();    
    
    // if (mouse.wereEvent('dblclick'))
    // {
    //     console.log('dblclick');        
    // }

    if (mouse.wereEvent('click'))
    {        
        console.log('click', mouse.x, mouse.y);

        if (runRect.includes(mouse.x/game.scale, mouse.y/game.scale)) {
            runRect.fillColor = '#FFFF00'
            //console.log('inside');
        }
        else {
            runRect.fillColor = '#3DA0F0'

        }
        
    }
   
};

game.start();
