import {check_existed_id, check_is_dom_node, create_unique_id} from "../../../app.service";

function CounterComponent(props={}) {
    let mounted = false;
    let checked_props = props  ? props : {};
    const {id, classes, text} = checked_props;
    let unique_id = create_unique_id( 'counter', id);
    let unique_id_of_the_text = `${unique_id}_text_content`;

    let counter_component = document.createElement('div')
    counter_component.id = unique_id;
    counter_component.className = classes.wrap ? classes.wrap : '';

    let counter_component_text_content = document.createElement('span');
    counter_component_text_content.id = unique_id_of_the_text;
    counter_component_text_content.className = classes.text ? classes.text : '';
    counter_component_text_content.textContent = text;
    counter_component.appendChild(counter_component_text_content);
    
    return {
        change_text_content: function (new_text) {
            let component = check_existed_id(unique_id);
            let component_text = component.querySelector(`#${unique_id_of_the_text}`)
            if (!component||!component_text){
                throw new Error(`counter or counter text with id:${id} is not mounted in DOM`);
                return
            }
            component_text.textContent= new_text
        },
        render: function (where_to_mount) {
            if (!check_is_dom_node(where_to_mount)) {
                throw new Error('parent to mount is not dom element');
                return false
            }
            where_to_mount.appendChild(counter_component);
            mounted=true;
        },
    }
}

export default CounterComponent;