function setIfDefined(param, value){
    if (value == undefined) return;
    param = value;
}

export class GameObject {
    
    #context = null;
    get context(){
        return this.#context;
    }

    #x = 0;
    get x() {return this.#x};
    set x(value) {setIfDefined(this.#x, value)};
    
    #y = 0;
    get y() {return this.#y};
    set y(value) {setIfDefined(this.#y, value)};
    
    #z = 0;
    get z() {return this.#z};
    set z(value) {setIfDefined(this.#z, value)};
    
    constructor(params) {
        if (params.context == undefined) 
            throw('params.context must be defined');

        this.#context = params.context;
        this.x = params.x;
        this.y = params.y;
        this.z = params.z;
    }

    draw() {
        throw('draw must be implemented');
    }
}