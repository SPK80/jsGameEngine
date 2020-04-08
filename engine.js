export class Engine {
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
        this.debugView = null;

        this.update = function(){
            console.log('update not implemented')
        }
    
        var _game = this;
        var engine = function(){

            _context.clearRect(0, 0, WIDTH, HEIGHT);
            _game.update();

            if (this.debugView) {

                for (let i = 0; i < this.debugView.log.length; i++) {
                    const txt = this.debugView.log[i];     

                    _context.fillText(str, this.debugView.x, this.debugView.y+i*(this.debugView.font.height+1));
                }
                
            
            }
            
            requestAnimationFrame(engine);
        }

        this.start = function() {
            engine();
        }
        
    }

    setDebugView(view){
        this.debugView = view;
        return view;
    }
    
}