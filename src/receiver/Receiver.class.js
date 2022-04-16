import {validate_object_by_template_by_id} from "./receiver.service";

class Receiver {

    #queue;
    #template_id;
    #delay;
    constructor(queue, template_id) {

        this.#queue = queue;
        this.#template_id = template_id;

        // counters
        this.counters  = {
            1: 0,
            2: 0,
            3: 0
        }

        // trigger for receiving
        this.is_enabled_receiving = false;
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
        let extracted_object = this.#queue.extract_from_queue();
        if (!validate_object_by_template_by_id(this.#template_id,received_object)){
            return false
        }
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
