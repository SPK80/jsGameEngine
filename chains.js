export class FifoChain {
    
    #last = null;
    #first = null;

    add(data){

        if (this.#first == null) {
            this.#last = this.#first = new ChNode(data);
        }
        else this.#last = this.#last.joinNewNext(data);
    }
    
    get(){        
        var first = this.#first;
        this.#first = first.next;
        first.next = null;
        return first;
    }

    toArray(){
        
        if (this.#first == null) return [];

        const result = [this.#first.data];
        var node = this.#first.next;

        while (node != null) {            
            result.push(node.data);
            node = node.next;            
        }
        return result;
    }
}

class ChNode {
    #data = null;
    #next = null;
        
    constructor(data, next=null){
        this.#data = data;
        this.#next = next;
    }

    get next(){
        return this.#next;
    }
    get data(){
        return this.#data;
    }    

    joinNext(cnNode){
        if (typeof(cnNode) == ChNode){            
            this.next = cnNode;
            return this.next;
        }
        else
        {
            return joinNewNext(cnNode)
        }
    }

    joinNewNext(data){
        this.next = new ChNode(data);
        return this.next;
    }

    unJoinNext(){
        this.next =null;
    }
}