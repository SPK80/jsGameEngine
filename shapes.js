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
        this.context = params.context;
        this.x = defaultIfUndefined(params.x, 0);        
        this.y = defaultIfUndefined(params.y, 0);
        this.fill = defaultIfUndefined(params.fill, false);
        this.color = defaultIfUndefined(params.color, 'FF0000');
        this.lineWidth = defaultIfUndefined(params.lineWidth, 1);        
    }

    applyStyle() {
        
        if (this.fill) {
            this.context.fillStyle = this.color;
        }
        else {
            this.context.strokeStyle = this.color;
            this.context.lineWidth  = this.lineWidth;
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

    right() {
        return this.x+this.width
    }

    buttom() {
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
        super.applyStyle();
        if (this.fill){
            this.context.fillRect(this.x, this.y, this.width, this.height);
        } 
        else {
            this.context.strokeRect(this.x, this.y, this.width, this.height);
        }        
    }
}
export class Circle extends Shape {
    constructor(params) {
        super(params)
    }

    draw() {
        super.applyStyle();
        
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.width, 0, Math.PI*2);
        if (this.fill) {
            this.context.fill();
        }
        else {
            this.context.stroke();
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

        this.context.beginPath();
        calcXY(0);
        this.context.moveTo(x,y);
        
        for (let i = 1; i < this.points.length; i++) {
            calcXY(i);         
            this.context.lineTo(x,y);                
        }
        this.context.stroke();            

    };
}

export class Text  extends Primitive {
    constructor(params) {
        super(params)
        this.text = defaultIfUndefined(params.text, '');
        this.font = defaultIfUndefined(params.font, '10px arial');
    };
    
    applyStyle(){
        super.applyStyle();
        this.context.font = this.font;            
    }

    draw(text = this.text) {

        this.applyStyle();
        this.text = text;
        if (this.fill) {
            this.context.fillText(this.text, this.x, this.y);
        }
        else {
            this.context.strokeText(this.text, this.x, this.y);
        }        
    };
};

