import {validate_object_by_template_by_id} from "./receiver.service.js";
import {validate_is_function} from "../app.service.js";

class Receiver {

    #queue;
    #template_id;
    #counters;
    #delay;
    constructor(queue, template_id, on_change_state_handler) {

        this.#queue = queue;
        this.#template_id = template_id;

        this.on_change_state_handler = on_change_state_handler;

        // counters
        this.#counters  = {
            1: 0,
            2: 0,
            3: 0
        }

        // trigger for receiving
        this.is_enabled_receiving = false;

        // delay
        this.#delay = 0;
    }

    set on_change_state_handler(function_) {
      return validate_is_function(function_)
    }

    increment_counter(key) {
        let counters_ = {...this.#counters};
        let incremented_value = counters_[key] + 1;
        counters_[key] = incremented_value;
        this.#counters = counters_;
        return {key, incremented_value};
    }

    reset_counters() {
        let reseted_value = {
            1: 0,
            2: 0,
            3: 0
        };
        this.#counters = reseted_value;
        return reseted_value
    }

    get_counters() {
        return this.#counters
    }

    select_counter_id_by_received_object (received_object) {
        let condition_data = received_object.data;
        switch (condition_data) {
            case condition_data<30 : {
                return 1;
                break
            }
            case condition_data>=30&&condition_data<70 : {
                return 2;
                break
            }
            case condition_data>=70 : {
                return 3;
                break
            }
        }
    }
    receive() {
        let receiving_status = false;
        let extracted_object = this.#queue.extract_from_queue();

        if (!validate_object_by_template_by_id(this.#template_id, extracted_object)){
            this.on_change_state_handler(receiving_status);
            return receiving_status;
        }

        let id_count_that_will_change = this.select_counter_id_by_received_object(extracted_object);
        let incremented = this.increment_counter(id_count_that_will_change);
        receiving_status = true;

        this.on_change_state_handler(receiving_status, incremented);

        this.#delay = receiving_status ? 2  : this.#delay+1;

        setTimeout(()=>receive(), this.#delay*1000)
    }


    start_receiver() {
        this.is_enabled_receiving = true;
        this.receive()
    }

    stop_receiver() {
        this.is_enabled_receiving = false;
    }
}

export default Receiver;
