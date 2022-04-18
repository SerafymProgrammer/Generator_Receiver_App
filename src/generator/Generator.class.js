import {get_random_int} from '../app.service.js'
import {get_object_by_template_by_id} from "./generator.service.js";

class Generator {
    #queue;
    #template_id;
    #is_enabled_generator;
    constructor(queue, template_id) {

        // queue object
        this.#queue = queue;

        // get new object by template
        this.#template_id =template_id;

        // trigger for generating
        this.#is_enabled_generator = false;
    }

    get_is_enabled_generator () {
        return this.#is_enabled_generator;
    }
    create_new_object () {
        let new_random_value = get_random_int(0, 100);
        let new_object = get_object_by_template_by_id(this.#template_id, new_random_value);
        return new_object;
    }

    add_new_object_to_queue(new_generated_object) {
      return this.#queue.add_to_queue(new_generated_object);
    }

    generate () {
        if (!this.#is_enabled_generator) {
            return
        }
        let new_obj = this.create_new_object();
        this.add_new_object_to_queue(new_obj);
        let random_delay = get_random_int(1, 11);
        setTimeout(()=> {this.generate()}, random_delay*100)
    }

    start_generator() {
        this.#is_enabled_generator = true;
        this.generate()
    }

    stop_generator() {
        this.#is_enabled_generator = false;
    }
}

export default Generator;