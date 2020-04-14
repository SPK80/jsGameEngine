function defaultIfUndefined(param, defVal) {
   if (param==undefined) {
       return defVal;
   }
   else {
       return param;
   }
}

class Primitive {
    constructor(params) {
        this._context = params.context;
        this.x = defaultIfUndefined(params.x, 0);        
        this.y = defaultIfUndefined(params.y, 0);
        this.fill = defaultIfUndefined(params.fill, false);
        this.color = defaultIfUndefined(params.color, 'FF0000');
        this.lineWidth = defaultIfUndefined(params.lineWidth, 1);        
    }

    applyStyle() {
        
        if (this.fill) {
            this._context.fillStyle = this.color;
        }
        else {
            this._context.strokeStyle = this.color;
            this._context.lineWidth  = this.lineWidth;
        }
    }

    draw() {
        console.log('function draw undefined');        
    }   
}

class Shape extends Primitive {
    constructor(params) {
        super(params)
        this.width = defaultIfUndefined(params.width, 100);
        this.height = defaultIfUndefined(params.height, 100);
    }     

    get right() {
        return this.x+this.width
    }

    get buttom() {
        return this.y+this.height
    }

    // includes(x, y) {
    //     return  (x > this.x && x < this.right()) && 
    //             (y > this.y && y < this.buttom())
    // }
}

export class Rect extends Shape {
    constructor(params) {
        super(params) 
    }

    draw() {
        this.applyStyle();
        if (this.fill){            
            this._context.fillRect(this.x, this.y, this.width, this.height);
        } 
        else {
            this._context.strokeRect(this.x, this.y, this.width, this.height);
        }        
    }
}

export class Circle extends Shape {
    constructor(params) {
        super(params)
    }

    draw() {
        this.applyStyle();
        // console.log(this);       
        
        this._context.beginPath();
        this._context.arc(this.x, this.y, this.width, 0, Math.PI*2);
        if (this.fill) {
            this._context.fill();
        }
        else {
            this._context.stroke();
        }
    }
};

export class Path extends Primitive {
    constructor(params) {
        super(params)
        this.points = defaultIfUndefined(params.points, [{x:0, y:0}, {x:10, y:10}]);
        this.shifting = defaultIfUndefined(params.shifting, false);
        this.fill = false;
    }

    draw () {
        const _path = this;
        var x = this.x;
        var y = this.y;

        function calcXY(i) {
            
            if (_path.shifting) {
                x += _path.points[i].x;
                y += _path.points[i].y;
            }
            else {
                x = _path.x+_path.points[i].x;
                y = _path.y+_path.points[i].y;
            }
        }

        super.applyStyle();

        this._context.beginPath();
        calcXY(0);
        this._context.moveTo(x,y);
        
        for (let i = 1; i < this.points.length; i++) {
            calcXY(i);         
            this._context.lineTo(x,y);                
        }
        this._context.stroke();            

    };
}

export class Text  extends Primitive {

    #text = '';
    get text() {return this.#text};
    set text(value) {
        if (value == undefined) return;
        this.#text = value;
    }

    #font = '10px arial';    
    get font() {return this.#font};
    set font(value) {
        if (value == undefined || value == '') return;
        this.#font = value;
        var h = Number(this.font.match(/^[0-9]+/)[0]);
        if (h == NaN || h == undefined) return;
        this.#lineHeight = h;
    }

    #lineHeight = 0;
    get lineHeight() { return this.#lineHeight; }

    constructor(params) {
        super(params);
        this.text = params.text;
        this.font = params.font;
    };
    
    applyStyle(){
        super.applyStyle();
        this._context.font = this.font;            
    }

    _draw(_text, _x, _y){
        if (this.fill) {
            this._context.fillText(_text, _x, _y + this.#lineHeight);
        }
        else {
            this._context.strokeText(_text, _x, _y + this.#lineHeight);
        }
    }

    draw(text) {
        this.applyStyle();
        if (text!=undefined) this.text = text;
        this._draw(this.text, this.x, this.y);                
    };
};

export class MLText extends Text{
    draw(text) {
        this.applyStyle();
        if (text!=undefined) this.text = text;
        var x = this.x;
        var y = this.y;
        const lines = this.text.split('\r\n');
        lines.forEach(str => {
            this._draw(str, x, y);
            y+=this.lineHeight;
        });        
    };
}