import Queue from "../../queue/Queue.js";

import generator_receiver_markup from "./generator_receiver.markup.js";
import {create_unique_id} from "../../app.service.js";
import {get_permission_on_render} from "../interface_components/components.service.js";
import ReceiverComponent from "./receiver/Receiver.component.js";
import GeneratorComponent from "./generator/Generator.component.js";

class GeneratorReceiverView {
    // is mounted
    #mounted;

    // structures
    #queue;

    constructor(id) {
        // data value
        this.id = id;
        this.#mounted = false;
        this.#queue = new Queue();
    }

    //ошибка
    get id() {
        return this._id;
    }

    set id(id) {
        if (this.#mounted) {
            return false;
        }

        this._id = create_unique_id('generator_receiver_component', id||'' );
    }

    get_mounted() {
        return this.#mounted;
    }


    render(where_to_mount) {
        let permission = get_permission_on_render(this.#mounted, where_to_mount, this.id);
        if (!permission){
            return
        }
        let markup = generator_receiver_markup(this.id)
        where_to_mount.innerHTML += markup;

        let content_ = where_to_mount.querySelector('.generator_receiver_container');
        let content_generator = content_.querySelector('.generator_block');
        let content_receiver = content_.querySelector('.receiver_block');
        let Generator = new GeneratorComponent(this.id, this.#queue)
        Generator.render(content_generator);
        let Receiver = new ReceiverComponent(this.id, this.#queue)
        Receiver.render(content_receiver);

        // Generator.toggle_start_stop_generator()
        // setTimeout(()=>   Generator.toggle_start_stop_generator(), 12000)
    }
}

export default GeneratorReceiverView;