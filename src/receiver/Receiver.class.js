
class Receiver {

    #queue;

    constructor(queue) {
        this.#queue = queue;

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
        if (!received_object) {
            console.log('received not object')
            return null;
        }
        if (isNaN(received_object.data)) {
            console.log('received data is not number')
            return null;
        }

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

    start_receiver() {
        this.is_enabled_generator = true;
        this.generate()
    }

    stop_receiver() {
        this.is_enabled_generator = false;
    }
}

export default Receiver;
