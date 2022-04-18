import {check_existed_id, check_is_dom_node, create_unique_id} from "../../../app.service.js";
import {get_permission_on_render} from "../components.service.js";


function IndicatorComponent(props) {
    let mounted = false;

    let checked_props = props || {};
    const {id, classes, default_indicator_status} = checked_props;
    let unique_id = create_unique_id( 'indicator', id)
    let indicator_status =default_indicator_status || 'error';

    let indicator_component = document.createElement('div')
    indicator_component.id = unique_id;
    indicator_component.className = classes?.block_indicator ? classes.block_indicator : 'indicator';
    indicator_component.classList.add(indicator_status);

    return {

        get_indicator_status: function (new_text) {
            return indicator_status;
        },

        change_indicator_status: function (new_indicator_status) {
            let component = check_existed_id(unique_id);
            if (!mounted||!component){
                throw new Error(`indicator with id:${id} is not mounted in DOM`);
                return
            }
            component.classList.replace(indicator_status, new_indicator_status);
            indicator_status =new_indicator_status;
        },

        render: function (where_to_mount) {
            let permission = get_permission_on_render(mounted, where_to_mount, unique_id);
            if (!permission) {
                return
            }
            where_to_mount.appendChild(indicator_component)
            mounted=true;
        },
    }
}

export default IndicatorComponent;