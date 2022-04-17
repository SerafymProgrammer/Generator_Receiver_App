import GeneratorReceiverView from "./view/GeneratorReceiverStruct.view";


class App {

    #mounted_app;
    constructor() {
        // data value
        this.#mounted_app = false
    }

    get_mounted() {
        return this.#mounted_app;
    }

    mount() {
        let root_app = document.getElementById('root');
        if (root_app) {
           return
        }
        let root_element = document.createElement('div')
        root_element.id = 'root';
        document.body.appendChild(root_element);
        this.#mounted_app = true;
    }

    render() {
        this.mount()
        let generator_receiver_component = new GeneratorReceiverView('generator_receiver_1')
        generator_receiver_component.render();
    }
}

export default App;