class Node {
    constructor(value, priority) {
        this.value = value
        this.priority = priority
    }
}

class PriorityQueue {
    constructor() {
        this.items = this.carregarLocalStorage()
    }

    isEmpty(){
        return this.items.length === 0
    }

    enqueue(value, priority) {
        const node = new Node(value, priority)

        if (node.priority == "verde"){
            node.priority = 1
        }else if(node.priority == "amarelo"){
            node.priority = 2
        } else if(node.priority == "vermelho"){
            node.priority = 3
        }else{
            return "a prioridade é verde, amarelo ou vermelho"
        }

        if (this.isEmpty()) {
            this.items.push(node)

        } else {
            let add = false
            for (let i = 0; i < this.items.length; i++) {
                if (node.priority > this.items[i].priority) {
                    this.items.splice(i, 0, node)
                    add = true
                    break
                }
            }
            if(!add){
                this.items.push(node)
            }
            
        }
        this.salvarLocalStorage()
    }

    dequeue(){
        if(this.isEmpty()){
            return "fila vazia"
        }

        let dequeue = this.items.shift()
        this.salvarLocalStorage()
        return dequeue
    }

    peek(){
        if(this.isEmpty()){
            return "fila vazia"
        }
        return this.items[0]
    }

    size(){
        return this.items.length
    }

    clear(){
        this.items = []
    }


    carregarLocalStorage(){
        let array = localStorage.getItem('node')

        if(array){
            return JSON.parse(array)
        }else{
            return []
        }
    }


    salvarLocalStorage(){
        localStorage.setItem('node', JSON.stringify(this.items))
    }




}

const pq = new PriorityQueue()

function clickEnqueue(){
    value = document.getElementById('nome').value
    priority= document.getElementById('prioridade').value

    pq.enqueue(value, priority)
    console.log(pq.peek())
}

function clickDequeue(){
    // console.log(pq.dequeue())
    let paciente = pq.dequeue()
    console.log(paciente.value)
    document.getElementById('resultado').innerHTML = paciente.value || "Não tem ninguém"
}

function clickPeek(){
    let paciente = pq.peek()
    document.getElementById('resultado').innerHTML = paciente.value || "Não tem ninguém"
}




