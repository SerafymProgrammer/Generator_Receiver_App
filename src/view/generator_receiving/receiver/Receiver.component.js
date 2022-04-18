import Receiver from "../../../receiver/Receiver.class.js";
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
    #counter_1;
    #counter_2;
    #counter_3;

    // buttons:
    #en_dis_receiver_btn;
    #reset_counters_btn;
    constructor(id, queue) {
        // data value
        this.id = id;
        this.#mounted = false;
        this.#queue = queue;
        this.#receiver = new Receiver(this.#queue);
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
        if (status) {
            switch (changed_state.key) {
                case 1: {
                    this.#counter_1.change_text_content(changed_state.value);
                    break;
                }
                case 2: {
                    this.#counter_2.change_text_content(changed_state.value);
                    break;
                }
                case 3: {
                    this.#counter_3.change_text_content(changed_state.value);
                    break;
                }
            }
        }
    }


    create_indicator_components(){
        this.#is_enabled_receiver = IndicatorComponent({
            id: 'is_enabled_receiver',
            classes: {
                block_indicator: 'indicator_receiver',
            },
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
        this.#counter_1 = CounterComponent({
            id: 'counter_1',
            classes: {
                wrap_counter: 'counter_block',
                text_counter: 'counter_block_text'
            },
            text: counters_values[1]
        })

        this.#counter_2 = CounterComponent({
            id: 'counter_2',
            classes: {
                wrap_counter: 'counter_block',
                text_counter: 'counter_block_text'
            },
            text: counters_values[2]
        })
        this.#counter_3 = CounterComponent({
            id: 'counter_3',
            classes: {
                wrap_counter: 'counter_block',
                text_counter: 'counter_block_text'
            },
            text: counters_values[3]
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
            default_text: 'Reset',
            on_click: ()=>{
                let reseted_value = this.#receiver.reset_counters();
                this.#counter_1.change_text_content(reseted_value[1]);
                this.#counter_2.change_text_content(reseted_value[2]);
                this.#counter_3.change_text_content(reseted_value[3]);
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
        let en_dis_block = content_receiver.querySelector('.receiver_block_manage_en_dis')
        this.#en_dis_receiver_btn.render(en_dis_block)
        this.#is_enabled_receiver.render(en_dis_block)

        let state_receiving_block =  content_receiver.querySelector('.receiver_block_state_receiving');
        this.#counter_1.render(state_receiving_block);
        this.#counter_2.render(state_receiving_block);
        this.#counter_3.render(state_receiving_block);
        this.#is_success_receiving.render(state_receiving_block)
        this.#reset_counters_btn.render(state_receiving_block)

        this.#mounted = true;
    }
}

export default ReceiverComponent;