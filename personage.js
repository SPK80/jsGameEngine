class GameObject {
    constructor(params) {
        this.x = params.x;
        this.y = params.y;;
        this.drawContent =  params.drawContent;
        
    }

    draw() {
        throw('draw must be implemented');
    }
}


import {Animation} from './animation.js';

export class Personage extends GameObject{
    
    constructor(params){
        super(params);
        this.toDo = [];
        this.animations = params.animations;  
        // this.animation = params.animations[0];
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