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

    render() {

        let root_app = document.getElementById('root');

        // *Errors*
        try {
            let generator_receiver_component = new GeneratorReceiverView('generator_receiver_1')
            generator_receiver_component.render(root_app);
        }
         catch (e) {
             console.log(e)
             root_app.innerHTML = `<div class="error_pub">
                                        <span class="error_pub_text">${e.message}</span>
                                </div>`
         }


        //You can use the component as many times as you like.

        // let generator_receiver_component_ = new GeneratorReceiverView('generator_receiver_2')
        // generator_receiver_component_.render(root_app);
        // ...

        this.#mounted_app = true;
    }
}

export default App;