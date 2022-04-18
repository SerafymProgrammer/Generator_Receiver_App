import Generator from "../../../generator/Generator.class.js";
import CustomBtn from "../../interface_components/start_stop_btn/custom_btn.js";
import IndicatorComponent from "../../interface_components/indicator/indicator.js";
import {create_unique_id} from "../../../app.service.js";
import {get_permission_on_render} from "../../interface_components/components.service.js";
import generator_markup from "./generator.markup.js";

class GeneratorComponent {
    // is mounted
    #mounted;

    // structures
    #queue;
    #generator;

    // interface components
    // indicators:
    #is_enabled_generator;

    // buttons:
    #en_dis_generator_btn;

    constructor(id, queue) {
        // data value
        this.id = id;
        this.#mounted = false;
        this.#queue = queue;
        this.#generator = new Generator(this.#queue);
    }

    //ошибка
    get id() {
        return this._id;
    }

    set id(id) {
        if (this.#mounted) {
            return false;
        }

        this._id = create_unique_id('generator', id||'' );
    }

    get_mounted() {
        return this.#mounted;
    }

    toggle_start_stop_generator() {
        if (!this.#mounted) {
            return
        }
        let generator_status = this.#generator.get_is_enabled_generator();
        let new_status_text_for_btn = generator_status ? 'Start' : 'Stop';
        let new_status_indicator = generator_status ? 'disabled' : 'enabled';

        this.#en_dis_generator_btn.change_text_content(new_status_text_for_btn);
        this.#is_enabled_generator.change_indicator_status(new_status_indicator);

        generator_status
            ? this.#generator.stop_generator()
            : this.#generator.start_generator()
    }


    create_indicator_components(){
        this.#is_enabled_generator = IndicatorComponent({
            id: 'is_enabled_generator',
            classes: {
                block_indicator: 'indicator_generator',
            },
        })
    }

    create_buttons_components(){
        this.#en_dis_generator_btn = CustomBtn({
            id: 'start_stop_generator',
            classes: {
                custom_btn_class: 'start_stop_btn',
                custom_btn_text_class: 'start_stop_btn_text',
            },
            text: this.#generator.get_is_enabled_generator() ?  'Stop' : 'Start',
            on_click: ()=>{
                this.toggle_start_stop_generator()
            }
        })
    }



    create_interactive_components (){
        this.create_indicator_components()
        this.create_buttons_components()
    }

    render(where_to_mount) {
        let permission = get_permission_on_render(this.#mounted, where_to_mount, this.id);
        if (!permission){
            return
        }

        let markup = generator_markup(this.id);

        where_to_mount.innerHTML += markup;

        this.create_interactive_components();
        let content_generator = where_to_mount.querySelector('.generator_block_content');
        let en_dis_block = content_generator.querySelector('.generator_block_manage_en_dis');
        this.#en_dis_generator_btn.render(en_dis_block);
        this.#is_enabled_generator.render(en_dis_block);

        this.#mounted = true;
    }
}

export default GeneratorComponent;