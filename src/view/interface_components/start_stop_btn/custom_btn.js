import {check_existed_id, check_is_dom_node, create_unique_id, validate_is_function} from "../../../app.service.js";
import {get_permission_on_render} from "../components.service.js";

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

    if (on_click){
        btn_component.addEventListener('click', (e)=>{
            e.preventDefault();
            this_on_click()
        })
    }

    return {
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