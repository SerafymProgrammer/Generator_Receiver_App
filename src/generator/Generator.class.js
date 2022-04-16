import {get_random_int} from '../general.service'
import {get_object_by_template_by_id} from "./generator.service";

class Generator {
    #queue;
    #template_id;
    constructor(queue, template_id) {

        // queue object
        this.#queue = queue;

        // get new object by template
        this.#template_id =template_id;

        // trigger for generating
        this.is_enabled_generator = false;
    }

    create_new_object() {
        let new_random_value = get_random_int(0, 100);
        let new_object = get_object_by_template_by_id(this.#template_id, new_random_value);
        return new_object;
    }

    add_new_object_to_queue(new_generated_object) {
      return this.#queue.add_to_queue(new_generated_object);
    }

    generate () {
        let new_obj = this.create_new_object();
        this.add_new_object_to_queue(new_obj);
        if (this.is_enabled_generator) {
            let random_delay = get_random_int(1, 11);
            setTimeout(this.generate, random_delay)
        }
    }

    start_generator() {
        this.is_enabled_generator = true;
        this.generate()
    }

    stop_generator() {
        this.is_enabled_generator = false;
    }
}

export default Generator;