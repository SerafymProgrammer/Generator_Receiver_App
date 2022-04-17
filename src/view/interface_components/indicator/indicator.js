import {check_existed_id, check_is_dom_node, create_unique_id} from "../../../app.service";


function IndicatorComponent(props) {

    const classes_state_indicator = {
        true: '#6ecc21',
        false: '#cc2121'
    }

    let mounted = false;

    let checked_props = props  ? props : {};
    const {id, classes, default_indicator_status} = checked_props;
    let unique_id = create_unique_id( 'indicator', id)
    let indicator_status = Boolean(default_indicator_status);

    let indicator_component = document.createElement('div')
    indicator_component.id = unique_id;
    indicator_component.className = classes?.wrap ? classes.wrap : '';
    indicator_component.classList classes_state_indicator[indicator_status];

    return {

        get_indicator_status: function (new_text) {
            return indicator_status;
        },

        change_indicator_status: function (new_indicator_status) {
            let component = check_existed_id(unique_id);
            let new_indicator_status_ = Boolean(new_indicator_status);
            if (!mounted||!component){
                throw new Error(`indicator with id:${id} is not mounted in DOM`);
                return
            }
            indicator_status =new_indicator_status_;
            component.style.background = colors_indicator[indicator_status];
        },

        render: function (where_to_mount) {
            if (mounted) {
                throw new Error(`component with id:${id} already mounted`);
                return
            }
            if (!check_is_dom_node(where_to_mount)) {
                throw new Error('parent to mount is not dom element');
                return false
            }
            where_to_mount.appendChild(indicator_component)
            mounted=true;
        },
    }
}

export default IndicatorComponent;