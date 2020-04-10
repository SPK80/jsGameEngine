export class FifoChain {
    constructor(maxCount){
        this.#maxCount = maxCount;
    }

    #maxCount = 0;
    #last = null;
    #first = null;
    #count = 0;

    add(data){

        if (this.#first == null) {
            this.#last = this.#first = new ChNode(data);
        }
        else this.#last = this.#last.joinNewNext(data);
        
        this.#count++;

        // if(this.#count >= this.#maxCount){
        //     cut();
        // }
    }
    
    get(){        
        var first = this.#first;
        this.#first = first.next;
        return first;
    }

    toArray(){
        
        if (this.#last == null) return [];

        const result = [this.#last.data];
        var node = this.#last.pred;

        while (node != null) {            
            result.push(node.data);
            node = node.pred;            
        }
        return result;
    }


    cut(newMaxCount){
        if (this.#last == null || this.#first == null || newMaxCount>=this.#maxCount) return;
        var count = newMaxCount;

        while (count>this.#maxCount) {
                        
        }
        this.#first
        

        // var node = this.#head.pred;

        // while (node != null && count < newMaxCount) {            
        //     count++;
        //     node = node.pred;            
        // }
        // if (node != null)
        // {
        //     node.pred = null;
        // }
    }
    
}

class ChNode {
    constructor(data, pred = null, next = null){
        this.pred = pred;
        this.next = next;
        this.data = data;
    }

    joinNext(cnNode){
        if (typeof(cnNode) == ChNode){
            cnNode.pred = this;
            this.next = cnNode;
            return this.next;
        }
        else
        {
            return joinNewNext(cnNode)
        }
    }

    joinNewNext(data){
        this.next = new ChNode(data, this);
        return this.next;
    }
}