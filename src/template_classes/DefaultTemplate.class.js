import {get_random_int} from './generator.service'
import {template_new_obj_default} from "./generator.defaults";

class DefaultTemplate {

    constructor(data) {
        // data value
        this.data = data;
    }

    get data() {
        return this.data;
    }

    set data(value) {
        let new_value = value;
        if (isNaN(value)) {
            new_value = get_random_int(1,101)
        }
        this.data = new_value;
    }
}

export default DefaultTemplate;