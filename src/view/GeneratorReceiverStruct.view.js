

class GeneratorReceiverView {

    #mounted;
    constructor(id) {
        // data value
        this.id = id;
        this.#mounted = false
    }

    get id() {
        return this.id;
    }

    set id(id) {
        if (this.#mounted) {
            return false;
        }
        let is_existed_id = document.getElementById(id);
        if (is_existed_id) {
            return false;
        }

        this.id = id ? id : `generator_receiver_${Math.random()}`;
    }


    get_mounted() {
        return this.#mounted;
    }

    mount() {
        let root_app = document.getElementById('root');
        if (!root_app) {
            throw new Error('Root element is not defined')
        }
        let main_container = document.createElement('div')
        main_container.id =  `${this.id}_container`;
        main_container.className = 'generator_receiver_container';

        
        root_app.appendChild(main_container);

        document.body.appendChild(root_element);
        this.#mounted_app = true;
    }

    render() {

    }
}

export default GeneratorReceiverView;