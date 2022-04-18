import {check_existed_id, create_unique_id, validate_is_function} from "../../../app.service.js";
import {get_permission_on_render} from "../components.service.js";

// class CustomBtn {
//     #mounted;
//
//     #id_text_component;
//     #is_enabled_generator;
//
//     //interface components
//     #button_component;
//     #button_text_component;
//     constructor({id, classes, default_text, on_click}) {
//
//         this.id = id;
//         this.#id_text_component = `${this.id}_text_child`;
//         this.classes =classes;
//         this.default_text = default_text;
//         this.on_click = on_click;
//         this.#mounted = false;
//         this.#button_component = document.createElement('button');
//         this.#button_text_component = document.createElement('span');
//     }
//     get on_click() {
//         return this._on_click;
//     }
//
//     set on_click(on_click) {
//         this._on_click = validate_is_function(on_click)
//     }
//
//     get id() {
//         return this._id;
//     }
//
//     set id(id) {
//         if (this.#mounted) {
//             return false;
//         }
//
//         this._id = create_unique_id('custom_btn', id||'' );
//     }
//
//     mount_component () {
//         if (this.#mounted) {
//             return false;
//         }
//         this.#button_component.id = this.id;
//         this.#button_component.className = this.classes?.custom_btn_class || '';
//
//         this.#button_text_component.id = this.#id_text_component;
//         this.#button_text_component.className = this.classes.custom_btn_text_class || '';
//         this.#button_text_component.textContent = this.default_text;
//
//         this.#button_component.appendChild(this.#button_text_component);
//
//         this.#button_component.addEventListener('click', (e)=>{
//             e.preventDefault();
//             this.on_click()
//         })
//     }
//
//     change_text_content(new_text) {
//         if (this.#mounted) {
//             return false;
//         }
//         let component = check_existed_id(this.id);
//         let component_text = document.getElementById(this.#id_text_component)
//         // component.querySelector(`#${unique_id_of_the_text}`)
//         if (!component||!component_text){
//             throw new Error(`component or component text with id:${this.id} is not mounted in DOM`);
//             return
//         }
//         component_text.textContent= new_text
//     }
//
//     render (where_to_mount) {
//         let permission = get_permission_on_render(this.#mounted, where_to_mount, this.id);
//         if (!permission) {
//             return
//         }
//         this.mount_component();
//         where_to_mount.appendChild(this.#button_component);
//         this.#mounted=true;
//     }
// }
//
// export default CustomBtn;

function CustomBtn(props={}) {
    let mounted = false;
    let checked_props = props || {};
    const {id, classes, text, on_click} = checked_props;

    let this_on_click = validate_is_function(on_click, 'on_click is not a function')

    let unique_id = create_unique_id( 'custom_btn', id);
    let unique_id_of_the_text = `${unique_id}_text_btn`;

    let btn_component = document.createElement('button')
    btn_component.id = unique_id;
    btn_component.className = classes.custom_btn_class || '';

    let btn_component_text_content = document.createElement('span');
    btn_component_text_content.id = unique_id_of_the_text;
    btn_component_text_content.className = classes.custom_btn_text_class || '';
    btn_component_text_content.textContent = text;
    btn_component.appendChild(btn_component_text_content);

    btn_component.addEventListener('click', (e)=>{
        e.preventDefault();
        this_on_click()
    })

    console.log(btn_component)

    return {
        add_event_listener: function (action, callback) {
            if (!mounted) {
                btn_component.addEventListener(action, (e)=>callback(e));
                return
            }
            let component = check_existed_id(unique_id);
            if (!component){
                throw new Error(`component with id:${id} is not mounted in DOM`);
                return
            }
            component.addEventListener(action, (e)=>callback(e))
        },
        change_text_content: function (new_text) {
            let component = check_existed_id(unique_id);
            let component_text = document.getElementById(unique_id_of_the_text)
                // component.querySelector(`#${unique_id_of_the_text}`)
            if (!component||!component_text){
                throw new Error(`component or component text with id:${id} is not mounted in DOM`);
                return
            }
            component_text.textContent= new_text
        },
        render: function (where_to_mount) {
            let permission = get_permission_on_render(mounted, where_to_mount, unique_id);
            if (!permission) {
                return
            }
            where_to_mount.appendChild(btn_component);
            mounted=true;
        },
    }
}

export default CustomBtn;