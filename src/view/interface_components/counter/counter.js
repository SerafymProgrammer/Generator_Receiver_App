import {check_existed_id, create_unique_id} from "../../../app.service.js";
import {get_permission_on_render} from "../../components.service.js";

//*Structure "closure_class"*

function CounterComponent(props={}) {
    // component counter

    // is mounted component in dom
    let mounted = false;

    let checked_props = props  ? props : {};
    const {id, classes, text} = checked_props;


    let unique_id = create_unique_id( 'counter', id);
    let unique_id_of_the_text = `${unique_id}_text_content`;

    // create dom elements
    let counter_component = document.createElement('div')
    counter_component.id = unique_id;
    counter_component.className = classes.wrap_counter || '';

    let counter_component_text_content = document.createElement('span');
    counter_component_text_content.id = unique_id_of_the_text;
    counter_component_text_content.className = classes.text_counter || '';
    counter_component_text_content.textContent = text;
    counter_component.appendChild(counter_component_text_content);

    return {
        change_text_content: function (new_text) {
            // changing text's content in this component
            let component = check_existed_id(unique_id);
            let component_text = document.getElementById(unique_id_of_the_text)
            if (!component||!component_text){
                throw new Error(`counter or counter text with id:${id} is not mounted in DOM`);
                return
            }
            component_text.textContent= new_text;
        },
        render: function (where_to_mount) {
            // rendering component in dom

            // get permission on render
            let permission = get_permission_on_render(mounted, where_to_mount, unique_id);
            if (!permission) {
                return
            }

            // render to parent as child
            where_to_mount.appendChild(counter_component);
            mounted=true;
        },
    }
}

export default CounterComponent;