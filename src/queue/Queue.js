
class Queue {
    #elements;
    #tail;
    #head;
    constructor() {
        this.#elements = {};
        this.#head = 0;
        this.#tail = 0;
    }

    add_to_queue(element) {
        this.#elements[this.#tail] = element;
        this.#tail++;
    }

    delete_from_queue() {
        if (this.#tail===this.#head) {
            return
        }
        const item = this.#elements[this.#head];
        delete this.#elements[this.#head];
        this.#head++;
        return item;
    }

    peek() {
        return this.#elements[this.#head];
    }
    get length() {
        return this.#tail - this.#head;
    }
    get isEmpty() {
        return this.length === 0;
    }
}

export default Queue;
