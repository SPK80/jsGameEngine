export class Chain {
    constructor(maxCount){
        this.#maxCount = maxCount;
    }
    #maxCount = 0;
    #head = null;
    #count = 0;
    add(data){
        if(this.#head==null) {
            this.#head = new ChNode(data);
        }
        else
        this.#head = this.#head.join(data);
        this.#count++;

        if(this.#count>=this.#maxCount){
            cut();
        }
    }
    get all(){
        if (this.#head==null) return [];
        const result = [this.#head.data];
        var node = this.#head.pred;

        while (node!=null) {            
            result.push(node.data);
            node = node.pred;            
        }
        return result;
    }    

    cut(newMaxCount){
        if (this.#head==null) return;
        var count = 0;
        var node = this.#head.pred;

        while (node!=null && count<newMaxCount) {            
            count++;
            node = node.pred;            
        }
        if (node!=null)
        {
            node.pred=null;
        }
    }
    
}

class ChNode {
    constructor(data, pred=null){
        this.pred = pred;
        this.data = data;        
    }

    join(data){
        const newNode = new ChNode(data, this);
        return newNode;
    }
}