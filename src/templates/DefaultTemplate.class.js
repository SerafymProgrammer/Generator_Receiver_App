import {get_random_int} from '../app.service.js'

// *Templates*

class DefaultTemplate {

    //template
    constructor(data) {
        // data value
        this.data = data;
    }

    static isValid (obj) {
        // is valid obj by same template
        if (!obj) {
            return false;
        }
        if (isNaN(obj.data)) {
            return false;
        }
        return true
    }

    get data() {
        // data getter
        return this._data;
    }

    set data(value) {
        // data setter
        let new_value = value;
        if (isNaN(value)) {
            new_value = get_random_int(1,101)
        }
        this._data = new_value;
    }
}

export default DefaultTemplate;