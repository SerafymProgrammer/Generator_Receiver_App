import {get_random_int} from '../app.service.js'

class DefaultTemplate {

    constructor(data) {
        // data value
        this.data = data;
    }

    static isValid (obj) {
        if (!obj) {
            return false;
        }
        if (isNaN(obj.data)) {
            return false;
        }
        return true
    }

    get data() {
        return this._data;
    }

    set data(value) {
        let new_value = value;
        if (isNaN(value)) {
            new_value = get_random_int(1,101)
        }
        this._data = new_value;
    }
}

export default DefaultTemplate;