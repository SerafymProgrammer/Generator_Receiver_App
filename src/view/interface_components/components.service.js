import {check_is_dom_node} from "../../app.service.js";

export const get_permission_on_render = (mounted, where_to_mount, unique_id) =>{
    if (mounted) {
        throw new Error(`component with id:${unique_id} already mounted`);
        return false
    }
    if (!check_is_dom_node(where_to_mount)) {
        throw new Error('parent to mount is not dom element');
        return false
    }

    return true
}