
class Queue {
    // elements pseudo-array
    #elements;

    //end index the end of the queue
    #tail;

    // start index of the queue
    #head;
    constructor() {
        this.#elements = {};
        this.#head = 0;
        this.#tail = 0;
    }

    add_to_queue(element) {
        // adding to the queue

        this.#elements[this.#tail] = element;
        this.#tail++;
    }

    extract_from_queue() {
        // extracting to the queue

        if (this.#tail===this.#head) {
            return
        }
        const item = this.#elements[this.#head];
        delete this.#elements[this.#head];
        this.#head++;
        return item;
    }

    get_peek_element() {
        // get element from start queue
        return this.#elements[this.#head];
    }
    get length() {
        // get current length queue
        return this.#tail - this.#head;
    }
    get isEmpty() {
        // check is empty queue
        return this.length === 0;
    }
}

export default Queue;
