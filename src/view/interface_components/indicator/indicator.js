import {check_existed_id, create_unique_id} from "../../../app.service.js";
import {get_permission_on_render} from "../../components.service.js";

//*Structure "closure_class"*

function IndicatorComponent(props) {
    // indicator component

    // is mounted component in dom
    let mounted = false;


    let checked_props = props || {};
    const {id, classes, default_indicator_status} = checked_props;

    // create unique id
    let unique_id = create_unique_id( 'indicator', id)
    let indicator_status =default_indicator_status || 'error';

    // create dom elements
    let indicator_component = document.createElement('div')
    indicator_component.id = unique_id;
    indicator_component.className = classes?.block_indicator ? classes.block_indicator : 'indicator';
    indicator_component.classList.add(indicator_status);

    return {
        get_indicator_status: function (new_text) {
            // get indicator status

            return indicator_status;
        },

        change_indicator_status: function (new_indicator_status) {
            // function for changing indicator status

            // checking component
            let component = check_existed_id(unique_id);
            if (!mounted||!component){
                throw new Error(`indicator with id:${id} is not mounted in DOM`);
                return
            }

            component.classList.replace(indicator_status, new_indicator_status);
            indicator_status =new_indicator_status;
        },

        render: function (where_to_mount) {
            // rendering component in dom

            // get permission on render
            let permission = get_permission_on_render(mounted, where_to_mount, unique_id);
            if (!permission) {
                return
            }

            // render to parent as child
            where_to_mount.appendChild(indicator_component)
            mounted=true;
        },
    }
}

export default IndicatorComponent;