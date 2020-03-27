'use strict';
// var zLevel = 0; 

class Primitive {
    constructor(params) {
        this.context = params.context
        this.x = params.x;
        this.y = params.y;
        this.color = params.color;        
        // this.zLevel = params.zLevel
    }
    
    applyStyle() {
        this.context.color = this.color;
    }
}

class Shape extends Primitive {
    constructor(params) {
        super(params)
        this.width = params.width;
        this.height = params.height;
        this.fillColor = params.fillColor
    }

    applyStyle() {
        super.applyStyle();
        this.context.fillStyle = this.fillColor;
    }

    right() {
        return this.x+this.width
    }

    buttom() {
        return this.y+this.height
    }

    includes(x, y) {
        return  (x > this.x && x < this.right()) && 
                (y > this.y && y < this.buttom())
    }

    includesX(x) {
        return  (x > this.x && x < this.right());
    }

    includesY(y) {
        return  (y > this.y && y < this.buttom());
    }
    
}

class Rect extends Shape {
    constructor(params) {
        super(params)       
    }

    draw() {
        super.applyStyle();
        this.context.fillRect(this.x, this.y, this.width, this.height);
    }

    intersect (obj) { 
        return ((this.includesX(obj.x) || obj.insideX(this.x)) && (this.includesY(obj.y) || obj.insideY(this.y)))
    }
}

class Path extends Primitive {
    constructor(params) {
        super(params)
        this.points = params.points;
        this.shifting = params.shifting;
        this.lineWidth = params.lineWidth;
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
        // super.applyStyle();
        this.context.beginPath();
        this.context.lineWidth  = this.lineWidth;
        
        this.context.strokeStyle = this.color;
        calcXY(0);
        this.context.moveTo(x,y);
        
        for (let i = 1; i < this.points.length; i++) {
            calcXY(i);         
            this.context.lineTo(x,y);                
        }
        this.context.stroke();            

    };
}

class Text  extends Shape {
    constructor(params) {
        super(params)
        this.text = params.text;

    };

    
    draw(text = this.text) {
        this.text = text;
        super.applyStyle();
        this.context.fillText(this.text, this.x,this.y);
    };
};
