import {Personage} from './personage.js';
import {Circle} from './shapes.js';

export class Pacman extends Personage{
    constructor(params){
        super({
            x : 100,
            y : 100,
            drawContent : [
                new Circle({
                    context : params.context,
                    x : 0,
                    y : 0,
                    width : 30,
                    color : '#0000F0',
                    fill : true,
                    lineWidth : 10,
                }),
                new Circle({
                    context : params.context,
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