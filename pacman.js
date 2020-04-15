// import {Personage} from './personage.js';
import {GameObject} from './gameObject.js';

import {Circle} from './shapes.js';

export class Pacman extends GameObject {
    #phase = 0;

    #color = '#A00090';
    get color(){return this.#color}

    
    constructor(params){
        super({
            context : params.context, 
            x : 100,
            y : 100,
        });

        if (params.color != undefined) this.#color = params.color;


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
    
    #dph=0.02;
    draw(){
        this.#phase+=this.#dph;
        if (this.#phase>0.25 || this.#phase<0) this.#dph = -this.#dph;

        this.context.fillStyle = this.color;
        this.context.beginPath();
        this.context.arc(this.x, this.y, 20, this.#angle + Math.PI*this.#phase, this.#angle + Math.PI*(2-this.#phase));
        this.context.lineTo(this.x, this.y);
        this.context.fill();
    }

    #moveSpeed = 1;
    
    sides = {
        right: 0.0, 
        down: 0.5*Math.PI, 
        left: Math.PI, 
        up: 1.5*Math.PI
    }

    #direction = {
        x: 0,
        y: 0
    }
    #angle = 0;
    get angle(){return this.#angle}

    turn(angle){
        this.#angle = angle;
        this.#direction.x = Math.sin(this.#angle);
        this.#direction.y = Math.cos(this.#angle);
    }


    moveForward() {
        this.x += this.#direction.x*this.#moveSpeed;
        this.y += this.#direction.y*this.#moveSpeed;
    }

}