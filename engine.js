'use strict';

class Game {
    constructor(WIDTH, HEIGHT, BCLR, scale = 1.0) {
        
        this.width = WIDTH;
        this.height = HEIGHT;
        this.scale = scale;

        var cnv = document.createElement('canvas')
        cnv.width = this.width;
        cnv.height = this.height;
        cnv.style.position = 'fixed';
        cnv.style.left = 0;
        cnv.style.top = 0;
        cnv.style.width = this.width*this.scale + 'px';
        cnv.style.height = this.height*this.scale + 'px';
        cnv.style.backgroundColor = BCLR;        
        document.body.appendChild(cnv);

        var _context = cnv.getContext('2d');
        this.context = _context;

        this.update = function(){
            console.log('update not implemented')
        }
    
        var _game = this;
        var engine = function(){
            _context.clearRect(0, 0, WIDTH, HEIGHT);
            _game.update();
            requestAnimationFrame(engine);
        }

        this.start = function() {
            engine();
        }
        
    }
    
}
