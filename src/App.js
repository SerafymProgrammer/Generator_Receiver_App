import GeneratorReceiverView from "./view/generator_receiving/GeneratorReceiver.component.js";

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

    }

    render() {
        // console.log('Hey')
        let root_app = document.getElementById('root');


        let generator_receiver_component = new GeneratorReceiverView('generator_receiver_1')
        generator_receiver_component.render(root_app);

        this.#mounted_app = true;
    }
}

export default App;