import Receiver from "../../../structures/receiver/Receiver.class.js";
import CustomBtn from "../../interface_components/start_stop_btn/custom_btn.js";
import IndicatorComponent from "../../interface_components/indicator/indicator.js";
import CounterComponent from "../../interface_components/counter/counter.js";
import {get_permission_on_render} from "../../interface_components/components.service.js";
import {create_unique_id} from "../../../app.service.js";
import receiver_markup from "./receiver.markup.js";

class ReceiverComponent {
    // is mounted
    #mounted;

    // structures
    #queue;
    #receiver;

    // interface components
    // indicators:
    #is_enabled_receiver;
    #is_success_receiving;

    // counters:
    #counters;


    // buttons:
    #en_dis_receiver_btn;
    #reset_counters_btn;
    constructor(id, queue) {
        // data value
        this.id = id;
        this.#mounted = false;
        this.#queue = queue;
        this.#receiver = new Receiver(this.#queue);
        this.#counters = {
            1: null,
            2: null,
            3: null
        }
    }

    //ошибка
    get id() {
        return this._id;
    }

    set id(id) {
        if (this.#mounted) {
            return false;
        }
        this._id = create_unique_id('receiver', id||'' );
    }

    get_mounted() {
        return this.#mounted;
    }

    toggle_start_stop_receiver() {
        if (!this.#mounted) {
            return
        }
        let receiver_status = this.#receiver.get_is_enabled_receiver();
        let new_status_text_for_btn = receiver_status ? 'Start' : 'Stop';
        let new_status_indicator = receiver_status ? 'disabled' : 'enabled';


        this.#en_dis_receiver_btn.change_text_content(new_status_text_for_btn);
        this.#is_enabled_receiver.change_indicator_status(new_status_indicator);

        receiver_status
            ? this.#receiver.stop_receiver()
            : this.#receiver.start_receiver()
    }

    toggle_receiving_indicator(receiving_status) {
        if (!this.#mounted) {
            return
        }
        let new_status_indicator = receiving_status ? 'success' : 'error';

        this.#is_success_receiving.change_indicator_status(new_status_indicator);
    }

    change_state_receiving_handler (status, changed_state) {
        if (!this.#mounted) {
            return
        }
        this.toggle_receiving_indicator(status);
        if (status&&this.#counters.hasOwnProperty(changed_state.key)) {
            this.#counters[changed_state.key].change_text_content(changed_state.value);
        }
    }


    create_indicator_components(){
        this.#is_enabled_receiver = IndicatorComponent({
            id: 'is_enabled_receiver',
            classes: {
                block_indicator: 'indicator_receiver',
            },
            default_indicator_status:this.#receiver.get_is_enabled_receiver() ?  'enabled' : 'disabled'
        })
        this.#is_success_receiving = IndicatorComponent({
            id: 'is_success_receiving',
            classes: {
                block_indicator: 'indicator_status_receiving',
            },
        })
    }
    create_counters_components(){
        let counters_values = this.#receiver.get_counters()
        Object.keys(this.#counters).forEach((key_)=>{
            this.#counters[key_] = CounterComponent({
                id: `counter_${key_}`,
                classes: {
                    wrap_counter: 'counter_block_element',
                    text_counter: 'counter_block_element_text'
                },
                text: counters_values[key_]
            })
        })
    }
    create_buttons_components(){
        this.#en_dis_receiver_btn =new CustomBtn({
            id: 'start_stop_receiver',
            classes: {
                custom_btn_class: 'start_stop_btn',
                custom_btn_text_class: 'start_stop_btn_text',
            },
            default_text: this.#receiver.get_is_enabled_receiver() ?  'Stop' : 'Start',
            on_click: ()=>{
                this.toggle_start_stop_receiver()
            }
        })
        this.#reset_counters_btn = new CustomBtn({
            id: 'reset_counters_btn',
            classes: {
                custom_btn_class: 'reset_counters_btn',
                custom_btn_text_class: 'reset_counters_btn_text',
            },
            default_text: 'Reset counters',
            on_click: ()=>{
                let reseted_value = this.#receiver.reset_counters();
                Object.keys(reseted_value).forEach((key)=>{
                    this.#counters[key].change_text_content(reseted_value[key])
                })
            }
        })
    }



    create_interactive_components (){
        this.create_indicator_components()
        this.create_counters_components()
        this.create_buttons_components()
        this.#receiver.on_change_state_handler =(status, changed_value)=>{
            this.change_state_receiving_handler(status, changed_value)
        };
    }

    render(where_to_mount) {
        let permission = get_permission_on_render(this.#mounted, where_to_mount, this.id);
        if (!permission){
            return
        }

        let markup = receiver_markup(this.id);
        where_to_mount.innerHTML += markup;

        this.create_interactive_components();
        let content_receiver = where_to_mount.querySelector('.receiver_block_content');
        let en_dis_block = content_receiver.querySelector('.block_manage_en_dis')
        let start_stop_btn_block = en_dis_block.querySelector('.start_stop_btn_block');
        let start_stop_indicator_block = en_dis_block.querySelector('.start_stop_indicator_block');
        this.#en_dis_receiver_btn.render(start_stop_btn_block)
        this.#is_enabled_receiver.render(start_stop_indicator_block)

        let counters_block =  content_receiver.querySelector('.counters_block');
        Object.keys(this.#counters).forEach((counter_key)=>{

            let counter_block = document.createElement('div');
            counter_block.className = "counter_block";
            counter_block.id= `${this.id}_counter${counter_key}`;

            let counter_label = document.createElement('span');
            counter_label.className = "counter_block_label";
            counter_label.textContent = `#${counter_key} counter:`;
            counter_block.appendChild(counter_label);
            this.#counters[counter_key].render(counter_block);

            counters_block.appendChild(counter_block);
        })
        this.#reset_counters_btn.render(counters_block);

        let state_receiving_block =  content_receiver.querySelector('.state_receiving_block');
        let receiving_indicator_block = state_receiving_block.querySelector('.receiving_indicator_block');
        this.#is_success_receiving.render(receiving_indicator_block)


        this.#mounted = true;
    }
}

export default ReceiverComponent;