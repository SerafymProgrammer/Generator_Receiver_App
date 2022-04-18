import Queue from "../queue/Queue.js";
import Generator from "../generator/Generator.class.js";
import Receiver from "../receiver/Receiver.class.js";
import CustomBtn from "./interface_components/start_stop_btn/custom_btn.js";
import IndicatorComponent from "./interface_components/indicator/indicator.js";


class GeneratorReceiverView {
    #mounted;
    constructor(id) {
        // data value
        this.id = id;
        this.#mounted = false;
        this.queue = new Queue();
        this.generator = new Generator(this.queue);
        this.receiver = new Receiver(this.queue);
    }

    //ошибка
    get id() {
        return this._id;
    }

    set id(id) {
        if (this.#mounted) {
            return false;
        }

        this._id = id ? id : `generator_receiver_${Math.random()}`;
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

        let indicator_generator = IndicatorComponent({
            id: 'indicator_generator',
            classes: {
                block_indicator: 'indicator_generator',
            },
        })

        let btn_start_stop_generator = CustomBtn({
            id: 'start_stop_generator',
            classes: {
                custom_btn_class: 'start_stop_btn',
                custom_btn_text_class: 'start_stop_btn_text',
            },
            text: this.generator.get_is_enabled_generator() ?  'Stop' : 'Start',
            on_click: ()=>{
                let generator_status = this.generator.get_is_enabled_generator();
                if (!generator_status) {
                    btn_start_stop_generator.change_text_content('Stop')
                    this.generator.start_generator();
                    indicator_generator.change_indicator_status('enabled');
                } else {
                    btn_start_stop_generator.change_text_content('Start')
                    this.generator.stop_generator();
                    indicator_generator.change_indicator_status('disabled');
                }
            }
        })
        indicator_generator.render(main_container)
        btn_start_stop_generator.render(main_container)
        root_app.appendChild(main_container);
        this.#mounted = true;
    }

    render() {
        if (this.#mounted){
            return
        }
        this.mount();
    }
}

export default GeneratorReceiverView;