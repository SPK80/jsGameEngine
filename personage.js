import {Animation} from './animation.js';
import {GameObject} from './gameObject.js';


// export class Personage extends GameObject {    
//     constructor(params){
//         super(params);
//         // this.toDo = [];
//         // this.animations = params.animations;
//         // this.animation = params.animations[0];
//         // this.actions ={
//             // moveForward = function (){
                
//             // },
//             // moveBack = function (){
                
//             // },
//             // turnLeft = function (){
                
//             // },
//             // turnRihgt = function (){
                
//             // },
//             // jump = function (){
                
//             // },
//             // lieDown = function (){
                
//             // },
//             // affect = function (){
                
//             // },
//         // }
//     }

//     operate(){    
//         // if (this.toDo.length>0)
//         //     {
//         //         console.log(this.toDo);
//         //     }
//         this.toDo.forEach(act => {
//             this.actions[act]();
//         });
//         this.toDo = [];
//     }



//     draw() {

//         this.context.beginPath();
//         this.context.arc(this.x, this.y, this.radius, 0, Math.PI*2);
//         if (this.fill) {
//             this.context.fill();
//         }
//         else {
//             this.context.stroke();
//         }

//         // this.drawContent.forEach(shape=>{
//         //     shape.x += this.x;
//         //     shape.y += this.y;
//         //     shape.draw();
//         //     shape.x -= this.x;
//         //     shape.y -= this.y;            
//         // });
//     }    
// }