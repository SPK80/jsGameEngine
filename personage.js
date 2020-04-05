class GameObject {
    constructor(params){
        this.x = params.x;
        this.y = params.y;;
        this.drawContent =  params.drawContent;
        
    }

    draw() {
        throw('draw must be implemented');
    }
}

class Animation {
    constructor(params){
        this.frames = params.frames; //array of funcs that implements draw frame
        this.state = params.beginFrame;
    }
    draw() {
        this.frames[this.state]();
    }
}

class Personage extends GameObject{
    
    constructor(params){
        super(params);
        this.toDo = [];
        this.animations = params.animations;  
        this.animation = animations[0];
        // this.actions ={
            // moveForward = function (){
                
            // },
            // moveBack = function (){
                
            // },
            // turnLeft = function (){
                
            // },
            // turnRihgt = function (){
                
            // },
            // jump = function (){
                
            // },
            // lieDown = function (){
                
            // },
            // affect = function (){
                
            // },
        // }
    }

    operate(){    
        // if (this.toDo.length>0)
        //     {
        //         console.log(this.toDo);
        //     }
        this.toDo.forEach(act => {
            this.actions[act]();
        });
        this.toDo = [];
    }



    draw() {
        this.drawContent.forEach(shape=>{
            shape.x += this.x;
            shape.y += this.y;
            shape.draw();
            shape.x -= this.x;
            shape.y -= this.y;            
        });
    }    
}

class Pacman extends Personage{
    constructor(){
        super({
            x : 100,
            y : 100,
            drawContent : [
                new Circle({
                    context : game.context,
                    x : 0,
                    y : 0,
                    width : 30,
                    color : '#0000F0',
                    fill : true,
                    lineWidth : 10,
                }),
                new Circle({
                    context : game.context,
                    x : 0,
                    y : 0,
                    width : 30,
                    color : '#00F000',
                    fill : true,
                    lineWidth : 10,
                }),
            ],
        });

        this.actions = {
            moveForward : ()=> {
                this.x++;
            },
            moveBack : ()=> {
                this.x--;
            },

            moveUp : ()=> {
                this.y--;
            },
            moveDown : ()=> {
                this.y++;
            },
        }
    }
}
