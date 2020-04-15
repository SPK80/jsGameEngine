export class GameObject {
    
    #context = null;
    get context(){
        return this.#context;
    }

    constructor(params) {
        if (params.context == undefined) 
            throw('params.context must be defined');

        this.#context = params.context;
        this.x = params.x;
        this.y = params.y;
        // this.drawContent =  params.drawContent;
    }

    draw() {
        throw('draw must be implemented');
    }
}