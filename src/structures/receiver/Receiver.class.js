import {validate_object_by_template_by_id} from "./receiver.service.js";
import {validate_is_function} from "../../app.service.js";


//*Receiver structure:*

class Receiver {

    #queue;
    #template_id;
    #counters;
    #delay;
    #is_enabled_receiving;

    constructor(queue, template_id, on_change_state_handler) {

        // queue for extracting object etc
        this.#queue = queue;

        // template_id for validate extracting object by template
        this.#template_id = template_id;

        // out action that do when change state
        this.on_change_state_handler = on_change_state_handler;

        // counters
        this.#counters  = {
            1: 0,
            2: 0,
            3: 0
        }

        // trigger for receiving
        this.#is_enabled_receiving = false;

        // delay
        this.#delay = 0;
    }

    get on_change_state_handler() {
        // on_change_state_handler getter
       return this._on_change_state_handler
    }
    set on_change_state_handler(function_) {
        // on_change_state_handler setter
        this._on_change_state_handler = validate_is_function(function_)
    }

    get_is_enabled_receiver () {
        // get status on/of receiver
        return this.#is_enabled_receiving;
    }



    increment_counter(key) {
        // increment counter and return data key-value

        let counters_ = {...this.#counters};
        let incremented_value = counters_[key] + 1;
        counters_[key] = incremented_value;
        this.#counters = counters_;
        return {key, value: incremented_value};
    }

    get_counters() {
        // get counters state
        return this.#counters
    }

    reset_counters() {
        // reset all counters and return new counters
        let reseted_value = {
            1: 0,
            2: 0,
            3: 0
        };
        this.#counters = reseted_value;
        return reseted_value
    }


    select_counter_id_by_received_object (received_object) {
        // getting key for counter that will change

        let condition_data = received_object.data;
        if (condition_data<30) {
            return 1;
        }
        if (condition_data>=30&&condition_data<70 ) {
            return 2;
        }
        if (condition_data>=70) {
            return 3;
        }
    }
    receive() {
        if (!this.#is_enabled_receiving) {
            return
        }

        //local receiving state
        let receiving_status = false;

        let extracted_object = this.#queue.extract_from_queue();

        if (!validate_object_by_template_by_id(this.#template_id, extracted_object)){
            // object is wrong

            this.on_change_state_handler(receiving_status);

        }
        else {
            // object is true

            let id_count_that_will_change = this.select_counter_id_by_received_object(extracted_object);
            let incremented = this.increment_counter(id_count_that_will_change);
            receiving_status = true;

            // do out action
            this.on_change_state_handler(receiving_status, incremented);
        }

        this.#delay = receiving_status ? 2  : this.#delay+1;


        setTimeout(()=>this.receive(), this.#delay*1000)
    }


    start_receiver() {
        // start receiving
        this.#is_enabled_receiving = true;
        this.receive()
    }

    stop_receiver() {
        // stop receiving
        this.#is_enabled_receiving = false;
    }
}

export default Receiver;
