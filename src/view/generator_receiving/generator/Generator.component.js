import Generator from "../../../structures/generator/Generator.class.js";
import CustomBtn from "../../interface_components/start_stop_btn/custom_btn.js";
import IndicatorComponent from "../../interface_components/indicator/indicator.js";
import {create_unique_id} from "../../../app.service.js";
import {get_permission_on_render} from "../../components.service.js";
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


    get id() {
        // id getter
        return this._id;
    }

    set id(id) {
        // id setter
        if (this.#mounted) {
            return false;
        }

        this._id = create_unique_id('generator', id||'' );
    }

    get_mounted() {
        // get is mounted in dom status
        return this.#mounted;
    }

    toggle_start_stop_generator() {
        //toggle start stop generator
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
        //creating indicators dom elements
        this.#is_enabled_generator = IndicatorComponent({
            id: 'is_enabled_generator',
            classes: {
                block_indicator: 'indicator_generator',
            },
            default_indicator_status:this.#generator.get_is_enabled_generator() ?  'enabled' : 'disabled'
        })
    }

    create_buttons_components(){
        // creating buttons dom elements
        this.#en_dis_generator_btn = new CustomBtn({
            id: 'start_stop_generator',
            classes: {
                custom_btn_class: 'start_stop_btn',
                custom_btn_text_class: 'start_stop_btn_text',
            },
            default_text: this.#generator.get_is_enabled_generator() ?  'Stop' : 'Start',
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
        // rendering component in dom

        // get permission on render
        let permission = get_permission_on_render(this.#mounted, where_to_mount, this.id);
        if (!permission){
            return
        }

        let markup = generator_markup();

        where_to_mount.innerHTML += markup;

        this.create_interactive_components();

        // render interactive components to parent as child
        let content_generator = where_to_mount.querySelector('.generator_block_content');
        let en_dis_block = content_generator.querySelector('.block_manage_en_dis');
        let start_stop_btn_block = en_dis_block.querySelector('.start_stop_btn_block');
        let start_stop_indicator_block = en_dis_block.querySelector('.start_stop_indicator_block');
        this.#en_dis_generator_btn.render(start_stop_btn_block);
        this.#is_enabled_generator.render(start_stop_indicator_block);

        this.#mounted = true;
    }
}

export default GeneratorComponent;