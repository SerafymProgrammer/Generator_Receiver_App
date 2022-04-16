import {get_random_int} from './generator.service'
import {template_new_obj_default} from "./generator.defaults";

class Generator {
    #queue;

    constructor(queue, template_object) {
        this.#queue = queue;
        this.template_object =
            template_object?.constructor === Function ?
            template_object :
                template_new_obj_default;
        this.is_enabled_generator = false;
    }

    create_new_object() {
        let new_random_value = get_random_int(0, 100);
        let new_object = this.template_object(new_random_value);
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