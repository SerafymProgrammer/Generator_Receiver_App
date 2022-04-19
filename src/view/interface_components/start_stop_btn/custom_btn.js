import {check_existed_id, create_unique_id, validate_is_function} from "../../../app.service.js";
import {get_permission_on_render} from "../components.service.js";

class CustomBtn {
    #mounted;

    #id_text_component;

    //interface components
    #button_component;
    #button_text_component;
    constructor({id, classes, default_text, on_click}) {

        this.id = id;
        this.#id_text_component = `${this.id}_text_child`;
        this.classes =classes;
        this.default_text = default_text;
        this.on_click = on_click;
        this.#mounted = false;
        this.#button_component = document.createElement('button');
        this.#button_text_component = document.createElement('span');
    }
    get on_click() {
        return this._on_click;
    }

    set on_click(on_click) {
        this._on_click = validate_is_function(on_click)
    }

    get id() {
        return this._id;
    }

    set id(id) {
        if (this.#mounted) {
            return false;
        }

        this._id = create_unique_id('custom_btn', id||'' );
    }

    mount_component () {
        if (this.#mounted) {
            return false;
        }
        this.#button_component.id = this.id;
        this.#button_component.className = this.classes?.custom_btn_class || '';

        this.#button_text_component.id = this.#id_text_component;
        this.#button_text_component.className = this.classes.custom_btn_text_class || '';
        this.#button_text_component.textContent = this.default_text;

        this.#button_component.appendChild(this.#button_text_component);

        this.#button_component.addEventListener('click', (e)=>{
            e.preventDefault();
            this.on_click()
        })
    }

    change_text_content(new_text) {
        let component = check_existed_id(this.id);
        let component_text = document.getElementById(this.#id_text_component)
        // component.querySelector(`#${unique_id_of_the_text}`)
        if (!component||!component_text){
            throw new Error(`component or component text with id:${this.id} is not mounted in DOM`);
            return
        }
        component_text.textContent= new_text
    }

    render (where_to_mount) {
        let permission = get_permission_on_render(this.#mounted, where_to_mount, this.id);
        if (!permission) {
            return
        }
        this.mount_component();
        where_to_mount.appendChild(this.#button_component);
        this.#mounted=true;
    }
}

export default CustomBtn;
