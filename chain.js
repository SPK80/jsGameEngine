export class Chain {
    constructor(maxCount){
        this.#maxCount = maxCount;
    }

    #maxCount = 0;
    #head = null;
    #last = null;
    #count = 0;

    push(data){

        if (this.#head == null) {
            this.#head = this.#last = new ChNode(data);
        }
        else this.#head = this.#head.joinNewNext(data);
        
        this.#count++;

        // if(this.#count >= this.#maxCount){
        //     cut();
        // }
    }
    
    get all(){
        if (this.#head == null) return [];

        const result = [this.#head.data];
        var node = this.#head.pred;

        while (node != null) {            
            result.push(node.data);
            node = node.pred;            
        }
        return result;
    }

    cutLast(){        
        const last = this.#last;
        this.#last = this.#last.next;
        this.#last.next = null;
        this.#count--;
        last.next = last.pred = null;
        return last;
    }

    cut(newMaxCount){
        if (this.#head == null || this.#last == null || newMaxCount>=this.#maxCount) return;
        var count = newMaxCount;

        while (count>this.#maxCount) {
                        
        }
        this.#last
        

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