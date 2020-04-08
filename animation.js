export class Animation {
    constructor(params) {
        this.frames = params.frames; //array of funcs that implements draw frame
        this._index = 0;
        this.cicled = params.cicled;
    }

    get first() {
        this.index = 0;
        return this.frames[this.index];
    }

    get next() {
        // console.log(this.index);
        this.index = this.index+1;
        // console.log(this.index);
        
        return this.frames[this.index];
    }

    get pred() {
        this.index--;
        return this.frames[this.index];
    }

    get index() { return this._index };

    set index(value) {
        if (this.cicled) {
            if (value>=this.frames.length) this._index = 0;
            else if (value<0) this._index = this.frames.length-1;
            else this._index = value;
        }
        else {
            if (value>=this.frames.length) this._index = this.frames.length-1;
            else if (value<0) this._index = 0;
            else this._index = value;
        }
    };

}