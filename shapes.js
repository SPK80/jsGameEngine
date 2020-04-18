import {GameObject} from './gameObject.js';

function defaultIfUndefined(param, defVal) {
   if (param==undefined) {
       return defVal;
   }
   else {
       return param;
   }
}

class Shape extends GameObject {
    #fill = true;
    get fill(){return this.#fill}
    
    #lineWidth = 1;
    get lineWidth(){return this.#lineWidth}

    #color = '#FF0000';
    get color(){return this.#color}

    
    constructor(params) {
        super(params);
        if (params.lineWidth != undefined) this.#lineWidth = params.lineWidth;
        if (params.fill != undefined) this.#fill = params.fill;
        if (params.color != undefined) this.#color = params.color;
    }

    applyStyle(context) {
        
        if (this.fill) {
            context.fillStyle = this.color;
        }
        else {
            context.strokeStyle = this.color;
            context.lineWidth  = this.lineWidth;
        }
    }
}

export class Rect extends Shape {

    #width = 100;
    get width(){return this.#width}
    
    #height = 100;
    get height(){return this.#height}
    

    constructor(params) {
        super(params);
        if (params.width != undefined) this.#width = params.width;
        if (params.height != undefined) this.#height = params.height;
    }

    get right() {
        return this.x+this.width
    }

    get buttom() {
        return this.y+this.height
    }

    includes(x, y) {
        return  (x > this.x && x < this.right()) && 
                (y > this.y && y < this.buttom())
    }

    draw(context) {
        this.applyStyle(context);
        if (this.fill){            
            context.fillRect(this.x, this.y, this.width, this.height);
        } 
        else {
            context.strokeRect(this.x, this.y, this.width, this.height);
        }        
    }
}

export class Circle extends Shape {
    
    #radius = 100;
    get radius(){return this.#radius}

    constructor(params) {
        super(params);
        if (params.radius != undefined) this.#radius = params.radius;
    }

    draw(context) {
        this.applyStyle(context);
        // console.log(this);       
        
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        if (this.fill) {
            context.fill();
        }
        else {
            context.stroke();
        }
    }
};

export class Path extends Shape {
    constructor(params) {
        super(params)
        this.points = defaultIfUndefined(params.points, [{x:0, y:0}, {x:10, y:10}]);
        this.shifting = defaultIfUndefined(params.shifting, false);
    }

    draw (context) {
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

        super.applyStyle(context);

        context.beginPath();
        calcXY(0);
        context.moveTo(x,y);
        
        for (let i = 1; i < this.points.length; i++) {
            calcXY(i);         
            context.lineTo(x,y);                
        }
        context.stroke();            

    };
}

export class Text extends Shape {

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

    #lineHeight = 10;
    get lineHeight() { return this.#lineHeight; }

    constructor(params) {
        super(params);
        this.text = params.text==undefined ? this.#text : params.text;
        this.font = params.font==undefined ? this.#font : params.font;
    };
    
    applyStyle(context){
        super.applyStyle(context);
        context.font = this.font;            
    }

    _draw(context, _text, _x, _y){
        if (this.fill) {
            context.fillText(_text, _x, _y + this.#lineHeight);
        }
        else {
            context.strokeText(_text, _x, _y + this.#lineHeight);
        }
    }

    draw(context) {
        this.applyStyle(context);
        this._draw(context, this.text, this.x, this.y);                
    };
};

export class MLText extends Text{
    draw(context) {
        this.applyStyle(context);
        var x = this.x;
        var y = this.y;
        const lines = this.text.split('\r\n');
        lines.forEach(str => {
            this._draw(context, str, x, y);
            y+=this.lineHeight;
        });        
    };
}